import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { GuestItem } from '../../meu-casamento.models';

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

  search = '';
  groupFilter = '';
  statusFilter = '';
  editingId: string | null = null;
  draft: GuestDraft = this.createEmptyDraft();

  readonly guests = computed(() => this.store.guests()
    .filter(guest => !this.search || guest.name.toLowerCase().includes(this.search.toLowerCase()))
    .filter(guest => !this.groupFilter || guest.group === this.groupFilter)
    .filter(guest => !this.statusFilter || guest.status === this.statusFilter));

  readonly stats = computed(() => {
    const guests = this.store.guests();
    const invited = guests.reduce((sum, guest) => sum + 1 + guest.plusOnes, 0);
    const confirmed = guests.filter(guest => guest.status === 'confirmed').reduce((sum, guest) => sum + 1 + guest.plusOnes, 0);
    const declined = guests.filter(guest => guest.status === 'declined').reduce((sum, guest) => sum + 1 + guest.plusOnes, 0);
    return { invited, confirmed, declined };
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
  }

  async saveGuest(): Promise<void> {
    if (!this.draft.name.trim()) return;

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
