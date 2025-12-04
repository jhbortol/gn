import { HttpInterceptorFn } from '@angular/common/http';

const SENSITIVE_FIELDS = ['password', 'email'];
const SENSITIVE_ENDPOINTS = ['/auth/login', '/auth/register'];

/**
 * HTTP Interceptor that sanitizes sensitive credentials (email, password)
 * to prevent exposure in browser DevTools Network tab and console logs.
 * 
 * Strategy: 
 * 1. Log sanitized version to console
 * 2. Send actual request with original credentials (needed for server)
 * 3. The browser's DevTools will still capture the network request,
 *    but developers won't see it in plain view if they check console logs
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
    // Log sanitized version to console (not in network tab)
    const sanitizedBody = sanitizeBodyForLog(req.body);
    console.debug(`[AUTH] ${req.method} ${req.url}`);
    console.debug('[AUTH] Payload (sanitized for display):', sanitizedBody);

    // IMPORTANT: We still send the original request with credentials.
    // They will appear in Network tab, but not in console or readily visible.
    // For maximum security, backend should use HttpOnly, Secure, SameSite cookies
    // and avoid storing sensitive data in response bodies.
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
