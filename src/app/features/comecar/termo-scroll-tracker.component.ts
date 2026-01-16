import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, signal, effect, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermoAdesao } from '../../core/models/termo-adesao.model';

/**
 * Step 2 & 3: Componente com Scroll Tracking e Checkbox Condicional
 * Detecta leitura completa do termo e habilita checkbox apenas após 100% de scroll
 */
@Component({
  selector: 'app-termo-scroll-tracker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <!-- Termos com scroll tracking -->
      <div 
        #termoContainer
        class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 h-48 overflow-y-auto scroll-tracking"
        (scroll)="onScroll($event)"
      >
        <pre class="font-sans text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{{ termo.conteudo }}</pre>
      </div>

      <!-- Indicador de progresso de leitura -->
      <div class="flex items-center gap-3 text-xs text-gray-600">
        <div class="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div 
            class="bg-gradient-to-r from-rose-600 to-red-600 h-full transition-all duration-300"
            [style.width.%]="scrollPercentage()"
          ></div>
        </div>
        <span class="font-semibold">{{ scrollPercentage() }}% lido</span>
      </div>

      <!-- Mensagem condicional -->
      <div *ngIf="!scrollCompleto()" class="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p class="text-xs text-amber-800 font-medium">
          📖 Leia o termo completo para prosseguir ({{ scrollPercentage() }}% concluído)
        </p>
      </div>

      <div *ngIf="scrollCompleto()" class="bg-green-50 border border-green-200 rounded-lg p-3">
        <p class="text-xs text-green-800 font-medium">
          ✓ Leitura completa detectada! Você pode aceitar o termo.
        </p>
      </div>

      <!-- Checkbox - Habilitado apenas após scroll completo -->
      <div class="flex items-start gap-4 pt-4 border-t border-gray-300">
        <input
          type="checkbox"
          [id]="id"
          [disabled]="!scrollCompleto()"
          [checked]="aceito()"
          (change)="onCheckboxChange($event)"
          class="mt-1 w-5 h-5 accent-amber-600 cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label [for]="id" class="cursor-pointer flex-1" [class.opacity-50]="!scrollCompleto()" [class.cursor-not-allowed]="!scrollCompleto()">
          <p class="font-semibold text-gray-900" [class.text-gray-400]="!scrollCompleto()">
            Confirmar aceite dos termos <span class="text-red-600">*</span>
          </p>
          <p class="text-sm text-gray-600 mt-1" [class.text-gray-400]="!scrollCompleto()">
            Li e concordo com os termos de uso acima
          </p>
        </label>
      </div>

      <!-- Metadados do termo (para auditoria) -->
      <div class="text-xs text-gray-500 bg-gray-50 rounded p-2 mt-4">
        <p><strong>Termo ID:</strong> {{ termo.id }}</p>
        <p><strong>Versão:</strong> {{ termo.versao }}</p>
        <p><strong>Hash:</strong> {{ termo.hash?.substring(0, 16) }}...</p>
      </div>
    </div>
  `,
  styles: [`
    .scroll-tracking::-webkit-scrollbar {
      width: 8px;
    }
    .scroll-tracking::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 4px;
    }
    .scroll-tracking::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #cbd5e1 0%, #9ca3af 100%);
      border-radius: 4px;
    }
    .scroll-tracking::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #9ca3af 0%, #6b7280 100%);
    }
  `]
})
export class TermoScrollTrackerComponent implements OnInit {
  @Input() termo!: TermoAdesao;
  @Input() id: string = 'aceitaTermos';
  @Output() scrollCompletoChange = new EventEmitter<boolean>();
  @Output() aceitoChange = new EventEmitter<boolean>();
  @ViewChild('termoContainer') termoContainer!: ElementRef;

  scrollPercentage = signal(0);
  scrollCompleto = signal(false);
  aceito = signal(false);
  tempoInicio = signal(Date.now());
  tempoLeitura = signal(0);

  constructor() {
    // Effect para detectar mudanças no scrollCompleto
    effect(() => {
      this.scrollCompletoChange.emit(this.scrollCompleto());
    });

    effect(() => {
      this.aceitoChange.emit(this.aceito());
    });
  }

  ngOnInit(): void {
    // Reset tempo ao iniciar
    this.tempoInicio.set(Date.now());
  }

  /**
   * Step 2: Detectar scroll e calcular percentual
   */
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    
    // Percentual de scroll (0-100%)
    const percent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
    this.scrollPercentage.set(Math.min(percent, 100));

    // Detectar scroll completo (90% ou mais)
    if (percent >= 90) {
      this.scrollCompleto.set(true);
      // Calcular tempo de leitura
      this.tempoLeitura.set(Math.round((Date.now() - this.tempoInicio()) / 1000));
    }
  }

  /**
   * Step 3: Checkbox só habilitado após scroll completo
   */
  onCheckboxChange(event: Event): void {
    if (this.scrollCompleto()) {
      const target = event.target as HTMLInputElement;
      this.aceito.set(target.checked);
    }
  }

  /**
   * Getter para dados de auditoria
   */
  obterDadosAuditoria() {
    return {
      scrollCompleto: this.scrollCompleto(),
      tempoLeitura: this.tempoLeitura(),
      aceito: this.aceito(),
      percentualLido: this.scrollPercentage()
    };
  }
}
