import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CidadeService {
  // Cidades suportadas
  private readonly CIDADES_DISPONIVEIS = ['piracicaba']; //, 'limeira', 'americana'
  
  // Sinal reativo da cidade atual
  cidadeAtual = signal<string>('piracicaba');

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initializarCidade();
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
    
    if (partes.length > 0 && this.CIDADES_DISPONIVEIS.includes(partes[0])) {
      return partes[0];
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
    return this.CIDADES_DISPONIVEIS.includes(cidade.toLowerCase());
  }

  /**
   * Retorna lista de cidades disponíveis
   */
  getCidadesDisponiveis(): string[] {
    return this.CIDADES_DISPONIVEIS;
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
