import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { WEDDING_CHECKLIST_TASKS } from '../../meu-casamento.models';

@Component({
  selector: 'app-meu-casamento-cronograma',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meu-casamento-cronograma.component.html',
  styleUrl: './meu-casamento-cronograma.component.css'
})
export class MeuCasamentoCronogramaComponent implements OnInit {
  private readonly store = inject(MeuCasamentoStoreService);
  private readonly sync = inject(MeuCasamentoSyncService);

  readonly progress = computed(() => {
    const completed = this.store.checklist().length;
    return Math.round((completed / WEDDING_CHECKLIST_TASKS.length) * 100);
  });

  readonly groups = computed(() => {
    const weddingDate = this.store.profile().weddingDate;
    return [
      { key: '12m', title: this.resolveGroupTitle('12 meses antes', weddingDate, -12) },
      { key: '9m', title: this.resolveGroupTitle('9 meses antes', weddingDate, -9) },
      { key: '6m', title: this.resolveGroupTitle('6 meses antes', weddingDate, -6) },
      { key: '3m', title: this.resolveGroupTitle('3 meses antes', weddingDate, -3) },
      { key: '1m', title: this.resolveGroupTitle('1 mês antes', weddingDate, -1) },
      { key: 'week', title: this.resolveGroupTitle('Semana do casamento', weddingDate, 0) }
    ].map(group => ({
      ...group,
      tasks: WEDDING_CHECKLIST_TASKS.filter(task => task.groupKey === group.key)
    }));
  });

  async ngOnInit(): Promise<void> {
    await this.sync.init();
  }

  isCompleted(taskId: string): boolean {
    return this.store.checklist().some(task => task.taskId === taskId);
  }

  async toggleTask(taskId: string, checked: boolean): Promise<void> {
    this.store.setChecklistTask(taskId, checked);
    await this.sync.syncPendingChanges();
  }

  private resolveGroupTitle(defaultTitle: string, weddingDate: string | null, offsetMonths: number): string {
    if (!weddingDate) return defaultTitle;

    const baseDate = new Date(weddingDate);
    if (offsetMonths !== 0) {
      baseDate.setMonth(baseDate.getMonth() + offsetMonths);
      return `${defaultTitle} · ${baseDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
    }

    return `${defaultTitle} · ${baseDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
  }
}
