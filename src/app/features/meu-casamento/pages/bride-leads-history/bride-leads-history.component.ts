import { Component, OnInit, inject, DestroyRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BrideAuthService } from '../../../../core/services/bride-auth.service';
import { LeadService } from '../../../../core/services/lead.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface BrideLead {
  id: string;
  fornecedorId: string;
  fornecedorNome: string;
  categoria: string;
  dataSolicitacao: string;
  status: 'pendente' | 'respondido' | 'arquivado';
  mensagem?: string;
}

@Component({
  selector: 'app-bride-leads-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Meus Orçamentos</h2>
        <span class="text-sm text-gray-500">{{ leadsCount() }} solicitação{{ leadsCount() !== 1 ? 's' : '' }}</span>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading() && leadsCount() === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-600 font-medium">Nenhum orçamento solicitado ainda</p>
        <p class="text-gray-500 text-sm mt-2">Explore fornecedores e solicite orçamentos</p>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading()" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-rose-600"></div>
        <p class="text-gray-600 mt-3 text-sm">Carregando...</p>
      </div>

      <!-- Leads List -->
      <div *ngIf="!isLoading() && leadsCount() > 0" class="space-y-3">
        <div *ngFor="let lead of leads()" class="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-colors">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">{{ lead.fornecedorNome }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ lead.categoria }}</p>
            <p class="text-xs text-gray-500 mt-2">Solicitado em {{ formatDate(lead.dataSolicitacao) }}</p>
          </div>
          
          <div class="flex items-center gap-3 ml-4">
            <span [ngClass]="getStatusClass(lead.status)" class="text-xs font-semibold px-3 py-1 rounded-full">
              {{ getStatusLabel(lead.status) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="errorMessage()" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        {{ errorMessage() }}
      </div>
    </div>
  `,
  styles: [`
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class BrideLeadsHistoryComponent implements OnInit {
  private readonly brideAuthService = inject(BrideAuthService);
  private readonly leadService = inject(LeadService);
  private readonly destroyRef = inject(DestroyRef);

  isLoading = signal(false);
  errorMessage = signal('');
  leads = signal<BrideLead[]>([]);
  
  readonly leadsCount = computed(() => this.leads().length);

  ngOnInit(): void {
    this.loadLeads();
  }

  private loadLeads(): void {
    // Este método seria implementado quando o backend fornecesse um endpoint
    // para retornar leads solicitados por uma noiva específica
    // Por enquanto, deixamos como placeholder
    this.isLoading.set(false);
  }

  formatDate(date: string): string {
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(new Date(date));
    } catch {
      return date;
    }
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pendente: 'Pendente',
      respondido: 'Respondido',
      arquivado: 'Arquivado'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      pendente: 'bg-yellow-100 text-yellow-800',
      respondido: 'bg-green-100 text-green-800',
      arquivado: 'bg-gray-100 text-gray-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }
}
