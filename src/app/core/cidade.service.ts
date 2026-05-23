import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { firstValueFrom, filter, tap } from 'rxjs';
import { CIDADE_PADRAO, CIDADES_DISPONIVEIS } from './cidades.config';
import { CidadesDataService } from './cidades-data.service';

@Injectable({ providedIn: 'root' })
export class CidadeService {
  private cidadesDisponiveis = CIDADES_DISPONIVEIS;
  private slugsCidadesDisponiveis = this.cidadesDisponiveis.map(c => c.slug);

  cidadeAtual = signal<string>(CIDADE_PADRAO);

  constructor(private router: Router, private cidadesData: CidadesDataService) {
    this.initializarCidade();
    this.carregarCidadesDisponiveis().subscribe();
  }

  private initializarCidade(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const cidadeDetectada = this.extrairCidadeDaUrl();
        if (cidadeDetectada) {
          this.cidadeAtual.set(cidadeDetectada);
        }
      });

    const cidadeDetectada = this.extrairCidadeDaUrl();
    if (cidadeDetectada) {
      this.cidadeAtual.set(cidadeDetectada);
    }
  }

  private extrairCidadeDaUrl(): string | null {
    const url = this.router.url;
    const partes = url.split('/').filter(p => p);

    if (partes.length > 0 && this.slugsCidadesDisponiveis.includes(partes[0])) {
      return partes[0];
    }

    return null;
  }

  carregarCidadesDisponiveis() {
    return this.cidadesData.getAll().pipe(
      tap(cidades => {
        if (!Array.isArray(cidades) || !cidades.length) return;

        this.cidadesDisponiveis = cidades;
        this.slugsCidadesDisponiveis = cidades.map(c => c.slug);

        const cidadeAtual = this.cidadeAtual();
        if (!this.isCidadeValida(cidadeAtual)) {
          this.cidadeAtual.set(cidades[0].slug);
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
    return this.slugsCidadesDisponiveis.includes(cidade.toLowerCase());
  }

  getCidadesDisponiveis(): string[] {
    return this.slugsCidadesDisponiveis;
  }

  getCidadeNome(slug: string): string {
    const cidade = this.cidadesDisponiveis.find(c => c.slug === slug.toLowerCase());
    return cidade?.nome || slug;
  }

  buildUrl(path: string): string {
    const cidade = this.getCidade();
    const caminhoLimpo = path.startsWith('/') ? path.slice(1) : path;
    const segmentos = caminhoLimpo.split('/').filter(s => s).map(s => s.toString().toLowerCase());
    const joined = segmentos.join('/');
    return `/${cidade}/${joined}`;
  }
}
