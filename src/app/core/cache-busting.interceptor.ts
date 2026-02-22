import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * HTTP Interceptor to add cache busting to requests when cache-bust param is present in URL
 * This ensures fresh data is fetched when user performs reload via cache bust mechanism
 */
@Injectable()
export class CacheBustingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        return next.handle(req);
      }

      // Get cache-bust parameter from URL if present
      const url = new URL(window.location.href);
      if (url.searchParams.has('cache-bust')) {
        const nonce = url.searchParams.get('cache-bust');
        
        // Add cache-bust param to all requests
        req = req.clone({
          setParams: {
            '_cache': nonce || ''
          }
        });

        console.log('🔄 Cache bust interceptor applied:', nonce);
      }
    } catch (e) {
      console.warn('Error in cache busting interceptor:', e);
    }

    return next.handle(req);
  }
}
