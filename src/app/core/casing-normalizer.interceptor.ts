import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

function isPlainObject(value: any): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof Blob)
  );
}

function toCamelCase(key: string): string {
  if (!key) return key;
  // Lower only the first character; preserves inner capitals like WhatsApp -> whatsApp
  return key.charAt(0).toLowerCase() + key.slice(1);
}

function normalizeDeep(data: any): any {
  if (Array.isArray(data)) {
    return data.map(normalizeDeep);
  }
  if (isPlainObject(data)) {
    const out: any = {};
    Object.keys(data).forEach((k) => {
      const v = normalizeDeep(data[k]);
      const ck = toCamelCase(k);

      // Ensure we keep the original key (even if it's PascalCase)
      out[k] = v;

      // Also provide the camelCase version for frontend convenience
      if (out[ck] === undefined) {
        out[ck] = v;
      }
    });
    return out;
  }
  return data;
}

export const casingNormalizerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        if (body && (typeof body === 'object')) {
          const normalized = normalizeDeep(body);
          return event.clone({ body: normalized });
        }
      }
      return event;
    })
  );
};
