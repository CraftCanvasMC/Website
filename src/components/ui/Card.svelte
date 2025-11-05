<script lang="ts">
  import { type Snippet } from 'svelte';
  import { hoverScale, scrollReveal } from '../../lib/animations';
  import type { ENTRANCE_ANIMATIONS } from '../../lib/animations';

  interface Props {
    class?: string;
    children: Snippet;
    enableHover?: boolean;
    enableScroll?: boolean;
    scrollType?: keyof typeof ENTRANCE_ANIMATIONS;
    scrollStart?: string;
    scrollDelay?: number;
  }

  let { 
    class: className = '', 
    children, 
    enableHover = false,
    enableScroll = false,
    scrollType = 'slideUp',
    scrollStart = 'top 80%',
    scrollDelay = 0
  }: Props = $props();

  const classes = `rounded-xl bg-neutral-800/50 p-8 ring-1 ring-neutral-700/50 backdrop-blur-sm will-change-transform ${className}`;
</script>

{#if enableHover && enableScroll}
  <div use:hoverScale={'small'} use:scrollReveal={{ type: scrollType, start: scrollStart, delay: scrollDelay }} class={classes}>
    {@render children()}
  </div>
{:else if enableHover}
  <div use:hoverScale={'small'} class={classes}>
    {@render children()}
  </div>
{:else if enableScroll}
  <div use:scrollReveal={{ type: scrollType, start: scrollStart, delay: scrollDelay }} class={classes}>
    {@render children()}
  </div>
{:else}
  <div class={classes}>
    {@render children()}
  </div>
{/if}
