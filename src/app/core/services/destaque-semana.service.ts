import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DestaqueSemana } from '../models/destaque-semana.model';

const ROTATION_INDEX_KEY = 'destaque_popup_rotation_index';

@Injectable({ providedIn: 'root' })
export class DestaqueSemanaService {
  private platformId = inject(PLATFORM_ID);

  constructor(private api: ApiService) {}

  /**
   * Returns the currently active destaque da semana, or null when none is active (204 / no record).
   */
  getActive(): Observable<DestaqueSemana | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    return this.api
      .get<DestaqueSemana | DestaqueSemana[] | { data?: DestaqueSemana[] | DestaqueSemana } | null>(
        '/destaques-semana/active'
      )
      .pipe(
        map(res => this.pickAlternatingActive(res)),
        catchError(() => of(null))
      );
  }

  private pickAlternatingActive(
    response: DestaqueSemana | DestaqueSemana[] | { data?: DestaqueSemana[] | DestaqueSemana } | null
  ): DestaqueSemana | null {
    const rawItems = this.extractItems(response).filter(item => item?.isActive !== false);
    if (!rawItems.length) {
      return null;
    }

    if (rawItems.length === 1) {
      return rawItems[0];
    }

    const index = this.getAndAdvanceRotationIndex(rawItems.length);
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

  private getAndAdvanceRotationIndex(totalItems: number): number {
    if (!isPlatformBrowser(this.platformId) || totalItems <= 1) {
      return 0;
    }

    const raw = localStorage.getItem(ROTATION_INDEX_KEY);
    const parsed = raw ? Number.parseInt(raw, 10) : 0;
    const currentIndex = Number.isFinite(parsed) && parsed >= 0 ? parsed % totalItems : 0;
    const nextIndex = (currentIndex + 1) % totalItems;

    localStorage.setItem(ROTATION_INDEX_KEY, String(nextIndex));
    return currentIndex;
  }
}
