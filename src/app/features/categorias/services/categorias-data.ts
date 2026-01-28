import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { resolveImageUrl } from '../../../core/image-url.helper';

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  descricao: string | null;
  imageId: string | null;
  imageUrl: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriasData {
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
    return this.http.get<any>(`${environment.API_BASE_URL}/categorias`).pipe(
      map(response => {
        // backend may return array directly or { data: [...] }
        const rawList = Array.isArray(response) ? response : (response?.data || []);

        return (rawList || []).map((src: any) => {
          const id = src.id || src.Id;
          const nome = src.nome || src.Nome || '';
          // slugs may come with spaces or uppercase; normalize to lowercase hyphenated
          const rawSlug = src.slug || src.Slug || id || nome;
          const slug = String(rawSlug)
            .toString()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
          const descricao = src.descricao ?? src.Descricao ?? null;
          const imageId = src.imageId || src.ImageId || null;
          const imageUrl = src.imageUrl || src.ImageUrl || null;

          return {
            id,
            nome,
            slug,
            descricao,
            imageId,
            imageUrl: imageUrl ? resolveImageUrl(imageUrl) : null
          } as Categoria;
        });
      }),
      catchError(() => of(this.fallback))
    );
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

  constructor(private http: HttpClient) {}
}
