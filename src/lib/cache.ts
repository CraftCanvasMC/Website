import type { Project } from "@/config/jenkins";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Build } from "./schemas/jenkins";

interface CacheEntry {
  data: Build[];
  timestamp: number;
}

const buildCache = new Map<Project, CacheEntry | null>();

const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_DIR = join(process.cwd(), ".cache");

function getCacheFile(project: Project) {
  return join(CACHE_DIR, `builds-${project.slug}.json`);
}

async function loadCacheFromDisk(project: Project): Promise<CacheEntry | null> {
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
  project: Project,
  cache: CacheEntry
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
  project: Project,
  allowExpired = false
): Promise<Build[] | null> {
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
  project: Project,
  builds: Build[]
): Promise<void> {
  const cache = {
    data: builds,
    timestamp: Date.now(),
  };

  buildCache.set(project, cache);
  await saveCacheToDisk(project, cache);
}

export function clearCache(project: Project) {
  buildCache.delete(project);
}

export function clearAllCaches() {
  buildCache.clear();
}
