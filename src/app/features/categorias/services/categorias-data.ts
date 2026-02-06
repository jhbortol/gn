import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { resolveImageUrl } from '../../../core/image-url.helper';

export interface VitrineSupplier {
  id: string;
  nome: string;
  slug: string;
  cidade?: string;
  rating?: number;
  primaryImageUrl?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  descricao: string | null;
  imageId: string | null;
  imageUrl: string | null;
  icon?: string;
  thumbnailUrl?: string;
  totalSuppliers?: number;
  vitrineSuppliers?: VitrineSupplier[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoriasData {
  private cache$?: Observable<Categoria[]>;
  // Fallback local (estrutura antiga - remover após backend estável)
  private fallback: Categoria[] = [
    {
      id: 'fotografia',
      nome: 'Fotografia',
      slug: 'fotografia',
      descricao: 'Profissionais para registrar seu grande dia.',
      imageId: null,
      imageUrl: 'assets/categorias/fotografia.jpg'
    },
    {
      id: 'buffet',
      nome: 'Buffet',
      slug: 'buffet',
      descricao: 'Buffets e serviços de alimentação para eventos.',
      imageId: null,
      imageUrl: 'assets/categorias/buffet.jpg'
    },
    {
      id: 'decoracao',
      nome: 'Decoração',
      slug: 'decoracao',
      descricao: 'Decoração e ambientação para casamentos.',
      imageId: null,
      imageUrl: 'assets/categorias/decoracao.jpg'
    },
    {
      id: 'musica',
      nome: 'Música',
      slug: 'musica',
      descricao: 'Bandas, DJs e músicos para cerimônia e festa.',
      imageId: null,
      imageUrl: 'assets/categorias/musica.jpg'
    },
    {
      id: 'espacos',
      nome: 'Espaços',
      slug: 'espacos',
      descricao: 'Locais para realização de eventos.',
      imageId: null,
      imageUrl: 'assets/categorias/espacos.jpg'
    },
    {
      id: 'vestidos',
      nome: 'Vestido de Noiva',
      slug: 'vestidos',
      descricao: 'Estilistas e lojas especializadas.',
      imageId: null,
      imageUrl: 'assets/categorias/vestidos.jpg'
    }
  ];

  getAll(): Observable<Categoria[]> {
    if (this.cache$) return this.cache$;

    this.cache$ = this.http.get<any>(`${environment.API_BASE_URL}/public/categorias/vitrine`).pipe(
      map(response => {
        // backend may return array directly or { data: [...] }
        const rawList = Array.isArray(response) ? response : (response?.data || []);

        return (rawList || []).map((src: any) => {
          const id = src.id || src.Id;
          const nome = src.nome || src.Nome || '';

          // slugs may come with spaces or uppercase; normalize to lowercase hyphenated
          const slugSource = src.slug || src.Slug || id || nome;
          const slug = String(slugSource)
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();

          const descricao = src.descricao ?? src.Descricao ?? null;
          const imageId = src.imageId || src.ImageId || null;
          const imageUrl = src.imageUrl || src.ImageUrl || null;
          const thumbnailUrl = src.thumbnailUrl || src.ThumbnailUrl || null;
          const icon = src.icon || src.Icon || null;
          const totalSuppliers = src.totalSuppliers ?? src.TotalSuppliers ?? null;
          
          // Map vitrineSuppliers
          const vitrineSuppliers = (src.vitrineSuppliers || src.VitrineSuppliers || []).map((s: any) => ({
            id: s.id || s.Id,
            nome: s.nome || s.Nome || '',
            slug: s.slug || s.Slug || '',
            cidade: s.cidade || s.Cidade || null,
            rating: s.rating ?? s.Rating ?? null,
            primaryImageUrl: s.primaryImageUrl || s.PrimaryImageUrl ? resolveImageUrl(s.primaryImageUrl || s.PrimaryImageUrl) : null
          }));

          return {
            id,
            nome,
            slug,
            descricao,
            imageId,
            imageUrl: thumbnailUrl ? resolveImageUrl(thumbnailUrl) : (imageUrl ? resolveImageUrl(imageUrl) : null),
            icon,
            thumbnailUrl: thumbnailUrl ? resolveImageUrl(thumbnailUrl) : null,
            totalSuppliers,
            vitrineSuppliers
          } as Categoria;
        });
      }),
      catchError(() => of(this.fallback)),
      shareReplay(1) // Keep the result for subsequent calls
    );

    return this.cache$;
  }

  /**
   * Clears the internal cache, forcing the next getAll() to fetch from network.
   */
  clearCache(): void {
    this.cache$ = undefined;
  }

  getBySlug(slug: string): Observable<Categoria | undefined> {
    const wanted = String(slug)
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();

    return this.getAll().pipe(
      map(categorias => categorias.find(c => c.slug === wanted || c.id === slug))
    );
  }

  constructor(private http: HttpClient) { }
}
