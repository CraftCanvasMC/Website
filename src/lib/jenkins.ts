import { z } from 'zod';
import { jenkinsConfig } from '~/config/jenkins';
import { type Build, type JenkinsBuild, JenkinsBuildSchema } from '~/lib/schemas/jenkins';
import { getCachedBuilds, setCachedBuilds, hasCachedBuilds } from '~/lib/cache';

export class JenkinsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JenkinsError';
  }
}

function extractExtraDescription(msg?: string | null, comment?: string | null): string | null {
  if (!comment) return null;

  let lines = comment.split(/\r?\n/);

  if (lines.length === 0) return null;

  const firstLine = lines[0].trim();
  const msgTrim = msg?.trim() ?? '';

  if (msgTrim && firstLine.toLowerCase() === msgTrim.toLowerCase()) {
    lines = lines.slice(1);
  }

  const remaining = lines.join('\n');

  return remaining.replace(/\s+/g, '') === '' ? null : remaining;
}

function parseBuild(build: JenkinsBuild): Build {
  const isExperimental = build.displayName.endsWith('(Experimental)');
  const versionMatch = build.displayName.match(/\s*-\s*([\d.]+)/);

  const commits =
    build.changeSet?.items
      ?.map(item => {
        const message = item.msg || null;
        const extraDescription = extractExtraDescription(message, item.comment);
        return {
          message,
          extraDescription,
          hash: item.commitId || null,
        };
      })
      ?.reverse() || [];

  const firstCommit = build.changeSet?.items?.[0];
  const firstMessage = firstCommit?.msg || null;
  const firstExtra = extractExtraDescription(firstMessage, firstCommit?.comment);

  return {
    result: build.result,
    buildNumber: build.number,
    url: build.url,
    downloadUrl: build.artifacts?.[0]
      ? `${build.url}artifact/${build.artifacts[0].relativePath}`
      : null,
    minecraftVersion: versionMatch?.[1]?.replace('-', '') || 'unknown',
    timestamp: build.timestamp,
    isExperimental,
    commit: {
      message: firstMessage,
      extraDescription: firstExtra,
      hash: firstCommit?.commitId || null,
    },
    commits,
  };
}

type BuildOptions = {
  minecraftVersion?: string;
  includeExperimental?: boolean;
};

export async function getAllBuilds(options?: BuildOptions): Promise<Build[]> {
  try {
    const url = new URL(`job/${jenkinsConfig.job}/api/json?tree=${encodeURIComponent(jenkinsConfig.treeQuery)}`,jenkinsConfig.baseUrl);

    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    }).catch(() => {
      throw new JenkinsError('Failed to connect to Jenkins API');
    });

    if (!res.ok) {
      throw new JenkinsError(`Jenkins API returned ${res.status}${res.statusText ? ` ${res.statusText}` : ''}`);
    }

    const json = await res.json().catch(() => {
      throw new JenkinsError('Jenkins API returned invalid JSON');
    });
    const parseResult = z.object({ allBuilds: z.array(JenkinsBuildSchema) }).safeParse(json);

    if (!parseResult.success) {
      throw new JenkinsError('Jenkins API returned invalid data format');
    }

    const allBuilds = parseResult.data.allBuilds.filter(b => !b.building).map(parseBuild);

    setCachedBuilds(allBuilds);

    return allBuilds.filter(
      b => (!options?.minecraftVersion || b.minecraftVersion === options.minecraftVersion) && (!b.isExperimental || options?.includeExperimental === true));
  } catch (error) {
    const cachedBuilds = getCachedBuilds();
    
    if (cachedBuilds && cachedBuilds.length > 0) {
      return cachedBuilds.filter(
        b => (!options?.minecraftVersion || b.minecraftVersion === options.minecraftVersion) && (!b.isExperimental || options?.includeExperimental === true));
    }

    throw error;
  }
}

export async function getLatestBuild(includeExperimental = false): Promise<Build | null> {
  const builds = await getAllBuilds({ includeExperimental });

  if (builds.length === 0) throw new JenkinsError('No builds found');

  return builds[0];
}
