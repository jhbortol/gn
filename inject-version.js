/**
 * Script to inject build version and cache busting metadata into all prerendered index.html files.
 * Runs AFTER build to ensure fresh builds clear client cache.
 * Usage: node inject-version.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const distPath = path.join(__dirname, 'dist', 'guia-noivas', 'browser');

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

function findAllIndexHtml(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findAllIndexHtml(fullPath, results);
    } else if (entry.isFile() && entry.name === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

function injectVersion() {
  try {
    if (!fs.existsSync(distPath)) {
      console.warn('⚠️  Build output not found at:', distPath);
      console.log('Build output might not exist yet. Skipping version injection.');
      return;
    }

    const buildId = generateBuildId();
    const timestamp = new Date().toISOString();

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

    const htmlFiles = findAllIndexHtml(distPath);
    if (htmlFiles.length === 0) {
      console.warn('⚠️  No index.html files found in:', distPath);
      return;
    }

    let injectedCount = 0;
    for (const filePath of htmlFiles) {
      let htmlContent = fs.readFileSync(filePath, 'utf-8');
      if (htmlContent.includes('</head>') && !htmlContent.includes('name="build-version"')) {
        htmlContent = htmlContent.replace('</head>', `${versionMeta}\n</head>`);
        fs.writeFileSync(filePath, htmlContent, 'utf-8');
        injectedCount++;
      }
    }

    console.log('✅ Version injected successfully!');
    console.log('   Build ID:', buildId);
    console.log('   Timestamp:', timestamp);
    console.log(`   Injected into ${injectedCount} of ${htmlFiles.length} HTML files`);
  } catch (error) {
    console.error('❌ Error injecting version:', error.message);
    process.exit(1);
  }
}

injectVersion();
