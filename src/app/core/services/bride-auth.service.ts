import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { BrideAuthResponse, BrideProfile, AppleLoginPayload } from '../models/bride-auth.model';

const BRIDE_TOKEN_KEY = 'bride_accessToken';
const BRIDE_PROFILE_KEY = 'bride_profile';

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

      if (token && profileStr) {
        this.token$.next(token);
        this.profile$.next(JSON.parse(profileStr));
      }
    } catch (e) {
      console.warn('[BrideAuth] Failed to restore session', e);
    }
  }

  get token(): string | null {
    return this.token$.value;
  }

  get isLoggedIn$(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.token$.subscribe(token => subscriber.next(!!token));
    });
  }

  get isLoggedIn(): boolean {
    return !!this.token$.value;
  }

  getBrideProfile(): Observable<BrideProfile | null> {
    return this.profile$.asObservable();
  }

  get profile(): BrideProfile | null {
      return this.profile$.value;
  }

  loginWithGoogle(idToken: string): Observable<BrideAuthResponse> {
    return this.http.post<BrideAuthResponse>(`${environment.API_BASE_URL}/auth/noiva/google`, { idToken }).pipe(
      tap(resp => this.handleAuthResponse(resp))
    );
  }

  loginWithApple(payload: AppleLoginPayload): Observable<BrideAuthResponse> {
    return this.http.post<BrideAuthResponse>(`${environment.API_BASE_URL}/auth/noiva/apple`, payload).pipe(
      tap(resp => this.handleAuthResponse(resp))
    );
  }

  private handleAuthResponse(resp: BrideAuthResponse): void {
    this.token$.next(resp.accessToken);
    this.profile$.next(resp.noiva);

    if (this.canUseLocalStorage()) {
      localStorage.setItem(BRIDE_TOKEN_KEY, resp.accessToken);
      localStorage.setItem(BRIDE_PROFILE_KEY, JSON.stringify(resp.noiva));
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
    }
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
