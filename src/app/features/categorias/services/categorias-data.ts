import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
    return this.http.get<{ data: Categoria[] }>(`${environment.API_BASE_URL}/categorias`).pipe(
      map(response => response.data),
      catchError(() => of(this.fallback))
    );
  }

  constructor(private http: HttpClient) {}
}
