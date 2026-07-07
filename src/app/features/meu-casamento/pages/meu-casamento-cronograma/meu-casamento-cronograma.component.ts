import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { ChecklistTaskDefinition, WEDDING_CHECKLIST_TASKS } from '../../meu-casamento.models';
import { BrideAuthService } from '../../../../core/services/bride-auth.service';
import { BrideLoginModalService } from '../../../../core/services/bride-login-modal.service';
import { TrackingService } from '../../../../core/tracking.service';

import { CidadeService } from '../../../../core/cidade.service';

interface CronogramaGroup {
  key: string;
  title: string;
  tasks: ChecklistTaskDefinition[];
  completed: number;
  total: number;
}

const GROUP_DEFS = [
  { key: '12m', label: 'Faltam 12 meses', offsetMonths: -12 },
  { key: '9m',  label: 'Faltam 9 meses',  offsetMonths: -9  },
  { key: '6m',  label: 'Faltam 6 meses',  offsetMonths: -6  },
  { key: '3m',  label: 'Faltam 3 meses',  offsetMonths: -3  },
  { key: '1m',  label: 'Faltam 1 mês',    offsetMonths: -1  },
  { key: 'week', label: 'Na Semana do Casamento 🎊', offsetMonths: 0 },
];

const PT_MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

@Component({
  selector: 'app-meu-casamento-cronograma',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meu-casamento-cronograma.component.html',
  styleUrl: './meu-casamento-cronograma.component.css'
})
export class MeuCasamentoCronogramaComponent implements OnInit {
  private readonly store    = inject(MeuCasamentoStoreService);
  private readonly sync     = inject(MeuCasamentoSyncService);
  private readonly location = inject(Location);
  private readonly router   = inject(Router);
  private readonly cidade   = inject(CidadeService);
  private readonly auth     = inject(BrideAuthService);
  private readonly loginModal = inject(BrideLoginModalService);
  private readonly tracking = inject(TrackingService);

  readonly totalTasks = WEDDING_CHECKLIST_TASKS.length;

  readonly completedCount = computed(() => this.store.checklist().length);

  readonly groups = computed<CronogramaGroup[]>(() => {
    const weddingDate = this.store.profile().weddingDate;
    const checklist   = this.store.checklist();
    return GROUP_DEFS.map(def => {
      const tasks = WEDDING_CHECKLIST_TASKS.filter(t => t.groupKey === def.key);
      const completed = tasks.filter(t => checklist.some(c => c.taskId === t.id)).length;
      return {
        key: def.key,
        title: this.buildTitle(def.label, def.key, weddingDate, def.offsetMonths),
        tasks,
        completed,
        total: tasks.length,
      };
    });
  });

  async ngOnInit(): Promise<void> {
    await this.sync.init();
  }

  goBack(): void {
    this.location.back();
  }

  isCompleted(taskId: string): boolean {
    return this.store.checklist().some(c => c.taskId === taskId);
  }

  async toggleTask(taskId: string, checked: boolean): Promise<void> {
    if (checked && !this.auth.isLoggedIn) {
      this.tracking.trackHubAction('iniciou_degustacao');
    }

    if (checked && !this.auth.isLoggedIn && this.completedCount() >= 2) {
      this.tracking.trackHubAction('atingiu_limite_anonimo');
      const loggedIn = await this.loginModal.open({
        title: 'Seu cronograma está ganhando forma! 💖',
        message: 'Para garantir que você não perca seu progresso caso saia desta tela, crie sua conta gratuita em 5 segundos. É rápido e você salva tudo na nuvem!',
        showContinueWithoutLogin: true,
        isDegustacaoLimit: true
      });
      if (!loggedIn) {
        return;
      }
    }
    this.store.setChecklistTask(taskId, checked);
    await this.sync.syncPendingChanges();
  }

  navigateToCta(task: ChecklistTaskDefinition): void {
    if (!task.deepLink) return;
    const url = task.deepLink.startsWith('/')
      ? task.deepLink
      : `/${this.cidade.getCidade()}/categorias/${task.deepLink}`;
    this.router.navigateByUrl(url);
  }

  private buildTitle(label: string, key: string, weddingDate: string | null, offsetMonths: number): string {
    if (key === 'week' || !weddingDate) return label;
    const d = new Date(weddingDate);
    d.setMonth(d.getMonth() + offsetMonths);
    return `${label} (até ${PT_MONTHS[d.getMonth()]}/${d.getFullYear()})`;
  }
}
