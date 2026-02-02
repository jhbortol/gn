import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = [
    '/auth/login',
    '/newsletter/subscribe',
    '/files/download',
    '/leads/guia-precos',
    '/leads/contact',
    '/contato',
    '/api/v1/supplier',
    '/api/v1/fornecedores',
    '/public/categorias',
    '/public/fornecedores',
    '/public/leads',
    '/me/',
    '/api/v1/account'
  ];

  // Não anexar token em chamadas públicas
  if (publicRoutes.some(route => req.url.includes(route))) {
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
