import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, timeout, catchError } from 'rxjs/operators';

export interface IpInfo {
  ip: string;
}

@Injectable({
  providedIn: 'root'
})
export class IpService {
  // Using CORS-friendly IP detection APIs
  // bigdatacloud: Returns JSON, supports CORS
  // amazonaws: Simple text response, very reliable
  private static readonly IP_API_URLS = [
    'https://api.bigdatacloud.net/data/client-ip',
    'https://checkip.amazonaws.com'
  ];

  constructor(private http: HttpClient) {}

  /**
   * Busca o IP público do usuário
   * @returns Observable com o IP do usuário ou uma string vazia em caso de erro
   */
  getUserIp(): Observable<string> {
    console.log('[IpService] Iniciando busca do IP do usuário...');
    
    // Try primary API first (JSON response with CORS support)
    return this.http.get<any>(IpService.IP_API_URLS[0]).pipe(
      timeout(5000),
      map(response => {
        // bigdatacloud returns: { ipString: "1.2.3.4", ... }
        const ip = response.ipString || response.ip || '';
        console.log('[IpService] IP extraído com sucesso (primary):', ip);
        return ip;
      }),
      catchError(error => {
        console.warn('[IpService] Erro ao buscar IP (primary):', error.message);
        // Try fallback API (plain text response, very reliable)
        return this.http.get(IpService.IP_API_URLS[1], { responseType: 'text' }).pipe(
          timeout(5000),
          map(ip => {
            const cleanIp = ip.trim();
            console.log('[IpService] IP extraído com sucesso (fallback):', cleanIp);
            return cleanIp;
          }),
          catchError(fallbackError => {
            console.warn('[IpService] Erro ao buscar IP (fallback):', fallbackError.message);
            console.log('[IpService] Retornando string vazia');
            return of('');
          })
        );
      })
    );
  }
}
