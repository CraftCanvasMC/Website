import type { APIRoute } from "astro";
import { jenkinsConfig } from "@/config/jenkins";
import { incrementDownloadCount } from "@/lib/download-counts";

export const prerender = false;

function isAllowedDownloadUrl(value: string) {
  let parsed: URL;
  let jenkinsBase: URL;

  try {
    parsed = new URL(value);
    jenkinsBase = new URL(jenkinsConfig.baseUrl);
  } catch {
    return false;
  }

  if (!(parsed.protocol === "https:" || parsed.protocol === "http:")) {
    return false;
  }

  if (parsed.host !== jenkinsBase.host) {
    return false;
  }

  return (
    parsed.pathname.includes("/job/") && parsed.pathname.includes("/artifact/")
  );
}

export const GET: APIRoute = async ({ url }) => {
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response(
      JSON.stringify({ error: "Missing url query parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!isAllowedDownloadUrl(target)) {
    return new Response(JSON.stringify({ error: "Invalid download URL" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await incrementDownloadCount(target);
  } catch (error) {
    console.error("Failed to increment download count", error);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      "Cache-Control": "no-store",
    },
  });
};
