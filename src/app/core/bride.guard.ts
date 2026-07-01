import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BrideAuthService } from './services/bride-auth.service';
import { BrideLoginModalService } from './services/bride-login-modal.service';
import { CidadeService } from './cidade.service';
import { map, take } from 'rxjs/operators';

/**
 * Guard para proteger rotas que exigem autenticação de noiva.
 * Redireciona para a home da cidade e abre o modal de login se não autenticada.
 */
export const brideAuthGuard: CanActivateFn = (_route, _state) => {
  const brideAuthService = inject(BrideAuthService);
  const loginModalService = inject(BrideLoginModalService);
  const cidadeService = inject(CidadeService);
  const router = inject(Router);

  return brideAuthService.isLoggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      // Abre o modal de login
      loginModalService.open();

      // Redireciona para a página da cidade ativa para evitar loop de redirecionamento infinito
      const cidade = cidadeService.getCidade();
      const fallbackUrl = cidade ? `/${cidade}` : '/selecionar-cidade';
      return router.createUrlTree([fallbackUrl]);
    })
  );
};
