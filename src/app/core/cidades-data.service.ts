import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, shareReplay, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { CIDADES_DISPONIVEIS, CidadeConfig } from './cidades.config';

@Injectable({ providedIn: 'root' })
export class CidadesDataService {
  private readonly endpoints = ['/public/cidades', '/cidades', '/public/fornecedores/cidades'];
  private cache$?: Observable<CidadeConfig[]>;

  constructor(private api: ApiService) {}

  getAll(): Observable<CidadeConfig[]> {
    if (this.cache$) return this.cache$;

    const requests = this.endpoints.map(endpoint =>
      this.api.get<any>(endpoint).pipe(
        map(response => this.normalizeResponse(response)),
        catchError(() => of([]))
      )
    );

    this.cache$ = this.concatUntilNotEmpty(requests).pipe(shareReplay(1));
    return this.cache$;
  }

  private concatUntilNotEmpty(requests: Observable<CidadeConfig[]>[]): Observable<CidadeConfig[]> {
    const [first, ...rest] = requests;

    if (!first) {
      return of(CIDADES_DISPONIVEIS);
    }

    return first.pipe(
      map(list => this.sanitize(list)),
      switchMap(list => (list.length ? of(list) : this.concatUntilNotEmpty(rest))),
      catchError(() => this.concatUntilNotEmpty(rest))
    );
  }

  private normalizeResponse(response: any): CidadeConfig[] {
    const rawList = Array.isArray(response)
      ? response
      : response?.data || response?.Data || response?.items || response?.Items || [];

    return (rawList || []).map((cidade: any) => {
      const nome = String(cidade?.nome || cidade?.Nome || cidade?.name || cidade?.Name || '').trim();
      const slugSource = cidade?.slug || cidade?.Slug || cidade?.codigo || cidade?.Codigo || nome;
      const slug = this.slugify(String(slugSource || ''));

      return { slug, nome: nome || slug };
    });
  }

  private sanitize(list: CidadeConfig[]): CidadeConfig[] {
    const uniques = new Map<string, CidadeConfig>();

    for (const cidade of list) {
      const slug = this.slugify(cidade.slug);
      if (!slug) continue;
      if (uniques.has(slug)) continue;

      uniques.set(slug, {
        slug,
        nome: (cidade.nome || slug).trim()
      });
    }

    return Array.from(uniques.values());
  }

  private slugify(value: string): string {
    return String(value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  }
}
