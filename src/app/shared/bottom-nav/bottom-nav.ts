import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IconComponent } from '../icon/icon';
import { BrideAuthService } from '../../core/services/bride-auth.service';
import { BrideLoginModalService } from '../../core/services/bride-login-modal.service';
import { CidadeService } from '../../core/cidade.service';

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

  isLoggedIn$ = this.authService.isLoggedIn$;

  readonly homeUrl = computed(() => {
    const cidade = this.cidadeService.cidadeAtual();
    return cidade ? `/${cidade}` : '/selecionar-cidade';
  });

  handleNav(event: Event, path: string) {
    if (!this.authService.isLoggedIn()) {
      event.preventDefault();
      event.stopPropagation();
      this.loginModalService.open();
    }
  }
}
