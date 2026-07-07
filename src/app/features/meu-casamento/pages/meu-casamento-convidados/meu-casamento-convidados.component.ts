import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { GuestItem } from '../../meu-casamento.models';
import { BrideAuthService } from '../../../../core/services/bride-auth.service';
import { BrideLoginModalService } from '../../../../core/services/bride-login-modal.service';


type GuestDraft = Pick<GuestItem, 'id' | 'name' | 'group' | 'status' | 'plusOnes'> & {
  phone: string;
  notes: string;
};

@Component({
  selector: 'app-meu-casamento-convidados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meu-casamento-convidados.component.html',
  styleUrl: './meu-casamento-convidados.component.css'
})
export class MeuCasamentoConvidadosComponent implements OnInit {
  private readonly store = inject(MeuCasamentoStoreService);
  private readonly sync = inject(MeuCasamentoSyncService);
  private readonly auth = inject(BrideAuthService);
  private readonly loginModal = inject(BrideLoginModalService);

  search = '';
  groupFilter = '';
  statusFilter = '';
  editingId: string | null = null;
  showFormModal = false;
  draft: GuestDraft = this.createEmptyDraft();

  guests(): GuestItem[] {
    return this.store.guests()
      .filter(guest => !this.search || guest.name.toLowerCase().includes(this.search.toLowerCase()))
      .filter(guest => !this.groupFilter || guest.group === this.groupFilter)
      .filter(guest => !this.statusFilter || guest.status === this.statusFilter);
  }

  readonly stats = computed(() => {
    const guests = this.store.guests();
    const invited = guests.reduce((sum, guest) => sum + 1 + guest.plusOnes, 0);
    const confirmed = guests.filter(guest => guest.status === 'confirmed').reduce((sum, guest) => sum + 1 + guest.plusOnes, 0);
    const declined = guests.filter(guest => guest.status === 'declined').reduce((sum, guest) => sum + 1 + guest.plusOnes, 0);
    const pending = guests.filter(guest => guest.status === 'pending').reduce((sum, guest) => sum + 1 + guest.plusOnes, 0);
    return { invited, confirmed, declined, pending };
  });

  async ngOnInit(): Promise<void> {
    await this.sync.init();
  }

  editGuest(id: string): void {
    const guest = this.store.guests().find(item => item.id === id);
    if (!guest) return;
    this.editingId = guest.id;
    this.draft = {
      id: guest.id,
      name: guest.name,
      group: guest.group,
      status: guest.status,
      plusOnes: guest.plusOnes,
      phone: guest.phone ?? '',
      notes: guest.notes ?? ''
    };
    this.showFormModal = true;
  }

  async saveGuest(): Promise<void> {
    if (!this.draft.name.trim()) return;

    if (!this.editingId && !this.auth.isLoggedIn && this.store.guests().length >= 2) {
      const loggedIn = await this.loginModal.open({
        title: 'Sua lista está ficando incrível! 💖',
        message: 'Para garantir que você não perca nenhum dado caso saia desta tela, crie sua conta gratuita em 5 segundos. É rápido e você salva tudo na nuvem!',
        showContinueWithoutLogin: true
      });
      if (!loggedIn) {
        return;
      }
    }

    const id = this.editingId ?? crypto.randomUUID();
    this.store.saveGuest({
      id,
      name: this.draft.name,
      group: this.draft.group,
      status: this.draft.status,
      plusOnes: this.draft.plusOnes,
      phone: this.draft.phone,
      notes: this.draft.notes
    });
    this.resetDraft();
    this.showFormModal = false;
    await this.sync.syncPendingChanges();
  }

  async removeGuest(id: string): Promise<void> {
    this.store.deleteGuest(id);
    await this.sync.syncPendingChanges();
  }

  resetDraft(): void {
    this.editingId = null;
    this.draft = this.createEmptyDraft();
  }

  openCreateModal(): void {
    this.resetDraft();
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.resetDraft();
  }

  resolveGroupLabel(group: GuestItem['group']): string {
    if (group === 'familia') return 'Família';
    if (group === 'trabalho') return 'Trabalho';
    if (group === 'amigos') return 'Amigos';
    return 'Outros';
  }

  resolveStatusLabel(status: GuestItem['status']): string {
    if (status === 'confirmed') return 'Confirmado';
    if (status === 'declined') return 'Recusado';
    return 'Pendente';
  }

  resolveStatusClass(status: GuestItem['status']): string {
    if (status === 'confirmed') return 'status-badge status-badge--confirmed';
    if (status === 'declined') return 'status-badge status-badge--declined';
    return 'status-badge status-badge--pending';
  }

  private createEmptyDraft(): GuestDraft {
    return {
      id: '',
      name: '',
      group: 'familia',
      status: 'pending',
      plusOnes: 0,
      phone: '',
      notes: ''
    };
  }
}
