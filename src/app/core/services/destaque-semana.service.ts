import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DestaqueSemana } from '../models/destaque-semana.model';
import { CidadeService } from '../cidade.service';

@Injectable({ providedIn: 'root' })
export class DestaqueSemanaService {
  private platformId = inject(PLATFORM_ID);
  private cidadeService = inject(CidadeService);

  constructor(private api: ApiService) {}

  /**
   * Returns the currently active destaque da semana, or null when none is active (204 / no record).
   * Filters by current city when a cidadeSlug is provided.
   */
  getActive(cidadeSlug?: string): Observable<DestaqueSemana | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    const cidade = cidadeSlug ?? this.cidadeService.getCidade();
    const params = cidade ? { cidadeSlug: cidade } : {};

    return this.api
      .get<DestaqueSemana | DestaqueSemana[] | { data?: DestaqueSemana[] | DestaqueSemana } | null>(
        '/destaques-semana/active',
        params
      )
      .pipe(
        map(res => this.pickRandomActive(res)),
        catchError(() => of(null))
      );
  }

  private pickRandomActive(
    response: DestaqueSemana | DestaqueSemana[] | { data?: DestaqueSemana[] | DestaqueSemana } | null
  ): DestaqueSemana | null {
    const rawItems = this.extractItems(response).filter(item => item?.isActive !== false);
    if (!rawItems.length) {
      return null;
    }

    if (rawItems.length === 1) {
      return rawItems[0];
    }

    const index = Math.floor(Math.random() * rawItems.length);
    return rawItems[index] ?? rawItems[0];
  }

  private extractItems(
    response: DestaqueSemana | DestaqueSemana[] | { data?: DestaqueSemana[] | DestaqueSemana } | null
  ): DestaqueSemana[] {
    if (!response) {
      return [];
    }

    if (Array.isArray(response)) {
      return response;
    }

    if ('data' in response) {
      const data = response.data;
      if (!data) {
        return [];
      }
      return Array.isArray(data) ? data : [data];
    }

    return this.isDestaqueSemana(response) ? [response] : [];
  }

  private isDestaqueSemana(value: unknown): value is DestaqueSemana {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const candidate = value as Partial<DestaqueSemana>;
    return typeof candidate.id === 'string' && typeof candidate.fornecedorSlug === 'string';
  }
}
