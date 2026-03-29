import type { APIRoute } from "astro";
import {
  extractChannelFromUrl,
  extractVersionFromUrl,
  getProjectConfig,
  jenkinsConfig,
  projects,
  type Project,
} from "../../../config/jenkins";
import { getCachedBuilds } from "../../../lib/cache";
import { getDownloadCounts } from "../../../lib/download-counts";
import { getAllBuilds, JenkinsError } from "../../../lib/jenkins";
import type { Build } from "../../../lib/schemas/jenkins";

export const prerender = false;

type ProjectSummary = {
  project: string;
  ciJob: string;
  channel: string | null;
  includeExperimental: boolean;
  totalDownloads: number;
  totalBuilds: number;
  downloadableBuilds: number;
  latestDownloadUrl: string | null;
  latestBuildNumber: number | null;
  cached: boolean;
  jenkinsDown: boolean;
  error?: string;
};

function createProjectFromJob(job: string, slugOverride?: string): Project {
  const ciJob = job.trim();
  const slug = (slugOverride || ciJob).trim().toLowerCase();

  return {
    slug,
    ciJob,
    ciJobUrl: `${jenkinsConfig.baseUrl}/job/${encodeURIComponent(ciJob)}/`,
    javadocBaseUrl: "",
    versionSuffix: "",
  };
}

function getDefaultProjectList(): Project[] {
  const configuredProjects = Object.values(projects) as Project[];
  const sculptor = createProjectFromJob("Sculptor", "sculptor");

  if (configuredProjects.some((project) => project.slug === sculptor.slug)) {
    return configuredProjects;
  }

  return [...configuredProjects, sculptor];
}

function toSummary(
  project: Project,
  channelVersion: string | undefined,
  includeExperimental: boolean,
  totalDownloads: number,
  totalBuilds: number,
  cached: boolean,
  jenkinsDown: boolean,
  builds: Build[],
  error?: string,
): ProjectSummary {
  const downloadableBuilds = builds.filter((build) => Boolean(build.downloadUrl));
  const latestDownloadableBuild = downloadableBuilds[0] ?? null;

  return {
    project: project.slug,
    ciJob: project.ciJob,
    channel: channelVersion ?? null,
    includeExperimental,
    totalDownloads,
    totalBuilds,
    downloadableBuilds: downloadableBuilds.length,
    latestDownloadUrl: latestDownloadableBuild?.downloadUrl ?? null,
    latestBuildNumber: latestDownloadableBuild?.buildNumber ?? null,
    cached,
    jenkinsDown,
    error,
  };
}

async function countDownloadEvents(project: Project, builds: Build[]) {
  const downloadableUrls = Array.from(
    new Set(
      builds
        .map((build) => build.downloadUrl)
        .filter((downloadUrl): downloadUrl is string => Boolean(downloadUrl)),
    ),
  );

  if (downloadableUrls.length === 0) {
    return { totalDownloads: 0 };
  }

  const counts = await getDownloadCounts(downloadableUrls);
  const totalDownloads = counts.total;

  return { totalDownloads };
}

export const GET: APIRoute = async ({ url }) => {
  const channelVersion = extractChannelFromUrl(url) || extractVersionFromUrl(url);
  const includeExperimental = url.searchParams.get("experimental") === "true";

  const projectParam = url.searchParams.get("project");
  const jobParam = url.searchParams.get("job");

  let requestedProjects: Project[];

  if (jobParam) {
    requestedProjects = [createProjectFromJob(jobParam, projectParam ?? undefined)];
  } else if (projectParam) {
    const configuredProject = getProjectConfig(projectParam);
    if (!configuredProject) {
      return new Response(
        JSON.stringify({
          error:
            "Unknown project. Use a configured project slug, or pass job=<Jenkins job name> for future projects.",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    requestedProjects = [configuredProject];
  } else {
    requestedProjects = getDefaultProjectList();
  }

  const summaries = await Promise.all(
    requestedProjects.map(async (project) => {
      try {
        const builds = await getAllBuilds({
          project,
          channelVersion,
          includeExperimental,
        });

        const analytics = await countDownloadEvents(project, builds);
        const totalDownloads = analytics.totalDownloads;

        return toSummary(
          project,
          channelVersion,
          includeExperimental,
          totalDownloads,
          builds.length,
          false,
          false,
          builds,
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

            const matchesExperimental = !build.isExperimental || includeExperimental;

            return matchesChannel && matchesExperimental;
          });

          const analytics = await countDownloadEvents(project, filteredCachedBuilds);
          const totalDownloads = analytics.totalDownloads;

          const isUnreachable =
            error instanceof JenkinsError &&
            (error.message.toLowerCase().includes("failed to connect") ||
              error.message.toLowerCase().includes("unreachable"));

          return toSummary(
            project,
            channelVersion,
            includeExperimental,
            totalDownloads,
            filteredCachedBuilds.length,
            true,
            isUnreachable,
            filteredCachedBuilds,
          );
        }

        if (error instanceof JenkinsError) {
          return toSummary(
            project,
            channelVersion,
            includeExperimental,
            0,
            0,
            false,
            true,
            [],
            error.message,
          );
        }

        console.error(error);
        return toSummary(
          project,
          channelVersion,
          includeExperimental,
          0,
          0,
          false,
          false,
          [],
          "Internal server error",
        );
      }
    }),
  );

  const totalDownloads = summaries.reduce(
    (sum, projectSummary) => sum + projectSummary.totalDownloads,
    0,
  );

  const anyErrors = summaries.some((summary) => Boolean(summary.error));

  return new Response(
    JSON.stringify({
      channel: channelVersion ?? null,
      includeExperimental,
      totalDownloads,
      projects: summaries,
    }),
    {
      status: anyErrors ? 207 : 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    },
  );
};