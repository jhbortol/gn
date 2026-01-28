import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SupplierAuthService } from '../services/supplier-auth.service';

export const supplierAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(SupplierAuthService);
  const token = authService.getToken();

  // Add token if request is to /api/v1/supplier or /api/v1/fornecedores
  if (token && (req.url.includes('/api/v1/supplier') || req.url.includes('/api/v1/fornecedores'))) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
