import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RemovalRequestService } from '../../../core/services/removal-request.service';
import {
  RemovalReason,
  RemovalReasonLabels,
  VendorSearchResult
} from '../../../core/models/removal-request.model';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

/**
 * Página de Solicitação de Remoção de Perfil (Opt-Out)
 * 
 * Features:
 * - Busca de fornecedor com autocomplete
 * - Formulário com validação rigorosa
 * - Mensagens de fricção (alerta sobre perda de visibilidade)
 * - Checkbox de consentimento legal
 * - Feedback pós-submissão
 * 
 * Rota: /gerenciar-perfil ou /privacidade/remocao
 */
@Component({
  selector: 'app-removal-request-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './removal-request-page.html',
  styleUrls: ['./removal-request-page.css']
})
export class RemovalRequestPageComponent implements OnInit {
  // ============================================
  // SINAIS DE ESTADO
  // ============================================

  /** Fornecedor selecionado pelo usuário */
  selectedVendor = signal<VendorSearchResult | null>(null);

  /** Resultados da busca de fornecedor */
  searchResults = signal<VendorSearchResult[]>([]);

  /** Está buscando fornecedor */
  isSearching = signal(false);

  /** Está submetendo formulário */
  isSubmitting = signal(false);

  /** Mensagem de erro */
  errorMessage = signal('');

  /** Formulário foi submetido com sucesso */
  submitted = signal(false);

  /** Mostra dropdown de resultados */
  showDropdown = signal(false);

  // ============================================
  // FORMULÁRIOS
  // ============================================

  /** FormGroup principal */
  removalForm!: FormGroup;

  /** Query de busca (separado do form) */
  searchQuery = signal('');

  // ============================================
  // DADOS ESTÁTICOS
  // ============================================

  /** Enum de motivos (para template) */
  RemovalReason = RemovalReason;

  /** Labels dos motivos */
  RemovalReasonLabels = RemovalReasonLabels;

  /** Array de motivos para o dropdown */
  reasons = Object.values(RemovalReason);

  // ============================================
  // CONSTRUCTOR & LIFECYCLE
  // ============================================

  constructor(
    private fb: FormBuilder,
    private removalService: RemovalRequestService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // ============================================
  // INICIALIZAÇÃO
  // ============================================

  /**
   * Inicializa o formulário com validações
   */
  private initForm(): void {
    this.removalForm = this.fb.group({
      requesterEmail: ['', [Validators.required, Validators.email]],
      reason: ['', Validators.required],
      description: ['', Validators.maxLength(1000)],
      legalConsent: [false, Validators.requiredTrue]
    });
  }

  // ============================================
  // BUSCA DE FORNECEDOR
  // ============================================

  /**
   * Inicia busca de fornecedor com debounce
   */
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.searchQuery.set(query);

    if (query.length < 3) {
      this.searchResults.set([]);
      this.showDropdown.set(false);
      return;
    }

    this.isSearching.set(true);
    this.showDropdown.set(true);

    // Debounce manual (simplificado)
    setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  /**
   * Executa busca na API
   */
  private performSearch(query: string): void {
    this.removalService.searchVendors(query).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.isSearching.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar fornecedor:', err);
        this.searchResults.set([]);
        this.isSearching.set(false);
        this.errorMessage.set('Erro ao buscar fornecedor. Tente novamente.');
      }
    });
  }

  /**
   * Seleciona um fornecedor da lista
   */
  selectVendor(vendor: VendorSearchResult): void {
    this.selectedVendor.set(vendor);
    this.searchQuery.set(vendor.nomeFantasia);
    this.showDropdown.set(false);
    this.searchResults.set([]);
    this.errorMessage.set('');
  }

  /**
   * Remove seleção de fornecedor
   */
  clearVendor(): void {
    this.selectedVendor.set(null);
    this.searchQuery.set('');
    this.searchResults.set([]);
  }

  /**
   * Fecha dropdown ao clicar fora
   */
  closeDropdown(): void {
    setTimeout(() => {
      this.showDropdown.set(false);
    }, 200);
  }

  // ============================================
  // VALIDAÇÃO DE CAMPOS
  // ============================================

  /**
   * Verifica se campo tem erro e foi tocado
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.removalForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Retorna mensagem de erro para o campo
   */
  getFieldError(fieldName: string): string {
    const field = this.removalForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Este campo é obrigatório';
    if (field.errors['email']) return 'Email inválido';
    if (field.errors['maxlength']) return `Máximo de ${field.errors['maxlength'].requiredLength} caracteres`;

    return 'Campo inválido';
  }

  // ============================================
  // SUBMISSÃO
  // ============================================

  /**
   * Submete formulário de remoção
   */
  onSubmit(): void {
    // Marca todos como touched para mostrar erros
    Object.keys(this.removalForm.controls).forEach(key => {
      this.removalForm.get(key)?.markAsTouched();
    });

    // Valida fornecedor selecionado
    if (!this.selectedVendor()) {
      this.errorMessage.set('Por favor, selecione uma empresa da lista.');
      return;
    }

    // Valida formulário
    if (this.removalForm.invalid) {
      this.errorMessage.set('Por favor, corrija os erros no formulário.');
      return;
    }

    // Prepara payload
    const vendor = this.selectedVendor()!;
    const formValue = this.removalForm.value;

    const payload = {
      vendorId: vendor.id,
      requesterEmail: formValue.requesterEmail,
      reason: formValue.reason as RemovalReason,
      description: formValue.description || undefined
    };

    // Submete
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.removalService.submitRemovalRequest(payload).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.submitted.set(true);
        // Limpa formulário
        this.removalForm.reset();
        this.selectedVendor.set(null);
        this.searchQuery.set('');
      },
      error: (err) => {
        console.error('Erro ao submeter solicitação:', err);
        this.isSubmitting.set(false);
        this.errorMessage.set(
          err.error?.message || 
          'Erro ao processar solicitação. Tente novamente mais tarde.'
        );
      }
    });
  }

  /**
   * Reseta página para nova solicitação
   */
  startNewRequest(): void {
    this.submitted.set(false);
    this.initForm();
  }

  // ============================================
  // HELPERS
  // ============================================

  /**
   * Retorna label do motivo selecionado
   */
  getReasonLabel(reason: RemovalReason): string {
    return RemovalReasonLabels[reason];
  }
}
