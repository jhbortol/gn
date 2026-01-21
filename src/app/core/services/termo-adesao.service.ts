import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  TermoAdesao, 
  TermoAdesaoResponse, 
  AceitacaoTermo, 
  ComprovanteAceite,
  ErroTermoAdesao 
} from '../models/termo-adesao.model';
import { ApiService } from '../api.service';

@Injectable({ providedIn: 'root' })
export class TermoAdesaoService {
  private http = inject(HttpClient);
  private api = inject(ApiService);

  /**
   * Step 1: Carregar Termo
   * GET /api/v1/contratos/termo-adesao
   */
  carregarTermo(tipoTermo: string = 'ADESAO'): Observable<TermoAdesaoResponse> {
    return this.api.get<TermoAdesaoResponse>(
      `/contratos/termo-adesao?tipo=${tipoTermo}`
    );
  }

  /**
   * Step 4: Validação SHA-256 Local
   * Calcula hash do conteúdo do termo para validação
   */
  async calcularHashTermo(conteudo: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(conteudo);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  /**
   * Step 4b: Validar Hash
   * Compara hash calculado com hash do servidor
   */
  async validarHash(conteudo: string, hashEsperado: string): Promise<boolean> {
    const hashCalculado = await this.calcularHashTermo(conteudo);
    return hashCalculado === hashEsperado;
  }

  /**
   * Step 5: Submissão Completa
   * POST /api/v1/fornecedores/adesao-express com aceite do termo
   */
  submeterAceitacaoTermo(aceitacao: AceitacaoTermo): Observable<ComprovanteAceite> {
    const payload = {
      ...aceitacao,
      userAgent: navigator.userAgent,
      ipOrigem: undefined // Backend preencherá via headers
    };

    return this.api.post<ComprovanteAceite>(
      `/fornecedores/aceitar-termo`,
      payload
    );
  }

  /**
   * Step 7: Recuperar Comprovante
   * GET /api/v1/fornecedores/{fornecedorId}/comprovante-aceite/{protocolo}
   */
  obterComprovante(fornecedorId: string, protocolo: string): Observable<ComprovanteAceite> {
    return this.api.get<ComprovanteAceite>(
      `/fornecedores/${fornecedorId}/comprovante-aceite/${protocolo}`
    );
  }

  /**
   * Tratamento de Erro: Hash inválido
   */
  tratarErroHashInvalido(erro: ErroTermoAdesao): void {
    console.error('Hash inválido - Reload automático em 3s', erro);
    setTimeout(() => window.location.reload(), 3000);
  }

  /**
   * Tratamento de Erro: Duplicata
   */
  tratarErroDuplicata(erro: ErroTermoAdesao): void {
    console.error('Termo já aceito anteriormente', erro);
  }

  /**
   * Extrair metadados do termo para auditoria
   */
  extrairMetadadosTermo(termo: TermoAdesao): {
    termoId: string;
    versao: number;
    tipoTermo: string;
    dataVigencia: Date;
  } {
    return {
      termoId: termo.id,
      versao: termo.versao,
      tipoTermo: termo.tipoTermo,
      dataVigencia: termo.dataVigencia
    };
  }
}
