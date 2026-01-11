import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../shared/icon/icon';
import { DestaquesSemanaComponent } from '../destaques-semana/destaques-semana';
import { RouterModule } from '@angular/router';
import { CategoriasData, Categoria } from '../../categorias/services/categorias-data';
import { FornecedoresData, FornecedorListDto } from '../../fornecedores/services/fornecedores-data';
import { TrackingService } from '../../../core/tracking.service';
import { forkJoin, map, switchMap, Observable, BehaviorSubject, of, combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import { CidadeService } from '../../../core/cidade.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
  imports: [CommonModule, FormsModule, IconComponent, DestaquesSemanaComponent, RouterModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  categorias$!: Observable<Categoria[]>;
  buscaTerm$ = new BehaviorSubject<string>('');
  fornecedoresBusca$!: Observable<FornecedorListDto[]>;
  resultPages$!: Observable<FornecedorListDto[][]>;
  currentPage$ = new BehaviorSubject<number>(0);
  currentPageItems$!: Observable<FornecedorListDto[]>;
  buscaTerm: string = '';
  showResults = true;

  private cidadeService = inject(CidadeService);

  constructor(private categoriasData: CategoriasData, private fornecedoresData: FornecedoresData, private tracking: TrackingService) {
    this.categorias$ = this.categoriasData.getAll().pipe(
      map(cats => cats.slice().sort((a, b) => (a.nome || '').localeCompare(b.nome || '')))
    );
    this.fornecedoresBusca$ = this.buscaTerm$.pipe(
      debounceTime(250),
      map(term => term.trim()),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length > 0) {
          return this.fornecedoresData.search(term).pipe(
            map(results => {
              // Track search
              this.tracking.trackSearch(term, results.length);
              return results;
            })
          );
        }
        return of([] as FornecedorListDto[]);
      })
    );

    // chunk results into pages of 3
    this.resultPages$ = this.fornecedoresBusca$.pipe(
      map(results => {
        const pages: FornecedorListDto[][] = [];
        for (let i = 0; i < results.length; i += 3) {
          pages.push(results.slice(i, i + 3));
        }
        // reset to first page when new results arrive
        this.currentPage$.next(0);
        return pages;
      })
    );

    // combine current page index with pages to produce items to display
    this.currentPageItems$ = combineLatest([this.resultPages$, this.currentPage$]).pipe(
      map(([pages, idx]) => pages.length > 0 ? pages[Math.min(Math.max(idx, 0), pages.length - 1)] : [])
    );
  }

  buildUrl(path: string | string[]): string {
    if (Array.isArray(path)) {
      const [base, ...rest] = path;
      const fullPath = rest.length ? `${base}/${rest.join('/')}` : base;
      return this.cidadeService.buildUrl(fullPath);
    }
    return this.cidadeService.buildUrl(path);
  }

  buscar() {
    this.buscaTerm$.next(this.buscaTerm);
    this.showResults = true;
  }

  prevPage(totalPages: number) {
    const idx = this.currentPage$.getValue();
    this.currentPage$.next(idx > 0 ? idx - 1 : totalPages - 1);
  }

  nextPage(totalPages: number) {
    const idx = this.currentPage$.getValue();
    this.currentPage$.next(idx + 1 < totalPages ? idx + 1 : 0);
  }

  closeResults() {
    this.showResults = false;
  }

  resolveImage(url?: string | null, fallback: string = 'assets/fornecedores/placeholder.jpg'): string {
    if (!url) return fallback;
    if (url.startsWith('http')) return url;
    if (url.startsWith('assets/')) return url;
    const base = environment.API_BASE_URL?.replace(/\/$/, '') || '';
    let path = url.startsWith('/') ? url : `/${url}`;
    // Remove duplicate /api/v1 if base already contains it
    if (base.includes('/api/v1') && path.startsWith('/api/v1/')) {
      path = path.replace('/api/v1', '');
    }
    return `${base}${path}`;
  }

  private shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
