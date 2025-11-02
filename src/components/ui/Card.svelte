<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
  }

  let { class: className = '', children }: Props = $props();

  const classes = `rounded-xl bg-neutral-800/50 p-8 ring-1 ring-neutral-700/50 backdrop-blur-sm ${className}`;
</script>

<div class={classes}>
  {@render children()}
</div>
