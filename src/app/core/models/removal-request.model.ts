/**
 * Modelos para solicitação de remoção de perfil (Opt-Out)
 */

/**
 * Motivos disponíveis para solicitação de remoção
 */
export enum RemovalReason {
  FECHOU_EMPRESA = 'FECHOU_EMPRESA',
  DADOS_INCORRETOS = 'DADOS_INCORRETOS',
  PRIVACIDADE = 'PRIVACIDADE',
  NAO_QUER_ORCAMENTOS = 'NAO_QUER_ORCAMENTOS',
  OUTRO = 'OUTRO'
}

/**
 * Labels amigáveis para os motivos
 */
export const RemovalReasonLabels: Record<RemovalReason, string> = {
  [RemovalReason.FECHOU_EMPRESA]: 'Empresa encerrou atividades',
  [RemovalReason.DADOS_INCORRETOS]: 'Informações desatualizadas',
  [RemovalReason.NAO_QUER_ORCAMENTOS]: 'Não quero receber orçamentos',
  [RemovalReason.PRIVACIDADE]: 'Questões de Privacidade',
  [RemovalReason.OUTRO]: 'Outro motivo'
};

/**
 * Payload enviado ao backend para solicitar remoção
 */
export interface RemovalRequestPayload {
  vendorId: number;
  requesterEmail: string;
  reason: RemovalReason;
  description?: string;
}

/**
 * Resposta da API após submissão
 */
export interface RemovalRequestResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

/**
 * Fornecedor simplificado (para busca/autocomplete)
 */
export interface VendorSearchResult {
  id: number;
  nomeFantasia: string;
  categoria?: string;
  cidade?: string;
}
