import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface SupplierUser {
  userId: string;
  email: string;
  fornecedorId: string;
  displayName?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    roles: string;
    fornecedorId: string;
  };
}

@Injectable({ providedIn: 'root' })
export class SupplierAuthService {
  private readonly TOKEN_KEY = 'supplier_token';
  private readonly REFRESH_KEY = 'supplier_refresh_token';
  private readonly USER_KEY = 'supplier_user';
  private readonly EXPIRY_KEY = 'supplier_token_expiry';

  constructor(private router: Router) {
    this.restoreSession();
  }

  private restoreSession(): void {
    const expiry = sessionStorage.getItem(this.EXPIRY_KEY);
    if (expiry && new Date().getTime() > parseInt(expiry, 10)) {
      this.clearSession();
    }
  }

  storeSession(response: LoginResponse): void {
    const expiryTime = new Date().getTime() + (response.expiresIn * 1000);
    
    sessionStorage.setItem(this.TOKEN_KEY, response.accessToken);
    sessionStorage.setItem(this.REFRESH_KEY, response.refreshToken);
    sessionStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
    sessionStorage.setItem(this.USER_KEY, JSON.stringify({
      userId: response.user.id,
      email: response.user.email,
      fornecedorId: response.user.fornecedorId,
      displayName: response.user.email
    }));
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_KEY);
  }

  getUser(): SupplierUser | null {
    const userJson = sessionStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getFornecedorId(): string | null {
    const user = this.getUser();
    return user?.fornecedorId || null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiry = sessionStorage.getItem(this.EXPIRY_KEY);
    
    if (!token || !expiry) {
      return false;
    }

    if (new Date().getTime() > parseInt(expiry, 10)) {
      this.clearSession();
      return false;
    }

    return true;
  }

  clearSession(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.EXPIRY_KEY);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/painel/login']);
  }
}
