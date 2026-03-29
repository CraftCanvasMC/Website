import type { APIRoute } from "astro";
import { projects } from "@/config/jenkins";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    return new Response(
      JSON.stringify({
        projects: Object.values(projects).map((p) => ({
          slug: p.slug,
          ciJob: p.ciJob,
          ciJobUrl: p.ciJobUrl,
          javadocBaseUrl: p.javadocBaseUrl,
        })),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
