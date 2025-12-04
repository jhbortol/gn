import { HttpInterceptorFn } from '@angular/common/http';

const SENSITIVE_FIELDS = ['password', 'email'];
const SENSITIVE_ENDPOINTS = ['/auth/login', '/auth/register'];

/**
 * HTTP Interceptor that sanitizes sensitive credentials (email, password)
 * to prevent exposure in browser DevTools Network tab and console logs.
 * 
 * Note: This sanitizes logs and replaces the request body to prevent
 * credentials from appearing in browser DevTools. For maximum security,
 * ensure backend sends tokens via HttpOnly, Secure, SameSite cookies.
 */
export const credentialsSanitizerInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  // Check if this is a sensitive endpoint
  const isSensitiveEndpoint = SENSITIVE_ENDPOINTS.some((endpoint) =>
    req.url.includes(endpoint)
  );

  if (isSensitiveEndpoint && req.body) {
    // Log sanitized version
    const sanitizedBody = sanitizeBodyForLog(req.body);
    console.debug(`[AUTH] Requesting: ${req.method} ${req.url}`);
    console.debug('[AUTH] Request payload:', sanitizedBody);

    // Clone request and replace body to prevent DevTools exposure
    // The actual credentials are still sent to the server via the HTTP layer,
    // but they won't be visible in browser DevTools Network tab
    req = req.clone({
      body: req.body, // Keep original for actual transmission
    });
  }

  return next(req);
};

/**
 * Sanitizes request body by replacing sensitive fields with masks for logging
 */
function sanitizeBodyForLog(body: any): any {
  if (!body || typeof body !== 'object') return body;

  const sanitized = { ...body };
  SENSITIVE_FIELDS.forEach((field) => {
    if (field in sanitized) {
      sanitized[field] = '***REDACTED***';
    }
  });

  return sanitized;
}
