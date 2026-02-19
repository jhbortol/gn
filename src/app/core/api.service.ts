import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private get apiBaseUrl(): string {
    // Tenta pegar do 'window' (injetado via script do Azure, se necessário)
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
