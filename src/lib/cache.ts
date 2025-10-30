import type { Build } from '~/lib/schemas/jenkins';

interface CacheEntry {
  data: Build[];
  timestamp: number;
}

let buildCache: CacheEntry | null = null;

const CACHE_DURATION = 5 * 60 * 1000;

export function getCachedBuilds(): Build[] | null {
  if (!buildCache) return null;

  const now = Date.now();
  const isExpired = now - buildCache.timestamp > CACHE_DURATION;

  if (isExpired) {
    buildCache = null;
    return null;
  }

  return buildCache.data;
}

export function setCachedBuilds(builds: Build[]): void {
  buildCache = {
    data: builds,
    timestamp: Date.now(),
  };
}

export function hasCachedBuilds(): boolean {
  return buildCache !== null;
}

export function clearCache(): void {
  buildCache = null;
}
