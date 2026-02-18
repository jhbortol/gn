import { Injectable, TransferState, makeStateKey, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface PrerenderMetadata {
  title?: string;
  description?: string;
  image?: string | null;
}

const PRERENDER_METADATA_KEY = makeStateKey<Record<string, any>>('prerender-metadata');

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {
  private metadata: Record<string, PrerenderMetadata> = {};
  private isMetadataLoaded = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.loadMetadata();
  }

  private loadMetadata(): void {
    if (this.isMetadataLoaded) return;

    try {
      // First try to get from TransferState (hydrated from server)
      const transferredMetadata = this.transferState.get(PRERENDER_METADATA_KEY, null);
      if (transferredMetadata) {
        this.metadata = transferredMetadata;
        this.isMetadataLoaded = true;
        return;
      }

      // Only try window access if in browser
      if (isPlatformBrowser(this.platformId)) {
        // Try to load metadata from global scope (set by prerender)
        const globalMeta = (window as any).__PRERENDER_METADATA__;
        if (globalMeta && typeof globalMeta === 'object') {
          this.metadata = globalMeta;
          this.isMetadataLoaded = true;
          return;
        }

        // Fallback: try to load from assets (for client-side navigation)
        fetch('/prerender-metadata.json')
          .then(res => res.json())
          .then(data => {
            this.metadata = data || {};
            this.isMetadataLoaded = true;
          })
          .catch(err => {
            console.warn('Could not load prerender metadata:', err);
            this.isMetadataLoaded = true;
          });
      }
    } catch (err) {
      console.warn('Error loading metadata:', err);
      this.isMetadataLoaded = true;
    }
  }

  /**
   * Apply meta tags from prerender metadata for a given route
   */
  applyMetadata(route: string, fallbackData?: PrerenderMetadata): void {
    const data = this.metadata[route] || fallbackData;

    if (!data) return;

    // Set title
    if (data.title) {
      this.titleService.setTitle(data.title);
    }

    // Set meta description
    if (data.description) {
      this.metaService.updateTag({
        name: 'description',
        content: data.description
      });
    }

    // Set Open Graph tags
    if (data.title) {
      this.metaService.updateTag({
        property: 'og:title',
        content: data.title
      });
    }

    if (data.description) {
      this.metaService.updateTag({
        property: 'og:description',
        content: data.description
      });
    }

    if (data.image) {
      this.metaService.updateTag({
        property: 'og:image',
        content: data.image
      });
      this.metaService.updateTag({
        property: 'og:image:alt',
        content: data.title || 'Image'
      });
    }

    // Set Twitter Card tags
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    if (data.title) {
      this.metaService.updateTag({
        name: 'twitter:title',
        content: data.title
      });
    }

    if (data.description) {
      this.metaService.updateTag({
        name: 'twitter:description',
        content: data.description
      });
    }

    if (data.image) {
      this.metaService.updateTag({
        name: 'twitter:image',
        content: data.image
      });
    }
  }

  /**
   * Get metadata for a route without applying it
   */
  getMetadata(route: string): PrerenderMetadata | undefined {
    return this.metadata[route];
  }

  /**
   * Wait for metadata to be loaded before applying
   */
  async waitForMetadata(): Promise<void> {
    if (this.isMetadataLoaded) return;

    return new Promise(resolve => {
      const checkInterval = setInterval(() => {
        if (this.isMetadataLoaded) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 5000);
    });
  }
}
