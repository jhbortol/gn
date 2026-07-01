import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-install-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-install-banner.component.html',
})
export class AppInstallBannerComponent implements OnInit {
  isVisible = false;
  isIos = false;
  isAndroid = false;
  isWeb = false;
  showIosTooltip = false;

  private deferredPrompt: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIfShouldShowBanner();
      this.detectPlatform();
      this.listenForInstallPrompt();
    }
  }

  private checkIfShouldShowBanner() {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      this.isVisible = false;
      return;
    }

    const dismissedTime = localStorage.getItem('appInstallBannerDismissed');
    if (dismissedTime) {
      const now = new Date().getTime();
      const dismissedDate = parseInt(dismissedTime, 10);
      const daysSinceDismissed = (now - dismissedDate) / (1000 * 60 * 60 * 24);

      // If less than 7 days, hide banner
      if (daysSinceDismissed < 7) {
        this.isVisible = false;
        return;
      }
    }

    // Only show if we didn't return early
    this.isVisible = true;
  }

  private detectPlatform() {
    const userAgent = window.navigator.userAgent.toLowerCase();

    this.isIos = /iphone|ipad|ipod/.test(userAgent);
    this.isAndroid = /android/.test(userAgent);

    if (!this.isIos && !this.isAndroid) {
      this.isWeb = true;
    }
  }

  private listenForInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // If we caught this event, we are definitely on a platform that supports web install
      // So ensure we show the banner
      this.checkIfShouldShowBanner();
    });
  }

  dismissBanner() {
    this.isVisible = false;
    this.showIosTooltip = false;
    localStorage.setItem('appInstallBannerDismissed', new Date().getTime().toString());
  }

  installApp() {
    if (this.isAndroid) {
      window.open('https://play.google.com/store/apps/details?id=br.com.guianoivas.app', '_blank');
      this.dismissBanner(); // Auto dismiss after redirecting to store
    } else if (this.isIos) {
      this.showIosTooltip = true;
    } else {
      // Web / PWA fallback
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
            this.dismissBanner();
          } else {
            console.log('User dismissed the install prompt');
          }
          this.deferredPrompt = null;
        });
      } else {
         // Fallback if prompt is not available but user clicked install
         alert('Para instalar, adicione esta página à sua tela inicial pelo menu do navegador.');
      }
    }
  }

  closeIosTooltip() {
    this.showIosTooltip = false;
  }
}
