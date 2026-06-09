import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MeuCasamentoApiService } from '../../services/meu-casamento-api.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';
import { MeuCasamentoBottomNavComponent } from '../../components/meu-casamento-bottom-nav/meu-casamento-bottom-nav.component';

@Component({
  selector: 'app-restaurar-casamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MeuCasamentoBottomNavComponent],
  templateUrl: './restaurar-casamento.component.html',
  styleUrl: './restaurar-casamento.component.css'
})
export class RestaurarCasamentoComponent {
  private readonly api = inject(MeuCasamentoApiService);
  private readonly sync = inject(MeuCasamentoSyncService);

  backupCode = '';
  loading = false;
  message = '';
  error = '';

  async restore(): Promise<void> {
    this.error = '';
    this.message = '';

    if (!this.isValidUuidV4(this.backupCode)) {
      this.error = 'Informe um código de backup UUID v4 válido.';
      return;
    }

    this.loading = true;
    try {
      const exists = await firstValueFrom(this.api.checkBackupCode(this.backupCode));
      if (!exists.exists || !exists.hasData) {
        this.error = 'Nenhum dado encontrado para esse código de backup.';
        return;
      }

      await this.sync.restoreByDeviceId(this.backupCode);
      this.message = 'Dados restaurados com sucesso. O estado local foi sobrescrito.';
    } catch {
      this.error = 'Não foi possível restaurar agora. Tente novamente em instantes.';
    } finally {
      this.loading = false;
    }
  }

  private isValidUuidV4(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.trim());
  }
}
