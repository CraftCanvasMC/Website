import { extractChannelFromUrl, extractProjectFromUrl } from "@/config/jenkins";
import { JenkinsError, getLatestBuild } from "@/lib/jenkins";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  try {
    const includeExperimental = url.searchParams.get("experimental") === "true";
    const project = extractProjectFromUrl(url);
    if (!project) {
      return new Response(JSON.stringify({ error: "Unknown project" }), {
        status: 404,
        headers: { ...headers },
      });
    }

    const channelVersion = extractChannelFromUrl(url);
    const build = await getLatestBuild(
      project,
      channelVersion,
      includeExperimental
    );

    return new Response(JSON.stringify(build), {
      status: 200,
      headers: {
        ...headers,
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    if (error instanceof JenkinsError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...headers },
      });
    }

    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...headers },
    });
  }
};
