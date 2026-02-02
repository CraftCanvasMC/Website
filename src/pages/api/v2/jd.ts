import type { APIRoute } from "astro";
import { JenkinsError, getLatestBuild } from "../../../lib/jenkins";

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  try {
    const versionParam = url.searchParams.get("version");
    const experimentalParam = url.searchParams.get("experimental") === "true";

    const build = await getLatestBuild(!experimentalParam);

    const mcVer = versionParam ?? build?.channelVersion;

    const jdUrl = `https://maven.canvasmc.io/javadoc/snapshots/io/canvasmc/canvas/canvas-api/${mcVer}-R0.1-SNAPSHOT`;

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
