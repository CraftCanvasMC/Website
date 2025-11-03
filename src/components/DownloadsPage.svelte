<script lang="ts">
  import { LayoutList, PanelsTopLeft, BookOpenText } from 'lucide-svelte';
  import Button from './ui/Button.svelte';
  import Card from './ui/Card.svelte';
  import Select from './ui/Select.svelte';
  import Redirecting from './Redirecting.svelte';
  import BuildRow from './BuildRow.svelte';
  import SculptorContent from './SculptorContent.svelte';
  import type { Build } from '../lib/schemas/jenkins';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import { scrollReveal, scrollStagger } from '../lib/animations';

  interface Props {
    buildsByVersion: Record<string, Build[]>;
    versions: string[];
    usingCache?: boolean;
    jenkinsDown?: boolean;
  }

  let {
    buildsByVersion,
    versions,
    usingCache = false,
    jenkinsDown = false
  }: Props = $props();

  let selectedVersion = $state(versions[0]);
  let showNewTab = $state(false);
  let showFailedBuilds = $state(false);
  let redirecting = $state(false);
  let contentContainer: HTMLDivElement | undefined = $state();
  let notificationElement: HTMLDivElement | undefined = $state();
  let buildsListElement: HTMLDivElement | undefined = $state();

  let builds = $derived.by(() => {
    const versionBuilds = buildsByVersion[selectedVersion];
    const allBuilds = versionBuilds?.slice(0, 12) ?? [];
    
    if (showFailedBuilds) {
      return allBuilds;
    }
    
    return allBuilds.filter(build => build.result === 'SUCCESS');
  });

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  function handleJavadocRedirect() {
    redirecting = true;
    setTimeout(() => {
      window.location.href = `/api/v2/jd/?version=${selectedVersion}&experimental=false`;
    }, 150);
  }

  function toggleTab() {
    if (contentContainer) {
      gsap.to(contentContainer, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          showNewTab = !showNewTab;
          if (contentContainer) {
            gsap.fromTo(
              contentContainer,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
          }
        }
      });
    } else {
      showNewTab = !showNewTab;
    }
  }

  onMount(() => {
    if (notificationElement) {
      gsap.fromTo(
        notificationElement,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  });

  $effect(() => {
    const clearRedirect = () => (redirecting = false);
    window.addEventListener('pageshow', clearRedirect);
    return () => window.removeEventListener('pageshow', clearRedirect);
  });
</script>

<section class="mt-12 sm:mt-16 relative min-h-[60vh] mb-20">
  {#if jenkinsDown}
    <div bind:this={notificationElement} class="fixed top-4 right-4 z-50 bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg border border-red-400/50 max-w-sm">
      <div class="flex items-start gap-3">
        <div class="shrink-0 mt-0.5">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-sm">Jenkins is Down</p>
          <p class="text-xs mt-0.5 text-white/90">
            {usingCache ? 'Showing cached builds. Downloads may be unavailable.' : 'Unable to fetch builds at this time.'}
          </p>
        </div>
      </div>
    </div>
  {:else if usingCache}
    <div bind:this={notificationElement} class="fixed top-4 right-4 z-50 bg-yellow-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg border border-yellow-400/50 max-w-sm">
      <div class="flex items-start gap-3">
        <div class="shrink-0 mt-0.5">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-sm">Showing Cached Builds</p>
          <p class="text-xs mt-0.5 text-white/90">
            Jenkins is currently building. Showing recent builds from cache. Downloads are still available.
          </p>
        </div>
      </div>
    </div>
  {/if}

  <Redirecting bind:show={redirecting} target="Javadocs" />
  
  <div use:scrollReveal={{ type: 'slideUp', start: 'top 85%' }}>
    <Card class="p-6 overflow-hidden">
      <div class="mb-6 flex items-center justify-between gap-4 animate-fade-in">
      <div class="flex items-center gap-2">
        <Select
          value={selectedVersion}
          onValueChange={(v: string) => (selectedVersion = v)}
          options={versions.map((v: string) => ({ value: v, label: `Minecraft ${v}` }))}
          class="w-[180px]"
        />
        <button
          onclick={handleJavadocRedirect}
          class="group relative flex items-center gap-2 p-2 rounded hover:bg-white/10 transition-all overflow-hidden"
          title="View Javadocs"
          aria-label="View Javadocs"
        >
          <BookOpenText class="size-5 text-neutral-300 group-hover:text-neutral-100 transition-colors shrink-0" />
          <span class="text-sm text-neutral-300 group-hover:text-neutral-100 whitespace-nowrap max-w-0 group-hover:max-w-[150px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            Javadocs
          </span>
        </button>
        <button
          onclick={() => (showFailedBuilds = !showFailedBuilds)}
          class="group relative flex items-center gap-2 p-2 rounded hover:bg-white/10 transition-all overflow-hidden {showFailedBuilds ? 'bg-white/10' : ''}"
          title={showFailedBuilds ? 'Hide Failed Builds' : 'Show Failed Builds'}
          aria-label={showFailedBuilds ? 'Hide Failed Builds' : 'Show Failed Builds'}
        >
          <svg class="size-5 text-neutral-300 group-hover:text-neutral-100 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            {#if !showFailedBuilds}
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            {/if}
          </svg>
          <span class="text-sm text-neutral-300 group-hover:text-neutral-100 whitespace-nowrap max-w-0 group-hover:max-w-[150px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            {showFailedBuilds ? 'Hide Failed Builds' : 'Show Failed Builds'}
          </span>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <Button
          variant={showNewTab ? 'default' : 'secondary'}
          onclick={toggleTab}
          class="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
        >
          {#snippet children()}
            {#if showNewTab}
              <LayoutList class="size-4" />
              Show Builds
            {:else}
              <PanelsTopLeft class="size-4" />
              Show Sculptor
            {/if}
          {/snippet}
        </Button>
      </div>
    </div>

    <div bind:this={contentContainer}>
      {#if showNewTab}
        <SculptorContent {selectedVersion} {jenkinsDown} />
      {:else if jenkinsDown && builds.length === 0}
        <div class="text-center py-16">
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
      {:else}
        <div bind:this={buildsListElement} class="space-y-2">
          {#if builds.length === 0}
            <p class="text-neutral-300 text-center">No builds available for this version.</p>
          {:else}
            {#each builds as build, index (build.buildNumber)}
              <div use:scrollReveal={{ type: 'slideUp', start: 'top 100%', delay: index * 0.05 }}>
                <BuildRow {build} isLatest={index === 0} {dateFormatter} />
              </div>
            {/each}
          {/if}
        </div>
      {/if}
    </div>

      {#if !jenkinsDown}
        <div class="mt-8 text-center">
          <a href="https://jenkins.canvasmc.io" target="_blank" rel="noopener noreferrer" class="text-neutral-400 text-sm hover:text-neutral-300 transition-colors">
            Looking for older builds? Check out our Jenkins server →
          </a>
        </div>
      {/if}
    </Card>
  </div>
</section>
