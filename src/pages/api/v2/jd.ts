import type { APIRoute } from "astro";
import {
  JenkinsError,
  getLatestBuild,
  getProjectJavadocUrl,
} from "../../../lib/jenkins";
import {
  getFallbackProjectName,
  getProjectConfig,
} from "../../../config/jenkins";

export const prerender = false;

export const GET: APIRoute = async ({ params, url, redirect }) => {
  const project = getProjectConfig(params.project);
  const jobParam = url.searchParams.get("job");
  const projectParam =
    url.searchParams.get("project") ||
    getProjectConfig(jobParam)?.slug ||
    getFallbackProjectName();
  if (!project && !projectParam) {
    return new Response(JSON.stringify({ error: "Unknown project" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const versionParam = url.searchParams.get("version") || undefined;
    const experimentalParam = url.searchParams.get("experimental") === "true";

    const build = await getLatestBuild(
      project?.slug ?? projectParam,
      versionParam,
      !experimentalParam,
      jobParam || project?.jenkinsJob || undefined,
    );

    const projectVer = versionParam ?? build?.channelVersion;

    if (!projectVer) {
      return new Response(JSON.stringify({ error: "No version found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const jdUrl = getProjectJavadocUrl(
      project?.slug ?? projectParam,
      projectVer,
      build?.buildNumber.toString(),
    );

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
