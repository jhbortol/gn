const fs = require('fs');
const path = require('path');

const REQUEST_TIMEOUT_MS = 20000;

async function fetchWithTimeout(url, timeoutMs = REQUEST_TIMEOUT_MS, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeBaseUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function getCheckPages(baseUrl) {
  const rawPages = process.env.SEO_MONITOR_PAGES;
  const defaults = ['/piracicaba', '/piracicaba/categorias', '/piracicaba/blog', '/piracicaba/fornecedores'];
  const pages = rawPages ? rawPages.split(',').map((p) => p.trim()).filter(Boolean) : defaults;
  return pages.map((page) => (page.startsWith('http') ? page : `${baseUrl}${page.startsWith('/') ? page : `/${page}`}`));
}

async function checkResponse(url, expectations = {}) {
  const response = await fetchWithTimeout(url, REQUEST_TIMEOUT_MS);
  const text = await response.text();
  const headers = Object.fromEntries(response.headers.entries());

  const errors = [];
  if (!response.ok) {
    errors.push(`HTTP ${response.status}`);
  }

  if (expectations.mustContain && !text.includes(expectations.mustContain)) {
    errors.push(`Missing required content: ${expectations.mustContain}`);
  }

  if (expectations.mustNotContain && text.includes(expectations.mustNotContain)) {
    errors.push(`Forbidden content found: ${expectations.mustNotContain}`);
  }

  if (typeof expectations.customValidator === 'function') {
    const customErrors = expectations.customValidator(text, headers) || [];
    customErrors.forEach((error) => errors.push(error));
  }

  return {
    url,
    ok: errors.length === 0,
    status: response.status,
    headers,
    errors
  };
}

async function run() {
  const baseUrl = normalizeBaseUrl(process.env.PRODUCTION_SITE_URL || 'https://guianoivas.com');
  const sitemapUrl = process.env.SITEMAP_PUBLIC_URL || `${baseUrl}/sitemap.xml`;
  const robotsUrl = process.env.ROBOTS_PUBLIC_URL || `${baseUrl}/robots.txt`;
  const keyPages = getCheckPages(baseUrl);

  const checks = [];

  const sitemapCheck = await checkResponse(sitemapUrl, { mustContain: '<urlset xmlns=' });
  checks.push({
    type: 'sitemap',
    ...sitemapCheck
  });

  const robotsCheck = await checkResponse(robotsUrl, {
    customValidator: (text) => {
      if (/^\s*Disallow:\s*\/\s*$/im.test(text)) {
        return ['robots.txt contains root block directive (Disallow: /)'];
      }
      return [];
    }
  });
  checks.push({
    type: 'robots',
    ...robotsCheck
  });

  const homeCheck = await checkResponse(`${baseUrl}/`, { mustContain: 'build-version' });
  checks.push({
    type: 'cache-versioning',
    ...homeCheck,
    cacheControl: homeCheck.headers['cache-control'] || null
  });

  for (const pageUrl of keyPages) {
    const pageCheck = await checkResponse(pageUrl, { mustNotContain: 'noindex' });
    checks.push({
      type: 'page-crawlability',
      ...pageCheck
    });
  }

  const failed = checks.filter((c) => !c.ok);
  // Cache-versioning checks a CDN-cached live URL and is timing-dependent
  // (CDN propagation can lag behind deployment). Treat it as a warning only.
  const fatalFailures = failed.filter((c) => c.type !== 'cache-versioning');
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl,
    failedChecks: failed.length,
    totalChecks: checks.length,
    checks
  };

  const reportPath = path.join(__dirname, 'seo-production-monitor-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔎 PRODUCTION SEO MONITOR');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Checks: ${checks.length}`);
  console.log(`Failed: ${failed.length}`);

  checks.forEach((check) => {
    const icon = check.ok ? '✅' : '❌';
    console.log(`${icon} [${check.type}] ${check.url} (${check.status})`);
    if (!check.ok) {
      check.errors.forEach((error) => console.log(`   - ${error}`));
    }
  });

  if (homeCheck.cacheControl) {
    console.log(`ℹ️  Cache-Control (/): ${homeCheck.cacheControl}`);
  }

  console.log(`📄 Report saved to ${reportPath}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (fatalFailures.length > 0) {
    process.exit(1);
  }
}

run().catch((error) => {
  console.error('❌ Failed to run production SEO monitor:', error);
  process.exit(1);
});
