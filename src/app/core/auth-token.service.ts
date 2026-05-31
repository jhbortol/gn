import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, throwError } from 'rxjs';
import { catchError, filter, first, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: { id: string; email: string; roles: string[] };
}

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private token$ = new BehaviorSubject<string | null>(null);
  private loginInFlight = false;
  private readonly platformId: object;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId;
    // Try to restore token from sessionStorage on init (only in browser)
    this.restoreToken();
  }

  getToken(): Observable<string> {
    if (this.token$.value) {
      return of(this.token$.value);
    }
    return this.ensureLogin();
  }

  private restoreToken(): void {
    if (!this.canUseSessionStorage()) {
      console.warn('[AUTH] sessionStorage not available; skipping token restore');
      return;
    }

    try {
      const storedToken = sessionStorage.getItem(TOKEN_KEY);
      const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

      if (storedToken && expiry) {
        const expiryTime = parseInt(expiry, 10);
        if (Date.now() < expiryTime) {
          this.token$.next(storedToken);
        } else {
          // Token expired, clear it
          this.clearToken();
        }
      }
    } catch (e) {
      console.warn('[AUTH] Unable to restore token from storage', e);
    }
  }

  private ensureLogin(): Observable<string> {
    if (this.token$.value) {
      return of(this.token$.value);
    }
    if (this.loginInFlight) {
      return this.token$.pipe(filter(t => !!t), first()) as Observable<string>;
    }
    this.loginInFlight = true;
    const email = environment.INTERNAL_AUTH_EMAIL;
    const password = environment.INTERNAL_AUTH_PASSWORD;
    if (!email || !password || email === 'CHANGEME') {
      return throwError(() => new Error('Credenciais internas não configuradas (environment).'));
    }
    // Backend exige JSON; usar application/json (o OPTIONS é aceitável se ocorrer)
    return this.http.post<LoginResponse>(`${environment.API_BASE_URL}/auth/login`, { email, password }).pipe(
      tap(resp => {
        // Store token securely in sessionStorage (HttpOnly cookies handled by server)
        // Note: Ensure backend sets HttpOnly, Secure, SameSite cookies
        this.storeToken(resp.accessToken, resp.expiresIn);
        this.token$.next(resp.accessToken);
        this.loginInFlight = false;
      }),
      switchMap(resp => of(resp.accessToken)),
      catchError(err => {
        this.loginInFlight = false;
        console.error('[AUTH] Login failed:', err);
        return throwError(() => err);
      })
    );
  }

  private storeToken(token: string, expiresIn?: number): void {
    if (!this.canUseSessionStorage()) {
      console.warn('[AUTH] sessionStorage not available; skipping token store');
      return;
    }

    try {
      sessionStorage.setItem(TOKEN_KEY, token);

      // Store expiry time (default 1 hour)
      const expiryMs = (expiresIn || 3600) * 1000;
      const expiryTime = Date.now() + expiryMs;
      sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    } catch (e) {
      console.warn('[AUTH] Unable to store token in sessionStorage', e);
    }
  }

  clearToken(): void {
    if (!this.canUseSessionStorage()) {
      // nothing to clear
      this.token$.next(null);
      return;
    }

    try {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
    } catch (e) {
      console.warn('[AUTH] Unable to clear token from storage', e);
    }
    this.token$.next(null);
  }

  private canUseSessionStorage(): boolean {
    try {
      if (!isPlatformBrowser(this.platformId)) return false;
      // access window.sessionStorage safely
      return typeof window !== 'undefined' && !!window.sessionStorage;
    } catch {
      return false;
    }
  }
}
