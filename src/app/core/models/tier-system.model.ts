/**
 * Sistema de Tier (Free vs Vitrine)
 * Interfaces e tipos compartilhados entre componentes
 */

/**
 * Níveis de plano disponíveis
 */
export enum PlanLevel {
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
  whatsAppUrl?: string; // null para Free
  showContactForm: boolean; // true para Free < 3 leads
  adInjection: CompetitorAd[]; // populado apenas em zumbi state

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
}

/**
 * Resposta da listagem de leads do painel
 */
export interface FornecedorLeadsResponse {
  totalLeads: number;
  unreadLeads: number;
  leadCountThisMonth: number;
  leadLimit: number; // 3 para Free, 999999 para Vitrine
  leads: LeadDto[];
}
