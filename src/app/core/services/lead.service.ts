import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { LeadData, LeadSubmitResponse, FornecedorLeadsResponse } from '../models/tier-system.model';

/**
 * Serviço para gerenciar leads do sistema de tier
 * Responsável por submeter leads e recuperar lista de leads do painel
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  constructor(private api: ApiService) { }

  submitLead(fornecedorId: string | number, lead: LeadData): Observable<LeadSubmitResponse> {
    return this.api.post(`/public/fornecedores/${fornecedorId}/contact`, lead);
  }

  /**
   * Obtém lista de leads recebidos pelo fornecedor autenticado
   * GET /supplier/leads
   *
   * Requer autenticação via JWT token
   *
   * @param skip Quantidade de leads a pular (para pagination)
   * @param take Quantidade de leads a retornar (padrão: 50)
   * @returns Observable com resposta contendo leads, contadores e limite
   */
  getMyLeads(skip: number = 0, take: number = 50): Observable<FornecedorLeadsResponse> {
    return this.api.get('/supplier/leads', { skip, take });
  }
}
