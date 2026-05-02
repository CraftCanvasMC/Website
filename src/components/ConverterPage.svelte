<script lang="ts">
  import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    Download,
    FileSliders,
    Package,
    Settings,
  } from "lucide-svelte";

  import Button from "@/components/ui/Button.svelte";
  import Card from "@/components/ui/Card.svelte";

  let configText = $state("");
  let selectedFileName = $state<string | null>(null);
  let isSubmitting = $state(false);
  let errorMessage = $state("");
  let successMessage = $state("");
  let migratedCount = $state<number | null>(null);
  let removedCount = $state<number | null>(null);

  const lineCount = $derived(
    configText.trim() ? configText.split(/\r?\n/).length : 0
  );
  const characterCount = $derived(configText.length);
  const canSubmit = $derived(configText.trim().length > 0 && !isSubmitting);

  function resetStatus() {
    errorMessage = "";
    successMessage = "";
    migratedCount = null;
    removedCount = null;
  }

  async function handleFileSelection(event: Event) {
    const input = event.currentTarget as HTMLInputElement | null;
    const file = input?.files?.[0];

    if (!file) {
      return;
    }

    configText = await file.text();
    selectedFileName = file.name;
    resetStatus();
  }

  function handleTextareaInput() {
    resetStatus();
  }

  function clearInput() {
    configText = "";
    selectedFileName = null;
    resetStatus();
  }

  function parseHeaderCount(value: string | null): number | null {
    if (!value) {
      return null;
    }

    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function getDownloadName(header: string | null) {
    if (!header) {
      return "canvas-config-migrated.zip";
    }

    const match = header.match(/filename="?([^";]+)"?/i);
    return match?.[1] ?? "canvas-config-migrated.zip";
  }

  async function downloadConvertedFiles() {
    if (!configText.trim() || isSubmitting) {
      return;
    }

    isSubmitting = true;
    resetStatus();

    try {
      const response = await fetch("/api/converter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ configText }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        throw new Error(
          payload?.error ?? "The converter could not process that config."
        );
      }

      const zipBlob = await response.blob();
      const downloadName = getDownloadName(
        response.headers.get("Content-Disposition")
      );
      const objectUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = downloadName;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);

      migratedCount = parseHeaderCount(
        response.headers.get("X-Canvas-Migrated-Options")
      );
      removedCount = parseHeaderCount(
        response.headers.get("X-Canvas-Removed-Options")
      );
      successMessage = `Downloaded ${downloadName}.`;
    } catch (error) {
      errorMessage =
        error instanceof Error
          ? error.message
          : "The converter could not process that config.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section class="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
  <div class="mx-auto flex max-w-7xl flex-col gap-8">
    <div class="max-w-3xl space-y-4">
      <div
        class="converter-kicker inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]"
      >
        <Package class="size-3.5" />
        Config Converter
      </div>

      <div class="space-y-3">
        <h1
          class="converter-title text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Convert legacy Canvas configs into the new split YAML format.
        </h1>
        <p class="converter-muted max-w-2xl text-base leading-7 sm:text-lg">
          Paste or upload your old <span
            class="font-mono text-[var(--card-foreground)]"
            >canvas-server.json5</span
          >
          file and download a ZIP containing migrated
          <span class="font-mono text-[var(--card-foreground)]"
            >canvas-server.yml</span
          >
          and
          <span class="font-mono text-[var(--card-foreground)]"
            >canvas-worlds.yml</span
          >
          .
        </p>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
      <Card class="converter-panel space-y-5 p-5 sm:p-6" enableHover>
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-[var(--card-foreground)]">
              <FileSliders class="size-5" />
              <h2 class="text-xl font-semibold">Legacy config input</h2>
            </div>
            <p class="converter-muted text-sm leading-6">
              Comments and trailing commas are supported. Any removed options
              are skipped automatically during conversion.
            </p>
          </div>

          <div
            class="converter-muted flex flex-wrap items-center gap-2 text-xs"
          >
            <span class="converter-badge rounded-full px-2.5 py-1">
              {lineCount} lines
            </span>
            <span class="converter-badge rounded-full px-2.5 py-1">
              {characterCount} chars
            </span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <label
            for="converter-upload"
            class="converter-upload inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            <ArrowRight class="size-4" />
            Upload old config
          </label>
          <input
            id="converter-upload"
            type="file"
            accept=".json5,.json,.txt"
            class="sr-only"
            onchange={handleFileSelection}
          />

          {#if selectedFileName}
            <span class="converter-muted text-sm"
              >Loaded {selectedFileName}</span
            >
          {:else}
            <span class="converter-muted text-sm opacity-85">
              Accepts JSON5, JSON, or plain text.
            </span>
          {/if}
        </div>

        <textarea
          bind:value={configText}
          oninput={handleTextareaInput}
          spellcheck="false"
          placeholder="Paste the full contents of canvas-server.json5 here..."
          class="converter-textarea min-h-[26rem] w-full rounded-2xl px-4 py-4 font-mono text-sm leading-6 outline-none transition-colors"
        ></textarea>

        <div
          class="flex flex-col gap-3 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="converter-muted space-y-1 text-sm">
            <p>
              Output includes both commented YAML templates inside one ZIP
              archive.
            </p>
            <p>Server-side conversion keeps deployment simple on Coolify.</p>
          </div>

          <div class="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onclick={clearInput}
              disabled={isSubmitting}
            >
              Clear
            </Button>
            <Button onclick={downloadConvertedFiles} disabled={!canSubmit}>
              {#if isSubmitting}
                <Settings class="size-4 animate-spin" />
                Converting...
              {:else}
                <Download class="size-4" />
                Download ZIP
              {/if}
            </Button>
          </div>
        </div>
      </Card>

      <div class="flex flex-col gap-6">
        <Card class="converter-panel space-y-4 p-5 sm:p-6" enableHover>
          <div class="space-y-2">
            <h2 class="text-xl font-semibold text-[var(--card-foreground)]">
              What the converter does
            </h2>
            <p class="converter-muted text-sm leading-6">
              The migration follows the option mapping documented in the repo
              and applies matching values onto the current server and world
              templates.
            </p>
          </div>

          <div
            class="space-y-3 text-sm leading-6 text-[var(--card-foreground)]"
          >
            <div class="converter-surface rounded-2xl p-4">
              <p class="font-medium text-[var(--card-foreground)]">
                1. Parse the legacy JSON5 config
              </p>
              <p class="converter-muted mt-1">
                Comments, quoted keys, and trailing commas are accepted.
              </p>
            </div>
            <div class="converter-surface rounded-2xl p-4">
              <p class="font-medium text-[var(--card-foreground)]">
                2. Apply migrated values to the latest templates
              </p>
              <p class="converter-muted mt-1">
                The generated YAML keeps the shipped comments and defaults for
                untouched options.
              </p>
            </div>
            <div class="converter-surface rounded-2xl p-4">
              <p class="font-medium text-[var(--card-foreground)]">
                3. Package both files into one archive
              </p>
              <p class="converter-muted mt-1">
                Download a ready-to-drop ZIP with server-wide and per-world
                configs.
              </p>
            </div>
          </div>
        </Card>

        <Card class="converter-panel space-y-4 p-5 sm:p-6" enableHover>
          <div class="space-y-2">
            <h2 class="text-xl font-semibold text-[var(--card-foreground)]">
              Conversion status
            </h2>
            <p class="converter-muted text-sm leading-6">
              You will see validation errors here before any file is downloaded.
            </p>
          </div>

          {#if errorMessage}
            <div class="converter-status-error rounded-2xl p-4 text-sm">
              <div class="flex items-start gap-3">
                <AlertCircle class="mt-0.5 size-4 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            </div>
          {:else if successMessage}
            <div class="converter-status-success rounded-2xl p-4 text-sm">
              <div class="flex items-start gap-3">
                <CheckCircle class="mt-0.5 size-4 shrink-0" />
                <div class="space-y-2">
                  <p>{successMessage}</p>
                  <div class="flex flex-wrap gap-2 text-xs">
                    {#if migratedCount !== null}
                      <span
                        class="converter-status-chip rounded-full px-2.5 py-1"
                      >
                        {migratedCount} migrated values
                      </span>
                    {/if}
                    {#if removedCount !== null}
                      <span
                        class="converter-status-chip rounded-full px-2.5 py-1"
                      >
                        {removedCount} removed values skipped
                      </span>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <div class="converter-idle rounded-2xl p-4 text-sm">
              Paste or upload the old config, then use <span
                class="font-medium text-[var(--card-foreground)]"
                >Download ZIP</span
              >.
            </div>
          {/if}

          <div
            class="grid gap-3 text-sm text-[var(--card-foreground)] sm:grid-cols-2"
          >
            <div class="converter-surface rounded-2xl p-4">
              <p class="font-medium text-[var(--card-foreground)]">
                Archive contents
              </p>
              <p class="converter-muted mt-2">canvas-server.yml</p>
              <p class="converter-muted">canvas-worlds.yml</p>
            </div>

            <div class="converter-surface rounded-2xl p-4">
              <p class="font-medium text-[var(--card-foreground)]">
                Removed settings
              </p>
              <p class="converter-muted mt-2">
                Options with no modern equivalent are intentionally omitted from
                the output.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</section>

<style>
  .converter-kicker {
    border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
    background: color-mix(in srgb, var(--card) 74%, transparent);
    color: var(--muted-foreground);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .converter-title {
    color: var(--card-foreground);
    text-shadow: none;
  }

  @supports ((-webkit-background-clip: text) or (background-clip: text)) {
    .converter-title {
      background: linear-gradient(
        135deg,
        var(--gradient-from, var(--primary)) 0%,
        var(--gradient-via, var(--card-foreground)) 55%,
        var(--gradient-to, var(--accent-foreground)) 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }

  .converter-muted {
    color: var(--muted-foreground);
  }

  :global(.converter-panel) {
    background: color-mix(in srgb, var(--card) 82%, transparent);
    border: 1px solid color-mix(in srgb, var(--border) 78%, transparent);
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
  }

  .converter-badge {
    border: 1px solid color-mix(in srgb, var(--border) 90%, transparent);
    background: color-mix(in srgb, var(--muted) 72%, transparent);
    color: var(--muted-foreground);
  }

  .converter-upload {
    border: 1px solid color-mix(in srgb, var(--border) 92%, transparent);
    background: color-mix(in srgb, var(--card) 92%, transparent);
    color: var(--card-foreground);
  }

  .converter-upload:hover {
    background: color-mix(in srgb, var(--muted) 82%, var(--card));
  }

  .converter-textarea {
    border: 1px solid color-mix(in srgb, var(--input) 100%, transparent);
    background: color-mix(in srgb, var(--card) 94%, transparent);
    color: var(--foreground);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      inset 0 0 0 1px rgba(15, 23, 42, 0.02);
  }

  .converter-textarea::placeholder {
    color: var(--muted-foreground);
  }

  .converter-textarea:focus {
    border-color: var(--ring);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--ring) 16%, transparent);
  }

  .converter-surface {
    border: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
    background: color-mix(in srgb, var(--muted) 62%, transparent);
  }

  .converter-status-success {
    border: 1px solid rgba(16, 185, 129, 0.32);
    background: rgba(16, 185, 129, 0.09);
    color: #065f46;
  }

  .converter-status-error {
    border: 1px solid rgba(239, 68, 68, 0.32);
    background: rgba(239, 68, 68, 0.08);
    color: #991b1b;
  }

  .converter-status-chip {
    border: 1px solid currentColor;
    background: color-mix(in srgb, currentColor 10%, transparent);
    color: inherit;
  }

  .converter-idle {
    border: 1px dashed color-mix(in srgb, var(--border) 90%, transparent);
    background: color-mix(in srgb, var(--muted) 46%, transparent);
    color: var(--muted-foreground);
  }

  :global([data-theme="dark"] .converter-panel) {
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
  }

  :global([data-theme="dark"]) .converter-status-success {
    color: #d1fae5;
  }

  :global([data-theme="dark"]) .converter-status-error {
    color: #fee2e2;
  }
</style>
