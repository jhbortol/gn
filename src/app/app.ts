
import { Component, signal, inject, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { TrackingService } from './core/tracking.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {
  protected readonly title = signal('guia-noivas');
  showNavbar = signal(true);
  showFooter = signal(true);
  private router = inject(Router);
  private tracking = inject(TrackingService);

  ngAfterViewInit() {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        const hideNavbar = ev.url.includes('/midia-kit');
        const hideFooter = ev.url.includes('/painel') || ev.url.includes('/midia-kit');

        this.showNavbar.set(!hideNavbar);
        this.showFooter.set(!hideFooter);
        // Track SPA page view for GA via GTM
        this.tracking.trackPageView(ev.urlAfterRedirects || ev.url, document.title);
        
        // Scroll already handled by router config; ensure focus for accessibility
        const main = document.getElementById('main-content');
        if (main) {
          // Using setTimeout to allow view to render before focus
          setTimeout(() => main.focus(), 0);
        }
      }
    });
  }
}
