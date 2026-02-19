import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiBaseUrl: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiBaseUrl = isPlatformServer(this.platformId) && process.env['API_BASE_URL']
      ? process.env['API_BASE_URL']
      : environment.API_BASE_URL;
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
