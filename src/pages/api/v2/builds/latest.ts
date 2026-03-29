import type { APIRoute } from "astro";
import { JenkinsError, getLatestBuild } from "../../../../lib/jenkins";
import {
  applyDeprecationHeaders,
  extractChannelFromUrl,
  extractProjectFromJobOrFallback,
  extractProjectFromUrl,
} from "../../../../config/jenkins.ts";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    let fallbackUsed = false;
    const includeExperimental = url.searchParams.get("experimental") === "true";
    const project =
      extractProjectFromUrl(url) ||
      (() => {
        fallbackUsed = true;
        return extractProjectFromJobOrFallback(url);
      })();
    if (!project) {
      return new Response(JSON.stringify({ error: "Unknown project" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const responseHeaders = applyDeprecationHeaders(
      headers,
      fallbackUsed,
      false,
    );

    const channelVersion = extractChannelFromUrl(url);
    const build = await getLatestBuild(
      project,
      channelVersion,
      includeExperimental,
    );

    return new Response(JSON.stringify(build), {
      status: 200,
      headers: {
        ...responseHeaders,
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    if (error instanceof JenkinsError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...responseHeaders },
      });
    }

    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...responseHeaders },
    });
  }
};
