import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/api.service';
import { CidadeService } from '../../core/cidade.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-guia-precos-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './guia-precos-page.html',
  styleUrls: ['./guia-precos-page.css']
})
export class GuiaPrecosPage {
  leadForm: FormGroup;

  submitted = signal(false);
  loading = signal(false);
  error = signal('');
  downloadUrl = signal('');

  private cidadeService = inject(CidadeService);

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize form
    this.leadForm = this.fb.group({
      nome: ['', [Validators.required]],
      dataCasamento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    // Validação básica
    if (this.leadForm.invalid) {
      this.error.set('Por favor, preencha todos os campos obrigatórios.');
      this.leadForm.markAllAsTouched();
      return;
    }

    const formData = this.leadForm.value;

    // Converter ano selecionado para data completa (DD/MM -> 01/01)
    const yearValue = formData.dataCasamento;
    let isoDate = '';
    if (!yearValue) {
      this.error.set('Escolha o ano pretendido.');
      return;
    }
    if (yearValue === 'nao_decidi') {
      isoDate = '2099-01-01';
    } else {
      isoDate = `${yearValue}-01-01`;
    }

    this.loading.set(true);
    this.error.set('');

    // Enviar para a API
    this.api.post('/newsletter/subscribe', {
      email: formData.email,
      nome: formData.nome,
      dataCasamento: isoDate
    }).subscribe({
      next: (response: any) => {
        this.submitted.set(true);
        this.loading.set(false);
        
        // Redirecionar para a página guia-custos em vez de fazer download do PDF
        const cidade = this.cidadeService.cidadeAtual();
        this.router.navigate([cidade, 'guia-custos']);
        
        // Track conversion
        if (typeof window !== 'undefined') {
          if ((window as any).fbq) {
            (window as any).fbq('track', 'Lead', {
              content_name: 'Guia de Preços 2026',
              content_category: 'Lead Magnet',
              value: 1,
              currency: 'BRL'
            });
          }
          if ((window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: 'generate_lead',
              lead_type: 'guia_precos',
              lead_value: 1
            });
          }
        }
      },
      error: (err) => {
        console.error('Erro ao enviar formulário:', err);
        this.error.set('Erro ao processar sua solicitação. Tente novamente.');
        this.loading.set(false);
      }
    });
  }

  downloadPDF(): void {
    if (typeof window === 'undefined') return; // Guard for SSR
    
    const url = this.downloadUrl();
    if (url) {
      // Construir URL completa respeitando API_BASE_URL quando for caminho relativo
      const fullUrl = url.startsWith('http')
        ? url
        : url.startsWith('/')
          ? `${environment.API_BASE_URL}${url}`
          : `${environment.API_BASE_URL}/${url}`;

      // Instagram in-app browser bloqueia downloads por blob; use navegação direta
      const ua = navigator.userAgent || '';
      const isInstagram = ua.toLowerCase().includes('instagram');
      if (isInstagram) {
        window.open(fullUrl, '_blank', 'noopener');
        return;
      }

      this.loading.set(true);
      this.http.get(fullUrl, { responseType: 'blob', observe: 'response' }).subscribe({
        next: (resp) => {
          this.loading.set(false);
          const blob = resp.body as Blob;
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'guia-precos-piracicaba-2026.pdf';
          link.click();
          window.URL.revokeObjectURL(blobUrl);
        },
        error: (err) => {
          this.loading.set(false);
          console.error('Erro ao baixar arquivo:', err);
          this.error.set('Erro ao baixar o arquivo. Tente novamente.');
        }
      });
    }
  }

  goToCategorias(): void {
    // Obtém a cidade a partir da URL atual (/:cidade/guia-precos)
    const segments = this.router.url.split('?')[0].split('/').filter(Boolean);
    const cidade = segments.length > 0 ? segments[0] : 'piracicaba';

    // Evento opcional para analytics
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'navigate_categorias',
        source: 'guia_precos_success',
        cidade
      });
    }

    this.router.navigate(['/', cidade, 'categorias']);
  }
}
