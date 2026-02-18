import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';
import https from 'https';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(browserDistFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  
  // Route for sitemap.xml
  server.get('/sitemap.xml', (req, res) => {
    const apiUrl = process.env['API_BASE_URL'] || 'https://func-guianoivas-dev-deczg2affxb9f7f7.brazilsouth-01.azurewebsites.net/api/v1';
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

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    // Check if the prerendered file exists
    const prerenderPath = join(browserDistFolder, originalUrl, 'index.html');
    if (existsSync(prerenderPath)) {
      // Serve the prerendered file
      res.sendFile(prerenderPath);
      return;
    }

    // Otherwise, use SSR
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const PORT = process.env['PORT'] ? Number(process.env['PORT']) : 4000;

  // Start up the Node server
  const server = app();
  server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
    setInterval(() => {
      console.log(`[${new Date().toISOString()}] Server is alive on port ${PORT}`);
    }, 10000);
  });
}

run();
