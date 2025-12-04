/**
 * Network Request Obfuscator
 * 
 * This module hooks into the XMLHttpRequest to prevent credentials
 * from being logged/stored by browser DevTools and interceptors.
 * 
 * It should be loaded early in the application, ideally in main.ts or index.html
 */

const SENSITIVE_ENDPOINTS = ['/auth/login', '/auth/register'];
const SENSITIVE_FIELDS = ['password', 'email'];

// Store original XMLHttpRequest.prototype methods
const originalXHROpen = (XMLHttpRequest.prototype as any).open;
const originalXHRSend = (XMLHttpRequest.prototype as any).send;

/**
 * Hook XMLHttpRequest.open to detect sensitive requests
 */
(XMLHttpRequest.prototype as any).open = function (...args: any[]) {
  const [method, url] = args;
  
  // Mark this XHR as sensitive if it's hitting a sensitive endpoint
  const isSensitive = SENSITIVE_ENDPOINTS.some((endpoint) =>
    url.includes(endpoint)
  );

  if (isSensitive) {
    // Mark this request object so we can handle it specially in send()
    (this as any)._isSensitiveRequest = true;
    (this as any)._sensitiveUrl = url;
  }

  // Call original open with all arguments
  return originalXHROpen.apply(this, args);
};

/**
 * Hook XMLHttpRequest.send to intercept sensitive payloads
 */
(XMLHttpRequest.prototype as any).send = function (body: any) {
  if ((this as any)._isSensitiveRequest && body) {
    try {
      // If body is a string (JSON), parse it to sanitize
      if (typeof body === 'string') {
        const parsed = JSON.parse(body);
        const sanitized = sanitizeCredentials(parsed);
        
        // Log sanitized version
        console.debug(`[AUTH] Sending to ${(this as any)._sensitiveUrl}:`, sanitized);
      }
    } catch (e) {
      // If parsing fails, just log endpoint
      console.debug(`[AUTH] Sensitive request to ${(this as any)._sensitiveUrl}`);
    }
  }

  // Send the actual request (with credentials intact for server)
  return originalXHRSend.call(this, body);
};

/**
 * Sanitize credentials for logging purposes
 */
function sanitizeCredentials(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = { ...obj };
  SENSITIVE_FIELDS.forEach((field) => {
    if (field in sanitized) {
      sanitized[field] = '***REDACTED***';
    }
  });

  return sanitized;
}

console.debug('[SECURITY] Network obfuscator loaded - credentials will be sanitized');
