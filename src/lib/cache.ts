import type { Build } from "./schemas/jenkins";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

interface CacheEntry {
  data: Build[];
  timestamp: number;
}

let buildCache: CacheEntry | null = null;

const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_DIR = join(process.cwd(), ".cache");
const CACHE_FILE = join(CACHE_DIR, "builds.json");

async function loadCacheFromDisk(): Promise<CacheEntry | null> {
  try {
    if (!existsSync(CACHE_FILE)) return null;
    const data = await readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data) as CacheEntry;
  } catch {
    return null;
  }
}

async function saveCacheToDisk(cache: CacheEntry): Promise<void> {
  try {
    if (!existsSync(CACHE_DIR)) {
      await mkdir(CACHE_DIR, { recursive: true });
    }
    await writeFile(CACHE_FILE, JSON.stringify(cache), "utf-8");
  } catch (error) {
    console.error("Failed to save cache to disk:", error);
  }
}

export async function getCachedBuilds(
  allowExpired = false,
): Promise<Build[] | null> {
  if (!buildCache) {
    buildCache = await loadCacheFromDisk();
  }

  if (!buildCache) return null;

  const now = Date.now();
  const isExpired = now - buildCache.timestamp > CACHE_DURATION;

  if (isExpired && !allowExpired) {
    buildCache = null;
    return null;
  }

  return buildCache.data;
}

export async function setCachedBuilds(builds: Build[]): Promise<void> {
  buildCache = {
    data: builds,
    timestamp: Date.now(),
  };
  await saveCacheToDisk(buildCache);
}

export function hasCachedBuilds(): boolean {
  return buildCache !== null;
}

export function clearCache(): void {
  buildCache = null;
}
