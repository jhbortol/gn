import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-guia-precos-cta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './guia-precos-cta.html',
  styleUrls: ['./guia-precos-cta.css']
})
export class GuiaPrecosCTAComponent implements OnInit {
  form!: FormGroup;
  submitting = signal(false);
  submitted = signal(false);
  downloadUrl = signal<string>('');
  
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      datasCasamento: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.error('Por favor, preencha todos os campos corretamente');
      return;
    }

    this.submitting.set(true);
    const data = this.form.value;

    this.api.post('/leads/guia-precos', {
      nome: data.nome,
      whatsapp: data.whatsapp,
      dataCasamento: data.datasCasamento
    }).subscribe({
      next: (response: any) => {
        this.submitted.set(true);
        this.downloadUrl.set(response.downloadUrl || '/assets/guia-precos-piracicaba-2026.pdf');
        this.toastService.success('Pronto! Seu PDF está pronto para download');
        this.submitting.set(false);
      },
      error: (err) => {
        console.error('Erro ao enviar formulário:', err);
        this.toastService.error('Erro ao processar sua solicitação. Tente novamente.');
        this.submitting.set(false);
      }
    });
  }

  downloadPDF(): void {
    if (this.downloadUrl()) {
      window.open(this.downloadUrl(), '_blank');
    }
  }

  reset(): void {
    this.submitted.set(false);
    this.form.reset();
    this.downloadUrl.set('');
  }
}
