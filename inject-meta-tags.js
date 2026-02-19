/**
 * Post-process script to inject meta tags into prerendered HTML files
 * This runs AFTER prerendering to add meta tags directly to HTML
 */

const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, 'src', 'prerender-metadata.json');
const distPath = path.join(__dirname, 'dist', 'guia-noivas', 'browser');

if (!fs.existsSync(metadataPath)) {
  console.warn('Metadata file not found:', metadataPath);
  process.exit(1);
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

/**
 * Generate meta tag HTML string
 */
function generateMetaTags(routeMetadata) {
  if (!routeMetadata) return '';

  const tags = [];

  // Open Graph tags
  if (routeMetadata.title) {
    tags.push(`<meta property="og:title" content="${escapeHtml(routeMetadata.title)}" />`);
  }
  if (routeMetadata.description) {
    tags.push(`<meta property="og:description" content="${escapeHtml(routeMetadata.description)}" />`);
  }
  if (routeMetadata.image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(routeMetadata.image)}" />`);
  }

  // Twitter Card tags
  if (routeMetadata.title) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(routeMetadata.title)}" />`);
  }
  if (routeMetadata.description) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(routeMetadata.description)}" />`);
  }
  if (routeMetadata.image) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(routeMetadata.image)}" />`);
  }

  return tags.join('\n  ');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Walk directory and inject meta tags into HTML files
 */
function injectMetaTags(dir, routeParts = []) {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively walk directories
      const newRouteParts = [...routeParts, entry];
      injectMetaTags(fullPath, newRouteParts);
    } else if (entry === 'index.html') {
      // Build route key from directory structure
      const routeKey = '/' + routeParts.join('/');

      // Get metadata for this route
      const routeMetadata = metadata[routeKey];

      if (routeMetadata) {
        let html = fs.readFileSync(fullPath, 'utf-8');
        const metaTags = generateMetaTags(routeMetadata);

        // Find </head> and inject before it
        const headEnd = html.indexOf('</head>');
        if (headEnd !== -1) {
          const newHtml = html.slice(0, headEnd) + '  ' + metaTags + '\n  ' + html.slice(headEnd);
          fs.writeFileSync(fullPath, newHtml);
          console.log(`✅ Injected meta tags into: ${routeKey}`);
        }
      }
    }
  }
}

// Start injection
console.log('Injecting meta tags into prerendered HTML files...');
injectMetaTags(distPath);
console.log('Done!');
