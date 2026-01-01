<script lang="ts">
  import { t } from '../lib/i18n';
  import { Download } from 'lucide-svelte';
  import Button from './ui/Button.svelte';

  export let titleKey: string;
  export let descriptionKey: string;
  export let downloadHref: string | null = null;
  export let sourceHref: string;
</script>

<header class="max-w-2xl text-center mx-auto mb-8">
  <h1 class="font-semibold text-3xl text-white">{$t(titleKey)}</h1>
  <p class="mt-2 text-neutral-400">{$t(descriptionKey)}</p>

  <div class="mt-6 flex flex-col gap-3 sm:flex-row justify-center">
    {#if downloadHref && downloadHref !== '#'}
      <Button
        variant="default"
        size="lg"
        href={downloadHref}
      >
        {#snippet children()}
          <Download class="size-4" />
          {$t('downloads.downloadLatest')}
        {/snippet}
      </Button>
    {:else}
      <button
        disabled
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-6 bg-white/10 text-neutral-400 cursor-not-allowed"
        title="Coming soon"
        aria-label="Coming soon"
      >
        <Download class="size-4" />
        Coming soon
      </button>
    {/if}

    <Button
      variant="secondary"
      size="lg"
      href={sourceHref}
      target="_blank"
      rel="noopener noreferrer"
    >
      {#snippet children()}
        <svg class="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
        </svg>
        {$t('downloads.sourceCode')}
      {/snippet}
    </Button>
  </div>
</header>
