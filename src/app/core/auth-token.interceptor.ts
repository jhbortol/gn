import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Não anexar token em chamadas de login
  if (req.url.includes('/auth/login')) {
    return next(req);
  }
  const auth = inject(AuthTokenService);
  return auth.getToken().pipe(
    switchMap(token => {
      const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
      return next(authReq);
    })
  );
};
