import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GuardsCheckEnd, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, filter, firstValueFrom, map, shareReplay, tap } from 'rxjs';
import { CIDADE_PADRAO, CIDADES_DISPONIVEIS, CidadeConfig } from './cidades.config';
import { CidadesDataService } from './cidades-data.service';
import { CidadeDto } from './models/cidade.model';

const PREFERRED_CITY_KEY = 'gn_cidade_preferida';

@Injectable({ providedIn: 'root' })
export class CidadeService {
  private cidadesDisponiveis = CIDADES_DISPONIVEIS;
  private slugsCidadesDisponiveis = this.cidadesDisponiveis.map(c => c.slug);
  private cidades$?: Observable<CidadeDto[]>;
  private platformId = inject(PLATFORM_ID);

  cidadeAtual = signal<string>(CIDADE_PADRAO);

  private _cidadeMudou$ = new Subject<string>();
  cidadeMudou$: Observable<string> = this._cidadeMudou$.asObservable();

  constructor(private router: Router, private cidadesData: CidadesDataService) {
    this.initializarCidade();
    this.carregarCidadesDisponiveis().subscribe();
  }

  private initializarCidade(): void {
    // Update cidadeAtual at GuardsCheckEnd – fires AFTER the async city-validation
    // guard (which loads cities from the API) but BEFORE components are activated.
    // This ensures getCidade() returns the correct city in component constructors
    // and ngOnInit, fixing wrong-city data when navigating directly via URL.
    this.router.events
      .pipe(filter(event => event instanceof GuardsCheckEnd))
      .subscribe((event: GuardsCheckEnd) => {
        if (!event.shouldActivate) return;
        const cidadeDetectada = this.extrairCidadeDaUrlString(event.urlAfterRedirects || event.url);
        if (!cidadeDetectada) return;
        if (cidadeDetectada !== this.cidadeAtual()) {
          this.cidadeAtual.set(cidadeDetectada);
          this.setPreferredCidade(cidadeDetectada);
          this._cidadeMudou$.next(cidadeDetectada);
        }
      });

    // Keep NavigationEnd subscription as a safety net to stay in sync,
    // but do NOT emit cidadeMudou$ here – GuardsCheckEnd already handled it.
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const cidadeDetectada = this.extrairCidadeDaUrl();
        if (!cidadeDetectada) return;
        this.cidadeAtual.set(cidadeDetectada);
        this.setPreferredCidade(cidadeDetectada);
      });

    const cidadeDetectada = this.extrairCidadeDaUrl();
    if (cidadeDetectada) {
      this.cidadeAtual.set(cidadeDetectada);
      this.setPreferredCidade(cidadeDetectada);
    }
  }

  /** Extracts city slug from an arbitrary URL string using the current valid-cities list. */
  private extrairCidadeDaUrlString(url: string): string | null {
    const partes = (url || '').split('?')[0].split('/').filter(p => p);
    if (!partes.length) return null;
    const cidadeSlug = this.normalizarSlug(partes[0]);
    if (!cidadeSlug) return null;
    return this.slugsCidadesDisponiveis.includes(cidadeSlug) ? cidadeSlug : null;
  }

  private extrairCidadeDaUrl(): string | null {
    const partes = this.router.url.split('/').filter(p => p);

    if (!partes.length) return null;

    const cidadeSlug = this.normalizarSlug(partes[0]);
    if (!cidadeSlug) return null;

    return this.slugsCidadesDisponiveis.includes(cidadeSlug) ? cidadeSlug : null;
  }

  carregarCidadesDisponiveis(): Observable<CidadeConfig[]> {
    return this.cidadesData.getAll().pipe(
      tap(cidades => {
        if (!Array.isArray(cidades) || !cidades.length) return;

        this.cidadesDisponiveis = cidades;
        this.slugsCidadesDisponiveis = cidades.map(c => this.normalizarSlug(c.slug)).filter(Boolean);

        const cidadeAtual = this.normalizarSlug(this.cidadeAtual());
        if (!this.isCidadeValida(cidadeAtual)) {
          const cidadeFallback = this.slugsCidadesDisponiveis[0] || CIDADE_PADRAO;
          if (cidadeFallback !== this.cidadeAtual()) {
            this.cidadeAtual.set(cidadeFallback);
            this.setPreferredCidade(cidadeFallback);
            this._cidadeMudou$.next(cidadeFallback);
          }
        }
      })
    );
  }

  async isCidadeValidaAsync(cidade: string): Promise<boolean> {
    await firstValueFrom(this.carregarCidadesDisponiveis());
    return this.isCidadeValida(cidade);
  }

  getCidade(): string {
    return this.cidadeAtual();
  }

  isCidadeValida(cidade: string): boolean {
    const slug = this.normalizarSlug(cidade);
    return !!slug && this.slugsCidadesDisponiveis.includes(slug);
  }

  getCidadesDisponiveis(): string[] {
    return this.slugsCidadesDisponiveis;
  }

  getCidadeNome(slug: string): string {
    const normalized = this.normalizarSlug(slug);
    const cidade = this.cidadesDisponiveis.find(c => c.slug === normalized);
    return cidade?.nome || slug;
  }

  getCidades(): Observable<CidadeDto[]> {
    if (!this.cidades$) {
      this.cidades$ = this.carregarCidadesDisponiveis().pipe(
        map(cidades => cidades.map(cidade => ({
          id: cidade.slug,
          nome: cidade.nome,
          slug: cidade.slug,
          estado: undefined
        }))),
        shareReplay(1)
      );
    }

    return this.cidades$;
  }

  getCidadeBySlug(slug: string): Observable<CidadeDto | null> {
    const normalized = this.normalizarSlug(slug);
    return this.getCidades().pipe(
      map(cidades => cidades.find(c => c.slug === normalized) ?? null)
    );
  }

  getPreferredCidade(): string {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(PREFERRED_CITY_KEY);
      if (saved) return this.normalizarSlug(saved) || CIDADE_PADRAO;
    }

    return CIDADE_PADRAO;
  }

  setPreferredCidade(slug: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const normalized = this.normalizarSlug(slug);
      if (normalized) {
        localStorage.setItem(PREFERRED_CITY_KEY, normalized);
      }
    }
  }

  buildUrl(path: string): string {
    const cidade = this.normalizarSlug(this.getCidade()) || CIDADE_PADRAO;
    const caminhoLimpo = path.startsWith('/') ? path.slice(1) : path;
    const segmentos = caminhoLimpo.split('/').filter(s => s).map(s => s.toString().toLowerCase());
    const joined = segmentos.join('/');
    return `/${cidade}/${joined}`;
  }

  private normalizarSlug(value: string): string {
    return String(value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  }
}
