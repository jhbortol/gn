import { Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MetaTagService } from '../../core/meta-tag.service';
import { CidadeService } from '../../core/cidade.service';
import { Title } from '@angular/platform-browser';
import { BrideAuthService } from '../../core/services/bride-auth.service';

@Component({
  selector: 'app-termos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './termos.html',
  styleUrls: ['./termos.css']
})
export class TermosPageComponent implements OnInit {
  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);
  private cidadeService = inject(CidadeService);
  private brideAuthService = inject(BrideAuthService);
  private destroyRef = inject(DestroyRef);

  termoContent = signal<string | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  get cidadeNome(): string {
    const c = this.cidadeService.getCidade();
    return c.charAt(0).toUpperCase() + c.slice(1);
  }

  ngOnInit(): void {
    const route = this.router.url.split('?')[0];
    const cidade = this.cidadeService.getCidade();
    const nomeFormatado = cidade.charAt(0).toUpperCase() + cidade.slice(1);
    this.title.setTitle(`Termos de Uso e Política de Privacidade e Dados | Guia Noivas ${nomeFormatado}`);
    this.metaTagService.applyMetadata(route, {
      title: `Termos de Uso e Política de Privacidade e Dados | Guia Noivas ${nomeFormatado}`,
      description: `Termos de uso e política de privacidade e dados do Guia Noivas ${nomeFormatado}. Saiba como nossa plataforma funciona e quais são seus direitos e deveres.`
    });

    this.brideAuthService.getTermoAdesao()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (termo) => {
          this.termoContent.set(termo.texto);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load terms:', err);
          this.error.set('Não foi possível carregar os termos de uso. Por favor, tente novamente mais tarde.');
          this.isLoading.set(false);
        }
      });
  }
}
