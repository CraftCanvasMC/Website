<script lang="ts">
  import { Cpu, Lightbulb, CircleGauge, FileSliders, Zap, ChevronsUp } from 'lucide-svelte';
  import Card from '../ui/Card.svelte';
  import { scrollReveal, scrollStagger } from '../../lib/animations';
  import { t } from '../../lib/i18n';

  const FEATURES = [
    {
      titleKey: 'features.scheduler.title',
      descriptionKey: 'features.scheduler.description',
      icon: Cpu,
    },
    {
      titleKey: 'features.chunkGeneration.title',
      descriptionKey: 'features.chunkGeneration.description',
      icon: Zap,
    },
    {
      titleKey: 'features.configuration.title',
      descriptionKey: 'features.configuration.description',
      icon: FileSliders,
    },
    {
      titleKey: 'features.community.title',
      descriptionKey: 'features.community.description',
      icon: Lightbulb,
    },
    {
      titleKey: 'features.profiling.title',
      descriptionKey: 'features.profiling.description',
      icon: CircleGauge,
    },
    {
      titleKey: 'features.powerful.title',
      descriptionKey: 'features.powerful.description',
      icon: ChevronsUp,
    }
  ] as const;
</script>

<section class="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-0">
  <header use:scrollReveal={{ type: 'fadeIn', start: 'top 85%' }} class="max-w-2xl mt-24 text-center mx-auto">
    <h2 class="font-semibold text-3xl text-white">{$t('features.heading')}</h2>
    <p class="mt-3 text-lg text-neutral-300">
      {$t('features.subheading')}
    </p>
  </header>

  <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
    {#each FEATURES as { titleKey, descriptionKey, icon: Icon }, index}
      <div use:scrollReveal={{ type: 'slideUp', start: 'top 85%', delay: index * 0.12 }} class="w-full sm:w-[95%] max-w-sm">
        <Card
          enableHover={true}
          class="p-5 border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div class="sm:hidden">
            <div class="flex items-center gap-4">
              <div class="shrink-0">
                <div class="rounded-lg bg-neutral-700/50 p-2.5">
                  <Icon class="size-5 text-neutral-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
                </div>
              </div>
              <h3 class="font-medium text-neutral-100">{$t(titleKey)}</h3>
            </div>
            <p class="mt-3 text-neutral-400 text-sm">{$t(descriptionKey)}</p>
          </div>

          <div class="hidden sm:flex gap-4">
            <div class="shrink-0">
              <div class="rounded-lg bg-neutral-700/50 p-2.5">
                <Icon class="size-5 text-neutral-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
            <div>
              <h3 class="font-medium text-neutral-100">{$t(titleKey)}</h3>
              <p class="mt-1.5 text-neutral-400 text-sm">{$t(descriptionKey)}</p>
            </div>
          </div>
        </Card>
      </div>
    {/each}
  </div>
</section>
