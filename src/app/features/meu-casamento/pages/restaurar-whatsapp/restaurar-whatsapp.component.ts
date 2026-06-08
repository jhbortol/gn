import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MeuCasamentoApiService } from '../../services/meu-casamento-api.service';
import { MeuCasamentoSyncService } from '../../services/meu-casamento-sync.service';

@Component({
  selector: 'app-restaurar-whatsapp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurar-whatsapp.component.html',
  styleUrl: './restaurar-whatsapp.component.css'
})
export class RestaurarWhatsappComponent {
  private readonly api = inject(MeuCasamentoApiService);
  private readonly sync = inject(MeuCasamentoSyncService);

  whatsappNumber = '';
  otp = '';
  maskedNumber = '';
  expiresInSeconds: number | null = null;
  message = '';
  error = '';
  loading = false;

  async sendOtp(): Promise<void> {
    this.error = '';
    this.message = '';
    this.loading = true;
    try {
      const response = await firstValueFrom(this.api.sendPhoneRecovery(this.whatsappNumber));
      this.maskedNumber = response.maskedNumber;
      this.expiresInSeconds = response.expiresInSeconds;
      this.message = `OTP enviado para ${response.maskedNumber}. Ele expira em ${response.expiresInSeconds / 60} minutos.`;
    } catch (error: unknown) {
      this.error = this.resolveErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  async verifyOtp(): Promise<void> {
    this.error = '';
    this.message = '';
    this.loading = true;
    try {
      const response = await this.sync.restoreByWhatsapp(this.whatsappNumber, this.otp);
      this.message = `Dados restaurados com sucesso para o backup ${response.deviceId}.`;
    } catch (error: unknown) {
      this.error = this.resolveErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  private resolveErrorMessage(error: unknown): string {
    const status = Number((error as { status?: number })?.status);
    if (status === 429) return 'Limite excedido. Aguarde antes de tentar novamente.';
    if (status === 400) return 'OTP inválido, expirado ou número em formato incorreto.';
    return 'Não foi possível concluir a recuperação por WhatsApp.';
  }
}
