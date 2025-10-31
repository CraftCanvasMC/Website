import DownloadsPage from './DownloadsPage.client';
import { getAllBuilds } from '~/lib/jenkins';
import { hasCachedBuilds, getCachedBuilds } from '~/lib/cache';
import { jenkinsConfig } from '~/config/jenkins';

export const dynamic = 'force-dynamic';

async function isJenkinsReachable(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(jenkinsConfig.baseUrl, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store',
    });
    
    clearTimeout(timeoutId);
    return response.ok || response.status < 500;
  } catch {
    return false;
  }
}

export default async function DownloadsServerPage() {
  let usingCache = false;
  let jenkinsDown = false;
  let builds = [];

  try {
    builds = await getAllBuilds({ includeExperimental: true });
  } catch (error) {
    const isReachable = await isJenkinsReachable();
    if (!isReachable) {
      jenkinsDown = true;
      usingCache = hasCachedBuilds();
      
      if (!usingCache) {
        return <DownloadsPage buildsByVersion={{}} versions={[]} usingCache={false} jenkinsDown={true} />;
      }
      builds = (await getCachedBuilds(true)) || [];
    } else {
      usingCache = true;
      builds = (await getCachedBuilds(true)) || [];
    }
  }

  const filteredBuilds = builds.filter(b => b.minecraftVersion !== 'unknown');

  const buildsByVersion = filteredBuilds.reduce<Record<string, typeof filteredBuilds>>((grouped, build) => {
    grouped[build.minecraftVersion] ??= [];
    grouped[build.minecraftVersion].push(build);
    return grouped;
  }, {});

  const versions = Object.keys(buildsByVersion).sort().reverse();

  return <DownloadsPage buildsByVersion={buildsByVersion} versions={versions} usingCache={usingCache} jenkinsDown={jenkinsDown} />;
}
