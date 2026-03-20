import type { APIRoute } from "astro";
import { JenkinsError, getLatestBuild } from "../../../../lib/jenkins";
import {
  getFallbackProjectName,
  getProjectConfig,
} from "../../../../config/jenkins.ts";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const includeExperimental = url.searchParams.get("experimental") === "true";
    const job = url.searchParams.get("job") || undefined;
    const project =
      url.searchParams.get("project") ||
      getProjectConfig(job)?.slug ||
      getFallbackProjectName();

    const build = await getLatestBuild(
      project,
      undefined,
      includeExperimental,
      job ?? getProjectConfig(project)?.jenkinsJob,
    );

    return new Response(JSON.stringify(build), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
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
