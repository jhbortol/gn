const fs = require('fs');

const filePath = process.argv[2] || 'public/sitemap.xml';

if (!fs.existsSync(filePath)) {
  console.error(`❌ Sitemap file not found: ${filePath}`);
  process.exit(1);
}

const xml = fs.readFileSync(filePath, 'utf8');

const redirectsMap = new Map([
  ['https://guianoivas.com/', 'https://guianoivas.com/piracicaba'],
  ['https://guianoivas.com/piracicaba/institucional/sobre-nos', 'https://guianoivas.com/piracicaba/institucional/sobre'],
  ['https://guianoivas.com/piracicaba/termos', 'https://guianoivas.com/piracicaba/institucional/termos']
]);

const urlsetOpenMatch = xml.match(/<urlset[^>]*>/i);
const urlsetCloseMatch = xml.match(/<\/urlset>/i);

if (!urlsetOpenMatch || !urlsetCloseMatch) {
  console.error('❌ Invalid sitemap.xml format: missing <urlset> root');
  process.exit(1);
}

const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/gi) || [];
const seenUrls = new Set();

let replacedCount = 0;
let removedDuplicates = 0;

const normalizedBlocks = [];

for (const block of urlBlocks) {
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/i);

  if (!locMatch) {
    continue;
  }

  const originalUrl = locMatch[1].trim();
  const normalizedUrl = redirectsMap.get(originalUrl) || originalUrl;

  if (normalizedUrl !== originalUrl) {
    replacedCount += 1;
  }

  if (seenUrls.has(normalizedUrl)) {
    removedDuplicates += 1;
    continue;
  }

  seenUrls.add(normalizedUrl);

  const updatedBlock = block.replace(/<loc>[^<]+<\/loc>/i, `<loc>${normalizedUrl}</loc>`);
  normalizedBlocks.push(updatedBlock);
}

const normalizedXml = `${urlsetOpenMatch[0]}\n${normalizedBlocks.join('\n')}\n${urlsetCloseMatch[0]}\n`;

fs.writeFileSync(filePath, normalizedXml, 'utf8');

console.log(`✅ Sitemap normalized: ${filePath}`);
console.log(`   URL blocks kept: ${normalizedBlocks.length}`);
console.log(`   Redirect URLs replaced: ${replacedCount}`);
console.log(`   Duplicate URLs removed: ${removedDuplicates}`);
