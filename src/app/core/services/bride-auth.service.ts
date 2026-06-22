import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { BrideAuthResponse, BrideProfile } from '../models/bride-auth.model';

const BRIDE_TOKEN_KEY = 'bride_accessToken';
const BRIDE_PROFILE_KEY = 'bride_profile';
const BRIDE_EXPIRY_KEY = 'bride_token_expiry';

@Injectable({ providedIn: 'root' })
export class BrideAuthService {
  private token$ = new BehaviorSubject<string | null>(null);
  private profile$ = new BehaviorSubject<BrideProfile | null>(null);
  private readonly platformId: object;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId;
    this.restoreSession();
  }

  private restoreSession(): void {
    if (!this.canUseLocalStorage()) return;

    try {
      const token = localStorage.getItem(BRIDE_TOKEN_KEY);
      const profileStr = localStorage.getItem(BRIDE_PROFILE_KEY);
      const expiry = localStorage.getItem(BRIDE_EXPIRY_KEY);

      if (token && profileStr) {
        if (expiry) {
          const expiryTime = parseInt(expiry, 10);
          if (Date.now() < expiryTime) {
            this.token$.next(token);
            this.profile$.next(JSON.parse(profileStr));
          } else {
            console.warn('[BrideAuth] Restored token is expired; clearing session.');
            this.logout();
          }
        } else {
          this.token$.next(token);
          this.profile$.next(JSON.parse(profileStr));
        }
      }
    } catch (e) {
      console.warn('[BrideAuth] Failed to restore session', e);
    }
  }

  get token(): string | null {
    if (this.isTokenExpired()) {
      this.logout();
      return null;
    }
    return this.token$.value;
  }

  public readonly isLoggedIn$: Observable<boolean> = this.token$.pipe(
    map(token => {
      if (token && this.isTokenExpired()) {
        setTimeout(() => this.logout(), 0);
        return false;
      }
      return !!token;
    })
  );

  get isLoggedIn(): boolean {
    if (this.isTokenExpired()) {
      this.logout();
      return false;
    }
    return !!this.token$.value;
  }

  getBrideProfile(): Observable<BrideProfile | null> {
    return this.profile$.asObservable();
  }

  get profile(): BrideProfile | null {
      if (this.isTokenExpired()) {
        this.logout();
        return null;
      }
      return this.profile$.value;
  }

  loginWithGoogle(idToken: string): Observable<BrideAuthResponse> {
    return this.http.post<BrideAuthResponse>(`${environment.API_BASE_URL}/auth/noiva/google`, { idToken }).pipe(
      tap(resp => this.handleAuthResponse(resp))
    );
  }

  loginWithEmail(payload: any): Observable<BrideAuthResponse> {
    return this.http.post<BrideAuthResponse>(`${environment.API_BASE_URL}/auth/noiva/signin`, payload).pipe(
      tap(resp => this.handleAuthResponse(resp))
    );
  }

  registerWithEmail(payload: any): Observable<BrideAuthResponse> {
    return this.http.post<BrideAuthResponse>(`${environment.API_BASE_URL}/auth/noiva/signup`, payload).pipe(
      tap(resp => this.handleAuthResponse(resp))
    );
  }



  private handleAuthResponse(resp: BrideAuthResponse): void {
    this.token$.next(resp.accessToken);
    this.profile$.next(resp.noiva);

    if (this.canUseLocalStorage()) {
      localStorage.setItem(BRIDE_TOKEN_KEY, resp.accessToken);
      localStorage.setItem(BRIDE_PROFILE_KEY, JSON.stringify(resp.noiva));
      if (resp.expiresIn) {
        const expiryMs = resp.expiresIn * 1000;
        const expiryTime = Date.now() + expiryMs;
        localStorage.setItem(BRIDE_EXPIRY_KEY, expiryTime.toString());
      }
    }
  }

  updateProfile(payload: Partial<BrideProfile>): Observable<BrideAuthResponse> {
    return this.http.put<BrideAuthResponse>(`${environment.API_BASE_URL}/noiva/profile`, payload).pipe(
      tap(resp => this.handleAuthResponse(resp)),
      catchError(err => {
        console.error('[BrideAuth] Failed to update profile', err);
        return throwError(() => err);
      })
    );
  }

  sendVerificationEmail(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.API_BASE_URL}/noiva/send-verification-email`, {}).pipe(
      catchError(err => {
        console.error('[BrideAuth] Failed to send verification email', err);
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    this.token$.next(null);
    this.profile$.next(null);

    if (this.canUseLocalStorage()) {
      localStorage.removeItem(BRIDE_TOKEN_KEY);
      localStorage.removeItem(BRIDE_PROFILE_KEY);
      localStorage.removeItem(BRIDE_EXPIRY_KEY);
    }
  }

  isTokenExpired(): boolean {
    if (!this.canUseLocalStorage()) return false;
    try {
      const expiry = localStorage.getItem(BRIDE_EXPIRY_KEY);
      if (expiry) {
        const expiryTime = parseInt(expiry, 10);
        // Consider expired if within 10 seconds of expiration
        return Date.now() >= (expiryTime - 10000);
      }
    } catch {
      return false;
    }
    return false;
  }

  private canUseLocalStorage(): boolean {
    try {
      if (!isPlatformBrowser(this.platformId)) return false;
      return typeof window !== 'undefined' && !!window.localStorage;
    } catch {
      return false;
    }
  }
}
