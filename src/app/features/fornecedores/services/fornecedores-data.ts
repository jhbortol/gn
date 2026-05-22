// Removido: definição solta de getDestaquesByCategoriaId fora da classe. Método correto está dentro da classe FornecedoresData.
import { Injectable, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ApiService } from '../../../core/api.service';
import { Observable, map, catchError, of, switchMap, shareReplay } from 'rxjs';
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
  telefone?: string;
  whatsAppUrl?: string;
  categoria?: { id: string; nome: string; slug: string };
  primaryImage?: { id: string; url: string; filename: string; contentType: string; isPrimary: boolean };
  imagens?: MediaDto[];
  planLevel?: number; // 0 = Free, 1 = Vitrine, -2 = Zombie, -1 = Low
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
  // Tier fields returned by the API
  planLevel?: number; // 0 = Free, 1 = Vitrine, -2 = Zombie, -1 = Low
  isClaimed?: boolean;
  whatsAppUrl?: string;
  showContactForm?: boolean;
  adInjection?: any[];
  precoAPartirDe?: number;
  coverPictureUrl?: string;
  profilePictureUrl?: string;
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
  coverPictureUrl?: string; // URL da imagem de capa para SEO
  primaryImage?: { id: string; url: string; filename: string; contentType: string; isPrimary: boolean }; // Primeira imagem da galeria

  // Novos campos tier (OPCIONAIS para backward compatibility)
  planLevel?: PlanLevel;
  isClaimed?: boolean; // true se o fornecedor reivindicou o perfil
  totalLeadsAllTime?: number; // total de leads recebidos (para Free tier)
  leadLimit?: number; // 3 para Free, ilimitado para Vitrine
  whatsAppUrl?: string;
  showContactForm?: boolean;
  adInjection?: CompetitorAd[];
  precoAPartirDe?: number; // Âncora de preço para badge "A partir de R$ X"
}

@Injectable({ providedIn: 'root' })
export class FornecedoresData {
  private highlightsCache = new Map<string, Observable<FornecedorListDto[]>>();
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

    // Normalize image: also check primaryMedia (used by some backend versions per spec)
    const primary = src.primaryImage || src.PrimaryImage || src.primaryMedia || src.PrimaryMedia || {};
    const imgUrl = src.fotoUrl || src.FotoUrl || src.imageUrl || src.ImageUrl
      || src.logoUrl || src.LogoUrl
      || src.profilePictureUrl || src.ProfilePictureUrl
      || primary.url || primary.Url;

    const planLevel = this._resolvePlanLevel(src);

    // Normalize WhatsApp URL from various field names
    const whatsAppRaw = src.whatsAppUrl || src.WhatsAppUrl || src.whatsApp || src.WhatsApp;
    const whatsAppUrl = whatsAppRaw
      ? (String(whatsAppRaw).startsWith('http') ? whatsAppRaw : `https://wa.me/${String(whatsAppRaw).replace(/\D/g, '')}`)
      : undefined;

    return {
      id: src.id || src.Id,
      nome: src.nomeFantasia || src.NomeFantasia || src.nome || src.Nome || src.name || src.Name,
      slug: src.slug || src.Slug,
      descricao: src.descricao || src.Descricao || src.bio || src.Bio,
      cidade: src.cidade || src.Cidade || src.city || src.City,
      rating: src.rating ?? src.Rating ?? null,
      destaque: src.destaque ?? src.Destaque ?? false,
      seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
      ativo: src.ativo ?? src.Ativo ?? true,
      instagram: src.instagram || src.Instagram
        || src.socialMedia?.Instagram || src.socialMedia?.instagram
        || src.SocialMedia?.Instagram || src.SocialMedia?.instagram,
      categoria: catObj,
      planLevel: planLevel,
      telefone: src.phoneDisplay || src.PhoneDisplay || src.telefone || src.Telefone || src.phone || src.Phone,
      whatsAppUrl,
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
        orderIndex: m.orderIndex ?? m.OrderIndex ?? m.ordem ?? m.Ordem ?? 0
      }))
    };
  }

  constructor(
    private api: ApiService,
    private categoriasData: CategoriasData,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

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
    const stateKey = makeStateKey<Fornecedor>(`fornecedor-${identifier}-${preview}`);

    // Check if data is already available in TransferState (from server-side rendering)
    if (this.transferState.hasKey(stateKey)) {
      const fornecedor = this.transferState.get(stateKey, {} as Fornecedor);
      this.transferState.remove(stateKey); // Clean up after use
      return of(fornecedor);
    }

    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
    const endpoint = isGuid ? `/public/fornecedores/${identifier}` : `/public/fornecedores/slug/${identifier.toLowerCase()}`;

    // If preview mode, add query param to bypass publicado filter
    const params: any = {};
    if (preview) {
      params.preview = 'true';
    }

    return this.api.get<any>(endpoint, params).pipe(
      map(detail => {
        // Support multiple response envelope patterns used by different backend versions:
        // { data: {...} }, { Data: {...} }, { result: {...} }, { fornecedor: {...} }, or direct object
        const payload = detail?.data ?? detail?.Data
          ?? detail?.result ?? detail?.Result
          ?? detail?.fornecedor ?? detail?.Fornecedor
          ?? detail?.item ?? detail?.Item
          ?? detail?.value ?? detail?.Value
          ?? detail;

        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
          console.warn('[FORNECEDOR] Unexpected response format for', identifier, detail);
          throw new Error('Unexpected API response format');
        }

        const fornecedor = this._mapDetailToFornecedor(payload);

        // Debug log in non-production to help diagnose field mapping issues
        if (typeof window !== 'undefined' && !(window as any).__PROD__) {
          console.debug('[FORNECEDOR DEBUG] all payload keys:', Object.keys(payload));
          console.debug('[FORNECEDOR DEBUG] raw fields:', {
            planLevel: payload.planLevel ?? payload.PlanLevel,
            endereco: payload.endereco ?? payload.Endereco ?? payload.address ?? payload.Address
              ?? payload.enderecoCompleto ?? payload.EnderecoCompleto,
            horarioFuncionamento: payload.horarioFuncionamento ?? payload.HorarioFuncionamento
              ?? payload.businessHours ?? payload.BusinessHours
              ?? payload.horarioAtendimento ?? payload.HorarioAtendimento,
            whatsApp: payload.whatsApp ?? payload.WhatsApp ?? payload.whatsAppUrl,
            website: payload.website ?? payload.Website ?? payload.socialMedia?.Website,
            socialMedia: payload.socialMedia ?? payload.SocialMedia
          });
          console.debug('[FORNECEDOR DEBUG] mapped:', {
            planLevel: fornecedor.planLevel,
            endereco: fornecedor.endereco,
            horarioFuncionamento: fornecedor.horarioFuncionamento,
            whatsAppUrl: fornecedor.whatsAppUrl,
            website: fornecedor.website,
            instagram: fornecedor.instagram
          });
        }

        // Store in TransferState if running on server
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(stateKey, fornecedor);
        }
        return fornecedor;
      }),
      catchError(err => { throw err; })
    );
  }

  /**
   * Centralized mapping from backend detail to frontend Fornecedor model
   */
  private _mapDetailToFornecedor(src: any): Fornecedor {
    if (!src) return {} as Fornecedor;

    // Normalize images: can be in Gallery, gallery, imagens, Imagens or single FotoUrl/profilePictureUrl
    let rawImgs = src.imagens || src.Imagens || src.gallery || src.Gallery || [];
    if (!Array.isArray(rawImgs) && typeof rawImgs === 'object') rawImgs = [rawImgs];

    const mappedImgs = rawImgs.filter((m: any) => m && (m.url || m.Url)).map((m: any) => ({
      id: m.id || m.Id,
      url: resolveImageUrl(m.url || m.Url),
      filename: m.filename || m.Filename,
      contentType: m.contentType || m.ContentType,
      isPrimary: m.isPrimary ?? m.IsPrimary ?? false,
      orderIndex: m.orderIndex ?? m.OrderIndex ?? m.ordem ?? m.Ordem ?? 0
    }));

    // If FotoUrl / profilePictureUrl / coverPictureUrl present but not in gallery, add as primary
    const fotoUrl = src.fotoUrl || src.FotoUrl
      || src.profilePictureUrl || src.ProfilePictureUrl
      || src.logoUrl || src.LogoUrl;
    if (fotoUrl && !mappedImgs.some((m: any) => m.url === resolveImageUrl(fotoUrl))) {
      mappedImgs.unshift({
        id: 'primary',
        url: resolveImageUrl(fotoUrl),
        isPrimary: true,
        orderIndex: -1
      } as any);
    }

    const coverUrl = src.coverPictureUrl || src.CoverPictureUrl || src.coverUrl || src.CoverUrl;

    const cat = src.categoria || src.Categoria || src.categoriaPrincipal || src.CategoriaPrincipal;
    const mappedCategoria = (typeof cat === 'object' && cat !== null) ? (cat.nome || cat.Nome) : cat;

    const planLevel = this._resolvePlanLevel(src);

    // Normalize WhatsApp URL from various field names used by the backend
    const whatsAppRaw = src.whatsAppUrl || src.WhatsAppUrl || src.whatsApp || src.WhatsApp;
    const whatsAppUrl = whatsAppRaw
      ? (String(whatsAppRaw).startsWith('http') ? whatsAppRaw : `https://wa.me/${String(whatsAppRaw).replace(/\D/g, '')}`)
      : undefined;

    const mapped: Fornecedor = {
      id: src.id || src.Id,
      nome: src.nomeFantasia || src.NomeFantasia || src.nome || src.Nome || src.name || src.Name,
      slug: src.slug || src.Slug,
      descricao: src.descricao || src.Descricao || src.bio || src.Bio,
      publicado: src.publicado ?? src.Publicado ?? true,
      cidade: src.cidade || src.Cidade || src.city || src.City,
      // Address: tries all known Portuguese and English field aliases used by the backend
      endereco: src.endereco || src.Endereco
        || src.address || src.Address
        || src.enderecoCompleto || src.EnderecoCompleto
        || src.logradouro || src.Logradouro
        || src.location || src.Location
        || src.rua || src.Rua
        || src.street || src.Street,
      // Business hours: tries all known field aliases
      horarioFuncionamento: src.horarioFuncionamento || src.HorarioFuncionamento
        || src.businessHours || src.BusinessHours
        || src.horarioAtendimento || src.HorarioAtendimento
        || src.horariosAtendimento || src.HorariosAtendimento
        || src.openingHours || src.OpeningHours
        || src.workingHours || src.WorkingHours
        || src.horario || src.Horario
        || src.hours || src.Hours
        || src.schedule || src.Schedule,
      telefone: src.phoneDisplay || src.PhoneDisplay || src.telefone || src.Telefone || src.phone || src.Phone,
      email: src.email || src.Email,
      // website: top-level OR inside socialMedia object (PascalCase key as used by backend)
      website: src.website || src.Website || src.site || src.Site || src.siteUrl || src.SiteUrl
        || src.socialMedia?.Website || src.socialMedia?.website
        || src.SocialMedia?.Website || src.SocialMedia?.website,
      // instagram: top-level OR inside socialMedia (PascalCase key as used by backend)
      instagram: src.instagram || src.Instagram || src.instagramUrl || src.InstagramUrl
        || src.socialMedia?.Instagram || src.socialMedia?.instagram
        || src.SocialMedia?.Instagram || src.SocialMedia?.instagram,
      // facebook: top-level OR inside socialMedia (PascalCase key as used by backend)
      facebook: src.facebook || src.Facebook || src.facebookUrl || src.FacebookUrl
        || src.socialMedia?.Facebook || src.socialMedia?.facebook
        || src.SocialMedia?.Facebook || src.SocialMedia?.facebook,
      destaque: src.destaque ?? src.Destaque ?? false,
      seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
      ativo: src.ativo ?? src.Ativo ?? true,
      rating: src.rating ?? src.Rating ?? null,
      visitas: src.visitas ?? src.Visitas ?? 0,
      categoria: mappedCategoria || null,
      imagens: mappedImgs.sort((a: any, b: any) => a.orderIndex - b.orderIndex),
      coverPictureUrl: coverUrl ? resolveImageUrl(coverUrl) : undefined,
      depoimentos: (src.testemunhos || src.Testemunhos || src.testimonials || src.Testimonials || []).map((t: any) => ({
        texto: t.descricao || t.Descricao || t.texto || t.Texto || t.comment || t.Comment,
        casal: t.nome || t.Nome || t.casal || t.Casal || t.brideName || t.BrideName
      })),

      // Tier fields
      planLevel,
      isClaimed: src.isClaimed ?? src.IsClaimed ?? false,
      totalLeadsAllTime: src.totalLeadsAllTime ?? src.TotalLeadsAllTime ?? 0,
      leadLimit: src.leadLimit ?? src.LeadLimit ?? 3,
      whatsAppUrl,
      showContactForm: src.showContactForm ?? src.ShowContactForm ?? (planLevel !== PlanLevel.Vitrine),
      adInjection: (src.adInjection || src.AdInjection || []).map((ad: any) => ({
        id: ad.id || ad.Id,
        nome: ad.nomeFantasia || ad.NomeFantasia || ad.nome || ad.Nome,
        slug: ad.slug || ad.Slug,
        categoria: ad.categoria || ad.Categoria,
        imagemPrincipal: resolveImageUrl(ad.imagemPrincipal || ad.ImagemPrincipal || ad.fotoUrl || ad.FotoUrl),
        descricao: ad.descricao || ad.Descricao,
        cidade: ad.cidade || ad.Cidade
      })),
      precoAPartirDe: src.precoAPartirDe ?? src.PrecoAPartirDe ?? undefined
    };

    return mapped;
  }

  private _resolvePlanLevel(src: any): PlanLevel {
    // Try every known field name the backend might use for plan level
    const raw = src?.planLevel ?? src?.PlanLevel
      ?? src?.tier ?? src?.Tier
      ?? src?.plan ?? src?.Plan
      ?? src?.nivelPlano ?? src?.NivelPlano
      ?? src?.planLevelId ?? src?.PlanLevelId;

    if (typeof raw === 'string') {
      const normalized = raw.trim().toLowerCase();
      const namedLevels: Record<string, PlanLevel> = {
        zombie: PlanLevel.Zombie,
        low: PlanLevel.Low,
        free: PlanLevel.Free,
        vitrine: PlanLevel.Vitrine,
        premium: PlanLevel.Vitrine,
        paid: PlanLevel.Vitrine,
        pago: PlanLevel.Vitrine,
        '1': PlanLevel.Vitrine,
        '0': PlanLevel.Free,
        '-1': PlanLevel.Low,
        '-2': PlanLevel.Zombie
      };

      if (normalized in namedLevels) {
        return namedLevels[normalized];
      }
    }

    const parsed = typeof raw === 'number'
      ? raw
      : typeof raw === 'string'
        ? Number(raw)
        : NaN;

    if (
      Number.isFinite(parsed) &&
      [PlanLevel.Zombie, PlanLevel.Low, PlanLevel.Free, PlanLevel.Vitrine].includes(parsed as PlanLevel)
    ) {
      return parsed as PlanLevel;
    }

    // Fallback: infer tier from available signals when planLevel field is absent
    // whatsAppUrl or showContactForm=false are strong indicators of Vitrine plan
    const hasWhatsApp = !!(src?.whatsAppUrl || src?.WhatsAppUrl || src?.whatsApp || src?.WhatsApp);
    const showForm = src?.showContactForm ?? src?.ShowContactForm;
    if (hasWhatsApp || showForm === false) {
      return PlanLevel.Vitrine;
    }

    // destaque=true was historically used as a proxy for Vitrine
    return (src?.destaque ?? src?.Destaque) ? PlanLevel.Vitrine : PlanLevel.Free;
  }

  getByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
    const params: any = { page: 1, pageSize: 50 }; // Default page size for category view
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
    const cacheKey = `destaques-cat-id-${categoriaId}`;
    if (this.highlightsCache.has(cacheKey)) return this.highlightsCache.get(cacheKey)!;

    const params: any = { page: 1, pageSize: 24, destaque: true };
    if (environment.FORNECEDOR_PUBLICADO !== null) {
      params.publicado = environment.FORNECEDOR_PUBLICADO;
    }

    const obs = this.api.get<any>(`/fornecedores/ativos/categoria/${categoriaId}`, params).pipe(
      map(r => {
        const list = Array.isArray(r) ? r : (r.data || r.Data || []);
        return list.map((src: any) => this._mapToFornecedorListDto(src)).filter((f: any) => f.destaque);
      }),
      catchError(err => {
        console.warn('[DESTAQUES BY CATEGORIA ID] error:', err);
        return of([]);
      }),
      shareReplay(1)
    );

    this.highlightsCache.set(cacheKey, obs);
    return obs;
  }

  // ==============================================================================================
  // PROFILE CLAIM METHODS
  // ==============================================================================================

  // Cache para termo de adesão (evita múltiplas chamadas)
  private termoCache$?: Observable<TermoAdesao>;

  getTermoAdesao(): Observable<TermoAdesao> {
    if (!this.termoCache$) {
      this.termoCache$ = this.api.get<TermoAdesao>(`/contratos/termo-adesao`).pipe(
        shareReplay(1) // Cache o resultado para múltiplas chamadas
      );
    }
    return this.termoCache$;
  }

  // Método para limpar cache do termo (útil para testes ou quando o termo muda)
  clearTermoCache(): void {
    this.termoCache$ = undefined;
  }

  claimProfile(fornecedorId: string, payload: ClaimPayload): Observable<ClaimResponse> {
    return this.api.post<ClaimResponse>(`/fornecedores/${fornecedorId}/claim`, payload);
  }
}

export interface TermoAdesao {
  id: string;
  versao: string;
  hash: string;
  texto: string;
  dataConsulta: string;
}

export interface ClaimPayload {
  email: string;
  password?: string;
  fullName: string;
  phone: string;
  termoHash: string;
  aceitaTermos: boolean;
  dataAceite: string;
  clientIp?: string; // IP do cliente (capturado antes do envio)
}

export interface ClaimResponse {
  message: string;
  userId: string;
  fornecedorId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  termoVersao: string;
  claimedAt: string;
  planLevel: number;
  leadLimit: number;
}
