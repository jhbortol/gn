import { Component, Output, EventEmitter, inject, DestroyRef, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CidadeService } from '../../core/cidade.service';
import { environment } from '../../../environments/environment';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BrideAuthService } from '../../core/services/bride-auth.service';
import { BrideLoginModalComponent } from '../bride-login-modal/bride-login-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, IconComponent, RouterModule, BrideLoginModalComponent]
})
export class NavbarComponent {
  @Output() goHome = new EventEmitter<void>();
  @Output() navigateTo = new EventEmitter<string>();
  @Output() scrollToCategories = new EventEmitter<void>();

  private cidadeService = inject(CidadeService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  public brideAuthService = inject(BrideAuthService);

  mobileMenuOpen = false;
  showLoginModal = signal(false);
  profileDropdownOpen = signal(false);

  readonly cidadeAtualNome = computed(() => {
    const cidade = this.cidadeService.cidadeAtual();
    // Se não há cidade selecionada (página de seleção), não mostra o nome
    return cidade ? this.cidadeService.getCidadeNome(cidade) : '';
  });

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
         this.closeMobileMenu();
         this.profileDropdownOpen.set(false);
      });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  buildUrl(path: string): string {
    return this.cidadeService.buildUrl(path);
  }

  getPainelUrl(): string {
    return environment.PAINEL_URL;
  }
  
  openLoginModal() {
    this.showLoginModal.set(true);
    this.closeMobileMenu();
  }

  closeLoginModal() {
    this.showLoginModal.set(false);
  }
  
  toggleProfileDropdown() {
    this.profileDropdownOpen.update(v => !v);
  }
  
  logoutBride() {
    this.brideAuthService.logout();
    this.profileDropdownOpen.set(false);
    const cidade = this.cidadeService.getCidade() || 'selecionar-cidade';
    void this.router.navigate(['/', cidade]);
  }
}
