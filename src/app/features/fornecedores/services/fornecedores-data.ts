import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
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
  id: string; url: string; filename?: string; contentType?: string; isPrimary?: boolean; orderIndex?: number;
}

export interface FornecedorDetailDto {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  cidade?: string;
  endereco?: string;
  horarioFuncionamento?: string;
  telefone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
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
  endereco?: string;
  horarioFuncionamento?: string;
  telefone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  destaque?: boolean;
  seloFornecedor?: boolean;
  ativo?: boolean;
  rating?: number | null;
  visitas?: number;
  categoria?: string; // apenas o nome para compatibilidade prévia
  imagens: Array<{ url: string; orderIndex: number }>; // URLs com ordem
  depoimentos?: Array<{ texto: string; casal: string }>; // adaptado de testemunhos
}

@Injectable({ providedIn: 'root' })
export class FornecedoresData {
    search(term: string, page = 1, pageSize = 12, destaque?: boolean): Observable<FornecedorListDto[]> {
      const trimmed = (term || '').trim();
      const params: any = { page, pageSize };

      // Enviar q/nome/descricao para permitir busca por nome e descrição (compatibilidade com backend)
      if (trimmed.length) {
        params.q = trimmed;
        params.nome = trimmed;
        params.descricao = trimmed;
      }

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
        // Se não houver destaques, retornar lista vazia (não mostrar nada)
        if (list.length === 0) {
          console.warn('[DESTAQUES] nenhum fornecedor com destaque=true encontrado');
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
        endereco: detail.endereco,
        horarioFuncionamento: detail.horarioFuncionamento,
        telefone: detail.telefone,
        email: detail.email,
        website: detail.website,
        instagram: detail.instagram,
        facebook: detail.facebook,
        destaque: detail.destaque,
        seloFornecedor: detail.seloFornecedor,
        ativo: detail.ativo,
        rating: detail.rating,
        visitas: detail.visitas,
        categoria: detail.categoria?.nome,
        imagens: (detail.imagens || [])
          .filter((m: MediaDto) => m.url) // Filtrar imagens sem URL
          .map((m: MediaDto) => ({ url: m.url, orderIndex: m.orderIndex || 0 }))
          .sort((a, b) => a.orderIndex - b.orderIndex),
        depoimentos: detail.testemunhos?.map((t: any) => ({ texto: t.descricao, casal: t.nome })) || []
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

