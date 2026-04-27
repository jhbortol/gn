import { Injectable, signal, inject, PLATFORM_ID, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { interval } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {
  private httpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
  currentVersion = signal<string | null>(null);
  updateAvailable = signal(false);
  lastCheckTime = signal<string | null>(null);
  checkAttempts = signal(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Get current version from window object injected by index.html
      this.currentVersion.set((window as any).__BUILD_VERSION__ || 'unknown');
      
      // Check for updates every 5 minutes
      this.startPeriodicVersionCheck();
      
      // Effect to handle update availability
      effect(() => {
        if (this.updateAvailable()) {
          console.warn('🔄 Nova versão disponível! Considere recarregar.');
          this.showUpdateNotification();
        }
      });
    }
  }

  /**
   * Check if a new version is available by comparing build version
   */
  checkForUpdates(): void {
    // Fetch index.html to get new version metadata
    this.httpClient.get('/index.html', { 
      responseType: 'text',
      headers: { 
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
      }
    })
    .pipe(
      timeout(5000),
      catchError((error) => {
        console.warn('Erro ao verificar versão:', error);
        this.checkAttempts.update(v => v + 1);
        return of(null);
      })
    )
    .subscribe((html) => {
      if (!html) return;

      // Extract version from meta tag
      const versionMatch = html.match(/name="build-version"\s+content="([^"]+)"/);
      if (versionMatch && versionMatch[1]) {
        const serverVersion = versionMatch[1];
        const clientVersion = this.currentVersion();
        
        if (serverVersion !== clientVersion) {
          console.log(`📦 Nova versão detectada: ${serverVersion} (atual: ${clientVersion})`);
          this.updateAvailable.set(true);
        } else {
          console.log('✅ Você está usando a versão mais recente:', clientVersion);
          this.checkAttempts.set(0);
        }
      }
      
      this.lastCheckTime.set(new Date().toISOString());
    });
  }

  /**
   * Force reload with cache bypass
   */
  reloadWithCacheBust(): void {
    // Add random query parameter to force fresh load
    const nonce = Math.random().toString(36).substring(2, 15);
    const location = window.location;
    window.location.href = `${location.pathname}${location.search ? '&' : '?'}cache-bust=${nonce}`;
  }

  /**
   * Start checking for updates periodically (every 5 minutes)
   */
  private startPeriodicVersionCheck(): void {
    // Check immediately on first visit
    setTimeout(() => this.checkForUpdates(), 3000);
    
    // Then check every 5 minutes
    interval(5 * 60 * 1000).subscribe(() => {
      this.checkForUpdates();
    });
  }

  /**
   * Show update notification to user
   */
  private showUpdateNotification(): void {
    // Check if user has dismissed this notification recently
    const lastNotification = localStorage.getItem('_updateNotificationDismissed');
    const now = Date.now();
    
    if (lastNotification) {
      const lastTime = parseInt(lastNotification, 10);
      if (now - lastTime < 24 * 60 * 60 * 1000) {
        // Don't show again within 24 hours
        return;
      }
    }

    // Show browser-native notification if available and permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('Guia Noivas - Nova versão disponível', {
          body: 'Uma nova versão do site está disponível. Recarregue para atualizar.',
          icon: '/favicon.ico',
          tag: 'version-update'
        });
      } catch (e) {
        console.warn('Erro ao mostrar notificação:', e);
      }
    }

    // Also log to console with styling
    console.log('%c🔄 Nova versão disponível! Recarregue a página para atualizar.', 
      'color: #BE123C; font-size: 16px; font-weight: bold; background: #FEE2E2; padding: 8px; border-radius: 4px;');
  }
}
