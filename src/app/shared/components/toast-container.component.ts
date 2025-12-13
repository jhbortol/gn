import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type">
          <div class="toast-content">
            <span class="toast-icon">
              @switch (toast.type) {
                @case ('success') { ✓ }
                @case ('error') { ✕ }
                @case ('warning') { ⚠ }
                @default { ℹ }
              }
            </span>
            <span class="toast-message">{{ toast.message }}</span>
          </div>
          <button 
            class="toast-close"
            (click)="toastService.remove(toast.id)"
            aria-label="Fechar notificação">
            ×
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }

    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
      font-size: 14px;
      font-weight: 500;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .toast-icon {
      font-size: 18px;
      font-weight: bold;
    }

    .toast-message {
      word-break: break-word;
    }

    .toast-close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      margin-left: 12px;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .toast-close:hover {
      opacity: 1;
    }

    /* Success */
    .toast-success {
      background: #e8f5e9;
      border: 1px solid #c8e6c9;
      color: #2e7d32;
    }

    .toast-success .toast-close {
      color: #2e7d32;
    }

    /* Error */
    .toast-error {
      background: #ffebee;
      border: 1px solid #ffcdd2;
      color: #c62828;
    }

    .toast-error .toast-close {
      color: #c62828;
    }

    /* Warning */
    .toast-warning {
      background: #fff3e0;
      border: 1px solid #ffe0b2;
      color: #f57c00;
    }

    .toast-warning .toast-close {
      color: #f57c00;
    }

    /* Info */
    .toast-info {
      background: #e3f2fd;
      border: 1px solid #bbdefb;
      color: #1976d2;
    }

    .toast-info .toast-close {
      color: #1976d2;
    }

    @media (max-width: 480px) {
      .toast-container {
        bottom: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
      }

      .toast {
        padding: 10px 12px;
        font-size: 13px;
      }

      .toast-icon {
        font-size: 16px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}
