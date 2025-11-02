<script lang="ts">
  import { Home, Download, Github, Heart, Sparkles } from 'lucide-svelte';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  let iconContainer: HTMLDivElement;

  onMount(() => {
    gsap.from('.icon-item', {
      scale: 0,
      rotation: -180,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });

    const icons = iconContainer.querySelectorAll('.icon-item');
    icons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, { 
          scale: 1.2, 
          rotation: 360, 
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, { 
          scale: 1, 
          rotation: 0, 
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });
  });
</script>

<div bind:this={iconContainer} class="flex gap-6 p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
  <div class="icon-item cursor-pointer">
    <Home size={32} color="white" />
  </div>
  <div class="icon-item cursor-pointer">
    <Download size={32} color="white" />
  </div>
  <div class="icon-item cursor-pointer">
    <Github size={32} color="white" />
  </div>
  <div class="icon-item cursor-pointer">
    <Heart size={32} color="white" />
  </div>
  <div class="icon-item cursor-pointer">
    <Sparkles size={32} color="white" />
  </div>
</div>

<style>
  .icon-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    backdrop-filter: blur(10px);
  }
</style>
