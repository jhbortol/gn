
import { Component, signal, inject, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { ClickwrapAgreementComponent } from './shared/clickwrap-agreement/clickwrap-agreement';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ClickwrapAgreementComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {
  protected readonly title = signal('guia-noivas');
  showFooter = signal(true);
  private router = inject(Router);

  ngAfterViewInit() {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        // Hide footer on painel routes
        this.showFooter.set(!ev.url.includes('/painel'));
        
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
