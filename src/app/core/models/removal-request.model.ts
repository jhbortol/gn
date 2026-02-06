/**
 * Modelos para solicitação de remoção de perfil (Opt-Out)
 */

/**
 * Motivos disponíveis para solicitação de remoção
 */
// Motivos de remoção atualizados conforme docs/lgpd.md v3
export enum RemovalReason {
  FechouEmpresa = 'FechouEmpresa',
  DadosIncorretos = 'DadosIncorretos',
  PrivacidadeDados = 'PrivacidadeDados',
  Outro = 'Outro'
}

export const RemovalReasonLabels: Record<RemovalReason, string> = {
  [RemovalReason.FechouEmpresa]: 'A empresa encerrou atividades',
  [RemovalReason.DadosIncorretos]: 'Informações estão desatualizadas',
  [RemovalReason.PrivacidadeDados]: 'Não quer receber orçamentos/contatos',
  [RemovalReason.Outro]: 'Outro motivo'
};

export interface RemovalRequestPayload {
  fornecedorId: string;
  requesterName?: string; // Opcional
  requesterEmail: string;
  reason: RemovalReason;
  confirmsOwnership: boolean;
  description?: string; // Renomeado de additionalInfo
}

export interface RemovalRequestTimeline {
  date: string;
  description: string;
  details?: string;
}

export interface RemovalRequestStatus {
  requestId: string;
  protocolNumber: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  fornecedorId: string;
  createdAt: string;
  updatedAt?: string;
  reason: string;
  estimatedAnalysisDate?: string;
  rejectionReason?: string;
  rejectionDetails?: string;
  approvedAt?: string;
  timeline: RemovalRequestTimeline[];
}

export interface RemovalRequestResponse {
  success: boolean;
  message: string;
  requestId: string;
  protocolNumber: string;
  status: string;
  estimatedAnalysisDate: string;
}

export interface VendorSearchResult {
  id: string;
  nomeFantasia: string;
  categoria?: string;
  cidade?: string;
}
