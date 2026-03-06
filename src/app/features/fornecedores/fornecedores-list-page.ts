import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FornecedoresData, FornecedorListDto } from './services/fornecedores-data';
import { CidadeService } from '../../core/cidade.service';
import { MetaTagService } from '../../core/meta-tag.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fornecedores-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <section class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
          Fornecedores para Casamento em Piracicaba
        </h1>
        <p class="text-gray-600 text-lg">
          Conheça fornecedores verificados e encontre o parceiro ideal para cada etapa do seu casamento.
        </p>
      </div>

      <div *ngIf="fornecedores$ | async as fornecedores; else loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <article *ngFor="let fornecedor of fornecedores"
          class="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden">
          <img
            [ngSrc]="resolveImage(fornecedor.primaryImage?.url || fornecedor.imagens?.[0]?.url)"
            [alt]="fornecedor.nome"
            width="480"
            height="320"
            loading="lazy"
            decoding="async"
            class="w-full h-44 object-cover"
          />
          <div class="p-5">
            <p class="text-xs uppercase tracking-wide text-rose-600 font-semibold mb-2">{{ fornecedor.categoria || 'Fornecedor' }}</p>
            <h2 class="font-serif font-bold text-xl text-gray-900 mb-2">{{ fornecedor.nome }}</h2>
            <p class="text-sm text-gray-600 line-clamp-3 mb-4">{{ fornecedor.descricao || 'Veja detalhes, contato e fotos do fornecedor.' }}</p>
            <a
              [routerLink]="buildUrl(['fornecedores', fornecedor.slug || fornecedor.id])"
              class="inline-block px-4 py-2 rounded-lg border border-rose-400 text-rose-600 hover:bg-rose-50 font-semibold transition-colors"
            >
              Ver perfil
            </a>
          </div>
        </article>
      </div>
    </section>

    <ng-template #loading>
      <section class="container mx-auto px-4 py-12">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
            Fornecedores para Casamento em Piracicaba
          </h1>
          <p class="text-gray-600 text-lg">Carregando fornecedores...</p>
        </div>
      </section>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FornecedoresListPageComponent implements OnInit {
  fornecedores$: Observable<FornecedorListDto[]>;

  private cidadeService = inject(CidadeService);
  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);

  constructor(private fornecedoresData: FornecedoresData) {
    this.fornecedores$ = this.fornecedoresData.getAll(1, 24);
  }

  ngOnInit(): void {
    const route = this.router.url.split('?')[0];
    this.title.setTitle('Fornecedores de Casamento em Piracicaba | Guia Noivas');
    this.metaTagService.applyMetadata(route, {
      title: 'Fornecedores de Casamento em Piracicaba | Guia Noivas',
      description: 'Explore fornecedores de casamento em Piracicaba e encontre opções por categoria para cada etapa do seu evento.'
    });
  }

  buildUrl(path: string | string[]): string {
    if (Array.isArray(path)) {
      const [base, ...rest] = path;
      const fullPath = rest.length ? `${base}/${rest.join('/')}` : base;
      return this.cidadeService.buildUrl(fullPath);
    }
    return this.cidadeService.buildUrl(path);
  }

  resolveImage(url?: string | null, fallback: string = 'assets/fornecedores/placeholder.jpg'): string {
    if (!url) return fallback;
    if (url.startsWith('http') || url.startsWith('assets/')) return url;
    const base = environment.API_BASE_URL;
    const path = url.startsWith('/') ? url : `/${url}`;
    if (base.includes('/api/v1') && path.includes('/api/v1')) {
      return base.replace(/\/api\/v1$/, '') + path;
    }
    return base + path;
  }
}
