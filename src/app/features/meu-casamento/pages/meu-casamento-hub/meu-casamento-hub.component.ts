import { Component, OnInit, computed, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { TrackingService } from '../../../../core/tracking.service';

import { BrideAuthService } from '../../../../core/services/bride-auth.service';
import { BrideLeadsHistoryComponent } from '../bride-leads-history/bride-leads-history.component';
import { TermoAceiteModalComponent } from '../../../../shared/components/termo-aceite-modal/termo-aceite-modal.component';
import { TermoAdesao } from '../../../../core/models/bride-auth.model';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-meu-casamento-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BrideLeadsHistoryComponent, TermoAceiteModalComponent],
  templateUrl: './meu-casamento-hub.component.html',
  styleUrl: './meu-casamento-hub.component.css'
})
export class MeuCasamentoHubComponent implements OnInit {
  private readonly store = inject(MeuCasamentoStoreService);
  private readonly sync = inject(MeuCasamentoSyncService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly brideAuthService = inject(BrideAuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly trackingService = inject(TrackingService);
  private readonly toastService = inject(ToastService);

  lgpdConsentido = signal(false);
  isLgpdSaving = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  
  isTermoModalOpen = signal(false);
  termoAdesao = signal<TermoAdesao | null>(null);
  termoLoading = signal(false);
  termoError = signal<string | null>(null);

  readonly profile = this.store.profile;
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

  // Bride greeting
  readonly isBrideLoggedIn = computed(() => !!this.brideAuthService.profile);
  readonly brideGreeting = computed(() => {
    const profile = this.brideAuthService.profile;
    if (profile) {
      const firstName = profile.nome?.split(' ')[0] || 'Noiva';
      return `Bem-vinda, ${firstName}! 👰`;
    }
    return 'Organize seu casamento';
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


  navigate(path: string): void {
    if (!this.availableTools() && ['/meu-casamento/cronograma', '/meu-casamento/convidados', '/meu-casamento/orcamento'].includes(path)) {
      this.toastService.error('Preencha nome do casal e WhatsApp para liberar esta ferramenta.');
      void this.router.navigate(['/meu-casamento'], { queryParams: { desbloqueioPendente: '1' } });
      return;
    }

    this.trackingService.trackHubAction('navigate_module', { module: path });
    void this.router.navigateByUrl(path);
  }

  viewBrideProfile(): void {
    void this.router.navigateByUrl('/meu-casamento/perfil');
  }

  onLgpdConsentChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (!isChecked) {
      const confirmRevoke = confirm('Tem certeza que deseja sair da Lista VIP e revogar seu consentimento? Algumas ferramentas podem ficar indisponíveis.');
      if (!confirmRevoke) {
        checkbox.checked = true; // revert
        return;
      }
    }

    this.isLgpdSaving.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.termoAdesao()) {
      this.doRegisterConsent(isChecked, checkbox);
    } else {
      // Fetch in background if checked directly
      this.brideAuthService.getTermoAdesao()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (termo) => {
            this.termoAdesao.set(termo);
            this.doRegisterConsent(isChecked, checkbox);
          },
          error: (err) => {
            this.isLgpdSaving.set(false);
            checkbox.checked = !isChecked; // revert
            this.errorMessage.set('Erro ao buscar o termo de adesão.');
          }
        });
    }
  }

  private doRegisterConsent(isChecked: boolean, checkbox: HTMLInputElement): void {
    const urlOrigem = window.location.href;
    const termo = this.termoAdesao();
    const hash = termo?.hash;
    const versao = termo?.versao;

    this.brideAuthService.registerLgpdConsent(isChecked, urlOrigem, hash, versao)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isLgpdSaving.set(false);
          this.lgpdConsentido.set(isChecked);
          this.trackingService.trackHubAction('lgpd_consent_change', { consent: isChecked });
          this.successMessage.set('Preferência atualizada com sucesso! (Protocolo: ' + response.protocoloAceite + ')');
          
          setTimeout(() => {
            this.successMessage.set('');
          }, 5000);
        },
        error: (err) => {
          this.isLgpdSaving.set(false);
          checkbox.checked = !isChecked; // revert on error
          const errorMsg = err?.error?.message || 'Erro ao atualizar preferência. Tente novamente.';
          this.errorMessage.set(errorMsg);
        }
      });
  }

  openTermosPopup(): void {
    this.isTermoModalOpen.set(true);
    this.loadTermos();
  }

  loadTermos(): void {
    if (this.termoAdesao()) return;
    this.termoLoading.set(true);
    this.termoError.set(null);
    this.brideAuthService.getTermoAdesao()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (termo) => {
          this.termoAdesao.set(termo);
          this.termoLoading.set(false);
        },
        error: (err) => {
          this.termoError.set('Erro ao carregar os termos. Tente novamente.');
          this.termoLoading.set(false);
        }
      });
  }
}
