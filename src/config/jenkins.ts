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
  sculptor: {
    slug: "sculptor",
    ciJob: "Sculptor",
    ciJobUrl: jenkinsConfig.baseUrl + "/job/Sculptor/",
    javadocBaseUrl: "",
    versionSuffix: "",
  },
} as const;

export type ProjectSlug = keyof typeof projects;

export interface Project {
  slug: string;
  ciJob: string;
  ciJobUrl: string;
  javadocBaseUrl: string;
  versionSuffix: string;
}

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
  console.warn(
    `Legacy extractProjectFromJob was called from ${url.toString()}.`,
  );
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
  console.warn(
    `Legacy extractVersionFromUrl was called from ${url.toString()}.`,
  );
  return (
    url.searchParams.get("minecraft_version") ||
    url.searchParams.get("version") ||
    undefined
  );
}
