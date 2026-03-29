export const jenkinsConfig = {
  baseUrl: import.meta.env.JENKINS_BASE_URL || "https://jenkins.canvasmc.io",
  treeQuery:
    "allBuilds[number,url,displayName,result,timestamp,artifacts[relativePath],changeSet[items[msg,commitId,comment,author[fullName]]]]",
} as const;

const javadocConfig = {
  baseUrl: import.meta.env.JAVADOC_BASE_URL || "https://maven.canvasmc.io",
};

export const projects = {
  canvas: {
    slug: "canvas",
    ciJob: "Canvas",
    ciJobUrl: jenkinsConfig.baseUrl + "/job/Canvas/",
    javadocBaseUrl:
      javadocConfig.baseUrl +
      "/javadoc/snapshots/io/canvasmc/canvas/canvas-api",
    versionSuffix: "-R0.1-SNAPSHOT",
  },
  horizon: {
    slug: "horizon",
    ciJob: "Horizon",
    ciJobUrl: jenkinsConfig.baseUrl + "/job/Horizon/",
    javadocBaseUrl:
      javadocConfig.baseUrl + "/javadoc/releases/io/canvasmc/horizon/core",
    versionSuffix: "",
  },
} as const;

export type ProjectSlug = keyof typeof projects;
export type Project = NonNullable<(typeof projects)[ProjectSlug]>;

export function getProjectConfig(project: string | undefined | null) {
  if (!project) return null;
  return projects[project.toLowerCase() as ProjectSlug] ?? null;
}

export function extractProjectFromUrl(url: URL) {
  return getProjectConfig(url.searchParams.get("project"));
}

export function extractChannelFromUrl(url: URL) {
  return url.searchParams.get("channel") || undefined;
}

/**
 * @deprecated Subject to removal in the future.
 */
export function getFallbackProjectName(): string {
  return "canvas";
}

/**
 * @deprecated Subject to removal in the future.
 */
export function getFallbackProject() {
  // to let us better gather usage info
  console.warn("Legacy getFallbackProject was called.");
  return getProjectConfig(getFallbackProjectName());
}

/**
 * @deprecated Subject to removal in the future.
 */
export function extractProjectFromJob(url: URL) {
  // to let us better gather usage info
  console.warn("Legacy extractProjectFromJob was called.");
  return getProjectConfig(url.searchParams.get("job"));
}

/**
 * @deprecated Subject to removal in the future.
 */
export function extractProjectFromJobOrFallback(url: URL) {
  return extractProjectFromJob(url) ?? getFallbackProject();
}

/**
 * @deprecated Subject to removal in the future.
 */
export function extractVersionFromUrl(url: URL) {
  console.warn("Legacy extractVersionFromUrl was called.");
  return (
    url.searchParams.get("minecraft_version") ||
    url.searchParams.get("version") ||
    undefined
  );
}

/**
 * @deprecated Subject to removal in the future.
 */
export function applyDeprecationHeaders(
  headers: Record<string, string>,
  fallbackUsed: boolean,
  fallbackVersionUsed: boolean,
): Record<string, string> {
  const newHeaders = { ...headers };
  if (fallbackUsed && fallbackVersionUsed) {
    newHeaders["Warning"] =
      '299 - "Using this API endpoint without the `project` param AND using deprecated `version`/`minecraft_version` params is deprecated and scheduled for removal. Specify `project` and `channel` instead."';
    newHeaders["Deprecation"] = "@1774104300";
    newHeaders["Sunset"] = "Sun, 31 May 2026 22:00:00 GMT";
  } else if (fallbackUsed) {
    newHeaders["Warning"] =
      '299 - "Using this API endpoint without the `project` param is deprecated and scheduled for removal."';
    newHeaders["Deprecation"] = "@1774104300";
    newHeaders["Sunset"] = "Sun, 31 May 2026 22:00:00 GMT";
  } else if (fallbackVersionUsed) {
    newHeaders["Warning"] =
      '299 - "Using this API endpoint with the `version` and/or `minecraft_version` param(s) is deprecated and scheduled for removal. Use `channel` instead."';
    newHeaders["Deprecation"] = "@1774104300";
    newHeaders["Sunset"] = "Sun, 31 May 2026 22:00:00 GMT";
  }
  return newHeaders;
}
