import type { Build } from "./schemas/jenkins";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

interface CacheEntry {
  data: Build[];
  timestamp: number;
}

const buildCache = new Map<string, CacheEntry | null>();

const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_DIR = join(process.cwd(), ".cache");

function getCacheFile(project: string) {
  return join(CACHE_DIR, `builds-${project}.json`);
}

async function loadCacheFromDisk(project: string): Promise<CacheEntry | null> {
  try {
    const cacheFile = getCacheFile(project);
    if (!existsSync(cacheFile)) return null;
    const data = await readFile(cacheFile, "utf-8");
    return JSON.parse(data) as CacheEntry;
  } catch {
    return null;
  }
}

async function saveCacheToDisk(
  project: string,
  cache: CacheEntry,
): Promise<void> {
  try {
    if (!existsSync(CACHE_DIR)) {
      await mkdir(CACHE_DIR, { recursive: true });
    }
    await writeFile(getCacheFile(project), JSON.stringify(cache), "utf-8");
  } catch (error) {
    console.error("Failed to save cache to disk:", error);
  }
}

export async function getCachedBuilds(
  project: string,
  allowExpired = false,
): Promise<Build[] | null> {
  if (!project) return null;
  if (!buildCache.has(project)) {
    buildCache.set(project, await loadCacheFromDisk(project));
  }

  const cache = buildCache.get(project);
  if (!cache) return null;

  const now = Date.now();
  const isExpired = now - cache.timestamp > CACHE_DURATION;

  if (isExpired && !allowExpired) {
    buildCache.delete(project);
    return null;
  }

  return cache.data;
}

export async function setCachedBuilds(
  project: string,
  builds: Build[],
): Promise<void> {
  if (!project) return;
  const cache = {
    data: builds,
    timestamp: Date.now(),
  };

  buildCache.set(project, cache);
  await saveCacheToDisk(project, cache);
}

export function clearCache(project?: string): void {
  if (project) {
    buildCache.delete(project);
    return;
  }

  buildCache.clear();
}
