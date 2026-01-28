import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeadService } from '../../../core/services/lead.service';
import { FornecedorLeadsResponse, LeadDto, PlanLevel } from '../../../core/models/tier-system.model';

/**
 * Painel de gerenciamento de leads para fornecedores
 * Mostra todos os leads recebidos com:
 * - Listagem com paginação
 * - Filtro de leitura (todos, lidos, não lidos)
 * - Cards de estatísticas (total, não lidos, este mês, limite)
 * - Marca como lido/não lido
 * - Ordenação por data (mais recentes primeiro)
 * - Responsivo (mobile, tablet, desktop)
 */
@Component({
  selector: 'app-leads-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './leads-dashboard.component.html',
  styleUrls: ['./leads-dashboard.component.css']
})
export class LeadsDashboardComponent implements OnInit {
  // ============================================
  // SINAIS DE ESTADO
  // ============================================

  /** Dados da resposta da API */
  leadsData = signal<FornecedorLeadsResponse | null>(null);

  /** Está carregando dados */
  isLoading = signal(false);

  /** Mensagem de erro */
  errorMessage = signal('');

  /** Página atual (para paginação) */
  currentPage = signal(1);

  /** Leads por página */
  pageSize = signal(10);

  /** Filtro de status (todos, lidos, não lidos) */
  statusFilter = signal<'todos' | 'lidos' | 'nao_lidos'>('todos');

  /** Lead selecionado para detalhes */
  selectedLead = signal<LeadDto | null>(null);

  // ============================================
  // SINAIS COMPUTADOS
  // ============================================

  /** Leads filtrados por status */
  filteredLeads = computed(() => {
    const data = this.leadsData();
    if (!data) return [];

    const filter = this.statusFilter();
    if (filter === 'lidos') {
      return data.leads.filter(lead => lead.isRead);
    } else if (filter === 'nao_lidos') {
      return data.leads.filter(lead => !lead.isRead);
    }
    return data.leads;
  });

  /** Leads da página atual */
  paginatedLeads = computed(() => {
    const filtered = this.filteredLeads();
    const pageNum = this.currentPage();
    const size = this.pageSize();
    const start = (pageNum - 1) * size;
    return filtered.slice(start, start + size);
  });

  /** Total de páginas */
  totalPages = computed(() => {
    const filtered = this.filteredLeads();
    return Math.ceil(filtered.length / this.pageSize());
  });

  /** Número de leads não lidos */
  unreadCount = computed(() => {
    const data = this.leadsData();
    return data?.unreadLeads ?? 0;
  });

  /** Percentual de leads lidos */
  readPercentage = computed(() => {
    const data = this.leadsData();
    if (!data || data.totalLeads === 0) return 0;
    const unread = data.unreadLeads;
    const read = data.totalLeads - unread;
    return Math.round((read / data.totalLeads) * 100);
  });

  /** Status do plano (Free ou Vitrine) */
  isPlanVitrine = computed(() => {
    const data = this.leadsData();
    return data ? data.leadLimit > 3 : false;
  });

  /** Espaço disponível de leads */
  leadsAvailable = computed(() => {
    const data = this.leadsData();
    if (!data) return 0;
    return Math.max(0, data.leadLimit - data.leadCountThisMonth);
  });

  /** Status da cota do mês */
  quotaStatus = computed(() => {
    const data = this.leadsData();
    if (!data) return 'empty';
    const percentage = (data.leadCountThisMonth / data.leadLimit) * 100;
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    if (percentage > 0) return 'active';
    return 'empty';
  });

  // ============================================
  // CONSTRUCTOR & LIFECYCLE
  // ============================================

  constructor(private leadService: LeadService) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  // ============================================
  // MÉTODOS PÚBLICOS
  // ============================================

  /**
   * Carrega leads do backend com paginação
   */
  loadLeads(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const skip = (this.currentPage() - 1) * this.pageSize();

    this.leadService.getMyLeads(skip, this.pageSize()).subscribe({
      next: (response) => {
        this.leadsData.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar leads:', err);
        this.errorMessage.set('Erro ao carregar leads. Tente novamente.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Muda página
   */
  goToPage(page: number): void {
    const total = this.totalPages();
    if (page >= 1 && page <= total) {
      this.currentPage.set(page);
      this.loadLeads();
    }
  }

  /**
   * Vai para página anterior
   */
  previousPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  /**
   * Vai para próxima página
   */
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  /**
   * Altera filtro de status
   */
  setStatusFilter(filter: 'todos' | 'lidos' | 'nao_lidos'): void {
    this.statusFilter.set(filter);
    this.currentPage.set(1);
  }

  /**
   * Seleciona um lead para ver detalhes
   */
  selectLead(lead: LeadDto): void {
    this.selectedLead.set(lead);
  }

  /**
   * Fecha o modal de detalhes
   */
  closeLeadDetails(): void {
    this.selectedLead.set(null);
  }

  /**
   * Formata data para formato brasileiro
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Formata tempo relativo (ex: "há 2 horas")
   */
  formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'agora';
    if (minutes < 60) return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `há ${hours} hora${hours > 1 ? 's' : ''}`;
    if (days < 7) return `há ${days} dia${days > 1 ? 's' : ''}`;

    return this.formatDate(dateString);
  }

  /**
   * Copia email para clipboard
   */
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Feedback visual poderia ser adicionado aqui
      console.log('Copiado para clipboard');
    });
  }

  /**
   * Abre cliente de email padrão do sistema
   */
  openEmailClient(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  /**
   * Abre WhatsApp Web
   */
  openWhatsApp(phone: string): void {
    const cleaned = phone.replace(/\D/g, '');
    const message = encodeURIComponent('Olá! Vi sua solicitação no Guia Noivas...');
    window.open(`https://wa.me/${cleaned}?text=${message}`, '_blank');
  }

  /**
   * Classe de badge de status de leitura
   */
  getReadBadgeClass(isRead: boolean): string {
    return isRead
      ? 'badge badge-read'
      : 'badge badge-unread';
  }

  /**
   * Texto de status de leitura
   */
  getReadStatusText(isRead: boolean): string {
    return isRead ? 'Lido' : 'Não lido';
  }

  /**
   * Classe de progresso da cota
   */
  getQuotaProgressClass(): string {
    const status = this.quotaStatus();
    return `quota-bar quota-${status}`;
  }
}
