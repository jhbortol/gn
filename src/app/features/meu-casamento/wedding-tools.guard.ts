import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MeuCasamentoStoreService } from './services/meu-casamento-store.service';
import { ToastService } from '../../shared/services/toast.service';

export const weddingToolsGuard: CanActivateFn = () => {
  const store = inject(MeuCasamentoStoreService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (store.availableTools()) {
    return true;
  }

  toast.error('Preencha nome do casal e WhatsApp para liberar esta ferramenta.');
  return router.createUrlTree(['/meu-casamento'], { queryParams: { desbloqueioPendente: '1' } });
};
