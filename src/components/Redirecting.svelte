<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  interface Props {
    show: boolean;
    target?: string;
  }

  let { show = $bindable(false), target }: Props = $props();
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted && show}
  <div
    class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm text-white"
    transition:fade={{ duration: 300 }}
  >
    <div class="flex flex-row gap-2">
      <div class="w-4 h-4 rounded-full bg-white animate-bounce"></div>
      <div class="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-0.3s]"></div>
      <div class="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-0.5s]"></div>
    </div>

    <p 
      class="mt-8 text-lg font-semibold text-center"
      in:fly={{ y: 8, delay: 250, duration: 400 }}
    >
      Redirecting{target ? ` to ${target}` : ''}, please wait...
    </p>
  </div>
{/if}
