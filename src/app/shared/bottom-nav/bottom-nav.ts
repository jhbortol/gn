import { Component, inject, computed, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IconComponent } from '../icon/icon';
import { BrideAuthService } from '../../core/services/bride-auth.service';
import { BrideLoginModalService } from '../../core/services/bride-login-modal.service';
import { CidadeService } from '../../core/cidade.service';
import { MeuCasamentoSyncService } from '../../features/meu-casamento/services/meu-casamento-sync.service';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css'
})
export class BottomNavComponent {
  private authService = inject(BrideAuthService);
  private loginModalService = inject(BrideLoginModalService);
  private cidadeService = inject(CidadeService);
  private router = inject(Router);
  private syncService = inject(MeuCasamentoSyncService);

  isLoggedIn$ = this.authService.isLoggedIn$;
  isCollapsed = false;
  private lastScrollPosition = 0;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Only hide after scrolling down a bit (e.g., 50px) to avoid hiding at the very top
    if (currentScrollPosition > 50 && currentScrollPosition > this.lastScrollPosition) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }

    this.lastScrollPosition = Math.max(0, currentScrollPosition);
  }



  handleNav(event: Event, path: string) {
    if (this.authService.isLoggedIn) {
      console.log(`[BottomNav] Navegando para ${path} - Iniciando sincronização da funcionalidade (push + pull local)...`);
      void (async () => {
        await this.syncService.syncPendingChanges();
        await this.syncService.syncFeatureFromServer(path);
      })();
    }
  }
}
