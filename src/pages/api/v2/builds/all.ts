import type { APIRoute } from "astro";
import { JenkinsError, getAllBuilds } from "../../../../lib/jenkins";
import { getCachedBuilds } from "../../../../lib/cache";
import {
  applyDeprecationHeaders,
  extractChannelFromUrl,
  extractProjectFromJobOrFallback,
  extractProjectFromUrl,
  extractVersionFromUrl,
} from "../../../../config/jenkins.ts";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  let responseHeaders: Record<string, string>;
  let fallbackUsed = false;
  let fallbackVersionUsed = false;
  const project =
    extractProjectFromUrl(url) ||
    (() => {
      fallbackUsed = true;
      return extractProjectFromJobOrFallback(url);
    })();
  if (!project) {
    return new Response(JSON.stringify({ error: "Unknown project" }), {
      status: 404,
      headers: { ...headers },
    });
  }

  try {
    const channelVersion =
      extractChannelFromUrl(url) ||
      (() => {
        const v = extractVersionFromUrl(url);
        if (v) fallbackVersionUsed = true;
        return v;
      })();
    const includeExperimental = url.searchParams.get("experimental") === "true";

    const builds = await getAllBuilds({
      project: project,
      channelVersion,
      includeExperimental,
    });

    responseHeaders = applyDeprecationHeaders(
      headers,
      fallbackUsed,
      fallbackVersionUsed,
    );

    return new Response(
      JSON.stringify({
        builds,
        cached: false,
        jenkinsDown: false,
      }),
      {
        status: 200,
        headers: {
          ...responseHeaders,
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    const cachedBuilds = await getCachedBuilds(project, true);

    if (cachedBuilds && cachedBuilds.length > 0) {
      const isBuilding =
        error instanceof JenkinsError &&
        error.message.toLowerCase().includes("building");

      const isUnreachable =
        error instanceof JenkinsError &&
        (error.message.toLowerCase().includes("failed to connect") ||
          error.message.toLowerCase().includes("unreachable"));

      return new Response(
        JSON.stringify({
          builds: cachedBuilds,
          cached: true,
          jenkinsDown: isUnreachable,
          jenkinsBuilding: isBuilding,
        }),
        {
          status: 200,
          headers: {
            ...responseHeaders,
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
            "X-Cache-Status": "HIT",
          },
        },
      );
    }

    if (error instanceof JenkinsError) {
      return new Response(
        JSON.stringify({
          error: error.message,
          cached: false,
          jenkinsDown: true,
        }),
        {
          status: 503,
          headers: { ...responseHeaders },
        },
      );
    }

    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        cached: false,
        jenkinsDown: false,
      }),
      {
        status: 500,
        headers: { ...responseHeaders },
      },
    );
  }
};
