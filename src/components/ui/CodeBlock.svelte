<script lang="ts">
  import { Copy } from 'lucide-svelte';
  import Button from './Button.svelte';

  interface Props {
    language?: string;
    code: string;
  }

  let { language = 'bash', code }: Props = $props();
  
  let copied = $state(false);

  function highlightCode(text: string) {
    return text
      .replace(/\b(java)\b/g, `<span class="text-green-400 font-medium">$1</span>`)
      .replace(/(-D[\w.]+=[^\s]+)/g, `<span class="text-blue-400">$1</span>`)
      .replace(/\b(-jar)\b/g, `<span class="text-purple-400">$1</span>`)
      .replace(/([\w.-]+\.jar)/g, `<span class="text-pink-400">$1</span>`);
  }

  function handleCopy() {
    const cleaned = code.replace(/^\$\s?/gm, '');
    navigator.clipboard.writeText(cleaned);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }
</script>

<div class="relative w-full bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
  <div class="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-neutral-700">
    <span class="text-xs font-mono text-neutral-400">{language.toUpperCase()}</span>
    <Button
      onclick={handleCopy}
      variant="ghost"
      class="text-neutral-400 hover:text-white h-auto py-1 px-2"
    >
      {#snippet children()}
        <Copy class="size-4 mr-1" />
        {copied ? 'Copied!' : 'Copy'}
      {/snippet}
    </Button>
  </div>

  <pre class="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-neutral-200"><code
      class="whitespace-pre"
    >{@html code
      ? highlightCode(code).replace(/^\$/gm, `<span class="text-neutral-500 select-none">$</span>`)
      : ''}</code></pre>
</div>
