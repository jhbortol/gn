import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import express from 'express';
import { join } from 'path';
import https from 'https';

enableProdMode();

const app = express();
const distFolder = join(process.cwd(), 'dist/guia-noivas/browser');

// Serve static files (prerendered HTML, assets, etc.)
app.use(express.static(distFolder, { maxAge: '1y' }));

// Route for sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const apiUrl = process.env['API_BASE_URL'] || 'https://func-guianoivas-dev-deczg2affxb9f7.brazilsouth-01.azurewebsites.net/api/v1';
  const url = `${apiUrl}/sitemap.xml`;
  https.get(url, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => {
      data += chunk;
    });
    apiRes.on('end', () => {
      res.set('Content-Type', 'application/xml');
      res.send(data);
    });
  }).on('error', (err) => {
    console.error('Error fetching sitemap:', err);
    res.status(500).send('Server error');
  });
});

// Catch-all: serve index.html for client-side routing (CSR fallback)
app.get('*', (req, res) => {
  const indexPath = join(distFolder, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Server Error');
    }
  });
});

export const handler = app;

// If this file is run directly with `ts-node src/server.ts`, start the HTTP server.
const argvEntry = process.argv && process.argv[1] ? process.argv[1] : '';
const normalizedArgv = argvEntry.replace(/\\/g, '/');
const isDirectRun = normalizedArgv.endsWith('src/server.ts') || normalizedArgv.endsWith('server.js');
if (isDirectRun) {
  const PORT = process.env['PORT'] ? Number(process.env['PORT']) : 4000;
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${PORT}`);
    setInterval(() => {
      console.log(`[${new Date().toISOString()}] Server is alive on port ${PORT}`);
    }, 10000);
  });
}
