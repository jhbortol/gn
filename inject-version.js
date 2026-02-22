/**
 * Script to inject build version and cache busting metadata into index.html
 * Runs AFTER build to ensure fresh builds clear client cache
 * Usage: node inject-version.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const distPath = path.join(__dirname, 'dist', 'guia-noivas', 'browser');
const indexPath = path.join(distPath, 'index.html');

function generateBuildId() {
  try {
    // Use git commit hash if available
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    const timestamp = Date.now();
    return `${commitHash}-${timestamp}`;
  } catch (err) {
    // Fallback: use timestamp + random
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString('hex');
    return `${timestamp}-${random}`;
  }
}

function injectVersion() {
  try {
    if (!fs.existsSync(indexPath)) {
      console.warn('⚠️  index.html not found at:', indexPath);
      console.log('Build output might not exist yet. Skipping version injection.');
      return;
    }

    const buildId = generateBuildId();
    const timestamp = new Date().toISOString();
    
    let htmlContent = fs.readFileSync(indexPath, 'utf-8');

    // Inject build version meta tag before closing </head>
    const versionMeta = `  <!-- Build Version Info - Auto-injected by inject-version.js -->
  <meta name="build-version" content="${buildId}" />
  <meta name="build-timestamp" content="${timestamp}" />
  <script>
    window.__BUILD_VERSION__ = '${buildId}';
    window.__BUILD_TIMESTAMP__ = '${timestamp}';
    // Store in sessionStorage for client version checking
    sessionStorage.setItem('_buildVersion', '${buildId}');
    console.log('📦 Build Version:', window.__BUILD_VERSION__);
  </script>`;

    htmlContent = htmlContent.replace('</head>', `${versionMeta}\n</head>`);

    fs.writeFileSync(indexPath, htmlContent, 'utf-8');
    console.log('✅ Version injected successfully!');
    console.log('   Build ID:', buildId);
    console.log('   Timestamp:', timestamp);
  } catch (error) {
    console.error('❌ Error injecting version:', error.message);
    process.exit(1);
  }
}

injectVersion();
