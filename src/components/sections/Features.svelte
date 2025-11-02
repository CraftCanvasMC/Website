<script lang="ts">
  import { Cpu, Lightbulb, CircleGauge, FileSliders, Zap, ChevronsUp } from 'lucide-svelte';
  import Card from '../ui/Card.svelte';
  import { scrollReveal, scrollStagger } from '../../lib/animations';

  const FEATURES = [
    {
      title: 'Rewritten Scheduler',
      description:
        'Canvas is primarily based on a rewritten scheduler for Folia, which makes Canvas one of the fastest Folia forks out there.',
      icon: Cpu,
    },
    {
      title: 'Optimized Chunk Generation',
      description:
        'With fixed linear scaling by rewriting the chunk system executor, chunk performance is unparalleled compared to other forks.',
      icon: Zap,
    },
    {
      title: 'Extensive Configuration',
      description:
        'Fine-tune every aspect of your server with documented configuration options and performance settings.',
      icon: FileSliders,
    },
    {
      title: 'Your Ideas, Our Code',
      description:
        "Canvas grows with its community — share the features you'd love to see, and we'll work to bring them to life.",
      icon: Lightbulb,
    },
    {
      title: 'Proper Region Profiling',
      description:
        'Canvas introduces a genuine Spark profiler compatible with region threading, replacing the Folia profiling engine.',
      icon: CircleGauge,
    },
    {
      title: 'Powerful and Optimized',
      description:
        'Fixing multiple Folia bugs and crashes, Canvas is both fast and stable',
      icon: ChevronsUp,
    }
  ] as const;
</script>

<section class="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-0">
  <header use:scrollReveal={{ type: 'fadeIn', start: 'top 85%' }} class="max-w-2xl mt-24 text-center mx-auto">
    <h2 class="font-semibold text-3xl text-white">What makes Canvas special?</h2>
    <p class="mt-3 text-lg text-neutral-300">
      Find out what makes Canvas different from other Minecraft server software.
    </p>
  </header>

  <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
    {#each FEATURES as { title, description, icon: Icon }, index}
      <div use:scrollReveal={{ type: 'slideUp', start: 'top 85%', delay: index * 0.12 }} class="w-full sm:w-[95%] max-w-sm">
        <Card
          enableHover={true}
          class="p-5 border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors gap-2"
        >
          <div class="flex gap-4">
            <div class="shrink-0">
              <div class="rounded-lg bg-neutral-700/50 p-2.5">
                <Icon class="size-5 text-neutral-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
            <div>
              <h3 class="font-medium text-neutral-100">{title}</h3>
              <p class="mt-1.5 text-neutral-400 text-sm">{description}</p>
            </div>
          </div>
        </Card>
      </div>
    {/each}
  </div>
</section>
