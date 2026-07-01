import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MeuCasamentoStoreService } from './services/meu-casamento-store.service';

export const weddingToolsGuard: CanActivateFn = () => {
  const store = inject(MeuCasamentoStoreService);
  const router = inject(Router);

  return store.availableTools()
    ? true
    : router.createUrlTree(['/meu-casamento'], { queryParams: { desbloqueioPendente: '1' } });
};
