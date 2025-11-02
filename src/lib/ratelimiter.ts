import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  paths: string[];
  limit: number;
  windowMs: number;
}

export class RateLimiter {
  private cache: LRUCache<string, number[]>;
  private limit: number;
  private windowMs: number;

  constructor(options: RateLimitOptions) {
    this.limit = options.limit;
    this.windowMs = options.windowMs;
    this.cache = new LRUCache<string, number[]>({
      max: 500,
      ttl: options.windowMs,
    });
  }

  check(identifier: string): { success: boolean; remaining: number; reset: number } {
    const now = Date.now();
    const timestamps = this.cache.get(identifier) || [];
    const validTimestamps = timestamps.filter((timestamp) => now - timestamp < this.windowMs);
    
    if (validTimestamps.length >= this.limit) {
      const oldestTimestamp = validTimestamps[0];
      const reset = oldestTimestamp + this.windowMs;
      
      return {
        success: false,
        remaining: 0,
        reset,
      };
    }

    validTimestamps.push(now);
    this.cache.set(identifier, validTimestamps);
    
    return {
      success: true,
      remaining: this.limit - validTimestamps.length,
      reset: now + this.windowMs,
    };
  }
}

export const apiRateLimiter = new RateLimiter({
  paths: ['/api/v2/builds', '/api/v2/builds/all', '/api/v2/builds/latest', '/api/v2/jd'],
  limit: 100,
  windowMs: 15 * 60 * 1000,
});
