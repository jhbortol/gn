import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
  instagram?: string;
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
  instagram?: string;
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
  instagram?: string;
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
      if (environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/search`, params).pipe(map(r => r.data));
    }
  constructor(private api: ApiService) {}

  getAll(page = 1, pageSize = 12): Observable<FornecedorListDto[]> {
    // Usar /fornecedores/ativos para exibir apenas fornecedores ativos (público)
    const params: any = { page, pageSize };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }
    return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/ativos`, params).pipe(map(r => r.data));
  }

  getDestaques(page = 1, pageSize = 24): Observable<FornecedorListDto[]> {
    // Destaques: alguns ambientes podem retornar { data: [...] } (wrapper) ou array direto
    const params: any = { page, pageSize, destaque: true };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }
    return this.api.get<any>(`/fornecedores/ativos`, params).pipe(
      map(r => {
        let list: FornecedorListDto[] = [];
        if (Array.isArray(r)) list = r as FornecedorListDto[];
        else if (r && Array.isArray(r.data)) list = r.data as FornecedorListDto[];
        else {
          console.warn('[DESTAQUES] formato inesperado da resposta:', r);
        }
        // Se a API ignorou o parâmetro destaque e retornou tudo, filtrar localmente
        if (list.length && list.some(f => f.destaque !== true)) {
          const filtered = list.filter(f => f.destaque);
          if (filtered.length) return filtered;
        }
        return list.filter(f => f.destaque); // garante só destaque
      }),
      map(list => {
        // Fallback: se vazio, tentar buscar todos e filtrar
        if (list.length === 0) {
          console.warn('[DESTAQUES] lista vazia, tentando fallback via getAll()');
        }
        return list;
      }),
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
        instagram: detail.instagram,
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
    const params: any = { page: 1, pageSize: 100 };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }
    return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe(
      map(r => r.data)
    );
  }

  getDestaquesByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
    // Tenta obter somente fornecedores destaque na categoria; se API não suportar param, filtra localmente
    const params: any = { page: 1, pageSize: 100, destaque: true };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }
    return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe(
      map(r => (r.data || []).filter(f => f.destaque)),
      catchError(err => {
        console.warn('[DESTAQUES BY CATEGORIA] falling back filtering local:', err);
        return this.getByCategoria(categoriaSlugOrId).pipe(map(list => list.filter(f => f.destaque)));
      })
    );
  }
}

