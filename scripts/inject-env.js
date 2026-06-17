/*
 * Simple env injector for Angular environment files.
 * It reads from process.env (and .env via dotenv) and replaces the values
 * of GOOGLE_CLIENT_ID, APPLE_CLIENT_ID, APPLE_TEAM_ID, APPLE_REDIRECT_URI
 * in src/environments/environment.ts and src/environments/environment.prod.ts
 *
 * Usage: node scripts/inject-env.js
 */

const fs = require('fs');
const path = require('path');
try {
  require('dotenv').config();
} catch (e) {
  // dotenv optional
}

const projectRoot = path.resolve(__dirname, '..');
const envFiles = [
  path.join(projectRoot, 'src', 'environments', 'environment.ts'),
  path.join(projectRoot, 'src', 'environments', 'environment.prod.ts')
];

const vars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
  APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
  APPLE_REDIRECT_URI: process.env.APPLE_REDIRECT_URI
};

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn('Env injector: file not found', filePath);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const [key, val] of Object.entries(vars)) {
    if (typeof val === 'undefined' || val === null) continue; // skip unset
    // Replace patterns like KEY: '...' or KEY: "..." or KEY: `...`
    const regex = new RegExp('(' + key + '\\s*:\\s*)([\'"`])(.*?)([\'"`])', 'g');
    if (regex.test(content)) {
      content = content.replace(regex, function(_, p1, q1, oldVal, q2) {
        // preserve quotes style and escape backslashes and $ in value
        const safe = String(val).replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
        return p1 + q1 + safe + q2;
      });
    } else {
      // If key not present, try to insert before closing brace
      const insertRegex = /(\n}\s*;?\s*$)/;
      if (insertRegex.test(content)) {
        const safe = String(val).replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
        content = content.replace(insertRegex, function(match, p1) {
          return `\n  ${key}: '${safe}',` + p1;
        });
      }
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Env injector: updated', filePath);
  } else {
    console.log('Env injector: no changes for', filePath);
  }
}

envFiles.forEach(replaceInFile);

console.log('Env injection complete.');
