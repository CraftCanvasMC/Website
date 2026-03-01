<script lang="ts">
  import { Star } from 'lucide-svelte';
  import { hoverScale } from '../../lib/animations';

  interface Props {
    rating: number;
    review: string;
    name: string;
    role: string;
    server: string;
    avatarUrl: string;
    class?: string;
  }

  let {
    rating = 5,
    review,
    name,
    role,
    server,
    avatarUrl,
    class: className = ''
  }: Props = $props();

  const classes = `rounded-xl bg-neutral-800/50 p-6 ring-1 ring-neutral-700/50 backdrop-blur-sm will-change-transform ${className}`;

  let showInitials = $state(false);

  function handleImageError() {
    showInitials = true;
  }
</script>

<div use:hoverScale={'small'} class={classes}>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      {#if showInitials}
        <div class="size-10 rounded-full ring-2 ring-neutral-700/50 bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-neutral-100 font-medium text-base">
          {name.charAt(0).toUpperCase()}
        </div>
      {:else}
        <img
          src={avatarUrl}
          alt="{name}'s avatar"
          class="size-10 rounded-full ring-2 ring-neutral-700/50"
          onerror={handleImageError}
        />
      {/if}
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span class="font-medium text-neutral-100 text-sm">{name}</span>
          <!-- Star Rating -->
          <div class="flex gap-0.5">
            {#each Array(5) as _, i}
              <Star
                class="size-3 {i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-600'}"
              />
            {/each}
          </div>
        </div>
        <span class="text-xs text-neutral-400">
          {role} @ {server}
        </span>
      </div>
    </div>

    <p class="text-neutral-300 text-xs sm:text-sm leading-relaxed">
      {review}
    </p>
  </div>
</div>