import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { BudgetItem } from '../../meu-casamento.models';
import { MeuCasamentoBottomNavComponent } from '../../components/meu-casamento-bottom-nav/meu-casamento-bottom-nav.component';

@Component({
  selector: 'app-meu-casamento-orcamento',
  standalone: true,
  imports: [CommonModule, FormsModule, MeuCasamentoBottomNavComponent],
  templateUrl: './meu-casamento-orcamento.component.html',
  styleUrl: './meu-casamento-orcamento.component.css'
})
export class MeuCasamentoOrcamentoComponent implements OnInit {
  private readonly store = inject(MeuCasamentoStoreService);
  private readonly sync = inject(MeuCasamentoSyncService);

  totalBudgetInput = '';
  drafts: Record<string, Partial<BudgetItem>> = {};

  readonly budget = this.store.budget;
  readonly hasBudgetStarted = computed(() => (this.store.budget().totalBudget ?? 0) > 0);
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
    this.totalBudgetInput = this.store.budget().totalBudget?.toString() ?? '';
  }

  getDraft(item: BudgetItem): Partial<BudgetItem> {
    if (!this.drafts[item.id]) {
      this.drafts[item.id] = { ...item };
    }
    return this.drafts[item.id];
  }

  async saveTotalBudget(): Promise<void> {
    this.store.setBudgetTotal(this.totalBudgetInput ? Number(this.totalBudgetInput) : null);
    await this.sync.syncPendingChanges();
  }

  async saveItem(item: BudgetItem): Promise<void> {
    if (!this.hasBudgetStarted()) return;
    const draft = this.getDraft(item);
    this.store.saveBudgetItem({
      id: item.id,
      category: item.category,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      categorySlug: item.categorySlug,
      allocatedAmount: Number(draft.allocatedAmount ?? 0),
      spentAmount: Number(draft.spentAmount ?? 0),
      supplierName: String(draft.supplierName ?? ''),
      notes: String(draft.notes ?? ''),
      status: (draft.status as BudgetItem['status']) ?? item.status
    });
    await this.sync.syncPendingChanges();
  }

  async deleteItem(id: string): Promise<void> {
    if (!this.hasBudgetStarted()) return;
    this.store.deleteBudgetItem(id);
    delete this.drafts[id];
    await this.sync.syncPendingChanges();
  }
}
