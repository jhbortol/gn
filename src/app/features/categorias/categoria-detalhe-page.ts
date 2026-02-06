import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FornecedoresData, FornecedorListDto } from '../../features/fornecedores/services/fornecedores-data';
import { CategoriasData } from './services/categorias-data';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CidadeService } from '../../core/cidade.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-categoria-detalhe-page',
  standalone: true,
  templateUrl: './categoria-detalhe-page.html',
  styleUrls: ['./categoria-detalhe-page.css'],
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriaDetalhePageComponent {
  categoriaId$: Observable<string>;
  categoriaNome$: Observable<string>;
  /**
   * Fornecedores públicos filtrados e ordenados pela API.
   * A API já retorna na ordem correta: Vitrine (randomizado) → Free → Low
   * Zombie (planLevel: -2) é filtrado localmente para garantia extra.
   */
  publicFornecedores$: Observable<FornecedorListDto[]>;
  destaquesCategoria$: Observable<FornecedorListDto[]>;

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

    // Buscar fornecedores da categoria e filtrar apenas públicos (planLevel >= 0)
    // NÃO reordenar - a API já retorna na ordem correta por tier
    this.publicFornecedores$ = this.categoriaId$.pipe(
      switchMap((id: string) => this.fornecedores.getByCategoria(id)),
      map(list => (list || []).filter(f => f.planLevel !== undefined && f.planLevel >= 0))
    );

    this.categoriaNome$ = this.categoriaId$.pipe(
      switchMap((slug: string) => this.categorias.getBySlug(slug)),
      map(categoria => categoria?.nome || '')
    );

    this.destaquesCategoria$ = this.publicFornecedores$.pipe(
      map(list => list.filter(f => f.destaque))
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

  getSpecialties(fornecedor: FornecedorListDto): string[] {
    // Mock - ajustar quando backend fornecer tags/especialidades
    const specialties = ['DOCUMENTAL', 'ARTÍSTICO', 'DRONE'];
    return specialties.slice(0, 3);
  }
}
