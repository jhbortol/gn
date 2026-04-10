import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LeadService } from '../../core/services/lead.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-6">
      <ng-container *ngIf="!compact">
        <h3 class="font-serif font-bold text-2xl text-gray-900 mb-2">Enviar Mensagem Direta</h3>
        <p class="text-sm text-gray-600 mb-6">
          Preencha seus dados e o fornecedor poderá retornar seu contato com mais detalhes sobre o orçamento.
        </p>
      </ng-container>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- Nome -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Seu Nome <span class="text-red-600">*</span></label>
          <input
            type="text"
            formControlName="clienteName"
            placeholder="Digite seu nome completo"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            [class.border-red-500]="isFieldInvalid('clienteName')"
          />
          <p *ngIf="isFieldInvalid('clienteName')" class="text-red-500 text-xs mt-1">
            Nome é obrigatório (mínimo 3 caracteres)
          </p>
        </div>

        <!-- WhatsApp -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">WhatsApp <span class="text-red-600">*</span></label>
          <input
            type="tel"
            formControlName="clientePhone"
            placeholder="(11) 98765-4321"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            [class.border-red-500]="isFieldInvalid('clientePhone')"
            (input)="onPhoneInput($event)"
            (blur)="onPhoneBlur($event)"
          />
          <p *ngIf="isFieldInvalid('clientePhone')" class="text-red-500 text-xs mt-1">
            WhatsApp válido é obrigatório
          </p>
        </div>

        <!-- Botão -->
        <button
          type="submit"
          [disabled]="!form.valid || isSubmitting()"
          class="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          {{ isSubmitting() ? 'Enviando...' : (compact ? compactActionLabel : 'Enviar Mensagem') }}
        </button>

        <!-- Disclaimer termos -->
        <p class="text-center" style="font-size:10px; color:#9ca3af;">
          Ao enviar, você concorda com os
          <a href="/piracicaba/institucional/termos" class="underline hover:text-gray-600">Termos de Uso e Isenção de Responsabilidade</a>
          do Guia Noivas.
        </p>

        <!-- Mensagens de Status -->
        <div *ngIf="successMessage()" class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium flex items-center gap-2">
          <span>✓</span>
          {{ successMessage() }}
        </div>

        <div *ngIf="errorMessage()" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium flex items-center gap-2">
          <span>⚠</span>
          {{ errorMessage() }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadFormComponent {
  @Input() fornecedorId!: string | number;
  /** When true, adjusts CTA text for the WhatsApp modal flow. */
  @Input() compact = false;
  @Input() compactActionLabel = 'Continuar para WhatsApp';
  @Output() submitSuccess = new EventEmitter<any>();

  form = new FormGroup({
    clienteName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    clientePhone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/)
    ])
  });

  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor(private leadService: LeadService) { }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const masked = this.formatPhoneValue(input.value);
    input.value = masked;
    this.form.get('clientePhone')?.setValue(masked, { emitEvent: false });
  }

  onPhoneBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const masked = this.formatPhoneValue(input.value);
    input.value = masked;
    this.form.get('clientePhone')?.setValue(masked, { emitEvent: false });
  }

  private formatPhoneValue(rawValue: string): string {
    let digits = rawValue.replace(/\D/g, '');
    if (digits.length > 11) digits = digits.slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }

  onSubmit(): void {
    if (!this.form.valid || !this.fornecedorId) {
      this.errorMessage.set('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.leadService.submitLead(this.fornecedorId, this.form.value as any).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.successMessage.set(response.message);
        this.form.reset();
        this.submitSuccess.emit(response.leadId);

        // Auto-clear message após 5 segundos
        setTimeout(() => {
          this.successMessage.set('');
        }, 5000);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const errorMsg = err?.error?.message || 'Erro ao enviar mensagem. Tente novamente.';
        this.errorMessage.set(errorMsg);
      }
    });
  }
}
