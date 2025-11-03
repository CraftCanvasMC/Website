import type { APIRoute } from "astro";
import { JenkinsError, getAllBuilds } from "../../../lib/jenkins";
import { getCachedBuilds } from "../../../lib/cache";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const minecraftVersion =
      url.searchParams.get("minecraft_version") || undefined;
    const includeExperimental = url.searchParams.get("experimental") === "true";

    const builds = await getAllBuilds({
      minecraftVersion,
      includeExperimental,
    });

    return new Response(
      JSON.stringify({
        builds,
        cached: false,
        jenkinsDown: false,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    const cachedBuilds = await getCachedBuilds(true);

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
            "Content-Type": "application/json",
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
          headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
