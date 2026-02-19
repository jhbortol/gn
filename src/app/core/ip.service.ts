import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IpInfo {
  ip: string;
}

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private static readonly IP_API_URL = 'https://api.ipify.org?format=json';

  constructor() {}

  /**
   * Busca o IP público do usuário
   * @returns Observable com o IP do usuário ou uma string vazia em caso de erro
   */
  getUserIp(): Observable<string> {
    return new Observable<string>(observer => {
      fetch(IpService.IP_API_URL)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: IpInfo) => {
          observer.next(data.ip);
          observer.complete();
        })
        .catch(error => {
          console.warn('Erro ao buscar IP do usuário:', error);
          observer.next('');
          observer.complete();
        });
    });
  }
}
