<script lang="ts">
  import { GitCommit, ChevronRight } from 'lucide-svelte';

  interface Props {
    commit: {
      message: string | null;
      extraDescription: string | null;
      hash: string | null;
    };
    commitIndex: string;
  }

  let { commit, commitIndex }: Props = $props();
  let isOpen = $state(false);
</script>

<div class="min-w-0 space-y-1">
  <div class="flex min-w-0 items-center gap-1.5">
    <a
      href={`https://github.com/CraftCanvasMC/Canvas/commit/${commit.hash}`}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex shrink-0 items-center gap-1.5 text-neutral-500 text-sm hover:text-neutral-400"
    >
      <GitCommit class="size-3.5" />
      {commit.hash?.slice(0, 7)}
    </a>

    <p class="min-w-0 break-words text-neutral-300 text-sm flex-1">
      {commit.message || 'No commit message'}
    </p>

    {#if commit.extraDescription}
      <button
        onclick={() => (isOpen = !isOpen)}
        class="ml-1 text-neutral-500 hover:text-neutral-300 transition-colors"
        title={isOpen ? 'Hide details' : 'Show details'}
        aria-expanded={isOpen}
      >
        <ChevronRight
          class="size-4 transition-transform duration-200 {isOpen ? 'rotate-90' : ''}"
        />
      </button>
    {/if}
  </div>

  {#if commit.extraDescription}
    <div
      class="overflow-hidden transition-all duration-200 {isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}"
    >
      <div class="pl-6 text-sm text-neutral-400 border-l border-neutral-700 whitespace-pre-wrap font-mono">
        {commit.extraDescription.replace(/^\n/, '')}
      </div>
    </div>
  {/if}
</div>
