import {
  extractChannelFromUrl,
  extractProjectFromUrl,
  getProjectConfig,
} from "@/config/jenkins";
import { getCachedBuilds } from "@/lib/cache";
import {
  getDownloadCounts,
  getDownloadDailySeries,
} from "@/lib/download-counts";
import { getAllBuilds, JenkinsError } from "@/lib/jenkins";
import type { Build } from "@/lib/schemas/jenkins";
import type { APIRoute } from "astro";

export const prerender = false;

const DOWNLOADS_TRACKING_STARTED_DAY = "2026-04-06";

type VersionDownloads = {
  version: string;
  downloads: number;
  buildCount: number;
};

function parseDays(value: string | null) {
  const parsed = Number(value ?? "90");

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return 90;
  }

  return Math.max(7, Math.min(parsed, 730));
}

function extractMinecraftVersion(channelVersion: string) {
  const match = channelVersion.match(/\b1\.\d+(?:\.\d+)?\b/);
  return match?.[0] ?? "Unknown";
}

function uniqueDownloadUrls(builds: Build[]) {
  return Array.from(
    new Set(
      builds
        .map((build) => build.downloadUrl)
        .filter((downloadUrl): downloadUrl is string => Boolean(downloadUrl))
    )
  );
}

function summarizeVersionDownloads(
  builds: Build[],
  byUrl: Record<string, number>
): VersionDownloads[] {
  const stats = new Map<string, { downloads: number; buildCount: number }>();

  for (const build of builds) {
    if (!build.downloadUrl) {
      continue;
    }

    const version = extractMinecraftVersion(build.channelVersion);
    const downloads = byUrl[build.downloadUrl] ?? 0;
    const existing = stats.get(version) ?? { downloads: 0, buildCount: 0 };

    existing.downloads += downloads;
    existing.buildCount += 1;
    stats.set(version, existing);
  }

  return Array.from(stats.entries())
    .map(([version, value]) => ({
      version,
      downloads: value.downloads,
      buildCount: value.buildCount,
    }))
    .sort((a, b) => b.downloads - a.downloads);
}

async function buildDownloadsPayload(
  builds: Build[],
  days: number,
  cached: boolean,
  jenkinsDown: boolean
) {
  const urls = uniqueDownloadUrls(builds);
  const counts = await getDownloadCounts(urls);
  const dailyDownloads = await getDownloadDailySeries(
    urls,
    days,
    DOWNLOADS_TRACKING_STARTED_DAY
  );

  const dailyTotal = dailyDownloads.reduce(
    (sum, point) => sum + point.downloads,
    0
  );
  const backfilledDownloads = Math.max(0, counts.total - dailyTotal);

  if (backfilledDownloads > 0 && dailyDownloads.length > 0) {
    const startDayIndex = dailyDownloads.findIndex(
      (point) => point.day === DOWNLOADS_TRACKING_STARTED_DAY
    );
    const targetIndex = startDayIndex >= 0 ? startDayIndex : 0;

    dailyDownloads[targetIndex] = {
      day: dailyDownloads[targetIndex].day,
      downloads: dailyDownloads[targetIndex].downloads + backfilledDownloads,
    };
  }

  const downloadsByMinecraftVersion = summarizeVersionDownloads(
    builds,
    counts.byUrl
  );

  return {
    totalDownloads: counts.total,
    dailyDownloads,
    downloadsByMinecraftVersion,
    trackingStartedDay: DOWNLOADS_TRACKING_STARTED_DAY,
    backfilledDownloads,
    trackedBuilds: builds.filter((build) => Boolean(build.downloadUrl)).length,
    trackedUrls: urls.length,
    cached,
    jenkinsDown,
  };
}

export const GET: APIRoute = async ({ url }) => {
  const project = extractProjectFromUrl(url) ?? getProjectConfig("canvas");
  const channelVersion = extractChannelFromUrl(url);
  const includeExperimental = url.searchParams.get("experimental") === "true";
  const days = parseDays(url.searchParams.get("days"));

  if (!project) {
    return new Response(JSON.stringify({ error: "Unknown project" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const builds = await getAllBuilds({
      project,
      channelVersion,
      includeExperimental,
    });

    const payload = await buildDownloadsPayload(builds, days, false, false);

    return new Response(
      JSON.stringify({
        project: project.slug,
        channel: channelVersion ?? null,
        includeExperimental,
        days,
        generatedAt: new Date().toISOString(),
        ...payload,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    const cachedBuilds = await getCachedBuilds(project, true);

    if (cachedBuilds && cachedBuilds.length > 0) {
      const filteredCachedBuilds = cachedBuilds.filter((build) => {
        const matchesChannel =
          !channelVersion ||
          build.channelVersion === channelVersion ||
          (includeExperimental &&
            build.channelVersion === `${channelVersion} (Experimental)`);

        const matchesExperimental =
          !build.isExperimental || includeExperimental;

        return matchesChannel && matchesExperimental;
      });

      const isUnreachable =
        error instanceof JenkinsError &&
        (error.message.toLowerCase().includes("failed to connect") ||
          error.message.toLowerCase().includes("unreachable"));

      const payload = await buildDownloadsPayload(
        filteredCachedBuilds,
        days,
        true,
        isUnreachable
      );

      return new Response(
        JSON.stringify({
          project: project.slug,
          channel: channelVersion ?? null,
          includeExperimental,
          days,
          generatedAt: new Date().toISOString(),
          ...payload,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=120, stale-while-revalidate=120",
            "X-Cache-Status": "HIT",
          },
        }
      );
    }

    if (error instanceof JenkinsError) {
      return new Response(
        JSON.stringify({
          error: error.message,
          project: project.slug,
          channel: channelVersion ?? null,
          includeExperimental,
          days,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        project: project.slug,
        channel: channelVersion ?? null,
        includeExperimental,
        days,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
