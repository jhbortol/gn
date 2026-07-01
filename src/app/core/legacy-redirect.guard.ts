import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CidadeService } from './cidade.service';

/**
 * Guard para rotas legadas sem prefixo de cidade (ex: /categorias, /fornecedores).
 * Redireciona para /{cidadePreferida}/{destPath} usando a última cidade visitada
 * (persistida em localStorage) ou 'piracicaba' como fallback.
 *
 * Uso nas rotas:
 *   { path: 'categorias', canActivate: [legacyRedirectGuard('categorias')], component: NeverRenderedComponent }
 */
export function legacyRedirectGuard(destPath: string): CanActivateFn {
  return () => {
    const cidadeService = inject(CidadeService);
    const router = inject(Router);
    const cidade = cidadeService.getPreferredCidade();
    return router.createUrlTree(['/', cidade, destPath]);
  };
}
