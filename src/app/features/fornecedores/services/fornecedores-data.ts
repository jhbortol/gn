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
  isClaimed?: boolean; // true se o fornecedor reivindicou o perfil
  totalLeadsAllTime?: number; // total de leads recebidos (para Free tier)
  leadLimit?: number; // 3 para Free, ilimitado para Vitrine
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
    return this.api.get<any>(`/search/fornecedores`, params).pipe(
      map(r => {
        const list = Array.isArray(r) ? r : (r.data || r.Data || []);
        return list.map((src: any) => this._mapToFornecedorListDto(src));
      })
    );
  }

  /**
   * Helper to map any backend object to FornecedorListDto
   */
  private _mapToFornecedorListDto(src: any): FornecedorListDto {
    if (!src) return {} as FornecedorListDto;

    // Normalize category: can be string or object
    let catObj: any = undefined;
    const cat = src.categoria || src.Categoria;
    if (typeof cat === 'string') {
      catObj = { id: '', nome: cat, slug: '' };
    } else if (cat && typeof cat === 'object') {
      catObj = {
        id: cat.id || cat.Id || '',
        nome: cat.nome || cat.Nome || '',
        slug: cat.slug || cat.Slug || ''
      };
    }

    // Normalize image
    const primary = src.primaryImage || src.PrimaryImage || {};
    const imgUrl = src.fotoUrl || src.FotoUrl || src.imageUrl || src.ImageUrl || primary.url || primary.Url;

    return {
      id: src.id || src.Id,
      nome: src.nomeFantasia || src.NomeFantasia || src.nome || src.Nome,
      slug: src.slug || src.Slug,
      descricao: src.descricao || src.Descricao,
      cidade: src.cidade || src.Cidade,
      rating: src.rating ?? src.Rating ?? null,
      destaque: src.destaque ?? src.Destaque ?? false,
      seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
      ativo: src.ativo ?? src.Ativo ?? true,
      instagram: src.instagram || src.Instagram || src.socialMedia?.instagram || src.SocialMedia?.Instagram,
      categoria: catObj,
      primaryImage: imgUrl ? {
        id: primary.id || primary.Id || 'primary',
        url: resolveImageUrl(imgUrl),
        filename: primary.filename || primary.Filename || '',
        contentType: primary.contentType || primary.ContentType || '',
        isPrimary: true
      } : undefined,
      imagens: (src.imagens || src.Imagens || src.gallery || src.Gallery || []).map((m: any) => ({
        id: m.id || m.Id,
        url: resolveImageUrl(m.url || m.Url),
        isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
        orderIndex: m.orderIndex ?? m.OrderIndex ?? 0
      }))
    };
  }

  constructor(private api: ApiService, private categoriasData: CategoriasData) { }

  getAll(page = 1, pageSize = 12): Observable<FornecedorListDto[]> {
    // Usar /fornecedores/ativos para exibir apenas fornecedores ativos (público)
    const params: any = { page, pageSize };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }
    return this.api.get<{ data: any[] }>(`/fornecedores/ativos`, params).pipe(
      map(r => (r.data || []).map((src: any) => this._mapToFornecedorListDto(src)))
    );
  }

  getDestaques(page = 1, pageSize = 24): Observable<FornecedorListDto[]> {
    const params: any = { page, pageSize, destaque: true };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }
    return this.api.get<any>(`/fornecedores/ativos`, params).pipe(
      map(r => {
        let list: any[] = [];
        if (Array.isArray(r)) list = r;
        else if (r && Array.isArray(r.data)) list = r.data;
        else console.warn('[DESTAQUES] formato inesperado da resposta:', r);

        return list.map(src => this._mapToFornecedorListDto(src));
      }),
      map(list => {
        // Garantir que filtramos apenas os que têm destaque=true se a API retornou tudo
        const highlights = list.filter(f => f.destaque);
        if (list.length > 0 && highlights.length === 0) {
          console.warn('[DESTAQUES] nenhum fornecedor com destaque=true encontrado na lista');
        }
        return highlights.length > 0 ? highlights : list;
      }),
      catchError(err => {
        console.error('[DESTAQUES] API error:', err);
        return of([]);
      })
    );
  }

  getById(identifier: string, preview = false): Observable<Fornecedor> {
    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
    const endpoint = isGuid ? `/public/fornecedores/${identifier}` : `/public/fornecedores/slug/${identifier.toLowerCase()}`;

    // If preview mode, add query param to bypass publicado filter
    const params: any = {};
    if (preview) {
      params.preview = 'true';
    }

    return this.api.get<any>(endpoint, params).pipe(
      map(detail => this._mapDetailToFornecedor(detail)),
      catchError(err => { throw err; })
    );
  }

  /**
   * Centralized mapping from backend detail to frontend Fornecedor model
   */
  private _mapDetailToFornecedor(src: any): Fornecedor {
    if (!src) return {} as Fornecedor;

    // Normalize images: can be in Gallery, gallery, imagens, Imagens or single FotoUrl
    let rawImgs = src.imagens || src.Imagens || src.gallery || src.Gallery || [];
    if (!Array.isArray(rawImgs) && typeof rawImgs === 'object') rawImgs = [rawImgs];

    const mappedImgs = rawImgs.filter((m: any) => m && (m.url || m.Url)).map((m: any) => ({
      id: m.id || m.Id,
      url: resolveImageUrl(m.url || m.Url),
      filename: m.filename || m.Filename,
      contentType: m.contentType || m.ContentType,
      isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
      orderIndex: m.orderIndex ?? m.OrderIndex ?? 0
    }));

    // If FotoUrl present but not in gallery, add it as primary
    const fotoUrl = src.fotoUrl || src.FotoUrl;
    if (fotoUrl && !mappedImgs.some((m: any) => m.url === fotoUrl)) {
      mappedImgs.unshift({
        id: 'primary',
        url: resolveImageUrl(fotoUrl),
        isPrimary: true,
        orderIndex: -1
      } as any);
    }

    const cat = src.categoria || src.Categoria;
    const mappedCategoria = (typeof cat === 'object' && cat !== null) ? (cat.nome || cat.Nome) : cat;

    return {
      id: src.id || src.Id,
      nome: src.nomeFantasia || src.NomeFantasia || src.nome || src.Nome,
      slug: src.slug || src.Slug,
      descricao: src.descricao || src.Descricao,
      publicado: src.publicado ?? src.Publicado ?? true, // Default to true if missing in detail
      cidade: src.cidade || src.Cidade,
      endereco: src.endereco || src.Endereco,
      horarioFuncionamento: src.horarioFuncionamento || src.HorarioFuncionamento,
      telefone: src.phoneDisplay || src.PhoneDisplay || src.telefone || src.Telefone,
      email: src.email || src.Email,
      website: src.website || src.Website,
      instagram: src.instagram || src.Instagram || src.socialMedia?.instagram || src.SocialMedia?.Instagram,
      facebook: src.facebook || src.Facebook || src.socialMedia?.facebook || src.SocialMedia?.Facebook,
      destaque: src.destaque ?? src.Destaque ?? false,
      seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
      ativo: src.ativo ?? src.Ativo ?? true,
      rating: src.rating ?? src.Rating ?? null,
      visitas: src.visitas ?? src.Visitas ?? 0,
      categoria: mappedCategoria || null,
      imagens: mappedImgs.sort((a: any, b: any) => a.orderIndex - b.orderIndex),
      depoimentos: (src.testemunhos || src.Testemunhos || src.testimonials || src.Testimonials || []).map((t: any) => ({
        texto: t.descricao || t.Descricao || t.texto || t.Texto,
        casal: t.nome || t.Nome || t.casal || t.Casal
      })),

      // Novos campos tier
      planLevel: src.planLevel ?? src.PlanLevel ?? PlanLevel.Zombie,
      isClaimed: src.isClaimed ?? src.IsClaimed ?? false,
      totalLeadsAllTime: src.totalLeadsAllTime ?? src.TotalLeadsAllTime ?? 0,
      leadLimit: src.leadLimit ?? src.LeadLimit ?? 3,
      whatsAppUrl: src.whatsAppUrl || src.WhatsAppUrl,
      showContactForm: src.showContactForm ?? src.ShowContactForm ?? true,
      adInjection: (src.adInjection || src.AdInjection || []).map((ad: any) => ({
        id: ad.id || ad.Id,
        nome: ad.nomeFantasia || ad.NomeFantasia || ad.nome || ad.Nome,
        slug: ad.slug || ad.Slug,
        categoria: ad.categoria || ad.Categoria,
        imagemPrincipal: resolveImageUrl(ad.imagemPrincipal || ad.ImagemPrincipal || ad.fotoUrl || ad.FotoUrl),
        descricao: ad.descricao || ad.Descricao,
        cidade: ad.cidade || ad.Cidade
      }))
    };
  }

  getByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
    const params: any = { page: 1, pageSize: 12 }; // Default page size for category view
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }

    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(categoriaSlugOrId);
    if (isGuid) {
      return this.api.get<any>(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe(
        map(r => {
          const list = Array.isArray(r) ? r : (r.data || r.Data || []);
          return list.map((src: any) => this._mapToFornecedorListDto(src));
        })
      );
    }

    return this.categoriasData.getBySlug(categoriaSlugOrId).pipe(
      switchMap(cat => {
        if (!cat) return of([]);
        return this.api.get<any>(`/fornecedores/ativos/categoria/${cat.id}`, params).pipe(
          map(r => {
            const list = Array.isArray(r) ? r : (r.data || r.Data || []);
            return list.map((src: any) => this._mapToFornecedorListDto(src));
          })
        );
      })
    );
  }

  getDestaquesByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
    const params: any = { page: 1, pageSize: 24, destaque: true };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }

    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(categoriaSlugOrId);

    const fetch = (id: string) => this.api.get<any>(`/fornecedores/ativos/categoria/${id}`, params).pipe(
      map(r => {
        const list = Array.isArray(r) ? r : (r.data || r.Data || []);
        return list.map((src: any) => this._mapToFornecedorListDto(src));
      }),
      catchError(() => this.getByCategoria(id).pipe(map(list => list.filter((f: any) => f.destaque))))
    );

    if (isGuid) return fetch(categoriaSlugOrId);

    return this.categoriasData.getBySlug(categoriaSlugOrId).pipe(
      switchMap(cat => cat ? fetch(cat.id) : of([]))
    );
  }

  getDestaquesByCategoriaId(categoriaId: string): Observable<FornecedorListDto[]> {
    const params: any = { page: 1, pageSize: 24, destaque: true };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }

    return this.api.get<any>(`/fornecedores/ativos/categoria/${categoriaId}`, params).pipe(
      map(r => {
        const list = Array.isArray(r) ? r : (r.data || r.Data || []);
        return list.map((src: any) => this._mapToFornecedorListDto(src)).filter((f: any) => f.destaque);
      }),
      catchError(err => {
        console.warn('[DESTAQUES BY CATEGORIA ID] error:', err);
        return of([]);
      })
    );
  }
}

