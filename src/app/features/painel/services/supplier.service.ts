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
      tap(response => console.log('getMe RAW response:', response, 'type:', typeof response)),
      map((response: any) => {
        console.log('getMe response structure - has data?:', !!response?.data);
        
        // Handle wrapped response: { data: FornecedorDto }
        if (response && typeof response === 'object' && response.data) {
          console.log('Extracting data from wrapper');
          const extracted = response.data;
          console.log('Extracted data:', extracted);
          return extracted;
        }
        
        // Handle direct response: FornecedorDto
        console.log('Using response as-is (not wrapped)');
        return response;
      }),
      tap(result => console.log('Final mapped result:', result))
    );
  }

  updateMe(data: FornecedorUpdateDto): Observable<FornecedorDto> {
    return this.http.put<FornecedorDto>(`${this.apiUrl}/me`, data);
  }

  getStats(): Observable<FornecedorStatsDto> {
    return this.http.get<any>(`${this.apiUrl}/me/stats`).pipe(
      tap(response => console.log('getStats RAW response:', response)),
      map((response: any) => {
        if (response && response.data) {
          return response.data;
        }
        return response;
      })
    );
  }

  // ===== IMAGENS =====
  getImages(): Observable<{ data: MediaDto[] }> {
    return this.http.get<{ data: MediaDto[] }>(`${this.apiUrl}/me/images`).pipe(
      tap(response => console.log('Images response:', response))
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
