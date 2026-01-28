// Removido: definição solta de getDestaquesByCategoriaId fora da classe. Método correto está dentro da classe FornecedoresData.
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CompetitorAd, PlanLevel } from '../../../core/models/tier-system.model';
import { resolveImageUrl } from '../../../core/image-url.helper';
import { CategoriasData } from '../../categorias/services/categorias-data';

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
  publicado?: boolean;
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
  publicado?: boolean;
  rating?: number | null;
  visitas?: number;
  categoria?: string; // apenas o nome para compatibilidade prévia
  imagens: Array<{ url: string; orderIndex: number }>; // URLs com ordem
  depoimentos?: Array<{ texto: string; casal: string }>; // adaptado de testemunhos

  // Novos campos tier (OPCIONAIS para backward compatibility)
  planLevel?: PlanLevel;
  whatsAppUrl?: string;
  showContactForm?: boolean;
  adInjection?: CompetitorAd[];
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

      // Novo endpoint v1/search/fornecedores
      return this.api.get<{ data: any[] }>(`/search/fornecedores`, params).pipe(
        map(r => (r.data || []).map((src: any) => ({
          id: src.id || src.Id,
          nome: src.nome || src.Nome,
          slug: src.slug || src.Slug,
          descricao: src.descricao || src.Descricao,
          cidade: src.cidade || src.Cidade,
          telefone: src.telefone || src.Telefone,
          email: src.email || src.Email,
          website: src.website || src.Website,
          whatsApp: src.whatsApp || src.WhatsApp,
          endereco: src.endereco || src.Endereco,
          horarioFuncionamento: src.horarioFuncionamento || src.HorarioFuncionamento,
          instagram: src.instagram || src.Instagram,
          facebook: src.facebook || src.Facebook,
          logoUrl: src.logoUrl || src.LogoUrl,
          rating: src.rating ?? src.Rating ?? null,
          destaque: src.destaque ?? src.Destaque ?? false,
          seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
          ativo: src.ativo ?? src.Ativo ?? false,
          publicado: src.publicado ?? src.Publicado ?? false,
          visitas: src.visitas ?? src.Visitas ?? 0,
          categoriaId: src.categoriaId || src.CategoriaId,
          categoria: src.categoria?.nome || src.Categoria?.Nome || src.categoria || src.Categoria || null,
          primaryImage: src.primaryImage || src.PrimaryImage ? {
            id: (src.primaryImage?.id || src.PrimaryImage?.Id),
            url: (src.primaryImage?.url || src.PrimaryImage?.Url),
            filename: (src.primaryImage?.filename || src.PrimaryImage?.Filename),
            contentType: (src.primaryImage?.contentType || src.PrimaryImage?.ContentType),
            isPrimary: (src.primaryImage?.isPrimary ?? src.PrimaryImage?.IsPrimary ?? true),
            orderIndex: (src.primaryImage?.orderIndex ?? src.PrimaryImage?.OrderIndex ?? 0)
          } : undefined,
          imagens: (src.imagens || src.Imagens || []).map((m: any) => ({
            id: m.id || m.Id,
            url: m.url || m.Url,
            filename: m.filename || m.Filename,
            contentType: m.contentType || m.ContentType,
            isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
            orderIndex: m.orderIndex ?? m.OrderIndex ?? 0
          }))
        }))
      ));
    }
  constructor(private api: ApiService, private categoriasData: CategoriasData) {}

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
        let list: any[] = [];
        if (Array.isArray(r)) list = r as any[];
        else if (r && Array.isArray(r.data)) list = r.data as any[];
        else {
          console.warn('[DESTAQUES] formato inesperado da resposta:', r);
        }

        // Normalizar keys PascalCase -> camelCase e garantir URLs resolvidas
        const normalized: FornecedorListDto[] = list.map((raw: any) => {
          const src = raw || {};
          const primary = src.primaryImage || src.PrimaryImage || {};
          const imagensArr = src.imagens || src.Imagens || [];
          const topImage = src.imageUrl || src.ImageUrl || undefined;

          return {
            id: src.id || src.Id,
            nome: src.nome || src.Nome,
            slug: src.slug || src.Slug,
            descricao: src.descricao || src.Descricao,
            cidade: src.cidade || src.Cidade,
            rating: src.rating ?? src.Rating,
            destaque: (src.destaque ?? src.Destaque) === true,
            seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor,
            ativo: src.ativo ?? src.Ativo,
            instagram: src.instagram || src.Instagram,
            categoria: src.categoria || src.Categoria,
            primaryImage: {
              id: primary.id || primary.Id || undefined,
              url: topImage ? resolveImageUrl(topImage) : (primary.url ? resolveImageUrl(primary.url) : (primary.Url ? resolveImageUrl(primary.Url) : undefined)),
              filename: primary.filename || primary.Filename,
              contentType: primary.contentType || primary.ContentType,
              isPrimary: true
            },
            imagens: (imagensArr || []).filter((m: any) => m && (m.url || m.Url)).map((m: any) => ({
              id: m.id || m.Id,
              url: resolveImageUrl(m.url || m.Url),
              filename: m.filename || m.Filename,
              contentType: m.contentType || m.ContentType,
              isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
              orderIndex: m.orderIndex ?? m.OrderIndex ?? 0
            })),
            descricaoCurta: src.descricaoCurta || src.DescricaoCurta
          } as FornecedorListDto;
        });

        // Se a API ignorou o parâmetro destaque e retornou tudo, filtrar localmente
        if (normalized.length && normalized.some(f => f.destaque !== true)) {
          const filtered = normalized.filter(f => f.destaque);
          if (filtered.length) return filtered;
        }
        return normalized.filter(f => f.destaque); // garante só destaque
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

  getById(identifier: string, preview = false): Observable<Fornecedor> {
    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
    const endpoint = isGuid ? `/fornecedores/${identifier}` : `/fornecedores/slug/${identifier.toLowerCase()}`;

    // If preview mode, add query param to bypass publicado filter
    const params: any = {};
    if (preview) {
      params.preview = 'true';
    }

    return this.api.get<any>(endpoint, params).pipe(
      map(detail => {
        const src = detail || {};
        return {
          id: src.id || src.Id,
          nome: src.nome || src.Nome,
          slug: src.slug || src.Slug,
          descricao: src.descricao || src.Descricao,
          publicado: src.publicado ?? src.Publicado ?? false,
          cidade: src.cidade || src.Cidade,
          endereco: src.endereco || src.Endereco,
          horarioFuncionamento: src.horarioFuncionamento || src.HorarioFuncionamento,
          telefone: src.telefone || src.Telefone,
          email: src.email || src.Email,
          website: src.website || src.Website,
          instagram: src.instagram || src.Instagram,
          facebook: src.facebook || src.Facebook,
          destaque: src.destaque ?? src.Destaque ?? false,
          seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
          ativo: src.ativo ?? src.Ativo ?? false,
          rating: src.rating ?? src.Rating ?? null,
          visitas: src.visitas ?? src.Visitas ?? 0,
          categoria: src.categoria?.nome || src.Categoria?.Nome || src.categoria || src.Categoria || null,
          imagens: (src.imagens || src.Imagens || []).filter((m: any) => (m.url || m.Url)).map((m: any) => ({
            id: m.id || m.Id,
            url: resolveImageUrl(m.url || m.Url),
            filename: m.filename || m.Filename,
            contentType: m.contentType || m.ContentType,
            isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
            orderIndex: m.orderIndex ?? m.OrderIndex ?? 0
          })).sort((a: { orderIndex: number }, b: { orderIndex: number }) => a.orderIndex - b.orderIndex),
          depoimentos: (src.testemunhos || src.Testemunhos || []).map((t: any) => ({ texto: t.descricao || t.Descricao, casal: t.nome || t.Nome })),
        };
      }),
      catchError(err => { throw err; })
    );
  }

  getByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
    // Usar endpoint correto: /fornecedores/ativos/categoria/{categoriaId}
    console.debug('[FORNECEDORES] getByCategoria called with:', categoriaSlugOrId);
    const params: any = { page: 1, pageSize: 100 };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }

    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(categoriaSlugOrId);
    if (isGuid) {
      console.debug('[FORNECEDORES] calling fornecedores by GUID category id:', categoriaSlugOrId);
      return this.api.get<{ data: any[] }>(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe(
        map(r => (r.data || []).map((src: any) => ({
          id: src.id || src.Id,
          nome: src.nome || src.Nome,
          slug: src.slug || src.Slug,
          descricao: src.descricao || src.Descricao,
          cidade: src.cidade || src.Cidade,
          telefone: src.telefone || src.Telefone,
          email: src.email || src.Email,
          website: src.website || src.Website,
          whatsApp: src.whatsApp || src.WhatsApp,
          endereco: src.endereco || src.Endereco,
          horarioFuncionamento: src.horarioFuncionamento || src.HorarioFuncionamento,
          logoUrl: src.logoUrl || src.LogoUrl,
          rating: src.rating ?? src.Rating ?? null,
          destaque: src.destaque ?? src.Destaque ?? false,
          seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
          ativo: src.ativo ?? src.Ativo ?? false,
          publicado: src.publicado ?? src.Publicado ?? false,
          visitas: src.visitas ?? src.Visitas ?? 0,
          categoriaId: src.categoriaId || src.CategoriaId,
          categoria: src.categoria ? {
            id: src.categoria.id || src.categoria.Id,
            nome: src.categoria.nome || src.categoria.Nome,
            slug: src.categoria.slug || src.categoria.Slug
          } : src.Categoria ? {
            id: src.Categoria.id || src.Categoria.Id,
            nome: src.Categoria.nome || src.Categoria.Nome,
            slug: src.Categoria.slug || src.Categoria.Slug
          } : undefined,
          primaryImage: src.primaryImage ? {
            id: src.primaryImage.id || src.primaryImage.Id,
            url: src.primaryImage.url || src.primaryImage.Url,
            filename: src.primaryImage.filename || src.primaryImage.Filename,
            contentType: src.primaryImage.contentType || src.primaryImage.ContentType,
            isPrimary: src.primaryImage.isPrimary ?? src.primaryImage.IsPrimary ?? true,
            orderIndex: src.primaryImage.orderIndex ?? src.primaryImage.OrderIndex ?? 0
          } : src.PrimaryImage ? {
            id: src.PrimaryImage.id || src.PrimaryImage.Id,
            url: src.PrimaryImage.url || src.PrimaryImage.Url,
            filename: src.PrimaryImage.filename || src.PrimaryImage.Filename,
            contentType: src.PrimaryImage.contentType || src.PrimaryImage.ContentType,
            isPrimary: src.PrimaryImage.isPrimary ?? src.PrimaryImage.IsPrimary ?? true,
            orderIndex: src.PrimaryImage.orderIndex ?? src.PrimaryImage.OrderIndex ?? 0
          } : undefined,
          imagens: (src.imagens || src.Imagens || []).map((m: any) => ({
            id: m.id || m.Id,
            url: m.url || m.Url,
            filename: m.filename || m.Filename,
            contentType: m.contentType || m.ContentType,
            isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
            orderIndex: m.orderIndex ?? m.OrderIndex ?? 0
          })),
          instagram: src.instagram || src.Instagram,
        })))
      );
    }

    // If caller passed a slug (or human-readable string), resolve to category id first
    return this.categoriasData.getBySlug(categoriaSlugOrId).pipe(
      switchMap(cat => {
        const id = cat?.id || categoriaSlugOrId;
        console.debug('[FORNECEDORES] resolved category slug -> id:', { slug: categoriaSlugOrId, id });
        return this.api.get<{ data: any[] }>(`/fornecedores/ativos/categoria/${id}`, params).pipe(
          map(r => (r.data || []).map((src: any) => ({
            id: src.id || src.Id,
            nome: src.nome || src.Nome,
            slug: src.slug || src.Slug,
            descricao: src.descricao || src.Descricao,
            cidade: src.cidade || src.Cidade,
            telefone: src.telefone || src.Telefone,
            email: src.email || src.Email,
            website: src.website || src.Website,
            whatsApp: src.whatsApp || src.WhatsApp,
            endereco: src.endereco || src.Endereco,
            horarioFuncionamento: src.horarioFuncionamento || src.HorarioFuncionamento,
            logoUrl: src.logoUrl || src.LogoUrl,
            rating: src.rating ?? src.Rating ?? null,
            destaque: src.destaque ?? src.Destaque ?? false,
            seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
            ativo: src.ativo ?? src.Ativo ?? false,
            publicado: src.publicado ?? src.Publicado ?? false,
            visitas: src.visitas ?? src.Visitas ?? 0,
            categoriaId: src.categoriaId || src.CategoriaId,
            categoria: src.categoria ? {
              id: src.categoria.id || src.categoria.Id,
              nome: src.categoria.nome || src.categoria.Nome,
              slug: src.categoria.slug || src.categoria.Slug
            } : src.Categoria ? {
              id: src.Categoria.id || src.Categoria.Id,
              nome: src.Categoria.nome || src.Categoria.Nome,
              slug: src.Categoria.slug || src.Categoria.Slug
            } : undefined,
            primaryImage: src.primaryImage ? {
              id: src.primaryImage.id || src.primaryImage.Id,
              url: src.primaryImage.url || src.primaryImage.Url,
              filename: src.primaryImage.filename || src.primaryImage.Filename,
              contentType: src.primaryImage.contentType || src.primaryImage.ContentType,
              isPrimary: src.primaryImage.isPrimary ?? src.primaryImage.IsPrimary ?? true,
              orderIndex: src.primaryImage.orderIndex ?? src.primaryImage.OrderIndex ?? 0
            } : src.PrimaryImage ? {
              id: src.PrimaryImage.id || src.PrimaryImage.Id,
              url: src.PrimaryImage.url || src.PrimaryImage.Url,
              filename: src.PrimaryImage.filename || src.PrimaryImage.Filename,
              contentType: src.PrimaryImage.contentType || src.PrimaryImage.ContentType,
              isPrimary: src.PrimaryImage.isPrimary ?? src.PrimaryImage.IsPrimary ?? true,
              orderIndex: src.PrimaryImage.orderIndex ?? src.PrimaryImage.OrderIndex ?? 0
            } : undefined,
            imagens: (src.imagens || src.Imagens || []).map((m: any) => ({
              id: m.id || m.Id,
              url: m.url || m.Url,
              filename: m.filename || m.Filename,
              contentType: m.contentType || m.ContentType,
              isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
              orderIndex: m.orderIndex ?? m.OrderIndex ?? 0
            })),
            instagram: src.instagram || src.Instagram,
          })))
        );
      })
    );
  }

  getDestaquesByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
    // Tenta obter somente fornecedores destaque na categoria; se API não suportar param, filtra localmente
    const params: any = { page: 1, pageSize: 100, destaque: true };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }

    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(categoriaSlugOrId);
    if (isGuid) {
      return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe(
        map(r => (r.data || []).filter(f => f.destaque)),
        catchError(err => {
          console.warn('[DESTAQUES BY CATEGORIA] falling back filtering local:', err);
          return this.getByCategoria(categoriaSlugOrId).pipe(map(list => list.filter(f => f.destaque)));
        })
      );
    }

    return this.categoriasData.getBySlug(categoriaSlugOrId).pipe(
      switchMap(cat => {
        const id = cat?.id || categoriaSlugOrId;
        return this.api.get<{ data: FornecedorListDto[] }>(`/fornecedores/ativos/categoria/${id}`, params).pipe(
          map(r => (r.data || []).filter(f => f.destaque)),
          catchError(err => {
            console.warn('[DESTAQUES BY CATEGORIA] falling back filtering local:', err);
            return this.getByCategoria(id).pipe(map(list => list.filter(f => f.destaque)));
          })
        );
      })
    );
  }

  /**
   * Direct call using a category ID (no slug resolution) to avoid extra categorias lookups
   */
  getDestaquesByCategoriaId(categoriaId: string): Observable<FornecedorListDto[]> {
    console.debug('[FORNECEDORES] getDestaquesByCategoriaId called with:', categoriaId);
    const params: any = { page: 1, pageSize: 100, destaque: true };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }

    return this.api.get<{ data: any[] }>(`/fornecedores/ativos/categoria/${categoriaId}`, params).pipe(
      map(r => {
        console.debug('[FORNECEDORES] API response for categoriaId', categoriaId, r);
        // Normaliza PascalCase -> camelCase, inclusive objetos/arrays aninhados
        const list = (r.data || []).map((src: any) => ({
          id: src.id || src.Id,
          nome: src.nome || src.Nome,
          slug: src.slug || src.Slug,
          descricao: src.descricao || src.Descricao,
          cidade: src.cidade || src.Cidade,
          telefone: src.telefone || src.Telefone,
          email: src.email || src.Email,
          website: src.website || src.Website,
          whatsApp: src.whatsApp || src.WhatsApp,
          endereco: src.endereco || src.Endereco,
          horarioFuncionamento: src.horarioFuncionamento || src.HorarioFuncionamento,
          logoUrl: src.logoUrl || src.LogoUrl,
          rating: src.rating ?? src.Rating ?? null,
          destaque: src.destaque ?? src.Destaque ?? false,
          seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
          ativo: src.ativo ?? src.Ativo ?? false,
          publicado: src.publicado ?? src.Publicado ?? false,
          visitas: src.visitas ?? src.Visitas ?? 0,
          categoriaId: src.categoriaId || src.CategoriaId,
          categoria: src.categoria ? {
            id: src.categoria.id || src.categoria.Id,
            nome: src.categoria.nome || src.categoria.Nome,
            slug: src.categoria.slug || src.categoria.Slug
          } : src.Categoria ? {
            id: src.Categoria.id || src.Categoria.Id,
            nome: src.Categoria.nome || src.Categoria.Nome,
            slug: src.Categoria.slug || src.Categoria.Slug
          } : undefined,
          primaryImage: src.primaryImage ? {
            id: src.primaryImage.id || src.primaryImage.Id,
            url: src.primaryImage.url || src.primaryImage.Url,
            filename: src.primaryImage.filename || src.primaryImage.Filename,
            contentType: src.primaryImage.contentType || src.primaryImage.ContentType,
            isPrimary: src.primaryImage.isPrimary ?? src.primaryImage.IsPrimary ?? true,
            orderIndex: src.primaryImage.orderIndex ?? src.primaryImage.OrderIndex ?? 0
          } : src.PrimaryImage ? {
            id: src.PrimaryImage.id || src.PrimaryImage.Id,
            url: src.PrimaryImage.url || src.PrimaryImage.Url,
            filename: src.PrimaryImage.filename || src.PrimaryImage.Filename,
            contentType: src.PrimaryImage.contentType || src.PrimaryImage.ContentType,
            isPrimary: src.PrimaryImage.isPrimary ?? src.PrimaryImage.IsPrimary ?? true,
            orderIndex: src.PrimaryImage.orderIndex ?? src.PrimaryImage.OrderIndex ?? 0
          } : undefined,
          imagens: (src.imagens || src.Imagens || []).map((m: any) => ({
            id: m.id || m.Id,
            url: m.url || m.Url,
            filename: m.filename || m.Filename,
            contentType: m.contentType || m.ContentType,
            isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
            orderIndex: m.orderIndex ?? m.OrderIndex ?? 0
          })),
          instagram: src.instagram || src.Instagram,
        }));
        // Filtra apenas destaques
        return list.filter(f => f.destaque);
      }),
      catchError(err => {
        console.warn('[DESTAQUES BY CATEGORIA ID] API error, falling back to empty list:', err);
        return of([]);
      })
    );
  }
}

