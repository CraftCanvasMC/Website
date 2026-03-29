import type { APIRoute } from "astro";
import {
  JenkinsError,
  getLatestBuild,
  getProjectJavadocUrl,
} from "@/lib/jenkins.ts";
import {
  extractChannelFromUrl,
  extractProjectFromJobOrFallback,
  extractProjectFromUrl,
  extractVersionFromUrl,
  getProjectConfig,
} from "@/config/jenkins.ts";

export const prerender = false;

export const GET: APIRoute = async ({ params, url, redirect }) => {
  const defaultProject = getProjectConfig(params.project);
  const projectParam =
    extractProjectFromUrl(url) || extractProjectFromJobOrFallback(url);
  const project = defaultProject || projectParam;
  if (!project) {
    return new Response(JSON.stringify({ error: "Unknown project" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const channelVersion =
      extractChannelFromUrl(url) || extractVersionFromUrl(url);
    const experimentalParam = url.searchParams.get("experimental") === "true";

    const build = await getLatestBuild(
      project,
      channelVersion,
      !experimentalParam,
    );

    const projectChannel = channelVersion ?? build?.channelVersion;

    if (!projectChannel) {
      return new Response(
        JSON.stringify({ error: "No channel version found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return redirect(jdUrl, 302);
  } catch (error) {
    if (error instanceof JenkinsError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
