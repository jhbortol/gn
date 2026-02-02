import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FornecedoresData, FornecedorListDto } from '../../features/fornecedores/services/fornecedores-data';
import { CategoriasData } from './services/categorias-data';
import { Observable, switchMap, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CidadeService } from '../../core/cidade.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-categoria-detalhe-page',
  standalone: true,
  templateUrl: './categoria-detalhe-page.html',
  styleUrls: ['./categoria-detalhe-page.css'],
  imports: [CommonModule, RouterModule, FormsModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriaDetalhePageComponent {
  categoriaId$: Observable<string>;
  categoriaNome$: Observable<string>;
  fornecedores$: Observable<FornecedorListDto[]>;
  destaquesCategoria$: Observable<FornecedorListDto[]>;
  sortOrder$ = new BehaviorSubject<string>('relevante');
  sortedFornecedores$: Observable<FornecedorListDto[]>;

  private cidadeService = inject(CidadeService);

  constructor(
    private route: ActivatedRoute,
    private fornecedores: FornecedoresData,
    private categorias: CategoriasData
  ) {
    this.categoriaId$ = this.route.paramMap.pipe(
      map((params: any) => params.get('id') || '')
    );
    // debug: log incoming category id/slug
    this.categoriaId$.subscribe(id => console.debug('[CATEGORIA PAGE] route id param:', id));
    this.fornecedores$ = this.categoriaId$.pipe(
      switchMap((id: string) => this.fornecedores.getByCategoria(id))
    );
    this.categoriaNome$ = this.categoriaId$.pipe(
      switchMap((slug: string) => this.categorias.getBySlug(slug)),
      map(categoria => categoria?.nome || '')
    );
    this.destaquesCategoria$ = this.fornecedores$.pipe(
      map(list => (list || []).filter(f => f.destaque))
    );
    this.sortedFornecedores$ = combineLatest([this.fornecedores$, this.sortOrder$]).pipe(
      map(([list, order]) => {
        // Filtrar apenas Free (planLevel === 0) e Vitrine (planLevel === 1)
        const publicFornecedores = (list || []).filter(f => f.planLevel !== undefined && f.planLevel >= 0);
        return this.sortFornecedores(publicFornecedores, order);
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

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortOrder$.next(value);
  }

  private sortFornecedores(list: FornecedorListDto[], order: string): FornecedorListDto[] {
    const sorted = [...list];
    switch (order) {
      case 'relevante':
        return sorted.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'nome':
        return sorted.sort((a, b) => a.nome.localeCompare(b.nome));
      default:
        return sorted;
    }
  }

  getSpecialties(fornecedor: FornecedorListDto): string[] {
    // Mock - ajustar quando backend fornecer tags/especialidades
    const specialties = ['DOCUMENTAL', 'ARTÍSTICO', 'DRONE'];
    return specialties.slice(0, 3);
  }
}
