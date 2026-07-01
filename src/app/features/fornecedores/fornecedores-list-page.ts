import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FornecedoresData, FornecedorListDto } from './services/fornecedores-data';
import { CidadeService } from '../../core/cidade.service';
import { MetaTagService } from '../../core/meta-tag.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { MeuCasamentoStoreService } from '../meu-casamento/services/meu-casamento-store.service';
import { MeuCasamentoSyncService } from '../meu-casamento/services/meu-casamento-sync.service';

@Component({
  selector: 'app-fornecedores-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <section class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
          Fornecedores para Casamento em {{ nomeCidade }}
        </h1>
        <p class="text-gray-600 text-lg">
          Conheça fornecedores verificados e encontre o parceiro ideal para cada etapa do seu casamento.
        </p>
      </div>

      <div *ngIf="fornecedores$ | async as fornecedores; else loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <article *ngFor="let fornecedor of fornecedores"
          class="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden">
          <div class="relative h-44 overflow-hidden">
            <img
              [ngSrc]="resolveImage(fornecedor.primaryImage?.url || fornecedor.imagens?.[0]?.url)"
              [alt]="fornecedor.nome"
              width="480"
              height="320"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            />
            <button
              type="button"
              (click)="toggleFavorite($event, fornecedor)"
              class="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center border border-gray-100"
              [attr.aria-label]="isFavorite(fornecedor.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                [class.text-rose-500]="isFavorite(fornecedor.id)"
                [class.text-gray-400]="!isFavorite(fornecedor.id)"
                [attr.fill]="isFavorite(fornecedor.id) ? 'currentColor' : 'none'"
                class="w-4 h-4 transition-colors duration-300"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <div class="p-5">
             <p class="text-xs uppercase tracking-wide text-rose-600 font-semibold mb-2">{{ fornecedor.categoria?.nome || 'Fornecedor' }}</p>
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
            Fornecedores para Casamento em {{ nomeCidade }}
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
  nomeCidade = '';

  private cidadeService = inject(CidadeService);
  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);
  private weddingStore = inject(MeuCasamentoStoreService);
  private weddingSync = inject(MeuCasamentoSyncService);

  constructor(private fornecedoresData: FornecedoresData) {
    const cidade = this.cidadeService.getCidade();
    this.nomeCidade = cidade.charAt(0).toUpperCase() + cidade.slice(1);
    this.fornecedores$ = this.fornecedoresData.getAll(1, 24, cidade);
  }

  async ngOnInit(): Promise<void> {
    await this.weddingSync.init();
    const cidade = this.cidadeService.getCidade();
    const nomeFormatado = cidade.charAt(0).toUpperCase() + cidade.slice(1);
    const route = this.router.url.split('?')[0];
    this.title.setTitle(`Fornecedores de Casamento em ${nomeFormatado} | Guia Noivas`);
    this.metaTagService.applyMetadata(route, {
      title: `Fornecedores de Casamento em ${nomeFormatado} | Guia Noivas`,
      description: `Explore fornecedores de casamento em ${nomeFormatado} e encontre opções por categoria para cada etapa do seu evento.`
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

  isFavorite(fornecedorId: string): boolean {
    return this.weddingStore.favorites().some(item => item.fornecedorId === fornecedorId);
  }

  async toggleFavorite(event: Event, fornecedor: FornecedorListDto): Promise<void> {
    event.stopPropagation();
    event.preventDefault();

    if (this.isFavorite(fornecedor.id)) {
      this.weddingStore.removeFavorite(fornecedor.id);
    } else {
      this.weddingStore.saveFavorite({
        fornecedorId: fornecedor.id,
        fornecedorNome: fornecedor.nome,
        fornecedorSlug: fornecedor.slug,
        imagemUrl: fornecedor.primaryImage?.url || null,
        categoriaNome: fornecedor.categoria?.nome || null,
        nota: null
      });
    }

    await this.weddingSync.syncPendingChanges();
  }
}
