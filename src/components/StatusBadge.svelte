<script lang="ts">
  interface Props {
    result?: string;
    isExperimental?: boolean;
  }

  let { result, isExperimental = false }: Props = $props();
</script>

{#if result === 'FAILURE'}
  <span class="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-400">Failed</span>
{:else if result === 'ABORTED'}
  <span class="rounded-full bg-gray-500/20 px-2 py-0.5 text-xs font-semibold text-gray-400">Cancelled</span>
{:else if isExperimental}
  <span class="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-400">Experimental</span>
{/if}
