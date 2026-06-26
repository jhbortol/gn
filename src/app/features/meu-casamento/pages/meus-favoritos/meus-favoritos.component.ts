import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CidadeService } from '../../../../core/cidade.service';
import { MeuCasamentoStoreService } from '../../services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';


@Component({
  selector: 'app-meus-favoritos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meus-favoritos.component.html',
  styleUrl: './meus-favoritos.component.css'
})
export class MeusFavoritosComponent implements OnInit {
  private readonly store = inject(MeuCasamentoStoreService);
  private readonly sync = inject(MeuCasamentoSyncService);
  private readonly cidadeService = inject(CidadeService);

  notesDraft: Record<string, string> = {};
  readonly favorites = computed(() => {
    return [...this.store.favorites()].sort((a, b) => 
      (a.fornecedorNome || '').localeCompare(b.fornecedorNome || '', 'pt-BR')
    );
  });

  async ngOnInit(): Promise<void> {
    await this.sync.init();
  }

  getDraft(fornecedorId: string, value: string | null): string {
    if (this.notesDraft[fornecedorId] === undefined) {
      this.notesDraft[fornecedorId] = value ?? '';
    }
    return this.notesDraft[fornecedorId];
  }

  buildFornecedorUrl(slug: string): string {
    return this.cidadeService.buildUrl(`fornecedores/${slug}`);
  }

  async saveNote(fornecedorId: string): Promise<void> {
    const current = this.store.favorites().find(item => item.fornecedorId === fornecedorId);
    if (!current) return;

    this.store.saveFavorite({
      ...current,
      nota: this.notesDraft[fornecedorId] ?? ''
    });
    await this.sync.syncPendingChanges();
  }

  async removeFavorite(fornecedorId: string): Promise<void> {
    this.store.removeFavorite(fornecedorId);
    await this.sync.syncPendingChanges();
  }
}
