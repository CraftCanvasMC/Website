<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import Button from '../ui/Button.svelte';
  import Card from '../ui/Card.svelte';
  import { scrollReveal } from '../../lib/animations';
  import { t } from '../../lib/i18n';
</script>

<section class="relative isolate">
  <div class="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-22">
    <div class="flex flex-col items-center text-center gap-12 lg:flex-row lg:justify-center lg:items-center lg:text-left">
      <div use:scrollReveal={{ type: 'slideUp', delay: 0.1, start: 'top 90%' }}>
        <Card class="max-w-xl p-8 border border-white/10 backdrop-blur-sm bg-white/5 transition-all">
          <h1 class="font-bold text-4xl leading-tight lg:text-5xl bg-gradient-to-r from-white via-neutral-300 to-white bg-clip-text text-transparent">
          {$t('hero.title')}
        </h1>
        <p class="mt-7 text-2xl bg-gradient-to-r from-neutral-100 via-neutral-400 to-neutral-100 bg-clip-text text-transparent">
          {$t('hero.subtitle')}
        </p>

        <div class="mt-8 flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
          <Button
            size="lg"
            href="/downloads"
            class="gap-2"
          >
            {#snippet children()}
              {$t('hero.downloadCanvas')}
            {/snippet}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="https://docs.canvasmc.io"
            class="flex items-center gap-2"
          >
            {#snippet children()}
              {$t('nav.documentation')}
              <ArrowRight class="size-4" />
            {/snippet}
          </Button>
        </div>
        </Card>
      </div>

      <div use:scrollReveal={{ type: 'scaleIn', delay: 0.2, start: 'top 90%' }} class="hidden lg:flex justify-center relative shrink-0">
        <div class="absolute inset-0 flex justify-center items-center">
          <img
            src="/logo_big.webp"
            alt="Canvas Logo Glow Layer"
            width="460"
            height="460"
            class="blur-[40px] opacity-60 mix-blend-screen pointer-events-none select-none scale-105"
            loading="eager"
          />
        </div>

        <div class="relative">
          <img
            src="/logo_big.webp"
            alt="Canvas Logo"
            width="460"
            height="460"
            class="pointer-events-none select-none"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </div>
</section>
