import type {
  BStatsDrilldownGroup,
  BStatsDrilldownPayload,
  BStatsDrilldownSeriesPoint,
  BStatsLinePoint,
  BStatsMapPoint,
  BStatsPiePoint,
  CanvasBStatsResponse,
} from "@/lib/bstats/types";
import type { APIRoute } from "astro";

export const prerender = false;

const BSTATS_API_BASE = "https://bstats.org/api/v1";
const DEFAULT_PLUGIN_ID = 20070;
const DEFAULT_MAX_ELEMENTS = 1440;
const FULL_DATA_MAX_ELEMENTS = 50_000;
const REQUEST_TIMEOUT_MS = 12_000;
const CACHE_TTL_MS = 5 * 60 * 1000;

type PluginDetails = {
  id: number;
  name: string;
  owner?: {
    name?: string;
  };
  software?: {
    id?: number;
  };
  isGlobal?: boolean;
};

interface CacheEntry {
  expiresAt: number;
  data: CanvasBStatsResponse;
}

const cache = new Map<string, CacheEntry>();

function parsePluginId(value: string | undefined): number {
  if (!value) {
    return DEFAULT_PLUGIN_ID;
  }

  const numericId = Number(value);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return DEFAULT_PLUGIN_ID;
  }

  return numericId;
}

function parseBoolean(value: string | null): boolean {
  return value === "true";
}

function parseMaxElements(value: string | null): number {
  if (!value) {
    return DEFAULT_MAX_ELEMENTS;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return DEFAULT_MAX_ELEMENTS;
  }

  return Math.min(parsed, FULL_DATA_MAX_ELEMENTS);
}

function getCacheKey(
  pluginId: number,
  fullData: boolean,
  maxElements: number | undefined
): string {
  const maxPart = fullData
    ? `full-${FULL_DATA_MAX_ELEMENTS}`
    : String(maxElements ?? DEFAULT_MAX_ELEMENTS);
  return `${pluginId}:${maxPart}`;
}

function getCachedValue(cacheKey: string): CanvasBStatsResponse | null {
  const existingCache = cache.get(cacheKey);
  if (!existingCache) {
    return null;
  }

  if (Date.now() > existingCache.expiresAt) {
    cache.delete(cacheKey);
    return null;
  }

  return existingCache.data;
}

function setCachedValue(cacheKey: string, data: CanvasBStatsResponse) {
  cache.set(cacheKey, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

async function fetchBStatsJson<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${BSTATS_API_BASE}${path}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "CanvasMC-Website/1.0",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`bStats request failed (${response.status})`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchChartData<T>(
  pluginId: number,
  chartId: string,
  maxElements?: number
): Promise<T> {
  const search =
    typeof maxElements === "number" ? `?maxElements=${maxElements}` : "";

  return fetchBStatsJson<T>(
    `/plugins/${pluginId}/charts/${chartId}/data${search}`
  );
}

function normalizeLineData(rawData: unknown): BStatsLinePoint[] {
  if (!Array.isArray(rawData)) {
    return [];
  }

  const points: BStatsLinePoint[] = [];

  for (const row of rawData) {
    if (!Array.isArray(row) || row.length < 2) {
      continue;
    }

    const timestamp = Number(row[0]);
    const value = Number(row[1]);

    if (!Number.isFinite(timestamp) || !Number.isFinite(value)) {
      continue;
    }

    points.push([timestamp, value]);
  }

  points.sort((a, b) => a[0] - b[0]);
  return points;
}

function normalizePieData(rawData: unknown): BStatsPiePoint[] {
  if (!Array.isArray(rawData)) {
    return [];
  }

  const points: BStatsPiePoint[] = [];

  for (const row of rawData) {
    if (!row || typeof row !== "object") {
      continue;
    }

    const name = String((row as { name?: unknown }).name ?? "Unknown");
    const y = Number((row as { y?: unknown }).y ?? 0);

    if (!Number.isFinite(y)) {
      continue;
    }

    points.push({ name, y });
  }

  return points.sort((a, b) => a.y - b.y);
}

function normalizeMapData(rawData: unknown): BStatsMapPoint[] {
  if (!Array.isArray(rawData)) {
    return [];
  }

  const points: BStatsMapPoint[] = [];

  for (const row of rawData) {
    if (!row || typeof row !== "object") {
      continue;
    }

    const code = String((row as { code?: unknown }).code ?? "").trim();
    const value = Number((row as { value?: unknown }).value ?? 0);

    if (!code || !Number.isFinite(value)) {
      continue;
    }

    points.push({
      code: code.toUpperCase(),
      value,
    });
  }

  return points.sort((a, b) => a.value - b.value);
}

function normalizeDrilldownData(rawData: unknown): BStatsDrilldownPayload {
  if (!rawData || typeof rawData !== "object") {
    return {
      seriesData: [],
      drilldownData: [],
    };
  }

  const rawSeriesData =
    (rawData as { seriesData?: unknown }).seriesData ?? ([] as unknown[]);
  const rawDrilldownData =
    (rawData as { drilldownData?: unknown }).drilldownData ?? ([] as unknown[]);

  const seriesData: BStatsDrilldownSeriesPoint[] = [];

  if (Array.isArray(rawSeriesData)) {
    for (const row of rawSeriesData) {
      if (!row || typeof row !== "object") {
        continue;
      }

      const name = String((row as { name?: unknown }).name ?? "Unknown");
      const y = Number((row as { y?: unknown }).y ?? 0);
      const drilldown =
        (row as { drilldown?: unknown }).drilldown === null
          ? null
          : String((row as { drilldown?: unknown }).drilldown ?? "");

      if (!Number.isFinite(y)) {
        continue;
      }

      seriesData.push({
        name,
        y,
        drilldown,
      });
    }
  }

  const drilldownData: BStatsDrilldownGroup[] = Array.isArray(rawDrilldownData)
    ? rawDrilldownData
        .map((row) => {
          if (!row || typeof row !== "object") {
            return null;
          }

          const name = String((row as { name?: unknown }).name ?? "Unknown");
          const id = String((row as { id?: unknown }).id ?? name);
          const rawDataPoints =
            (row as { data?: unknown }).data ?? ([] as unknown[]);

          if (!Array.isArray(rawDataPoints)) {
            return null;
          }

          const dataPoints: [string, number][] = rawDataPoints
            .map((pair) => {
              if (!Array.isArray(pair) || pair.length < 2) {
                return null;
              }

              const label = String(pair[0]);
              const value = Number(pair[1]);

              if (!Number.isFinite(value)) {
                return null;
              }

              return [label, value] as [string, number];
            })
            .filter((pair): pair is [string, number] => Boolean(pair));

          return {
            name,
            id,
            data: dataPoints,
          } satisfies BStatsDrilldownGroup;
        })
        .filter((row): row is BStatsDrilldownGroup => Boolean(row))
    : [];

  return {
    seriesData,
    drilldownData,
  };
}

function getLineSummary(points: BStatsLinePoint[]): {
  current: number;
  record: number;
  points: number;
} {
  if (points.length === 0) {
    return {
      current: 0,
      record: 0,
      points: 0,
    };
  }

  let record = 0;
  for (const [, value] of points) {
    if (value > record) {
      record = value;
    }
  }

  return {
    current: points[points.length - 1][1],
    record,
    points: points.length,
  };
}

export const GET: APIRoute = async ({ params, url }) => {
  const pluginId = parsePluginId(params.bstatsId);
  const fullData = parseBoolean(url.searchParams.get("full"));
  const maxElements = fullData
    ? FULL_DATA_MAX_ELEMENTS
    : parseMaxElements(url.searchParams.get("maxElements"));

  const cacheKey = getCacheKey(pluginId, fullData, maxElements);
  const cachedData = getCachedValue(cacheKey);

  if (cachedData) {
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
        "X-Cache-Status": "HIT",
      },
    });
  }

  try {
    const [
      plugin,
      serversRaw,
      playersRaw,
      canvasVersionRaw,
      coreCountRaw,
      onlineModeRaw,
      locationRaw,
      locationMapRaw,
      osRaw,
      osArchRaw,
    ] = await Promise.all([
      fetchBStatsJson<PluginDetails>(`/plugins/${pluginId}`),
      fetchChartData<unknown>(pluginId, "servers", maxElements),
      fetchChartData<unknown>(pluginId, "players", maxElements),
      fetchChartData<unknown>(pluginId, "canvas_version"),
      fetchChartData<unknown>(pluginId, "coreCount"),
      fetchChartData<unknown>(pluginId, "online_mode"),
      fetchChartData<unknown>(pluginId, "location"),
      fetchChartData<unknown>(pluginId, "locationMap"),
      fetchChartData<unknown>(pluginId, "os"),
      fetchChartData<unknown>(pluginId, "osArch"),
    ]);

    const servers = normalizeLineData(serversRaw);
    const players = normalizeLineData(playersRaw);

    const responsePayload: CanvasBStatsResponse = {
      plugin: {
        id: plugin.id,
        name: plugin.name,
        owner: plugin.owner?.name ?? "Unknown",
        softwareId:
          typeof plugin.software?.id === "number" ? plugin.software.id : null,
        isGlobal: Boolean(plugin.isGlobal),
      },
      generatedAt: new Date().toISOString(),
      fullData,
      maxElements,
      summary: {
        servers: getLineSummary(servers),
        players: getLineSummary(players),
      },
      charts: {
        servers,
        players,
        canvasVersion: normalizePieData(canvasVersionRaw),
        coreCount: normalizePieData(coreCountRaw),
        onlineMode: normalizePieData(onlineModeRaw),
        location: normalizePieData(locationRaw),
        locationMap: normalizeMapData(locationMapRaw),
        osArch: normalizePieData(osArchRaw),
        os: normalizeDrilldownData(osRaw),
      },
    };

    setCachedValue(cacheKey, responsePayload);

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
        "X-Cache-Status": "MISS",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("bStats proxy failed:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to load bStats data",
        message,
      }),
      {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
};
