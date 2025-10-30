'use client';

import { Cpu, Lightbulb, CircleGauge, FileSliders, Zap, ChevronsUp } from 'lucide-react';
import { Card } from '~/components/ui/card';

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
      'Canvas grows with its community — share the features you’d love to see, and we’ll work to bring them to life.',
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

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-0">
      <header className="max-w-2xl mt-24 text-center mx-auto">
        <h2 className="font-semibold text-3xl text-white">What makes Canvas special?</h2>
        <p className="mt-3 text-lg text-neutral-300">
          Find out what makes Canvas different from other Minecraft server software.
        </p>
      </header>

      <div
        className="
          mt-10
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          place-items-center
        "
      >
        {FEATURES.map(({ title, description, icon: Icon }) => (
          <Card
            key={title}
            className="
              w-full
              sm:w-[95%]
              max-w-sm
              p-5
              border border-white/10
              backdrop-blur-sm
              bg-white/5
              hover:bg-white/10
              transition-all
              gap-2
              transform
              duration-200
              hover:scale-105
            "
          >
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="rounded-lg bg-neutral-700/50 p-2.5">
                  <Icon className="size-5 text-neutral-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-neutral-100">{title}</h3>
                <p className="mt-1.5 text-neutral-400 text-sm">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
