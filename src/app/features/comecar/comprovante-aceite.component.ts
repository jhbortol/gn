import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprovanteAceite } from '../../core/models/termo-adesao.model';

/**
 * Step 7: Comprovante de Aceite
 * Exibe protocolo, versão do termo, hash e dados de validação
 */
@Component({
  selector: 'app-comprovante-aceite',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="comprovante" class="bg-green-50 border-2 border-green-400 rounded-xl p-6 shadow-md space-y-4">
      <!-- Header -->
      <div class="flex items-start gap-3">
        <span class="text-4xl">✅</span>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-green-900">Comprovante de Aceite</h3>
          <p class="text-sm text-green-700 mt-1">Seu aceito foi registrado para fins legais e de auditoria.</p>
        </div>
      </div>

      <!-- Protocolo -->
      <div class="bg-white rounded-lg p-4 space-y-3 border border-green-200">
        <div>
          <p class="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">Protocolo de Aceite</p>
          <p class="text-lg font-mono font-bold text-gray-900">{{ comprovante.protocolo }}</p>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">Data e Hora</p>
            <p class="text-sm text-gray-900">{{ comprovante.dataAceite | date: 'dd/MM/yyyy HH:mm:ss' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">Status</p>
            <p class="text-sm font-bold" [ngClass]="{
              'text-green-700': comprovante.statusAceite === 'ACEITO',
              'text-amber-700': comprovante.statusAceite === 'PENDENTE',
              'text-red-700': comprovante.statusAceite === 'REJEITADO'
            }">
              {{ comprovante.statusAceite }}
            </p>
          </div>
        </div>
      </div>

      <!-- Metadados do Termo -->
      <div class="bg-white rounded-lg p-4 space-y-3 border border-green-200">
        <p class="text-xs text-gray-600 font-semibold uppercase tracking-wider">Termo Aceito</p>
        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">ID do Termo</p>
            <p class="text-sm font-mono text-gray-900">{{ comprovante.termo.id }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Versão</p>
            <p class="text-sm font-bold text-gray-900">v{{ comprovante.termo.versao }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Validação</p>
            <p class="text-sm font-bold" [ngClass]="{
              'text-green-700': comprovante.validacaoHash === 'VÁLIDO',
              'text-red-700': comprovante.validacaoHash === 'INVÁLIDO'
            }">
              {{ comprovante.validacaoHash }}
            </p>
          </div>
        </div>
      </div>

      <!-- Hash do Termo -->
      <div class="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-300 overflow-x-auto">
        <p class="text-gray-400 mb-2 font-semibold">SHA-256 Hash do Termo:</p>
        <p class="break-all">{{ comprovante.termo.hash }}</p>
      </div>

      <!-- Informações Legais -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p class="text-xs text-blue-800">
          <strong>🔐 Segurança Jurídica:</strong> Este comprovante documenta formalmente seu aceite dos termos. 
          O hash garante a integridade do documento. Guarde este protocolo para referências futuras.
        </p>
      </div>

      <!-- Botões de Ação -->
      <div class="flex gap-3 pt-2">
        <button
          (click)="copiarProtocolo()"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          📋 Copiar Protocolo
        </button>
        <button
          (click)="imprimirComprovante()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          🖨️ Imprimir
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ComprovanteAceiteComponent {
  @Input() comprovante!: ComprovanteAceite;

  copiarProtocolo(): void {
    if (navigator.clipboard && this.comprovante?.protocolo) {
      navigator.clipboard.writeText(this.comprovante.protocolo).then(() => {
        alert('Protocolo copiado para a área de transferência!');
      });
    }
  }

  imprimirComprovante(): void {
    window.print();
  }
}
