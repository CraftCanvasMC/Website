import type { APIRoute } from "astro";
import { getLatestBuild } from "../../lib/jenkins";
import { getCachedBuilds } from "../../lib/cache";

export const GET: APIRoute = async ({ url }) => {
  try {
    const job = (url.searchParams.get('job') as string) || undefined;

    let build;
    try {
      build = await getLatestBuild(false, job);
    } catch {
      const cached = await getCachedBuilds();
      if (!cached || cached.length === 0) {
        return new Response('No builds available', { status: 503 });
      }
      const filtered = cached.filter((b) => !job || b.url.includes(job));
      build = filtered.sort((a, b) => b.buildNumber - a.buildNumber)[0];
    }

    if (!build || !build.downloadUrl) {
      return new Response('Latest build not available', { status: 503 });
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
