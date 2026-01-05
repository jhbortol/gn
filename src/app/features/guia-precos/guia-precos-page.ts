import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/api.service';
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
  minDate: string;

  submitted = signal(false);
  loading = signal(false);
  error = signal('');
  downloadUrl = signal('');

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    // Initialize form
    this.leadForm = this.fb.group({
      nome: ['', [Validators.required]],
      whatsapp: ['', [Validators.required, Validators.minLength(10)]],
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

    // Validar WhatsApp (apenas números, 10-11 dígitos)
    const whatsappClean = formData.whatsapp.replace(/\D/g, '');
    if (whatsappClean.length < 10 || whatsappClean.length > 11) {
      this.error.set('WhatsApp inválido. Digite apenas números com DDD.');
      return;
    }

    // Validar e converter data brasileira (DD/MM/AAAA) para ISO (YYYY-MM-DD)
    const dateMatch = formData.dataCasamento.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!dateMatch) {
      this.error.set('Data inválida. Use o formato DD/MM/AAAA.');
      return;
    }
    const [, day, month, year] = dateMatch;
    const isoDate = `${year}-${month}-${day}`;

    this.loading.set(true);
    this.error.set('');

    // Enviar para a API
    this.api.post('/newsletter/subscribe', {
      email: formData.email,
      nome: formData.nome,
      whatsapp: formData.whatsapp,
      dataCasamento: isoDate
    }).subscribe({
      next: (response: any) => {
        this.submitted.set(true);
        this.loading.set(false);
        // Forçar uso do endpoint proxy no backend (evita CSP e não expõe o blob)
        this.downloadUrl.set('/files/download/guia-precos');
        
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

  formatWhatsApp(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    
    // Formato: (99) 99999-9999
    if (value.length >= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length >= 7) {
      value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length >= 3) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    this.leadForm.patchValue({ whatsapp: value });
  }

  formatDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.substring(0, 8);
    
    // Formato: DD/MM/AAAA
    if (value.length >= 5) {
      value = value.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, '$1/$2/$3');
    } else if (value.length >= 3) {
      value = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    }
    
    this.leadForm.patchValue({ dataCasamento: value });
  }

  downloadPDF(): void {
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
