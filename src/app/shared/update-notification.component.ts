import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionCheckService } from '../core/version-check.service';

@Component({
  selector: 'app-update-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (versionService.updateAvailable()) {
      <div class="fixed bottom-4 right-4 bg-rose-600 text-white rounded-lg shadow-2xl p-4 max-w-sm z-50 animate-pulse border border-rose-700">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <p class="font-semibold text-base">🔄 Nova versão disponível</p>
            <p class="text-sm text-rose-100 mt-1">Recarregue para atualizar para a versão mais recente.</p>
          </div>
          <div class="flex gap-2 flex-shrink-0">
            <button 
              (click)="reload()"
              class="bg-white text-rose-600 px-4 py-2 rounded font-semibold text-sm hover:bg-rose-50 transition-colors whitespace-nowrap"
            >
              Atualizar
            </button>
            <button 
              (click)="dismiss()"
              class="text-white hover:bg-rose-700 px-2 py-2 rounded text-lg transition-colors"
              title="Descartar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }

    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `]
})
export class UpdateNotificationComponent {
  versionService = inject(VersionCheckService);

  reload(): void {
    this.versionService.reloadWithCacheBust();
  }

  dismiss(): void {
    localStorage.setItem('_updateNotificationDismissed', Date.now().toString());
  }
}
