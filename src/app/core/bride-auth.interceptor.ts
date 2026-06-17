import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BrideAuthService } from './services/bride-auth.service';

export const brideAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const brideAuthService = inject(BrideAuthService);
  const token = brideAuthService.token;

  // Never inject bride_token into admin or supplier routes
  if (req.url.includes('/api/v1/admin/') || req.url.includes('/api/v1/supplier/')) {
    return next(req);
  }

  // Inject token if the route is specifically for bride
  const isBrideRoute = req.url.includes('/v1/noiva/');
  
  // Or if it's a contact request and we have a token (logged-in bride)
  const isContactRoute = req.url.includes('/public/fornecedores/') && req.url.includes('/contact');

  if (token && (isBrideRoute || (isContactRoute && req.method === 'POST'))) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
