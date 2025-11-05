<script lang="ts">
  import { Download } from 'lucide-svelte';
  import Button from './ui/Button.svelte';
  import CodeBlock from './ui/CodeBlock.svelte';
  import { t } from '../lib/i18n';

  interface Props {
    selectedVersion: string;
    jenkinsDown: boolean;
  }

  let { selectedVersion, jenkinsDown }: Props = $props();
</script>

<div class="sculptor-content text-center sm:text-left animate-fade-in">
  <h2 class="text-xl font-semibold mb-2 text-center">{$t('downloads.sculptor.title')}</h2>
  <p class="text-sm text-neutral-400 max-w-2xl mx-auto">
    {$t('downloads.sculptor.description')}
  </p>

  <div class="mt-6 text-center">
    <Button 
      disabled={jenkinsDown}
      class="inline-flex items-center gap-2 px-6 py-2"
    >
      {#snippet children()}
        {#if jenkinsDown}
          <Download class="size-4" />
          {$t('downloads.unavailable')}
        {:else}
          <a href="https://jenkins.canvasmc.io/job/Sculptor/lastSuccessfulBuild/artifact/build/libs/Sculptor-1.0.0-SNAPSHOT.jar" download class="flex items-center gap-2">
            <Download class="size-4" />
            {$t('downloads.sculptor.downloadSculptor')}
          </a>
        {/if}
      {/snippet}
    </Button>
  </div>

  <div class="mt-8 text-left">
    <h3 class="text-lg font-semibold mb-3 text-neutral-200">{$t('downloads.sculptor.exampleUsage')}</h3>
    <CodeBlock language="cmd" code={`$ java -Dsculptor.minecraftVersion=${selectedVersion} -Dsculptor.includeExperimental=true -jar sculptor.jar`} />
  </div>

  <div class="mt-8 text-left">
    <h3 class="text-lg font-semibold mb-3 text-neutral-200">{$t('downloads.sculptor.argumentsExplained')}</h3>
    <ul class="list-disc pl-6 space-y-2 text-sm text-neutral-300">
      <li>
        <code class="text-neutral-100">{$t('downloads.sculptor.args.minecraftVersion.name')}</code> — <br />
        <span class="text-neutral-400">
          <strong>{$t('downloads.sculptor.args.minecraftVersion.required')}</strong> {$t('downloads.sculptor.args.minecraftVersion.description')}
        </span>
      </li>
      <li>
        <code class="text-neutral-100">{$t('downloads.sculptor.args.includeExperimental.name')}</code> — <br />
        <span class="text-neutral-400">
          <strong>{$t('downloads.sculptor.args.includeExperimental.required')}</strong> {$t('downloads.sculptor.args.includeExperimental.description')}
        </span>
      </li>
      <li>
        <code class="text-neutral-100">{$t('downloads.sculptor.args.serverFileName.name')}</code> — <br />
        <span class="text-neutral-400">
          <strong>{$t('downloads.sculptor.args.serverFileName.required')}</strong> {$t('downloads.sculptor.args.serverFileName.description')}
        </span>
      </li>
    </ul>
  </div>
</div>

<style>
  .sculptor-content {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .sculptor-content * {
    transform: translateZ(0);
  }
</style>
