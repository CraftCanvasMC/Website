import { z } from "zod";
import { jenkinsConfig } from "../config/jenkins";
import {
  type Build,
  type JenkinsBuild,
  JenkinsBuildSchema,
} from "./schemas/jenkins";
import { setCachedBuilds } from "./cache";

export class JenkinsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JenkinsError";
  }
}

function extractExtraDescription(
  msg?: string | null,
  comment?: string | null,
): string | null {
  if (!comment) return null;

  let lines = comment.split(/\r?\n/);

  if (lines.length === 0) return null;

  const firstLine = lines[0].trim();
  const msgTrim = msg?.trim() ?? "";

  if (msgTrim && firstLine.toLowerCase() === msgTrim.toLowerCase()) {
    lines = lines.slice(1);
  }

  const remaining = lines.join("\n");

  return remaining.replace(/\s+/g, "") === "" ? null : remaining;
}

function parseBuild(build: JenkinsBuild): Build {
  const isExperimental = build.displayName.endsWith("(Experimental)");
  const versionMatch = build.displayName.match(/\s*-\s*([\d.]+)/);

  const commits =
    build.changeSet?.items
      ?.map((item) => {
        const message = item.msg || null;
        const extraDescription = extractExtraDescription(message, item.comment);
        return {
          message,
          extraDescription,
          hash: item.commitId || null,
          author: item.author?.fullName || null,
        };
      })
      ?.reverse() || [];

  return {
    result: build.result,
    buildNumber: build.number,
    url: build.url,
    downloadUrl: build.artifacts?.[0]
      ? `${build.url}artifact/${build.artifacts[0].relativePath}`
      : null,
    minecraftVersion: versionMatch?.[1]?.replace("-", "") || "unknown",
    timestamp: build.timestamp,
    isExperimental,
    commits,
  };
}

type BuildOptions = {
  minecraftVersion?: string;
  includeExperimental?: boolean;
  job?: string;
};

export async function getAllBuilds(options?: BuildOptions): Promise<Build[]> {
  // throw new JenkinsError('Simulated: Jenkins is currently building');

  try {
    const jobName = options?.job ?? jenkinsConfig.job;

    const url = new URL(
      `job/${jobName}/api/json?tree=${encodeURIComponent(jenkinsConfig.treeQuery)}`,
      jenkinsConfig.baseUrl,
    );

    const res = await fetch(url.toString()).catch(() => {
      throw new JenkinsError("Failed to connect to Jenkins API");
    });

    if (!res.ok) {
      throw new JenkinsError(
        `Jenkins API returned ${res.status}${res.statusText ? ` ${res.statusText}` : ""}`,
      );
    }

    const json = await res.json().catch(() => {
      throw new JenkinsError("Jenkins API returned invalid JSON");
    });

    const parseResult = z
      .object({ allBuilds: z.array(JenkinsBuildSchema) })
      .safeParse(json);

    if (!parseResult.success) {
      throw new JenkinsError("Jenkins API returned invalid data format");
    }

    const allBuilds = parseResult.data.allBuilds
      .filter((b) => !b.building)
      .map(parseBuild);

    await setCachedBuilds(allBuilds);

    return allBuilds.filter(
      (b) =>
        (!options?.minecraftVersion ||
          b.minecraftVersion === options.minecraftVersion) &&
        (!b.isExperimental || options?.includeExperimental === true),
    );
  } catch (error) {
    throw error;
  }
}

export async function getLatestBuild(
  includeExperimental = false,
  job?: string,
): Promise<Build | null> {
  const builds = await getAllBuilds({ includeExperimental, job });

  if (builds.length === 0) throw new JenkinsError("No builds found");

  return builds[0];
}
