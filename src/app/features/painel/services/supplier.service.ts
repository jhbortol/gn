import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SupplierAuthService, LoginResponse } from './supplier-auth.service';

export interface FornecedorDto {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  cidade?: string;
  telefone?: string;
  email?: string;
  website?: string;
  whatsApp?: string;
  endereco?: string;
  horarioFuncionamento?: string;
  instagram?: string;
  facebook?: string;
  logoUrl?: string;
  destaque: boolean;
  seloFornecedor: boolean;
  rating?: number;
  visitas: number;
  publicado: boolean;
  categorias?: Array<{ id: string; nome: string; slug: string }>;
}

export interface FornecedorUpdateDto {
  nome: string;
  descricao?: string;
  cidade?: string;
  telefone?: string;
  email?: string;
  website?: string;
  whatsApp?: string;
  endereco?: string;
  horarioFuncionamento?: string;
  instagram?: string;
  facebook?: string;
}

export interface FornecedorStatsDto {
  totalVisualizacoes: number;
  testemunhos: number;
  rating: number;
  imagens: number;
  ultimasVisualizacoes?: Array<{ data: string; quantidade: number }>;
}

export interface MediaDto {
  id: string;
  url: string;
  filename: string;
  contentType: string;
  width: number | null;
  height: number | null;
  isPrimary: boolean;
  orderIndex: number;
  imageType: string | null;
  createdAt: string;
}

export interface TestemunhoDto {
  id: number;
  fornecedorId?: number;
  nome: string;
  email: string;
  descricao: string;
  rating: number;
  ativo: boolean;
  criadoEm?: string;
  atualizadoEm?: string;
  // Retrocompatibilidade com nomes antigos (caso o backend use)
  nomeCliente?: string;
  emailCliente?: string;
  mensagem?: string;
}

export interface TestemunhoCreateDto {
  nome: string;        // Nome do cliente
  descricao: string;   // Mensagem/testemunho
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly apiUrl = `${environment.API_BASE_URL}/fornecedores`;
  private readonly authUrl = `${environment.API_BASE_URL}/auth`;

  constructor(
    private http: HttpClient,
    private authService: SupplierAuthService
  ) {}

  // ===== AUTENTICAÇÃO =====
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, { email, password }).pipe(
      tap(response => this.authService.storeSession(response))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.authUrl}/logout`, {}).pipe(
      tap(() => this.authService.clearSession())
    );
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.authUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.authUrl}/reset-password`, {
      token,
      newPassword
    });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.API_BASE_URL}/account/change-password`, {
      currentPassword,
      newPassword
    });
  }

  // ===== FORNECEDOR =====
  getMe(): Observable<FornecedorDto> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      map((response: any) => {
        const src = response?.data || response || {};
        return {
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
          destaque: src.destaque ?? src.Destaque ?? false,
          seloFornecedor: src.seloFornecedor ?? src.SeloFornecedor ?? false,
          rating: src.rating ?? src.Rating ?? null,
          visitas: src.visitas ?? src.Visitas ?? 0,
          publicado: src.publicado ?? src.Publicado ?? false,
          categorias: (src.categorias || src.Categorias || []).map((cat: any) => ({
            id: cat.id || cat.Id,
            nome: cat.nome || cat.Nome,
            slug: cat.slug || cat.Slug
          }))
        };
      })
    );
  }

  updateMe(data: FornecedorUpdateDto): Observable<FornecedorDto> {
    return this.http.put<FornecedorDto>(`${this.apiUrl}/me`, data);
  }

  getStats(): Observable<FornecedorStatsDto> {
    return this.http.get<any>(`${this.apiUrl}/me/stats`).pipe(
      map((response: any) => {
        const src = response?.data || response || {};
        return {
          totalVisualizacoes: src.totalVisualizacoes ?? src.TotalVisualizacoes ?? 0,
          testemunhos: src.testemunhos ?? src.Testemunhos ?? 0,
          rating: src.rating ?? src.Rating ?? 0,
          imagens: src.imagens ?? src.Imagens ?? 0,
          ultimasVisualizacoes: (src.ultimasVisualizacoes || src.UltimasVisualizacoes || []).map((v: any) => ({
            data: v.data || v.Data,
            quantidade: v.quantidade ?? v.Quantidade ?? 0
          }))
        };
      })
    );
  }

  // ===== IMAGENS =====
  getImages(): Observable<{ data: MediaDto[] }> {
    return this.http.get<any>(`${this.apiUrl}/me/images`).pipe(
      map((response: any) => {
        const arr = response?.data || response || [];
        return {
          data: (arr || []).map((img: any) => ({
            id: img.id || img.Id,
            url: img.url || img.Url,
            filename: img.filename || img.Filename,
            contentType: img.contentType || img.ContentType,
            width: img.width ?? img.Width ?? null,
            height: img.height ?? img.Height ?? null,
            isPrimary: img.isPrimary ?? img.IsPrimary ?? false,
            orderIndex: img.orderIndex ?? img.OrderIndex ?? 0,
            imageType: img.imageType || img.ImageType || null,
            createdAt: img.createdAt || img.CreatedAt
          }))
        };
      })
    );
  }

  uploadImage(file: File, isPrimary = false, imageType = 'gallery'): Observable<MediaDto> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isPrimary', isPrimary.toString());
    formData.append('imageType', imageType);

    return this.http.post<MediaDto>(`${this.apiUrl}/me/images`, formData);
  }

  setPrimaryImage(imageId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/me/images/${imageId}/primary`, {});
  }

  reorderImages(imageIds: string[]): Observable<void> {
    // API espera o array completo na ordem desejada
    return this.http.patch<void>(`${this.apiUrl}/me/images/reorder`, { ImageIds: imageIds });
  }

  deleteImage(imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/images/${imageId}`);
  }

  // ===== TESTEMUNHOS =====
  getTestemunhos(page = 1, pageSize = 10): Observable<PaginatedResponse<TestemunhoDto>> {
    return this.http.get<PaginatedResponse<TestemunhoDto>>(
      `${this.apiUrl}/me/testemunhos`,
      { params: { page: page.toString(), pageSize: pageSize.toString() } }
    );
  }

  getTestemunho(id: string): Observable<TestemunhoDto> {
    return this.http.get<TestemunhoDto>(`${this.apiUrl}/me/testemunhos/${id}`);
  }

  createTestemunho(data: TestemunhoCreateDto): Observable<TestemunhoDto> {
    return this.http.post<TestemunhoDto>(`${this.apiUrl}/me/testemunhos`, data);
  }

  updateTestemunho(id: number, data: Partial<TestemunhoCreateDto & { ativo: boolean }>): Observable<TestemunhoDto> {
    return this.http.patch<TestemunhoDto>(`${this.apiUrl}/me/testemunhos/${id}`, data);
  }

  deleteTestemunho(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/testemunhos/${id}`);
  }
}
