import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, Observable, of, shareReplay, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CidadeDto } from './models/cidade.model';

@Injectable({ providedIn: 'root' })
export class CidadeService {
  // Cidades conhecidas localmente (usadas como fallback enquanto a API não carrega)
  private readonly CIDADES_FALLBACK = ['piracicaba'];

  // Cidades carregadas da API
  private cidadesDisponiveis: string[] = this.CIDADES_FALLBACK;

  // Sinal reativo da cidade atual
  cidadeAtual = signal<string>('piracicaba');

  // Cache de cidades da API
  private cidades$?: Observable<CidadeDto[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.initializarCidade();
    this.carregarCidades();
  }

  /**
   * Carrega a lista de cidades disponíveis da API e atualiza o sinal reativo.
   */
  private carregarCidades(): void {
    this.getCidades().subscribe(cidades => {
      if (cidades.length > 0) {
        this.cidadesDisponiveis = cidades.map(c => c.slug.toLowerCase());
      }
    });
  }

  private initializarCidade(): void {
    // Detectar cidade na rota quando navegar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const cidadeDetectada = this.extrairCidadeDaUrl();
        if (cidadeDetectada) {
          this.cidadeAtual.set(cidadeDetectada);
        }
      });

    // Também detectar na primeira navegação
    const cidadeDetectada = this.extrairCidadeDaUrl();
    if (cidadeDetectada) {
      this.cidadeAtual.set(cidadeDetectada);
    }
  }

  private extrairCidadeDaUrl(): string | null {
    const url = this.router.url;

    // Verificar se a primeira parte da URL é uma cidade válida
    const partes = url.split('/').filter(p => p);

    if (partes.length > 0) {
      const candidato = partes[0].toLowerCase();
      // Aceitar qualquer slug que pareça uma cidade (não seja uma rota conhecida de nível raiz)
      const rotasRaiz = new Set(['politica-de-privacidade', 'assets']);
      if (!rotasRaiz.has(candidato)) {
        return candidato;
      }
    }

    return null;
  }

  /**
   * Obtém a cidade atual
   */
  getCidade(): string {
    return this.cidadeAtual();
  }

  /**
   * Verifica se uma cidade é válida
   */
  isCidadeValida(cidade: string): boolean {
    return this.cidadesDisponiveis.includes(cidade.toLowerCase())
      || this.CIDADES_FALLBACK.includes(cidade.toLowerCase());
  }

  /**
   * Retorna lista de slugs de cidades disponíveis
   */
  getCidadesDisponiveis(): string[] {
    return this.cidadesDisponiveis;
  }

  /**
   * Retorna a lista completa de cidades (com metadados) da API.
   * Resultados são cacheados após a primeira chamada.
   */
  getCidades(): Observable<CidadeDto[]> {
    if (!this.cidades$) {
      this.cidades$ = this.http
        .get<CidadeDto[] | { data: CidadeDto[] }>(`${environment.API_BASE_URL}/public/cidades`)
        .pipe(
          map(res => {
            const list = Array.isArray(res) ? res : (res as any)?.data ?? [];
            return list.map((c: any) => ({
              id: c.id || c.Id,
              nome: c.nome || c.Nome || '',
              slug: (c.slug || c.Slug || '').toLowerCase(),
              estado: c.estado || c.Estado || undefined
            })) as CidadeDto[];
          }),
          catchError(() => of(this.CIDADES_FALLBACK.map(slug => ({ id: slug, nome: slug, slug })))),
          shareReplay(1)
        );
    }
    return this.cidades$;
  }

  /**
   * Busca detalhes de uma cidade pelo slug.
   */
  getCidadeBySlug(slug: string): Observable<CidadeDto | null> {
    return this.getCidades().pipe(
      map(cidades => cidades.find(c => c.slug === slug.toLowerCase()) ?? null)
    );
  }

  /**
   * Constrói uma URL com a cidade
   * Exemplo: buildUrl('fornecedores') → '/piracicaba/fornecedores'
   */
  buildUrl(path: string): string {
    const cidade = this.getCidade();
    const caminhoLimpo = path.startsWith('/') ? path.slice(1) : path;
    // Normalizar segmentos para lowercase (slugs são case-sensitive no backend Linux)
    const segmentos = caminhoLimpo.split('/').filter(s => s).map(s => s.toString().toLowerCase());
    const joined = segmentos.join('/');
    return `/${cidade}/${joined}`;
  }
}
