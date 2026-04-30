import {
  extractChannelFromUrl,
  extractProjectFromUrl,
  getProjectConfig,
} from "@/config/jenkins";
import {
  JenkinsError,
  getLatestBuild,
  getProjectJavadocUrl,
} from "@/lib/jenkins";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, url, redirect }) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const defaultProject = getProjectConfig(params.project);
  const project = defaultProject || extractProjectFromUrl(url);
  if (!project) {
    return new Response(JSON.stringify({ error: "Unknown project" }), {
      status: 404,
      headers: { ...headers },
    });
  }

  try {
    const channelVersion = extractChannelFromUrl(url);
    const experimentalParam = url.searchParams.get("experimental") === "true";

    const build = await getLatestBuild(
      project,
      channelVersion,
      experimentalParam
    );

    const projectChannel = channelVersion ?? build?.channelVersion;

    if (!projectChannel) {
      return new Response(
        JSON.stringify({ error: "No channel version found" }),
        {
          status: 404,
          headers: { ...headers },
        }
      );
    }
    let jdUrl = "";
    try {
      const redirect = url.searchParams.get("redirect");
      jdUrl = getProjectJavadocUrl(
        project,
        projectChannel,
        build?.buildNumber.toString(),
        redirect
      );
    } catch (error) {
      if (error instanceof JenkinsError) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 404,
          headers: { ...headers },
        });
      }
    }

    return redirect(jdUrl, 302);
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
