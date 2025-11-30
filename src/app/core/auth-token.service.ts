import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, throwError } from 'rxjs';
import { catchError, filter, first, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: { id: string; email: string; roles: string[] };
}

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private token$ = new BehaviorSubject<string | null>(null);
  private loginInFlight = false;

  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    if (this.token$.value) {
      return of(this.token$.value);
    }
    return this.ensureLogin();
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
        this.token$.next(resp.accessToken);
        this.loginInFlight = false;
      }),
      switchMap(resp => of(resp.accessToken)),
      catchError(err => {
        this.loginInFlight = false;
        return throwError(() => err);
      })
    );
  }

  clearToken(): void {
    this.token$.next(null);
  }
}
