import { getWeddingRetryDelayMs, shouldRetryWeddingSync } from './meu-casamento-sync.utils';

describe('meu-casamento-sync.utils', () => {
  it('retries transient sync failures', () => {
    expect(shouldRetryWeddingSync({ status: 0 })).toBeTrue();
    expect(shouldRetryWeddingSync({ status: 408 })).toBeTrue();
    expect(shouldRetryWeddingSync({ status: 500 })).toBeTrue();
    expect(shouldRetryWeddingSync({ status: 503 })).toBeTrue();
  });

  it('does not retry validation or auth failures', () => {
    expect(shouldRetryWeddingSync({ status: 400 })).toBeFalse();
    expect(shouldRetryWeddingSync({ status: 401 })).toBeFalse();
    expect(shouldRetryWeddingSync({ status: 404 })).toBeFalse();
    expect(shouldRetryWeddingSync({ status: 429 })).toBeFalse();
  });

  it('uses capped exponential backoff', () => {
    expect(getWeddingRetryDelayMs(1)).toBe(1000);
    expect(getWeddingRetryDelayMs(2)).toBe(2000);
    expect(getWeddingRetryDelayMs(3)).toBe(4000);
    expect(getWeddingRetryDelayMs(4)).toBe(4000);
  });
});
