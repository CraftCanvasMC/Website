<script lang="ts">
  import { Languages } from 'lucide-svelte';
  import { currentLanguage, setLanguage, LANGUAGES } from '../lib/i18n';
  import { onMount } from 'svelte';

  interface Props {
    class?: string;
  }

  let { class: className = '' }: Props = $props();
  let isOpen = $state(false);
  let mounted = $state(false);

  function handleLanguageChange(langCode: string) {
    setLanguage(langCode as any);
    isOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      isOpen = false;
    }
  }

  onMount(() => {
    mounted = true;
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const selectedLanguage = $derived(
    LANGUAGES.find(l => l.code === $currentLanguage) || LANGUAGES[0]
  );
</script>

<div class="language-selector relative {className}">
  <button
    onclick={() => (isOpen = !isOpen)}
    class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
    title="Change language"
    aria-label="Change language"
    aria-expanded={isOpen}
  >
    {#if mounted}
      <span class="text-lg" aria-hidden="true">{selectedLanguage.flag}</span>
      <Languages class="size-4 text-neutral-300" />
    {:else}
      <Languages class="size-4 text-neutral-300" />
    {/if}
  </button>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg z-50 overflow-hidden"
    >
      <div class="py-1">
        {#each LANGUAGES as lang}
          <button
            onclick={() => handleLanguageChange(lang.code)}
            class="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors {lang.code === $currentLanguage ? 'bg-white/5 text-white' : 'text-neutral-300'}"
          >
            <span class="text-lg" aria-hidden="true">{lang.flag}</span>
            <span class="flex-1">{lang.name}</span>
            {#if lang.code === $currentLanguage}
              <svg class="size-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
              </svg>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .language-selector {
    user-select: none;
  }
</style>
