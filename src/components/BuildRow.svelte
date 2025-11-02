<script lang="ts">
  import { Download } from 'lucide-svelte';
  import Button from './ui/Button.svelte';
  import CommitItem from './CommitItem.svelte';
  import StatusBadge from './StatusBadge.svelte';
  import type { Build } from '../lib/schemas/jenkins';
  import gsap from 'gsap';

  interface Props {
    build: Build;
    isLatest: boolean;
    dateFormatter: Intl.DateTimeFormat;
  }

  let { build, isLatest, dateFormatter }: Props = $props();
  let rowElement: HTMLDivElement | undefined = $state();

  const formattedDate = $derived(dateFormatter.format(new Date(build.timestamp)).replace(',', ''));
  
  const relativeTime = $derived.by(() => {
    const diffMs = Date.now() - build.timestamp;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  });

  const displayCommits = $derived(build.commits.slice(0, 100));

  function handleMouseEnter() {
    if (rowElement) {
      gsap.to(rowElement, {
        scale: 1.008,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  }

  function handleMouseLeave() {
    if (rowElement) {
      gsap.to(rowElement, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  }
</script>

<div
  bind:this={rowElement}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="article"
  class="group relative flex flex-col justify-between gap-4 border border-neutral-800 border-t py-4 px-4 sm:px-6 sm:flex-row sm:items-center rounded-lg will-change-transform"
>
  <div class="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center">
    <div class="flex flex-col justify-center pr-6 sm:pr-8 border-r border-white/10 min-w-[120px] sm:min-w-[140px]">
      <div class="flex items-center gap-2">
        <span class="text-lg font-semibold text-neutral-100">#{build.buildNumber}</span>
        <StatusBadge result={build.result} isExperimental={build.isExperimental} />
      </div>
      <span class="text-[11px] text-neutral-500 mt-1">
        {formattedDate} <span class="text-neutral-600">({relativeTime})</span>
      </span>
    </div>

    <div class="flex-1 min-w-0 pl-6 sm:pl-8 mt-3 sm:mt-0 space-y-2">
      {#if build.commits.length === 0}
        <span class="text-neutral-300 text-sm">No changes</span>
      {:else}
        {#each displayCommits as commit, cidx}
          <CommitItem {commit} commitIndex={`${build.buildNumber}-${cidx}`} />
        {/each}
      {/if}
    </div>
  </div>

  <Button
    variant={isLatest ? 'default' : 'secondary'}
    disabled={!build.downloadUrl}
    class="w-full shrink-0 sm:w-auto"
  >
    {#snippet children()}
      {#if build.downloadUrl}
        <a href={build.downloadUrl} download class="inline-flex items-center gap-2">
          <Download class="size-4" />
          Download
        </a>
      {:else}
        <span class="inline-flex items-center gap-2">
          <Download class="size-4" />
          Unavailable
        </span>
      {/if}
    {/snippet}
  </Button>
</div>
