import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import {
  RemovalRequestPayload,
  RemovalRequestResponse,
  RemovalRequestStatus,
  VendorSearchResult
} from '../models/removal-request.model';

/**
 * Serviço para gerenciar solicitações de remoção de perfil (Opt-Out)
 */
@Injectable({ providedIn: 'root' })
export class RemovalRequestService {
  constructor(private api: ApiService) { }

  /**
   * Busca fornecedores por nome (para autocomplete)
   * GET /api/vendors?filter=name
   *
   * @param query Nome ou parte do nome da empresa
   * @returns Observable com lista de fornecedores
   */
  searchVendors(query: string): Observable<VendorSearchResult[]> {
    return this.api.get('/vendors', { filter: query });
  }

  /**
   * Submete solicitação de remoção de perfil
   * POST /api/v1/privacy/request-removal
   */
  submitRemovalRequest(payload: RemovalRequestPayload): Observable<RemovalRequestResponse> {
    return this.api.post('/privacy/request-removal', payload);
  }

  /**
   * Consulta status da solicitação
   * GET /api/v1/privacy/request-removal/status
   */
  getRemovalRequestStatus(requestId: string, email: string): Observable<RemovalRequestStatus> {
    return this.api.get('/privacy/request-removal/status', { id: requestId, email });
  }
}
