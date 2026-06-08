export function shouldRetryWeddingSync(error: unknown): boolean {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return true;
  }

  const status = typeof error === 'object' && error && 'status' in error ? Number((error as { status?: number }).status) : null;
  return status === 0 || status === 408 || (status !== null && status >= 500);
}

export function getWeddingRetryDelayMs(attempt: number): number {
  return Math.min(1000 * (2 ** Math.max(0, attempt - 1)), 4000);
}
