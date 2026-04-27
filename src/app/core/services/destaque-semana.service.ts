import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DestaqueSemana } from '../models/destaque-semana.model';

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

    return this.api.get<DestaqueSemana | null>('/destaques-semana/active').pipe(
      map(res => res ?? null),
      catchError(() => of(null))
    );
  }
}
