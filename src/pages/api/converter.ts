import type { APIRoute } from "astro";

import { createMigrationArchive } from "@/lib/converter";

export const prerender = false;

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") ?? "";

  let configText = "";

  try {
    if (contentType.includes("application/json")) {
      const payload = await request.json();
      configText =
        typeof payload?.configText === "string" ? payload.configText : "";
    } else {
      configText = await request.text();
    }
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  if (!configText.trim()) {
    return jsonResponse(
      { error: "Provide the old canvas-server.json5 contents." },
      400
    );
  }

  try {
    const { archive, migratedCount, removedOptions } =
      await createMigrationArchive(configText);
    const archiveBytes = Uint8Array.from(archive);
    const archiveBlob = new Blob([archiveBytes], { type: "application/zip" });

    return new Response(archiveBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          'attachment; filename="canvas-config-migrated.zip"',
        "Cache-Control": "no-store",
        "X-Canvas-Migrated-Options": String(migratedCount),
        "X-Canvas-Removed-Options": String(removedOptions.length),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to migrate the provided config.";

    return jsonResponse({ error: message }, 400);
  }
};
