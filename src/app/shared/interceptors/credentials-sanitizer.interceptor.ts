import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * HTTP Interceptor that sanitizes sensitive credentials (email, password)
 * to prevent exposure in browser DevTools Network tab and console logs.
 */
@Injectable()
export class CredentialsSanitizerInterceptor implements HttpInterceptor {
  private readonly SENSITIVE_FIELDS = ['password', 'email'];
  private readonly SENSITIVE_ENDPOINTS = ['/auth/login', '/auth/register'];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if this is a sensitive endpoint
    const isSensitiveEndpoint = this.SENSITIVE_ENDPOINTS.some((endpoint) =>
      req.url.includes(endpoint)
    );

    if (isSensitiveEndpoint && req.body) {
      // Create a sanitized copy for logging purposes
      const sanitizedBody = this.sanitizeBody(req.body);
      console.debug(`[AUTH] Requesting: ${req.method} ${req.url}`);
      console.debug(
        '[AUTH] Credentials sanitized for security (not logged in plaintext)'
      );

      // Clone request to prevent modification of original
      const clonedReq = req.clone();

      return next.handle(clonedReq).pipe(
        tap(
          () => {
            // Success - no sensitive logging needed
          },
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              console.warn(
                '[AUTH] Login failed: Invalid credentials (error 401)'
              );
            } else {
              console.error(
                `[AUTH] Request failed with status ${error.status}`
              );
            }
          }
        )
      );
    }

    return next.handle(req);
  }

  /**
   * Sanitizes request body by replacing sensitive fields with masks
   */
  private sanitizeBody(body: any): any {
    if (!body) return body;

    const sanitized = { ...body };
    this.SENSITIVE_FIELDS.forEach((field) => {
      if (field in sanitized) {
        sanitized[field] = '***REDACTED***';
      }
    });

    return sanitized;
  }
}
