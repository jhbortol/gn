import { mergeApplicationConfig, ApplicationConfig, APP_INITIALIZER, TransferState, makeStateKey, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { provideServerRouting } from '@angular/ssr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const PRERENDER_METADATA_KEY = makeStateKey<Record<string, any>>('prerender-metadata');

function initializePrerenderMetadata(transferState: TransferState, platformId: string) {
  try {
    // Only load from file during server-side rendering
    if (!isPlatformServer(platformId)) {
      return;
    }

    // Lazy load fs/path only when needed (server-side)
    const fs = require('fs');
    const path = require('path');
    
    // Try to load metadata from file during SSR
    const metadataPath = path.join(__dirname, '..', '..', 'prerender-metadata.json');
    
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      transferState.set(PRERENDER_METADATA_KEY, metadata);
    }
  } catch (err) {
    console.warn('Could not load prerender metadata during SSR:', err);
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRouting(serverRoutes),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: (transferState: TransferState, platformId: object) => () => {
        initializePrerenderMetadata(transferState, platformId as unknown as string);
      },
      deps: [TransferState, PLATFORM_ID],
      multi: true
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
