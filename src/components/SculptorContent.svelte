<script lang="ts">
  import { Download } from 'lucide-svelte';
  import Button from './ui/Button.svelte';
  import CodeBlock from './ui/CodeBlock.svelte';

  interface Props {
    selectedVersion: string;
    jenkinsDown: boolean;
  }

  let { selectedVersion, jenkinsDown }: Props = $props();
</script>

<div class="sculptor-content text-center sm:text-left animate-fade-in">
  <h2 class="text-xl font-semibold mb-2 text-center">Sculptor Launcher</h2>
  <p class="text-sm text-neutral-400 max-w-2xl mx-auto">
    Sculptor is the official auto-updating launcher for Canvas. It ensures you're always on the latest version
    without needing to manually download builds. This is Minecraft-version specific too, so it will only update
    to the Minecraft version you specify.
  </p>

  <div class="mt-6 text-center">
    <Button 
      disabled={jenkinsDown}
      class="inline-flex items-center gap-2 px-6 py-2"
    >
      {#snippet children()}
        {#if jenkinsDown}
          <Download class="size-4" />
          Unavailable
        {:else}
          <a href="https://jenkins.canvasmc.io/job/Sculptor/lastSuccessfulBuild/artifact/build/libs/Sculptor-1.0.0-SNAPSHOT.jar" download class="flex items-center gap-2">
            <Download class="size-4" />
            Download Sculptor
          </a>
        {/if}
      {/snippet}
    </Button>
  </div>

  <div class="mt-8 text-left">
    <h3 class="text-lg font-semibold mb-3 text-neutral-200">Example Usage</h3>
    <CodeBlock language="cmd" code={`$ java -Dsculptor.minecraftVersion=${selectedVersion} -Dsculptor.includeExperimental=true -jar sculptor.jar`} />
  </div>

  <div class="mt-8 text-left">
    <h3 class="text-lg font-semibold mb-3 text-neutral-200">Arguments Explained</h3>
    <ul class="list-disc pl-6 space-y-2 text-sm text-neutral-300">
      <li>
        <code class="text-neutral-100">-Dsculptor.minecraftVersion</code> — <br />
        <span class="text-neutral-400">
          <strong>Required.</strong> Specifies the Minecraft version Sculptor should download and manage builds for.
          Without this, Sculptor will fail to launch.
        </span>
      </li>
      <li>
        <code class="text-neutral-100">-Dsculptor.includeExperimental</code> — <br />
        <span class="text-neutral-400">
          <strong>Optional.</strong> Accepts <code>true</code> or <code>false</code> (default: <code>false</code>). If set to <code>true</code>,
          Sculptor will also include experimental Canvas builds instead of only stable ones.
        </span>
      </li>
      <li>
        <code class="text-neutral-100">-Dsculptor.serverFileName</code> — <br />
        <span class="text-neutral-400">
          <strong>Optional.</strong> Sets the name of the downloaded server jar file. Defaults to <code>server.jar</code> if not specified.
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
