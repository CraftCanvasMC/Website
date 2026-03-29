import { jenkinsConfig, type Project } from "@/config/jenkins";
import { z } from "zod";
import { setCachedBuilds } from "./cache";
import {
  type Build,
  type JenkinsBuild,
  JenkinsBuildSchema,
} from "./schemas/jenkins";

export class JenkinsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JenkinsError";
  }
}

function extractExtraDescription(
  msg?: string | null,
  comment?: string | null
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
    channelVersion:
      versionMatch?.input?.replace(/^#\d+\s*-\s*/, "") || "unknown",
    timestamp: build.timestamp,
    isExperimental,
    commits,
  };
}

type BuildOptions = {
  project: Project;
  channelVersion?: string;
  includeExperimental?: boolean;
};

export async function getAllBuilds(options: BuildOptions): Promise<Build[]> {
  const project = options.project;

  const url = new URL(
    `api/json?tree=${encodeURIComponent(jenkinsConfig.treeQuery)}`,
    project.ciJobUrl
  );

  const res = await fetch(url.toString()).catch(() => {
    throw new JenkinsError("Failed to connect to Jenkins API");
  });

  if (!res.ok) {
    throw new JenkinsError(
      `Jenkins API returned ${res.status}${res.statusText ? ` ${res.statusText}` : ""}`
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

  await setCachedBuilds(project, allBuilds);

  return allBuilds.filter((b) => {
    const matchesChannel =
      !options.channelVersion ||
      b.channelVersion === options.channelVersion ||
      (options.includeExperimental &&
        b.channelVersion === `${options.channelVersion} (Experimental)`);

    const matchesExperimental =
      !b.isExperimental || options.includeExperimental === true;

    return matchesChannel && matchesExperimental;
  });
}

export async function getLatestBuild(
  project: Project,
  channelVersion?: string | undefined,
  includeExperimental = false
): Promise<Build> {
  const builds = channelVersion
    ? await getAllBuilds({ project, channelVersion, includeExperimental })
    : await getAllBuilds({ project, includeExperimental });

  if (builds.length === 0) throw new JenkinsError("No builds found");

  return builds[0];
}

export function getProjectJavadocUrl(
  project: Project,
  channelVersion: string,
  build?: string | undefined | null
) {
  const baseUrl = project.javadocBaseUrl;
  // account for horizon's special versioning scheme
  if (project.slug === "horizon" && build) {
    return `${baseUrl}/${channelVersion}${project.versionSuffix}.${build}`;
  }
  return `${baseUrl}/${channelVersion}${project.versionSuffix}`;
}
