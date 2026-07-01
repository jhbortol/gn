
export interface BrideProfile {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  dataCasamento?: string;
  emailVerified?: boolean;
}

export interface BrideAuthResponse {
  accessToken: string;
  expiresIn: number;
  noiva: BrideProfile;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
}

export interface TermoAdesao {
  hash: string;
  versao: string;
  texto: string;
}
