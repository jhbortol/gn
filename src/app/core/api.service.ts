import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private http: HttpClient) {}

  private get apiBaseUrl(): string {
    // Durante SSR/prerendering, sempre usa environment.API_BASE_URL
    if (!isPlatformBrowser(this.platformId)) {
      return environment.API_BASE_URL;
    }
    
    // No browser, tenta pegar do 'window' (injetado via script do Azure, se necessário)
    // senão usa o que foi definido no build (environment.ts ou environment.prod.ts)
    return (window as any).API_BASE_URL || environment.API_BASE_URL;
  }

  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) httpParams = httpParams.set(k, String(v));
      });
    }
    return this.http.get<T>(`${this.apiBaseUrl}${url}`, { params: httpParams });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiBaseUrl}${url}`, body);
  }
}
