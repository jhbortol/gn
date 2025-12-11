import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SupplierAuthService } from '../services/supplier-auth.service';

export const supplierAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(SupplierAuthService);
  const token = authService.getToken();

  // Only add token if it exists and request is to our API
  if (token && req.url.includes('/api/v1/supplier')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
