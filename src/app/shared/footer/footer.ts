import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CidadeService } from '../../core/cidade.service';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  imports: [RouterModule, CommonModule, FormsModule]
})
export class FooterComponent {
  private cidadeService = inject(CidadeService);
  private api = inject(ApiService);

  email = '';
  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  buildUrl(path: string | string[]): string | string[] {
    if (Array.isArray(path)) {
      // Para rotas com parâmetros como ['/categorias', 'fotografia']
      const basePath = path[0];
      const params = path.slice(1);
      const fullPath = params.length > 0 ? `${basePath}/${params.join('/')}` : basePath;
      return this.cidadeService.buildUrl(fullPath.replace(/^\//, ''));
    }
    return this.cidadeService.buildUrl(path.toString().replace(/^\//, ''));
  }

  subscribe() {
    const trimmed = this.email.trim();
    if (!trimmed) return;

    this.isSubmitting.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    // Endpoint esperado: POST /newsletter/subscribe { email }
    this.api.post('/newsletter/subscribe', { email: trimmed }).subscribe({
      next: () => {
        this.successMessage.set('Pronto! Você receberá novidades em breve.');
        this.email = '';
        this.isSubmitting.set(false);
      },
      error: () => {
        this.errorMessage.set('Não foi possível assinar agora. Tente novamente mais tarde.');
        this.isSubmitting.set(false);
      }
    });
  }
}
