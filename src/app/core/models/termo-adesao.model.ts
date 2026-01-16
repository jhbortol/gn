/**
 * Modelos para Termo de Adesão com Audit Trail
 * Conforme LGPD e requisitos jurídicos
 */

export interface TermoAdesao {
  id: string;
  versao: number;
  conteudo: string;
  dataVigencia: Date;
  dataValidade?: Date;
  tipoTermo: 'ADESAO' | 'PRIVACIDADE' | 'RESPONSABILIDADE';
  hash?: string; // SHA-256 do conteúdo
  ativo: boolean;
}

export interface TermoAdesaoResponse {
  termo: TermoAdesao;
  protocolo: string; // ID único do aceite
  timestamp: Date;
}

export interface AceitacaoTermo {
  termoId: string;
  versao: number;
  termoHash: string; // SHA-256 calculado no cliente
  dataAceite: Date;
  ipOrigem?: string;
  userAgent?: string;
  scrollCompleto: boolean; // Validação de leitura completa
  tempoLeitura?: number; // Em segundos
}

export interface ComprovanteAceite {
  protocolo: string; // ID único do aceite
  fornecedorId: string;
  termo: {
    id: string;
    versao: number;
    hash: string;
  };
  dataAceite: Date;
  statusAceite: 'ACEITO' | 'PENDENTE' | 'REJEITADO';
  validacaoHash: 'VÁLIDO' | 'INVÁLIDO' | 'PENDENTE';
}

export interface ErroTermoAdesao {
  codigo: string;
  mensagem: string;
  detalhes?: any;
}
