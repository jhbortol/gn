import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CidadeService } from '../../core/cidade.service';
import { environment } from '../../../environments/environment';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, IconComponent, RouterModule]
})
export class NavbarComponent {
  @Output() goHome = new EventEmitter<void>();
  @Output() navigateTo = new EventEmitter<string>();
  @Output() scrollToCategories = new EventEmitter<void>();
  
  private cidadeService = inject(CidadeService);
  private router = inject(Router);
  mobileMenuOpen = false;

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.closeMobileMenu());
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

  openPainel(): void {
    window.open(environment.PAINEL_URL, '_blank');
  }
}
