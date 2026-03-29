import type { APIRoute } from "astro";
import {
  JenkinsError,
  getLatestBuild,
  getProjectJavadocUrl,
} from "../../../lib/jenkins";
import {
  applyDeprecationHeaders,
  extractChannelFromUrl,
  extractProjectFromJobOrFallback,
  extractProjectFromUrl,
  extractVersionFromUrl,
  getProjectConfig,
} from "../../../config/jenkins";

export const prerender = false;

export const GET: APIRoute = async ({ params, url, redirect }) => {
  let fallbackUsed = false;
  let fallbackVersionUsed = false;

  const defaultProject = getProjectConfig(params.project);
  const project =
    defaultProject ||
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

  try {
    const channelVersion =
      extractChannelFromUrl(url) ||
      (() => {
        const v = extractVersionFromUrl(url);
        if (v) fallbackVersionUsed = true;
        return v;
      })();
    const experimentalParam = url.searchParams.get("experimental") === "true";

    const build = await getLatestBuild(
      project,
      channelVersion,
      !experimentalParam,
    );

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const responseHeaders = applyDeprecationHeaders(
      headers,
      fallbackUsed,
      fallbackVersionUsed,
    );

    const projectChannel = channelVersion ?? build?.channelVersion;

    if (!projectChannel) {
      return new Response(
        JSON.stringify({ error: "No channel version found" }),
        {
          status: 404,
          headers: { ...responseHeaders },
        },
      );
    }
    let jdUrl = "";
    try {
      jdUrl = getProjectJavadocUrl(
        project,
        projectChannel,
        build?.buildNumber.toString(),
      );
    } catch (error) {
      if (error instanceof JenkinsError) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 404,
          headers: { ...responseHeaders },
        });
      }
    }

    return redirect(jdUrl, 302);
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
