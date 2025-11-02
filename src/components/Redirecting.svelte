<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  interface Props {
    show: boolean;
    target?: string;
  }

  let { show = $bindable(false), target }: Props = $props();
  let mounted = $state(false);
  let overlayElement: HTMLDivElement | undefined;
  let dotElements: HTMLDivElement[] = [];
  let textElement: HTMLParagraphElement | undefined;

  onMount(() => {
    mounted = true;
  });

  $effect(() => {
    if (show && mounted && overlayElement) {
      gsap.fromTo(
        overlayElement,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        dotElements,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.1,
          ease: 'back.out(1.7)' 
        }
      );

      gsap.to(dotElements, {
        y: -10,
        duration: 0.6,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5,
      });

      if (textElement) {
        gsap.fromTo(
          textElement,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
        );
      }
    } else if (!show && overlayElement) {
      gsap.killTweensOf([overlayElement, ...dotElements, textElement]);
    }
  });
</script>

{#if mounted && show}
  <div
    bind:this={overlayElement}
    class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm text-white"
  >
    <div class="flex flex-row gap-2">
      <div bind:this={dotElements[0]} class="w-4 h-4 rounded-full bg-white will-change-transform"></div>
      <div bind:this={dotElements[1]} class="w-4 h-4 rounded-full bg-white will-change-transform"></div>
      <div bind:this={dotElements[2]} class="w-4 h-4 rounded-full bg-white will-change-transform"></div>
    </div>

    <p 
      bind:this={textElement}
      class="mt-8 text-lg font-semibold text-center will-change-transform"
    >
      Redirecting{target ? ` to ${target}` : ''}, please wait...
    </p>
  </div>
{/if}
