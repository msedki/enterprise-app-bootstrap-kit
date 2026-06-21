import "server-only";

export interface IdempotencyStore {
  get(key: string): Promise<string | null>;
  put(key: string, response: string, ttlSeconds: number): Promise<void>;
}

class MemoryIdempotencyStore implements IdempotencyStore {
  private values = new Map<string, { response: string; expiresAt: number }>();
  async get(key: string) {
    const entry = this.values.get(key);
    if (!entry || entry.expiresAt < Date.now()) return null;
    return entry.response;
  }
  async put(key: string, response: string, ttlSeconds: number) {
    this.values.set(key, { response, expiresAt: Date.now() + ttlSeconds * 1000 });
  }
}

// Development adapter only. Use a shared persistent store in multi-instance deployments.
export const idempotency: IdempotencyStore = new MemoryIdempotencyStore();
