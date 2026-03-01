<script lang="ts">
  import ReviewCard from '../ui/ReviewCard.svelte';
  import { scrollReveal } from '../../lib/animations';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  interface Review {
    rating: number;
    review: string;
    avatarUrl: string;
    name: string;
    role: string;
    server: string;
  }

  let reviews: Review[] = $state([]);
  let loading = $state(true);
  let currentIndex = $state(0);

  function parseCSVLine(line: string): string[] {
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        fields.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    fields.push(current);
    return fields;
  }

  function parseCSV(text: string): Review[] {
    const lines = text.split('\n').filter(line => line.trim());
    const parsed: Review[] = [];

    for (let i = 0; i < lines.length; i++) {
      const fields = parseCSVLine(lines[i]);

      if (fields.length >= 6) {
        parsed.push({
          rating: parseInt(fields[0]) || 5,
          review: fields[1] || '',
          avatarUrl: fields[2] || '',
          name: fields[3] || 'Anonymous',
          role: fields[4] || '',
          server: fields[5] || ''
        });
      }
    }

    return parsed.filter(review => review.review && review.avatarUrl);
  }

  function next() {
    currentIndex = (currentIndex + 2) % reviews.length;
  }

  function prev() {
    currentIndex = (currentIndex - 2 + reviews.length) % reviews.length;
  }

  onMount(async () => {
    try {
      const response = await fetch('/data/CanvasMC_Experience_form.csv');
      const csvText = await response.text();
      reviews = parseCSV(csvText);
      loading = false;
    } catch (error) {
      console.error('Error loading reviews:', error);
      loading = false;
    }
  });
</script>

<section class="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
  <header
    use:scrollReveal={{ type: 'fadeIn', start: 'top 85%' }}
    class="max-w-2xl text-center mx-auto"
  >
    <h2 class="font-semibold text-3xl text-white">What Users Say</h2>
    <p class="mt-3 text-lg text-neutral-300">
      Real experiences from server owners and developers using Canvas
    </p>
  </header>

  {#if loading}
    <div class="mt-10 text-center">
      <p class="text-neutral-400">Loading reviews...</p>
    </div>

  {:else if reviews.length > 0}
    <div
      class="mt-10 max-w-5xl mx-auto"
      use:scrollReveal={{ type: 'fadeIn', start: 'top 85%' }}
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReviewCard
          rating={reviews[currentIndex].rating}
          review={reviews[currentIndex].review}
          name={reviews[currentIndex].name}
          role={reviews[currentIndex].role}
          server={reviews[currentIndex].server}
          avatarUrl={reviews[currentIndex].avatarUrl}
        />

        {#if reviews[(currentIndex + 1) % reviews.length]}
          <ReviewCard
            rating={reviews[(currentIndex + 1) % reviews.length].rating}
            review={reviews[(currentIndex + 1) % reviews.length].review}
            name={reviews[(currentIndex + 1) % reviews.length].name}
            role={reviews[(currentIndex + 1) % reviews.length].role}
            server={reviews[(currentIndex + 1) % reviews.length].server}
            avatarUrl={reviews[(currentIndex + 1) % reviews.length].avatarUrl}
          />
        {/if}
      </div>

      <div class="flex items-center justify-center gap-4 mt-6">
        <button
          onclick={prev}
          class="size-8 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50
                 border border-neutral-700/50 flex items-center justify-center
                 transition-colors"
          aria-label="Previous reviews"
        >
          <ChevronLeft class="size-4 text-neutral-300" />
        </button>

        <div class="flex gap-2">
          {#each Array(Math.ceil(reviews.length / 2)) as _, index}
            <button
              onclick={() => currentIndex = index * 2}
              class="size-2 rounded-full transition-all
                {index === Math.floor(currentIndex / 2)
                  ? 'bg-neutral-300 w-6'
                  : 'bg-neutral-600 hover:bg-neutral-500'}"
              aria-label="Go to reviews {index * 2 + 1}-{Math.min(index * 2 + 2, reviews.length)}"
            />
          {/each}
        </div>

        <button
          onclick={next}
          class="size-8 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50
                 border border-neutral-700/50 flex items-center justify-center
                 transition-colors"
          aria-label="Next reviews"
        >
          <ChevronRight class="size-4 text-neutral-300" />
        </button>
      </div>
    </div>

  {:else}
    <div class="mt-10 text-center">
      <p class="text-neutral-400">No reviews available yet.</p>
    </div>
  {/if}
</section>
