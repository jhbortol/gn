import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Observable, map, catchError, of } from 'rxjs';

// DTOs alinhados ao backend (simplificados)
export interface FornecedorListDto {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  cidade?: string;
  rating?: number | null;
  destaque?: boolean;
  seloFornecedor?: boolean;
  ativo?: boolean;
  categoria?: { id: string; nome: string; slug: string };
  primaryImage?: { id: string; url: string; filename: string; contentType: string; isPrimary: boolean };
  imagens?: MediaDto[];
}

export interface MediaDto {
  id: string; url: string; filename?: string; contentType?: string; isPrimary?: boolean;
}

export interface FornecedorDetailDto {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  cidade?: string;
  telefone?: string;
  email?: string;
  website?: string;
  destaque?: boolean;
  seloFornecedor?: boolean;
  ativo?: boolean;
  rating?: number | null;
  visitas?: number;
  imagens?: MediaDto[]; // array de objetos completos vindos da API
  categoria?: { id: string; nome: string; slug: string };
  createdAt?: string;
  updatedAt?: string | null;
  testemunhos?: Array<{ id: string; nome: string; descricao: string; createdAt: string }>;
}

// Interface consumida pelo template (normalizada)
export interface Fornecedor {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  cidade?: string;
  telefone?: string;
  email?: string;
  website?: string;
  destaque?: boolean;
  seloFornecedor?: boolean;
  ativo?: boolean;
  rating?: number | null;
  visitas?: number;
  categoria?: string; // apenas o nome para compatibilidade prévia
  imagens: string[]; // URLs derivadas de detail.imagens
  depoimentos?: Array<{ texto: string; casal: string }>; // adaptado de testemunhos
}

@Injectable({ providedIn: 'root' })
export class FornecedoresData {
    search(nome: string, page = 1, pageSize = 12, destaque?: boolean): Observable<FornecedorListDto[]> {
      const params: any = { nome, page, pageSize };
      if (destaque !== undefined) params.destaque = destaque;
      return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/search`, params).pipe(map(r => r.data));
    }
  constructor(private api: ApiService) {}

  getAll(page = 1, pageSize = 12): Observable<FornecedorListDto[]> {
    // Usar /fornecedores/ativos para exibir apenas fornecedores ativos (público)
    return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/ativos`, { page, pageSize }).pipe(map(r => r.data));
  }

  getDestaques(page = 1, pageSize = 24): Observable<FornecedorListDto[]> {
    // Destaques: ativos com flag destaque=true direto do backend
    // API retorna array direto, não wrapped em { data: [...] }
    return this.api.get<FornecedorListDto[]>(`/fornecedores/ativos`, { page, pageSize, destaque: true }).pipe(
      map(r => Array.isArray(r) ? r : []),
      catchError(err => {
        console.error('[DESTAQUES] API error:', err);
        return of([]);
      })
    );
  }

  getById(identifier: string): Observable<Fornecedor> {
    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
    const endpoint = isGuid ? `/fornecedores/${identifier}` : `/fornecedores/slug/${identifier}`;
    return this.api.get<FornecedorDetailDto>(endpoint).pipe(
      map(detail => ({
        id: detail.id,
        nome: detail.nome,
        slug: detail.slug,
        descricao: detail.descricao,
        cidade: detail.cidade,
        telefone: detail.telefone,
        email: detail.email,
        website: detail.website,
        destaque: detail.destaque,
        seloFornecedor: detail.seloFornecedor,
        ativo: detail.ativo,
        rating: detail.rating,
        visitas: detail.visitas,
        categoria: detail.categoria?.nome,
        imagens: detail.imagens?.map(m => m.url) || [],
        depoimentos: detail.testemunhos?.map(t => ({ texto: t.descricao, casal: t.nome })) || []
      })),
      catchError(err => { throw err; })
    );
  }

  getByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
    // Usar endpoint correto: /fornecedores/ativos/categoria/{categoriaSlugOrId}
    return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, { page: 1, pageSize: 100 }).pipe(
      map(r => r.data)
    );
  }

  getDestaquesByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
    // Tenta obter somente fornecedores destaque na categoria; se API não suportar param, filtra localmente
    return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, { page: 1, pageSize: 100, destaque: true }).pipe(
      map(r => (r.data || []).filter(f => f.destaque)),
      catchError(err => {
        console.warn('[DESTAQUES BY CATEGORIA] falling back filtering local:', err);
        return this.getByCategoria(categoriaSlugOrId).pipe(map(list => list.filter(f => f.destaque)));
      })
    );
  }
}

