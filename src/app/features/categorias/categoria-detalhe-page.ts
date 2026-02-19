import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FornecedoresData, FornecedorListDto } from '../../features/fornecedores/services/fornecedores-data';
import { CategoriasData } from './services/categorias-data';
import { Observable, switchMap, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { CidadeService } from '../../core/cidade.service';
import { MetaTagService } from '../../core/meta-tag.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-categoria-detalhe-page',
  standalone: true,
  templateUrl: './categoria-detalhe-page.html',
  styleUrls: ['./categoria-detalhe-page.css'],
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriaDetalhePageComponent implements OnInit {
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
    private categorias: CategoriasData,
    private metaTagService: MetaTagService,
    private title: Title,
    private meta: Meta
  ) {
    this.categoriaId$ = this.route.paramMap.pipe(
      map((params: any) => params.get('id') || '')
    );

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

  async ngOnInit(): Promise<void> {
    // Wait for the categoria ID to be loaded and apply meta tags
    try {
      const categoriaSlug = await firstValueFrom(
        this.route.paramMap.pipe(
          map((params: any) => params.get('id') || '')
        )
      );
      
      if (categoriaSlug) {
        // Fetch categoria data to get title, description, and image
        const categoria = await firstValueFrom(
          this.categorias.getBySlug(categoriaSlug)
        );
        
        if (categoria) {
          this.updateSeoMetaTags(categoria, categoriaSlug);
        }
      }
    } catch (error) {
      console.error('Error applying categoria meta tags:', error);
    }
  }

  /**
   * Atualiza meta tags SEO para a categoria
   */
  private updateSeoMetaTags(categoria: any, slug: string): void {
    // Título: "Categoria - Fornecedores em Piracicaba"
    const pageTitle = `${categoria.nome || 'Categoria'} - Fornecedores em Piracicaba`;
    this.title.setTitle(pageTitle);

    // Meta description: primeiros 155 caracteres da descrição
    const description = (categoria.descricao || categoria.nome || '').substring(0, 155);
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Image
    const ogImage = categoria.imageUrl || categoria.thumbnailUrl || '';
    if (ogImage) {
      this.meta.updateTag({ property: 'og:image', content: ogImage });
      this.meta.updateTag({ property: 'og:image:alt', content: `${categoria.nome} - Fornecedores em Piracicaba` });
    }
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
