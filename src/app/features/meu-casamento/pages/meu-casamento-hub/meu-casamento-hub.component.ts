import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';

@Component({
  selector: 'app-meu-casamento-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meu-casamento-hub.component.html',
  styleUrl: './meu-casamento-hub.component.css'
})
export class MeuCasamentoHubComponent implements OnInit {
  private readonly store = inject(MeuCasamentoStoreService);
  private readonly sync = inject(MeuCasamentoSyncService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly profile = this.store.profile;
  readonly backupCode = this.store.backupCode;
  readonly availableTools = this.store.availableTools;
  readonly error = computed(() => this.store.state().lastError);
  readonly blockedMessage = computed(() => this.route.snapshot.queryParamMap.has('desbloqueioPendente')
    ? 'Preencha nome do casal e WhatsApp para liberar cronograma, convidados e orçamento.'
    : null);
  readonly countdownText = computed(() => {
    const date = this.store.profile().weddingDate;
    if (!date) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weddingDate = new Date(date);
    weddingDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return null;
    if (diffDays === 0) return 'Hoje é o grande dia 💍';
    return `Faltam ${diffDays} dia${diffDays > 1 ? 's' : ''} para o casamento.`;
  });

  async ngOnInit(): Promise<void> {
    await this.sync.init();
    await this.sync.hydrateFromServerIfEmpty();
  }

  updateText(field: 'brideFirstName' | 'whatsappNumber' | 'weddingStyle', value: string): void {
    this.store.updateProfile({ [field]: value });
  }

  updateGuests(value: string): void {
    this.store.updateProfile({ estimatedGuests: value ? Number(value) : null });
  }

  updateDate(value: string): void {
    this.store.updateProfile({ weddingDate: value || null });
  }

  async saveNow(): Promise<void> {
    await this.sync.syncPendingChanges();
  }

  async copyBackupCode(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    await navigator.clipboard.writeText(this.backupCode());
  }

  navigate(path: string): void {
    if (!this.availableTools() && ['/meu-casamento/cronograma', '/meu-casamento/convidados', '/meu-casamento/orcamento'].includes(path)) {
      void this.router.navigate(['/meu-casamento'], { queryParams: { desbloqueioPendente: '1' } });
      return;
    }

    void this.router.navigateByUrl(path);
  }
}
