import type { APIRoute } from 'astro';
import { getAllBuilds } from '../../lib/jenkins';
import { getCachedBuilds } from '../../lib/cache';

export const GET: APIRoute = async () => {
  try {
    let allBuilds;
    
    try {
      allBuilds = await getAllBuilds();
    } catch {
      allBuilds = await getCachedBuilds();
      if (!allBuilds || allBuilds.length === 0) {
        return new Response('No builds available', { status: 503 });
      }
    }

    const versions = [...new Set(allBuilds.map(b => b.minecraftVersion))].sort((a, b) => {
      const [aMajor, aMinor, aPatch] = a.split('.').map(Number);
      const [bMajor, bMinor, bPatch] = b.split('.').map(Number);
      
      if (aMajor !== bMajor) return bMajor - aMajor;
      if (aMinor !== bMinor) return bMinor - aMinor;
      return (bPatch || 0) - (aPatch || 0);
    });

    if (versions.length === 0) {
      return new Response('No builds available', { status: 503 });
    }

    const latestMcVersion = versions[0];

    const latestBuild = allBuilds
      .filter(b => b.minecraftVersion === latestMcVersion && !b.isExperimental)
      .sort((a, b) => b.buildNumber - a.buildNumber)[0];

    if (!latestBuild || !latestBuild.downloadUrl) {
      return new Response('Latest build not available', { status: 503 });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: latestBuild.downloadUrl,
      },
    });
  } catch (error) {
    console.error('Error in /downloads/latest:', error);
    return new Response('Internal server error', { status: 500 });
  }
};
