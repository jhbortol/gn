import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

/**
 * Service to block search engine indexing in non-production environments
 * Adds noindex meta tag to prevent dev.guianoivas.com from being indexed
 */
@Injectable({
  providedIn: 'root'
})
export class SeoBlockerService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.blockNonProductionIndexing();
  }

  private blockNonProductionIndexing(): void {
    // Only run in browser and only in non-production environments
    if (isPlatformBrowser(this.platformId) && !environment.production) {
      this.addNoIndexMetaTag();
    }
  }

  private addNoIndexMetaTag(): void {
    // Check if meta tag already exists
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    
    if (!metaRobots) {
      // Create new meta tag
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      metaRobots.content = 'noindex, nofollow';
      document.head.appendChild(metaRobots);
      console.warn('🚫 SEO Blocker: Development environment detected. Added noindex meta tag to prevent indexing.');
    } else {
      // Update existing meta tag
      metaRobots.content = 'noindex, nofollow';
      console.warn('🚫 SEO Blocker: Development environment detected. Updated robots meta tag to noindex.');
    }
  }
}
