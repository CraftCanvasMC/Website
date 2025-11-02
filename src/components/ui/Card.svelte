<script lang="ts">
  import { type Snippet } from 'svelte';
  import { hoverScale } from '../../lib/animations';

  interface Props {
    class?: string;
    children: Snippet;
    enableHover?: boolean;
  }

  let { class: className = '', children, enableHover = false }: Props = $props();

  const classes = `rounded-xl bg-neutral-800/50 p-8 ring-1 ring-neutral-700/50 backdrop-blur-sm will-change-transform ${className}`;
</script>

{#if enableHover}
  <div use:hoverScale={'small'} class={classes}>
    {@render children()}
  </div>
{:else}
  <div class={classes}>
    {@render children()}
  </div>
{/if}
