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
  private static readonly IP_API_URL = 'https://api.ipify.org?format=json';

  constructor(private http: HttpClient) {}

  /**
   * Busca o IP público do usuário
   * @returns Observable com o IP do usuário ou uma string vazia em caso de erro
   */
  getUserIp(): Observable<string> {
    console.log('[IpService] Iniciando busca do IP do usuário...');
    
    return this.http.get<IpInfo>(IpService.IP_API_URL).pipe(
      timeout(5000), // Timeout de 5 segundos
      map(response => {
        console.log('[IpService] Resposta recebida:', response);
        return response.ip;
      }),
      catchError(error => {
        console.warn('[IpService] Erro ao buscar IP:', error);
        return of('');
      })
    );
  }
}
