<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  interface Props {
    show: boolean;
    target?: string;
  }

  let { show = $bindable(false), target }: Props = $props();
  let mounted = $state(false);
  let overlayElement = $state<HTMLDivElement | undefined>(undefined);
  let dotElements: HTMLDivElement[] = [];
  let textElement = $state<HTMLParagraphElement | undefined>(undefined);
  let portalTarget = $state<HTMLDivElement | undefined>(undefined);

  onMount(() => {
    mounted = true;
    portalTarget = document.createElement('div');
    portalTarget.style.position = 'fixed';
    portalTarget.style.inset = '0';
    portalTarget.style.zIndex = '99999';
    portalTarget.style.pointerEvents = 'none';
    document.body.appendChild(portalTarget);

    return () => {
      if (portalTarget && document.body.contains(portalTarget)) {
        document.body.removeChild(portalTarget);
      }
    };
  });

  $effect(() => {
    if (show && mounted && overlayElement && portalTarget) {
      portalTarget.appendChild(overlayElement);
      
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
    class="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm text-white pointer-events-auto"
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
