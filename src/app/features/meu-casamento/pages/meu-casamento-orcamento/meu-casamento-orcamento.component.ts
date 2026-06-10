import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { BudgetItem } from '../../meu-casamento.models';
import { MeuCasamentoBottomNavComponent } from '../../components/meu-casamento-bottom-nav/meu-casamento-bottom-nav.component';
import { CidadeService } from '../../../../core/cidade.service';

type BudgetDraft = Pick<BudgetItem, 'allocatedAmount' | 'spentAmount' | 'supplierName' | 'notes' | 'status'>;

@Component({
  selector: 'app-meu-casamento-orcamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MeuCasamentoBottomNavComponent],
  templateUrl: './meu-casamento-orcamento.component.html',
  styleUrl: './meu-casamento-orcamento.component.css'
})
export class MeuCasamentoOrcamentoComponent implements OnInit {
  private readonly store = inject(MeuCasamentoStoreService);
  private readonly sync = inject(MeuCasamentoSyncService);
  private readonly cidadeService = inject(CidadeService);
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
      [field]: this.parseCurrencyInput(value)
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

    const nextDraft: BudgetDraft = {
      allocatedAmount: this.activeDraft.allocatedAmount ?? 0,
      spentAmount: this.activeDraft.spentAmount ?? 0,
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
      allocatedAmount: nextDraft.allocatedAmount,
      spentAmount: nextDraft.spentAmount,
      supplierName: String(nextDraft.supplierName ?? ''),
      notes: String(nextDraft.notes ?? ''),
      status: nextDraft.status
    });

    await this.sync.syncPendingChanges();
    this.closeItemEditor();
    this.showSnackbar('Categoria atualizada com sucesso!');
  }

  getDraft(item: BudgetItem): BudgetDraft {
    if (!this.drafts[item.id]) {
      this.drafts[item.id] = {
        allocatedAmount: item.allocatedAmount,
        spentAmount: item.spentAmount,
        supplierName: item.supplierName,
        notes: item.notes,
        status: item.status
      };
    }

    return this.drafts[item.id];
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
    if (status === 'inProgress') return 'Em andamento';
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

  formatDraftCurrency(value: number | null | undefined): string {
    return this.formatCurrencyInput(value ?? 0);
  }

  private formatCurrencyInput(value: string | number): string {
    const digits = String(value ?? '').replace(/\D/g, '');
    if (!digits) return '';
    const cents = Number(digits) / 100;
    return this.currencyFormatter.format(cents);
  }

  private parseCurrencyInput(value: string): number {
    const digits = String(value ?? '').replace(/\D/g, '');
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
      allocatedAmount: 0,
      spentAmount: 0,
      supplierName: null,
      notes: null,
      status: 'pending'
    };
  }
}
