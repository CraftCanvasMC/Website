<script lang="ts">
  import { ChevronDown } from 'lucide-svelte';
  
  interface Props {
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    class?: string;
  }

  let { value, onValueChange, options, placeholder = 'Select...', class: className = '' }: Props = $props();
  
  let isOpen = $state(false);
  let selectedLabel = $derived(options.find(opt => opt.value === value)?.label || placeholder);

  function handleSelect(optionValue: string) {
    onValueChange(optionValue);
    isOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.select-container')) {
      isOpen = false;
    }
  }

  $effect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<div class="select-container relative {className}">
  <button
    type="button"
    onclick={() => (isOpen = !isOpen)}
    class="flex h-10 w-full items-center justify-between rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-200 text-sm ring-offset-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
  >
    <span>{selectedLabel}</span>
    <ChevronDown class="size-4 opacity-50" />
  </button>

  {#if isOpen}
    <div
      class="absolute z-50 mt-1 max-h-96 w-full overflow-auto rounded-md border border-neutral-800 bg-neutral-900 text-neutral-200 shadow-md animate-in fade-in-0 zoom-in-95"
    >
      <div class="p-1">
        {#each options as option}
          <button
            type="button"
            onclick={() => handleSelect(option.value)}
            class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-neutral-800 hover:text-neutral-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            {option.label}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes zoomIn {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  .animate-in {
    animation: fadeIn 0.15s ease-out, zoomIn 0.15s ease-out;
  }
</style>
