import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  width?: number;
  height?: number;
  isPrimary: boolean;
  orderIndex: number;
  imageType?: string;
  createdAt: string;
}

export interface TestemunhoDto {
  id: string;
  nome: string;
  descricao: string;
  rating?: number;
  data?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TestemunhoCreateDto {
  nome: string;
  descricao: string;
  rating?: number;
  data?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly apiUrl = `${environment.API_BASE_URL}/supplier`;
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

  // ===== FORNECEDOR =====
  getMe(): Observable<FornecedorDto> {
    return this.http.get<FornecedorDto>(`${this.apiUrl}/me`);
  }

  updateMe(data: FornecedorUpdateDto): Observable<FornecedorDto> {
    return this.http.put<FornecedorDto>(`${this.apiUrl}/me`, data);
  }

  getStats(): Observable<FornecedorStatsDto> {
    return this.http.get<FornecedorStatsDto>(`${this.apiUrl}/me/stats`);
  }

  // ===== IMAGENS =====
  getImages(): Observable<{ data: MediaDto[] }> {
    return this.http.get<{ data: MediaDto[] }>(`${this.apiUrl}/me/images`);
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
    return this.http.patch<void>(`${this.apiUrl}/me/images/reorder`, { imageIds });
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

  updateTestemunho(id: string, data: TestemunhoCreateDto): Observable<TestemunhoDto> {
    return this.http.put<TestemunhoDto>(`${this.apiUrl}/me/testemunhos/${id}`, data);
  }

  deleteTestemunho(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/testemunhos/${id}`);
  }
}
