import DownloadsPage from './DownloadsPage.client';
import { getAllBuilds } from '~/lib/jenkins';
import { hasCachedBuilds } from '~/lib/cache';

export const dynamic = 'force-dynamic';

export default async function DownloadsServerPage() {
  let usingCache = false;
  let builds = [];

  try {
    builds = await getAllBuilds({ includeExperimental: true });
  } catch (error) {
    usingCache = hasCachedBuilds();
    
    if (!usingCache) {
      throw error;
    }
    
    builds = await getAllBuilds({ includeExperimental: true });
  }

  const filteredBuilds = builds.filter(b => b.minecraftVersion !== 'unknown');

  const buildsByVersion = filteredBuilds.reduce<Record<string, typeof filteredBuilds>>((grouped, build) => {
    grouped[build.minecraftVersion] ??= [];
    grouped[build.minecraftVersion].push(build);
    return grouped;
  }, {});

  const versions = Object.keys(buildsByVersion).sort().reverse();

  return <DownloadsPage buildsByVersion={buildsByVersion} versions={versions} usingCache={usingCache} />;
}
