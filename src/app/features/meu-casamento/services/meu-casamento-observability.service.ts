import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeuCasamentoObservabilityService {
  logSyncRetry(feature: string, attempt: number, delayMs: number, error: unknown): void {
    console.warn('[MeuCasamento][sync-retry]', this.buildPayload(feature, error, { attempt, delayMs }));
  }

  logSyncFailure(feature: string, error: unknown, context?: Record<string, unknown>): void {
    console.warn('[MeuCasamento][sync-failure]', this.buildPayload(feature, error, context));
  }

  logOtpFailure(action: 'send' | 'verify', error: unknown): void {
    console.warn('[MeuCasamento][otp-failure]', this.buildPayload(`otp:${action}`, error));
  }

  private buildPayload(feature: string, error: unknown, context?: Record<string, unknown>): Record<string, unknown> {
    const status = typeof error === 'object' && error && 'status' in error ? Number((error as { status?: number }).status) : null;
    const message = typeof error === 'object' && error && 'message' in error ? String((error as { message?: string }).message) : null;

    return {
      feature,
      status: Number.isFinite(status) ? status : null,
      message,
      online: typeof navigator !== 'undefined' ? navigator.onLine : null,
      ...context
    };
  }
}
