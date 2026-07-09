<script lang="ts">
  import { ArrowRight } from "lucide-svelte";
  import Button from "../ui/Button.svelte";
  import Card from "../ui/Card.svelte";
  import { t } from "@/lib/i18n";
</script>

<section class="relative isolate">
  <div
    class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
  >
    <div
      class="flex flex-col items-center text-center gap-8 md:gap-12 lg:flex-row lg:justify-center lg:items-center lg:text-left"
    >
      <div class="w-full">
        <Card
          class="glass-card max-w-2xl mx-auto p-6 sm:p-8 border border-white/10 backdrop-blur-sm bg-white/5 transition-all"
        >
          <h1
            class="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight bg-linear-to-r from-white via-neutral-300 to-white bg-clip-text text-transparent"
          >
            {$t("hero.title")}
          </h1>
          <p
            class="mt-4 sm:mt-6 md:mt-7 text-lg sm:text-xl md:text-2xl bg-linear-to-r from-neutral-100 via-neutral-400 to-neutral-100 bg-clip-text text-transparent"
          >
            {$t("hero.subtitle")}
          </p>

          <div
            class="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center lg:justify-start"
          >
            <Button
              size="lg"
              href="/downloads"
              class="gap-2 text-base sm:text-lg"
            >
              {$t("hero.downloadCanvas")}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="https://docs.canvasmc.io"
              class="flex items-center gap-2 text-base sm:text-lg"
            >
              {$t("nav.documentation")}
              <ArrowRight class="size-4 sm:size-5" />
            </Button>
          </div>
        </Card>
      </div>

      <div
        class="hidden xl:flex justify-center relative shrink-0"
      >
        <div class="absolute inset-0 flex justify-center items-center">
          <img
            src="/logo_big.webp"
            alt="Canvas Logo Glow Layer"
            width="1080"
            height="1080"
            class="blur-2xl opacity-60 mix-blend-screen pointer-events-none select-none scale-105 w-70 h-70 lg:w-95 lg:h-95"
            loading="eager"
          />
        </div>

        <div class="relative">
          <img
            src="/logo_big.webp"
            alt="Canvas Logo"
            width="1080"
            height="1080"
            class="pointer-events-none select-none w-70 h-70 lg:w-95 lg:h-95"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </div>
</section>