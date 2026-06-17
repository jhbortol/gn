import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BrideAuthService } from './services/bride-auth.service';
import { map, take } from 'rxjs/operators';

/**
 * Guard para proteger rotas que exigem autenticação de noiva.
 * Redireciona para /meu-casamento se não autenticada.
 */
export const brideAuthGuard: CanActivateFn = (_route, _state) => {
  const brideAuthService = inject(BrideAuthService);
  const router = inject(Router);

  return brideAuthService.isLoggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      // Redireciona para meu-casamento se não autenticada
      return router.createUrlTree(['/meu-casamento']);
    })
  );
};
