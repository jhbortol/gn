import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-termo-aceite-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity" (click)="onClose()">
      <div 
        class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden" 
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-modal="true"
        aria-labelledby="termo-modal-title"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="termo-modal-title" class="text-xl font-bold text-gray-900">{{ title }}</h2>
          <button (click)="onClose()" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto flex-1">
          <div *ngIf="isLoading" class="flex flex-col items-center justify-center py-12 space-y-4">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-600"></div>
            <p class="text-gray-500">Carregando termos...</p>
          </div>
          
          <div *ngIf="error" class="text-center py-8 text-red-600">
            <p>{{ error }}</p>
            <button (click)="onRetry.emit()" class="mt-4 px-4 py-2 border border-rose-600 text-rose-600 rounded hover:bg-rose-50 transition-colors">Tentar Novamente</button>
          </div>

          <div *ngIf="!isLoading && !error && content" class="prose max-w-none text-gray-700 font-sans whitespace-pre-wrap">
            {{ content }}
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-gray-200 flex justify-end">
          <button (click)="onClose()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `
})
export class TermoAceiteModalComponent {
  @Input() title: string = 'Política de Dados';
  @Input() content: string | null = null;
  @Input() isLoading: boolean = false;
  @Input() error: string | null = null;
  
  @Output() close = new EventEmitter<void>();
  @Output() onRetry = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
