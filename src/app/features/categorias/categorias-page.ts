import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategoriasData, Categoria, VitrineSupplier } from './services/categorias-data';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, map, of, shareReplay, switchMap } from 'rxjs';
import { CidadeService } from '../../core/cidade.service';
import { MetaTagService } from '../../core/meta-tag.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { IconComponent } from '../../shared/icon/icon';
import { FornecedoresData, FornecedorListDto } from '../fornecedores/services/fornecedores-data';
import { TrackingService } from '../../core/tracking.service';

@Component({
  selector: 'app-categorias-page',
  standalone: true,
  templateUrl: './categorias-page.html',
  styleUrls: ['./categorias-page.css'],
   imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriasPageComponent implements OnInit {
  categorias$: Observable<Categoria[]>;
  categoriasBusca$: Observable<Categoria[]>;
  fornecedoresBusca$: Observable<FornecedorListDto[]>;
  buscaTerm$ = new BehaviorSubject<string>('');
  buscaTerm = '';
  showSearchResults = false;

  private cidadeService = inject(CidadeService);
  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);

  constructor(
    private categoriasData: CategoriasData,
    private fornecedoresData: FornecedoresData,
    private tracking: TrackingService
  ) {
    // Categorias já vêm com os fornecedores vitrine incluídos do endpoint /public/categorias/vitrine
    this.categorias$ = this.categoriasData.getAll().pipe(
      map(cats => this.sortCategoriesAlphabetically(cats))
    );

    this.categoriasBusca$ = combineLatest([this.categorias$, this.buscaTerm$]).pipe(
      map(([cats, term]) => {
        const wanted = term.trim().toLowerCase();
        if (!wanted) return [];
        return cats
          .filter(c => (c.nome || '').toLowerCase().includes(wanted))
          .slice(0, 6);
      }),
      shareReplay(1)
    );

    this.fornecedoresBusca$ = this.buscaTerm$.pipe(
      debounceTime(250),
      map(term => term.trim()),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term) return of([] as FornecedorListDto[]);
        return this.fornecedoresData.search(term, 1, 6).pipe(
          map(results => {
            this.tracking.trackSearch(term, results.length);
            return results;
          })
        );
      }),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    const route = this.router.url.split('?')[0];
    this.title.setTitle('Categorias de Fornecedores para Casamento em Piracicaba | Guia Noivas');
    this.metaTagService.applyMetadata(route, {
      title: 'Categorias de Fornecedores para Casamento em Piracicaba | Guia Noivas',
      description: 'Explore todas as categorias de fornecedores para casamentos em Piracicaba: buffet, fotografia, decoração, vestidos e muito mais. Encontre o profissional ideal no Guia Noivas.'
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

  resolveImage(url?: string | null, fallback: string = 'assets/categorias/placeholder.jpg'): string {
    if (!url) return fallback;
    if (url.startsWith('http') || url.startsWith('assets/')) return url;
    const base = environment.API_BASE_URL;
    const path = url.startsWith('/') ? url : `/${url}`;
    if (base.includes('/api/v1') && path.includes('/api/v1')) {
      return base.replace(/\/api\/v1$/, '') + path;
    }
    return base + path;
  }

  buscar(): void {
    const term = this.buscaTerm.trim();
    this.buscaTerm$.next(term);
    this.showSearchResults = term.length > 0;
  }

  clearBusca(): void {
    this.buscaTerm = '';
    this.buscaTerm$.next('');
    this.showSearchResults = false;
  }

  getSupplierCountFromVitrine(vitrineSuppliers?: VitrineSupplier[]): number {
    return vitrineSuppliers?.length ?? 0;
  }

  private sortCategoriesAlphabetically(categories: Categoria[]): Categoria[] {
    return [...categories].sort((a, b) =>
      (a.nome || '').localeCompare((b.nome || ''), 'pt-BR', { sensitivity: 'base' })
    );
  }
}
