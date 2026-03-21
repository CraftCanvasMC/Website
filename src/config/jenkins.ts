export const jenkinsConfig = {
  baseUrl: import.meta.env.JENKINS_BASE_URL || "https://jenkins.canvasmc.io",
  treeQuery:
    "allBuilds[number,url,displayName,result,timestamp,artifacts[relativePath],changeSet[items[msg,commitId,comment,author[fullName]]]]",
} as const;

export const projects = {
  canvas: {
    slug: "canvas",
    jenkinsJob: "Canvas",
    javadocBaseUrl:
      "https://maven.canvasmc.io/javadoc/snapshots/io/canvasmc/canvas/canvas-api",
    versionSuffix: "-R0.1-SNAPSHOT",
  },
  horizon: {
    slug: "horizon",
    jenkinsJob: "Horizon",
    javadocBaseUrl:
      "https://maven.canvasmc.io/javadoc/releases/io/canvasmc/horizon/core",
    versionSuffix: "",
  },
} as const;

export type ProjectSlug = keyof typeof projects;

export function getProjectConfig(project: string | undefined | null) {
  if (!project) return null;
  return projects[project.toLowerCase() as ProjectSlug] ?? null;
}

export function extractProjectFromUrl(url: URL) {
  return getProjectConfig(url.searchParams.get("project"));
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
  return getProjectConfig(getFallbackProjectName());
}

/**
 * @deprecated Subject to removal in the future.
 */
export function extractProjectFromJob(url: URL) {
  return getProjectConfig(url.searchParams.get("job"));
}

/**
 * @deprecated Subject to removal in the future.
 */
export function extractProjectFromJobOrFallback(url: URL) {
  return extractProjectFromJob(url) ?? getFallbackProject();
}
