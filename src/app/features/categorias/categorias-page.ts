import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriasData, Categoria } from './services/categorias-data';
import { Observable, forkJoin, map, switchMap, merge, scan, startWith, shareReplay, of } from 'rxjs';
import { FornecedoresData, FornecedorListDto } from '../fornecedores/services/fornecedores-data';
import { CidadeService } from '../../core/cidade.service';
import { environment } from '../../../environments/environment';

export interface CategoriaComDestaques {
  categoria: Categoria;
  fornecedores: FornecedorListDto[];
}

@Component({
  selector: 'app-categorias-page',
  standalone: true,
  templateUrl: './categorias-page.html',
  styleUrls: ['./categorias-page.css'],
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriasPageComponent {
  categoriasComFornecedores$!: Observable<CategoriaComDestaques[]>;

  private cidadeService = inject(CidadeService);

  constructor(
    private categoriasData: CategoriasData,
    private fornecedoresData: FornecedoresData
  ) {
    this.categoriasComFornecedores$ = this.categoriasData.getAll().pipe(
      map(cats => this.shuffleArray(cats)),
      switchMap(cats => {
        // Prepare initial list with empty highlights
        const initialItems: CategoriaComDestaques[] = cats.map(cat => ({
          categoria: cat,
          fornecedores: []
        }));

        // Create individual streams for each category's highlights
        const updateStreams = cats.map(cat =>
          (cat.id
            ? this.fornecedoresData.getDestaquesByCategoriaId(cat.id)
            : this.fornecedoresData.getDestaquesByCategoria(cat.slug)
          ).pipe(
            map(destaques => ({
              catId: cat.id,
              catSlug: cat.slug,
              destaques: this.shuffleArray(destaques).slice(0, 6)
            }))
          )
        );

        // Merge updates into the list progressively
        return merge(...updateStreams).pipe(
          scan((acc: CategoriaComDestaques[], update) => {
            return acc.map(item =>
              (item.categoria.id === update.catId || item.categoria.slug === update.catSlug)
                ? { ...item, fornecedores: update.destaques }
                : item
            );
          }, initialItems),
          startWith(initialItems),
          shareReplay(1)
        );
      })
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

  private shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
