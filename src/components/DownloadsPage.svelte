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
  let redirecting = $state(false);
  let contentContainer: HTMLDivElement | undefined = $state();
  let notificationElement: HTMLDivElement | undefined = $state();
  let buildsListElement: HTMLDivElement | undefined = $state();

  let builds = $derived.by(() => {
    const versionBuilds = buildsByVersion[selectedVersion];
    return versionBuilds?.slice(0, 11) ?? [];
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
    if (buildsListElement && builds.length > 0) {
      const buildElements = buildsListElement.querySelectorAll('.build-row');
      gsap.fromTo(
        buildElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    }
  });

  $effect(() => {
    const clearRedirect = () => (redirecting = false);
    window.addEventListener('pageshow', clearRedirect);
    return () => window.removeEventListener('pageshow', clearRedirect);
  });
</script>

<section class="mt-12 sm:mt-16 relative">
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
          class="p-2 rounded hover:bg-white/10 transition-colors"
          title="View Javadocs"
          aria-label="View Javadocs"
        >
          <BookOpenText class="size-5 text-neutral-300 hover:text-neutral-100" />
        </button>
      </div>

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
              <div class="build-row">
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
</section>
