/**
 * Sistema de Tier (Free vs Vitrine)
 * Interfaces e tipos compartilhados entre componentes
 */

/**
 * Níveis de plano disponíveis
 * Zombie = Perfil não reivindicado (criado pelo admin)
 * Free = Perfil reivindicado com limite de 3 leads vitalícios
 * Vitrine = Plano pago com leads ilimitados
 */
export enum PlanLevel {
  Zombie = -2,
  Low = -1,
  Free = 0,
  Vitrine = 1
}

/**
 * Anúncio de concorrente (injetado em free tier com zumbi state)
 */
export interface CompetitorAd {
  fornecedorId: number;
  nomeFantasia: string;
  fotoUrl: string;
  whatsAppUrl: string;
  detailUrl: string;
}

/**
 * DTO público do fornecedor (retornado pela API com tier logic)
 */
export interface VendorPublicDto {
  id: number;
  nomeFantasia: string;
  descricao?: string;
  fotoUrl: string;
  planLevel: PlanLevel;

  // Campos com lógica tier
  phoneDisplay: string;
  whatsAppUrl?: string; // null para Zombie e Free, apenas Vitrine
  showContactForm: boolean; // true para Zombie e Free
  adInjection: CompetitorAd[]; // populado apenas para Free tier

  socialMedia?: Record<string, string>;
  position: number;
  updatedAt: string;
}

/**
 * Modelo interno de lead
 */
export interface LeadData {
  clienteName: string;
  clienteEmail: string;
  clientePhone: string;
  message: string;
  lgpdConsent: boolean;
}

/**
 * Resposta após submissão de lead
 */
export interface LeadSubmitResponse {
  success: boolean;
  message: string;
  leadId: number;
}

/**
 * Lead recebido pelo fornecedor (dashboard)
 */
export interface LeadDto {
  id: number;
  clienteName: string;
  clienteEmail: string;
  clientePhone: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  orderIndex: number;
  isBlurred: boolean;
}

/**
 * Resposta da listagem de leads do painel
 */
export interface FornecedorLeadsResponse {
  totalLeads: number;         // Total para paginação atual / total geral
  totalLeadsAllTime: number;  // Total vitalício para controle de tier
  unreadLeads: number;
  leadCountThisMonth: number;
  leadLimit: number; // 3 para Free, 999999 para Vitrine
  planLevel: PlanLevel;
  leads: LeadDto[];
}
