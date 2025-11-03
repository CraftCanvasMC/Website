<script lang="ts">
  import DownloadsPage from './DownloadsPage.svelte';
  import type { Build } from '../lib/schemas/jenkins';
  import { onMount } from 'svelte';
  import { jenkinsConfig } from '../config/jenkins';
  import { Palette } from 'lucide-svelte';

  let buildsByVersion = $state<Record<string, Build[]>>({});
  let versions = $state<string[]>([]);
  let usingCache = $state(false);
  let jenkinsDown = $state(false);
  let loading = $state(true);
  let error = $state<string | null>(null);

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

  async function fetchBuilds() {
    try {
      loading = true;
      error = null;

      const response = await fetch('/api/v2/builds?experimental=true');
      
      if (!response.ok && response.status !== 503) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error && !data.builds) {
        jenkinsDown = true;
        usingCache = false;
        error = data.error;
        loading = false;
        return;
      }

      const builds: Build[] = data.builds || [];
      usingCache = data.cached ?? false;
      jenkinsDown = data.jenkinsDown ?? false;
      
      const filteredBuilds = builds.filter(b => b.minecraftVersion !== 'unknown');
      
      buildsByVersion = filteredBuilds.reduce<Record<string, Build[]>>((grouped, build) => {
        grouped[build.minecraftVersion] ??= [];
        grouped[build.minecraftVersion].push(build);
        return grouped;
      }, {});
      
      versions = Object.keys(buildsByVersion).sort().reverse();
      loading = false;
    } catch (err) {
      console.error('Failed to fetch builds:', err);
      
      const isReachable = await isJenkinsReachable();
      jenkinsDown = !isReachable;
      usingCache = false;
      
      error = err instanceof Error ? err.message : 'Failed to fetch builds';
      loading = false;
    }
  }

  onMount(() => {
    fetchBuilds();
  });
</script>

{#if loading}
  <section class="mt-12 sm:mt-16 min-h-[60vh] mb-20">
    <div class="border border-neutral-800 rounded-lg p-6 relative bg-neutral-900/30 backdrop-blur-sm overflow-hidden">
      <div class="flex flex-col items-center justify-center py-24 text-center overflow-hidden">
        <div class="heartbeat-container mb-6">
          <Palette class="size-12 text-neutral-200" />
        </div>
        <p class="text-xl font-medium text-neutral-300">
          Loading builds...
        </p>
      </div>
    </div>
  </section>
{:else if jenkinsDown}
  <div class="fixed top-4 right-4 z-50 bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg border border-red-400/50 max-w-sm">
    <div class="flex items-start gap-3">
      <div class="shrink-0 mt-0.5">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <p class="font-semibold text-sm">Jenkins is Down</p>
        <p class="text-xs mt-0.5 text-white/90">
          Unable to fetch builds at this time.
        </p>
      </div>
    </div>
  </div>
  
  <section class="mt-12 sm:mt-16">
    <div class="border border-neutral-800 rounded-lg p-6 relative bg-neutral-900/30 backdrop-blur-sm overflow-hidden">
      <div class="flex flex-col items-center justify-center py-24 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
          <svg class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-neutral-100 mb-2">Downloads Unavailable</h3>
        <p class="text-neutral-400 max-w-md mx-auto">
          Our Jenkins server is currently unreachable. Please check back later.
        </p>
      </div>
    </div>
  </section>
{:else}
  <DownloadsPage 
    {buildsByVersion}
    {versions}
    {usingCache}
    {jenkinsDown}
  />
{/if}
