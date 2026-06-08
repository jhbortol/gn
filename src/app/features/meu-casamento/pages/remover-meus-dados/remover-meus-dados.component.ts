import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';

@Component({
  selector: 'app-remover-meus-dados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './remover-meus-dados.component.html',
  styleUrl: './remover-meus-dados.component.css'
})
export class RemoverMeusDadosComponent {
  private readonly sync = inject(MeuCasamentoSyncService);

  confirmed = false;
  loading = false;
  message = '';
  error = '';

  async deleteAll(): Promise<void> {
    this.message = '';
    this.error = '';
    if (!this.confirmed) {
      this.error = 'Confirme que entende a irreversibilidade da exclusão.';
      return;
    }

    this.loading = true;
    try {
      const result = await this.sync.requestDeleteAllData();
      this.message = result.queued
        ? 'Seus dados locais foram limpos e a exclusão remota será reenviada automaticamente quando houver conexão.'
        : 'Seus dados foram removidos localmente e no servidor.';
    } catch {
      this.error = 'Não foi possível concluir a exclusão total.';
    } finally {
      this.loading = false;
    }
  }
}
