export const jenkinsConfig = {
  baseUrl: import.meta.env.JENKINS_BASE_URL || "https://jenkins.canvasmc.io",
  job: "Canvas",
  treeQuery:
    "allBuilds[number,url,displayName,result,timestamp,artifacts[relativePath],changeSet[items[msg,commitId,comment,author[fullName]]]]",
} as const;
