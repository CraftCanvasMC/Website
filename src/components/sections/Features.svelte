<script lang="ts">
  import {
    Cpu,
    Lightbulb,
    CircleGauge,
    FileSliders,
    Zap,
    ChevronsUp,
  } from "lucide-svelte";
  import Card from "../ui/Card.svelte";
  import { scrollReveal, scrollStagger } from "../../lib/animations";
  import { t } from "../../lib/i18n";

  const FEATURES = [
    {
      titleKey: "features.scheduler.title",
      descriptionKey: "features.scheduler.description",
      icon: Cpu,
    },
    {
      titleKey: "features.chunkGeneration.title",
      descriptionKey: "features.chunkGeneration.description",
      icon: Zap,
    },
    {
      titleKey: "features.configuration.title",
      descriptionKey: "features.configuration.description",
      icon: FileSliders,
    },
    {
      titleKey: "features.community.title",
      descriptionKey: "features.community.description",
      icon: Lightbulb,
    },
    {
      titleKey: "features.profiling.title",
      descriptionKey: "features.profiling.description",
      icon: CircleGauge,
    },
    {
      titleKey: "features.powerful.title",
      descriptionKey: "features.powerful.description",
      icon: ChevronsUp,
    },
  ] as const;
</script>

<section class="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-0">
  <header
    use:scrollReveal={{ type: "fadeIn", start: "top 85%" }}
    class="max-w-2xl mt-24 text-center mx-auto"
  >
    <h2 class="font-semibold text-3xl text-white">{$t("features.heading")}</h2>
    <p class="mt-3 text-lg text-neutral-300">
      {$t("features.subheading")}
    </p>
  </header>

  <div
    class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-items-center"
  >
    {#each FEATURES as { titleKey, descriptionKey, icon: Icon }, index (titleKey)}
      <div
        use:scrollReveal={{
          type: "slideUp",
          start: "top 85%",
          delay: index * 0.12,
        }}
        class="w-full sm:w-[95%] max-w-sm h-full"
      >
        <Card
          enableHover={true}
          class="feature-card h-full p-5 border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div class="sm:hidden">
            <div class="flex items-center gap-4">
              <div class="shrink-0">
                <div class="feature-icon-badge rounded-lg p-2.5">
                  <Icon class="size-5" />
                </div>
              </div>
              <h3 class="font-medium text-neutral-100">{$t(titleKey)}</h3>
            </div>
            <p class="mt-3 text-neutral-400 text-sm">{$t(descriptionKey)}</p>
          </div>

          <div class="hidden h-full sm:flex gap-4">
            <div class="shrink-0">
              <div class="feature-icon-badge rounded-lg p-2.5">
                <Icon class="size-5" />
              </div>
            </div>
            <div class="flex min-h-0 flex-col">
              <h3 class="font-medium text-neutral-100">{$t(titleKey)}</h3>
              <p class="mt-1.5 text-neutral-400 text-sm">
                {$t(descriptionKey)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    {/each}
  </div>
</section>

<style>
  :global(.feature-card) {
    min-height: 100%;
  }

  :global(.feature-icon-badge) {
    background: rgba(15, 23, 42, 0.12);
    border: 1px solid rgba(15, 23, 42, 0.1);
  }

  :global(.feature-icon-badge svg) {
    color: rgba(15, 23, 42, 0.62);
  }

  :global([data-theme="dark"]) .feature-icon-badge {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global([data-theme="dark"] .feature-icon-badge svg) {
    color: rgba(241, 245, 249, 0.86);
  }

  @media (min-width: 640px) {
    :global(.feature-card) {
      min-height: 172px;
    }
  }
</style>
