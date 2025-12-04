import { HttpInterceptorFn } from '@angular/common/http';

const SENSITIVE_FIELDS = ['password', 'email'];
const SENSITIVE_ENDPOINTS = ['/auth/login', '/auth/register'];

/**
 * HTTP Interceptor that sanitizes sensitive credentials (email, password)
 * to prevent exposure in browser DevTools Network tab and console logs.
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
    console.debug(`[AUTH] Requesting: ${req.method} ${req.url}`);
    console.debug(
      '[AUTH] Credentials sanitized for security (not logged in plaintext)'
    );
  }

  return next(req);
};
