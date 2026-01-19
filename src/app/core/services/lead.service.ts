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
  constructor(private api: ApiService) {}

  /**
   * Submete um lead para um fornecedor
   * POST /fornecedores/{fornecedorId}/contact
   *
   * @param fornecedorId ID do fornecedor
   * @param lead Dados do lead (nome, email, telefone, mensagem, consentimento LGPD)
   * @returns Observable com resposta da API
   */
  submitLead(fornecedorId: number, lead: LeadData): Observable<LeadSubmitResponse> {
    return this.api.post(`/fornecedores/${fornecedorId}/contact`, lead);
  }

  /**
   * Obtém lista de leads recebidos pelo fornecedor autenticado
   * GET /fornecedores/me/leads
   *
   * Requer autenticação via JWT token
   *
   * @param skip Quantidade de leads a pular (para pagination)
   * @param take Quantidade de leads a retornar (padrão: 50)
   * @returns Observable com resposta contendo leads, contadores e limite
   */
  getMyLeads(skip: number = 0, take: number = 50): Observable<FornecedorLeadsResponse> {
    return this.api.get('/fornecedores/me/leads', { skip, take });
  }
}
