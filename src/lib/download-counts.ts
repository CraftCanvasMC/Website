import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

type DownloadCountsData = Record<string, number>;

const CACHE_DIR = join(process.cwd(), ".cache");
const COUNTS_FILE = join(CACHE_DIR, "download-counts.json");

let counts: DownloadCountsData = {};
let loaded = false;

async function ensureLoaded() {
  if (loaded) return;

  try {
    if (existsSync(COUNTS_FILE)) {
      const raw = await readFile(COUNTS_FILE, "utf-8");
      const parsed = JSON.parse(raw) as DownloadCountsData;
      if (parsed && typeof parsed === "object") {
        counts = parsed;
      }
    }
  } catch {
    counts = {};
  }

  loaded = true;
}

async function save() {
  if (!existsSync(CACHE_DIR)) {
    await mkdir(CACHE_DIR, { recursive: true });
  }
  await writeFile(COUNTS_FILE, JSON.stringify(counts), "utf-8");
}

export async function incrementDownloadCount(downloadUrl: string) {
  await ensureLoaded();
  counts[downloadUrl] = (counts[downloadUrl] || 0) + 1;
  await save();
  return counts[downloadUrl];
}

export async function getDownloadCount(downloadUrl: string) {
  await ensureLoaded();
  return counts[downloadUrl] || 0;
}

export async function getDownloadCounts(downloadUrls: string[]) {
  await ensureLoaded();

  const uniqueUrls = Array.from(new Set(downloadUrls));
  const byUrl: Record<string, number> = {};

  for (const url of uniqueUrls) {
    byUrl[url] = counts[url] || 0;
  }

  const total = uniqueUrls.reduce((sum, url) => sum + (byUrl[url] || 0), 0);

  return {
    total,
    byUrl,
  };
}