import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { BudgetItem } from '../../meu-casamento.models';
import { BrideAuthService } from '../../../../core/services/bride-auth.service';
import { BrideLoginModalService } from '../../../../core/services/bride-login-modal.service';
import { TrackingService } from '../../../../core/tracking.service';

import { CidadeService } from '../../../../core/cidade.service';

interface BudgetDraft {
  allocatedAmount: string;
  spentAmount: string;
  supplierName: string | null;
  notes: string | null;
  status: BudgetItem['status'];
}

@Component({
  selector: 'app-meu-casamento-orcamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meu-casamento-orcamento.component.html',
  styleUrl: './meu-casamento-orcamento.component.css'
})
export class MeuCasamentoOrcamentoComponent implements OnInit {
  private readonly store = inject(MeuCasamentoStoreService);
  private readonly sync = inject(MeuCasamentoSyncService);
  private readonly auth = inject(BrideAuthService);
  private readonly loginModal = inject(BrideLoginModalService);
  private readonly tracking = inject(TrackingService);
  private readonly cidadeService = inject(CidadeService);
  private readonly location = inject(Location);
  private readonly currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  totalBudgetInput = '';
  isEditingTotalBudget = false;
  activeItemId: string | null = null;
  activeDraft: BudgetDraft = this.createDraft();
  snackbarMessage = '';
  private snackbarTimeout: ReturnType<typeof setTimeout> | null = null;
  drafts: Record<string, BudgetDraft> = {};

  readonly budget = this.store.budget;
  readonly hasBudgetStarted = computed(() => (this.store.budget().totalBudget ?? 0) > 0);
  get canStartBudget(): boolean {
    return this.parseCurrencyInput(this.totalBudgetInput) > 0;
  }
  readonly totals = computed(() => {
    const items = this.store.budget().items;
    const allocated = items.reduce((sum, item) => sum + item.allocatedAmount, 0);
    const spent = items.reduce((sum, item) => sum + item.spentAmount, 0);
    const totalBudget = this.store.budget().totalBudget ?? 0;
    return {
      allocated,
      spent,
      remaining: totalBudget - spent,
      progress: totalBudget > 0 ? Math.min(100, Math.round((spent / totalBudget) * 100)) : 0
    };
  });

  goBack(): void {
    this.location.back();
  }

  async ngOnInit(): Promise<void> {
    await this.sync.init();
    await this.sync.loadBudgetCategories();
    this.totalBudgetInput = this.formatCurrencyInput(this.store.budget().totalBudget ?? 0);
  }

  openTotalBudgetEditor(): void {
    this.totalBudgetInput = this.formatCurrencyInput(this.store.budget().totalBudget ?? 0);
    this.isEditingTotalBudget = true;
  }

  closeTotalBudgetEditor(): void {
    this.isEditingTotalBudget = false;
    this.totalBudgetInput = this.formatCurrencyInput(this.store.budget().totalBudget ?? 0);
  }

  updateTotalBudgetInput(value: string): void {
    this.totalBudgetInput = this.formatCurrencyInput(value);
  }

  async saveTotalBudget(): Promise<void> {
    const nextTotal = this.parseCurrencyInput(this.totalBudgetInput);
    if (nextTotal <= 0) return;

    this.store.setBudgetTotal(nextTotal);
    await this.sync.syncPendingChanges();

    this.totalBudgetInput = this.formatCurrencyInput(nextTotal);
    this.isEditingTotalBudget = false;
    this.showSnackbar('Orçamento atualizado com sucesso!');
  }

  openItemEditor(item: BudgetItem): void {
    this.activeItemId = item.id;
    this.activeDraft = { ...this.getDraft(item) };
  }

  closeItemEditor(): void {
    this.activeItemId = null;
    this.activeDraft = this.createDraft();
  }

  updateDraftCurrency(field: 'allocatedAmount' | 'spentAmount', value: string): void {
    this.activeDraft = {
      ...this.activeDraft,
      [field]: this.formatCurrencyInput(value)
    };
  }

  updateDraftText(field: 'supplierName' | 'notes', value: string): void {
    this.activeDraft = {
      ...this.activeDraft,
      [field]: value
    };
  }

  updateDraftStatus(status: BudgetItem['status']): void {
    this.activeDraft = {
      ...this.activeDraft,
      status
    };
  }

  async saveActiveItem(): Promise<void> {
    if (!this.activeItemId) return;
    const currentItem = this.store.budget().items.find(item => item.id === this.activeItemId);
    if (!currentItem) return;


    const currentIsActive = currentItem.allocatedAmount > 0 || currentItem.spentAmount > 0;
    const itemsWithValues = this.store.budget().items.filter(i => i.allocatedAmount > 0 || i.spentAmount > 0).length;
    const nextAllocated = this.parseCurrencyInput(this.activeDraft.allocatedAmount);
    const nextSpent = this.parseCurrencyInput(this.activeDraft.spentAmount);
    const willBeActive = nextAllocated > 0 || nextSpent > 0;

    if (!currentIsActive && willBeActive && !this.auth.isLoggedIn) {
      this.tracking.trackHubAction('iniciou_degustacao');
    }

    if (!currentIsActive && willBeActive && !this.auth.isLoggedIn && itemsWithValues >= 2) {
      this.tracking.trackHubAction('atingiu_limite_anonimo');
      const loggedIn = await this.loginModal.open({
        title: 'Controle total do seu investimento! 💰',
        message: 'Para garantir que você não perca os dados do seu orçamento caso saia desta tela, crie sua conta gratuita em 5 segundos. É rápido e você salva tudo na nuvem!',
        showContinueWithoutLogin: true,
        isDegustacaoLimit: true
      });
      if (!loggedIn) {
        return;
      }
    }
const nextDraft: BudgetDraft = {
      allocatedAmount: this.activeDraft.allocatedAmount,
      spentAmount: this.activeDraft.spentAmount,
      supplierName: this.activeDraft.supplierName ?? null,
      notes: this.activeDraft.notes ?? null,
      status: this.activeDraft.status ?? 'pending'
    };

    this.drafts[currentItem.id] = nextDraft;

    this.store.saveBudgetItem({
      id: currentItem.id,
      category: currentItem.category,
      categoryId: currentItem.categoryId,
      categoryName: currentItem.categoryName,
      categorySlug: currentItem.categorySlug,
      allocatedAmount: this.parseCurrencyInput(nextDraft.allocatedAmount),
      spentAmount: this.parseCurrencyInput(nextDraft.spentAmount),
      supplierName: this.normalizeNullableString(nextDraft.supplierName),
      notes: this.normalizeNullableString(nextDraft.notes),
      status: nextDraft.status
    });

    await this.sync.syncPendingChanges();
    this.closeItemEditor();
    this.showSnackbar('Categoria atualizada com sucesso!');
  }

  getDraft(item: BudgetItem): BudgetDraft {
    if (!this.drafts[item.id]) {
      this.drafts[item.id] = {
        allocatedAmount: this.formatCurrencyInput(item.allocatedAmount),
        spentAmount: this.formatCurrencyInput(item.spentAmount),
        supplierName: item.supplierName,
        notes: item.notes,
        status: item.status
      };
    }

    return this.drafts[item.id];
  }

  private normalizeNullableString(value: string | null | undefined): string | null {
    if (!value) return null;
    const trimmed = String(value).trim();
    return trimmed ? trimmed : null;
  }

  buildCategoryLink(categorySlug: string): string {
    return this.cidadeService.buildUrl(`categorias/${categorySlug}`);
  }

  getActiveCategoryName(): string {
    if (!this.activeItemId) return '';
    return this.budget().items.find(item => item.id === this.activeItemId)?.categoryName ?? '';
  }

  formatCurrency(value: number | null | undefined): string {
    return this.currencyFormatter.format(value ?? 0);
  }

  formatStatus(status: BudgetItem['status']): string {
    if (status === 'contracted') return 'Contratado';
    if (status === 'paid') return 'Pago';
    if (status === 'inProgress') return 'Em negociação';
    return 'Pendente';
  }

  statusClass(status: BudgetItem['status']): string {
    if (status === 'paid') return 'status-badge status-badge--paid';
    if (status === 'contracted') return 'status-badge status-badge--contracted';
    if (status === 'inProgress') return 'status-badge status-badge--in-progress';
    return 'status-badge status-badge--pending';
  }

  showCategoryProgress(item: BudgetItem): boolean {
    return item.allocatedAmount > 0 || item.spentAmount > 0;
  }

  categoryProgress(item: BudgetItem): number {
    if (item.allocatedAmount <= 0) {
      return item.spentAmount > 0 ? 100 : 0;
    }

    return Math.min(100, Math.round((item.spentAmount / item.allocatedAmount) * 100));
  }



  private formatCurrencyInput(value: string | number): string {
    if (typeof value === 'number') {
      return this.currencyFormatter.format(value);
    }
    const digits = String(value ?? '').replace(/\D/g, '');
    if (!digits) return '';
    const cents = Number(digits) / 100;
    return this.currencyFormatter.format(cents);
  }

  private parseCurrencyInput(value: string | number): number {
    if (typeof value === 'number') {
      return value;
    }
    // Remove thousand separators (dots) and decimal commas, then extract digits
    const normalized = String(value ?? '').replace(/\./g, '').replace(/,/g, '');
    const digits = normalized.replace(/\D/g, '');
    if (!digits) return 0;
    return Number((Number(digits) / 100).toFixed(2));
  }

  private showSnackbar(message: string): void {
    this.snackbarMessage = message;
    if (this.snackbarTimeout) {
      clearTimeout(this.snackbarTimeout);
    }
    this.snackbarTimeout = setTimeout(() => {
      this.snackbarMessage = '';
      this.snackbarTimeout = null;
    }, 2500);
  }

  private createDraft(): BudgetDraft {
    return {
      allocatedAmount: '',
      spentAmount: '',
      supplierName: null,
      notes: null,
      status: 'pending'
    };
  }
}
