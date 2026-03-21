import type { APIRoute } from "astro";
import { getLatestBuild } from "../../lib/jenkins";
import { getCachedBuilds } from "../../lib/cache";
import {
  extractProjectFromJobOrFallback,
  extractProjectFromUrl,
} from "../../config/jenkins.ts";

export const GET: APIRoute = async ({ url }) => {
  try {
    const project =
      extractProjectFromUrl(url) || extractProjectFromJobOrFallback(url);
    if (!project) {
      return new Response(JSON.stringify({ error: "Unknown project" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let build;
    try {
      build = await getLatestBuild(project.slug, undefined, false);
    } catch {
      const cached = await getCachedBuilds(project.slug);
      if (!cached || cached.length === 0) {
        return new Response("No builds available", { status: 503 });
      }
      build = cached.sort((a, b) => b.buildNumber - a.buildNumber)[0];
    }

    if (!build || !build.downloadUrl) {
      return new Response("Latest build not available", { status: 503 });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: build.downloadUrl,
      },
    });
  } catch (error) {
    console.error("Error in /downloads/latest:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
