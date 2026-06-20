import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BrideAuthService } from './services/bride-auth.service';

export const brideAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const brideAuthService = inject(BrideAuthService);
  const token = brideAuthService.token;

  // Never inject bride_token into admin or supplier routes
  if (req.url.includes('/api/v1/admin/') || req.url.includes('/api/v1/supplier/')) {
    return next(req);
  }

  // Inject token if the route is specifically for bride or meu-casamento
  const isBrideRoute = req.url.includes('/v1/noiva/') || req.url.includes('/v1/meu-casamento/');
  
  // Or if it's a contact request and we have a token (logged-in bride)
  const isContactRoute = req.url.includes('/public/fornecedores/') && req.url.includes('/contact');

  let activeReq = req;

  if (token && (isBrideRoute || (isContactRoute && req.method === 'POST'))) {
    activeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(activeReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
        if (isBrideRoute || isContactRoute) {
          console.warn('[BrideAuthInterceptor] Unauthorized or Forbidden response on bride route, performing auto-logout');
          brideAuthService.logout();
        }
      }
      return throwError(() => error);
    })
  );
};
