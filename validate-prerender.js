const fs = require('fs');
const path = require('path');

/**
 * Validation script to ensure prerendered content matches expected routes
 * This prevents incomplete builds from being deployed
 */

function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Failed to load ${filePath}:`, error.message);
    return null;
  }
}

function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file === 'index.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function routeToFilePath(route, browserDir) {
  // Convert route to file path
  // /piracicaba -> /piracicaba/index.html
  // /piracicaba/fornecedores/slug -> /piracicaba/fornecedores/slug/index.html
  const normalizedRoute = route.endsWith('/') ? route : route + '/';
  return path.join(browserDir, normalizedRoute, 'index.html');
}

function validatePrerender() {
  console.log('🔍 Validating prerendered content...\n');
  
  // Load expected routes
  const routesPath = path.join(__dirname, 'src', 'prerender-routes.json');
  const expectedRoutes = loadJson(routesPath);
  
  if (!expectedRoutes || !Array.isArray(expectedRoutes)) {
    console.error('❌ FATAL: Could not load prerender-routes.json or invalid format');
    process.exit(1);
  }
  
  console.log(`📋 Expected routes: ${expectedRoutes.length}`);
  
  // Check if dist folder exists
  const browserDir = path.join(__dirname, 'dist', 'guia-noivas', 'browser');
  
  if (!fs.existsSync(browserDir)) {
    console.error('❌ FATAL: Build output not found at', browserDir);
    console.error('   Run build before validation!');
    process.exit(1);
  }
  
  // Find all generated HTML files
  const generatedHtmlFiles = findHtmlFiles(browserDir);
  console.log(`📄 Generated HTML files: ${generatedHtmlFiles.length}\n`);
  
  // Validate each expected route has corresponding HTML
  const missing = [];
  const present = [];
  
  expectedRoutes.forEach(route => {
    const expectedPath = routeToFilePath(route, browserDir);
    
    if (fs.existsSync(expectedPath)) {
      present.push(route);
    } else {
      missing.push(route);
    }
  });
  
  // Calculate coverage
  const coverage = (present.length / expectedRoutes.length) * 100;
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 VALIDATION RESULTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Present: ${present.length}/${expectedRoutes.length}`);
  console.log(`❌ Missing: ${missing.length}/${expectedRoutes.length}`);
  console.log(`📈 Coverage: ${coverage.toFixed(2)}%\n`);
  
  // Show missing routes if any
  if (missing.length > 0) {
    console.log('⚠️  MISSING ROUTES:');
    missing.slice(0, 20).forEach(route => {
      console.log(`   - ${route}`);
    });
    
    if (missing.length > 20) {
      console.log(`   ... and ${missing.length - 20} more`);
    }
    console.log('');
  }
  
  // Validation thresholds
  const MINIMUM_COVERAGE = 95; // Require 95% coverage
  const CRITICAL_COVERAGE = 80; // Fail build if below 80%
  
  if (coverage < CRITICAL_COVERAGE) {
    console.error('❌ CRITICAL: Prerender coverage below 80%!');
    console.error('   This indicates a serious build failure.');
    console.error('   Possible causes:');
    console.error('   - Prerender process crashed');
    console.error('   - API returned incomplete data');
    console.error('   - Routes file corrupted');
    console.error('');
    process.exit(1);
  }
  
  if (coverage < MINIMUM_COVERAGE) {
    console.warn('⚠️  WARNING: Prerender coverage below 95%!');
    console.warn('   Some routes were not pre-rendered.');
    console.warn('   These pages will show empty HTML to crawlers.');
    console.warn('   Review the missing routes above.');
    console.warn('');
    
    // Optional: Fail build on warning (can be disabled for non-critical deploys)
    if (process.env.STRICT_VALIDATION === 'true') {
      console.error('❌ STRICT_VALIDATION enabled: Failing build');
      process.exit(1);
    }
    
    console.log('⚠️  Continuing with warning (set STRICT_VALIDATION=true to fail build)\n');
  }
  
  // Additional validations
  console.log('🔍 Additional validations...');
  
  // Check sitemap exists
  const sitemapPath = path.join(browserDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.warn('⚠️  WARNING: sitemap.xml not found in build output');
  } else {
    console.log('✅ sitemap.xml present');
  }
  
  // Check robots.txt exists
  const robotsPath = path.join(browserDir, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    console.warn('⚠️  WARNING: robots.txt not found in build output');
  } else {
    console.log('✅ robots.txt present');
    
    // Validate robots.txt allows indexing in production
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    if (robotsContent.includes('Disallow: /') && !robotsContent.includes('Allow: /')) {
      console.error('❌ ERROR: robots.txt is blocking all crawlers!');
      console.error('   This is the DEVELOPMENT robots.txt. Use production version.');
      if (process.env.NODE_ENV === 'production' || process.env.STRICT_VALIDATION === 'true') {
        process.exit(1);
      }
    } else {
      console.log('✅ robots.txt allows indexing');
    }
  }
  
  // Check metadata file
  const metadataPath = path.join(__dirname, 'src', 'prerender-metadata.json');
  const metadata = loadJson(metadataPath);
  
  if (metadata) {
    const metadataCount = Object.keys(metadata).length;
    console.log(`✅ prerender-metadata.json: ${metadataCount} entries`);
    
    // Validate metadata coverage
    const metadataCoverage = (metadataCount / expectedRoutes.length) * 100;
    if (metadataCoverage < 50) {
      console.warn(`⚠️  WARNING: Only ${metadataCoverage.toFixed(1)}% of routes have metadata`);
    }
  }
  
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (coverage >= MINIMUM_COVERAGE) {
    console.log('✅ VALIDATION PASSED');
    console.log(`   Coverage: ${coverage.toFixed(2)}%`);
    console.log(`   All ${present.length} expected routes are pre-rendered`);
  } else {
    console.log('⚠️  VALIDATION PASSED WITH WARNINGS');
    console.log(`   Coverage: ${coverage.toFixed(2)}%`);
    console.log(`   ${missing.length} routes missing from prerender`);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Write validation report
  const report = {
    timestamp: new Date().toISOString(),
    coverage: coverage,
    expectedRoutes: expectedRoutes.length,
    presentRoutes: present.length,
    missingRoutes: missing.length,
    missing: missing,
    validations: {
      sitemap: fs.existsSync(sitemapPath),
      robots: fs.existsSync(robotsPath),
      metadata: metadata !== null
    }
  };
  
  const reportPath = path.join(__dirname, 'prerender-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📊 Validation report saved: ${reportPath}\n`);
  
  return coverage >= MINIMUM_COVERAGE;
}

// Run validation
try {
  const passed = validatePrerender();
  process.exit(passed ? 0 : 1);
} catch (error) {
  console.error('❌ FATAL ERROR during validation:', error);
  process.exit(1);
}
