export interface AppleLoginPayload {
  idToken: string;
  firstName?: string; // Vem apenas no primeiro login da Apple
  lastName?: string;  // Vem apenas no primeiro login da Apple
}

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
