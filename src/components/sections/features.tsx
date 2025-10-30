'use client';

import { Cpu, Lightbulb, CircleGauge, FileSliders, Zap, ChevronsUp } from 'lucide-react';
import { Card } from '~/components/ui/card';
import { useTranslation } from '~/lib/use-translation';

export function Features() {
  const { t } = useTranslation();
  const FEATURES = [
    {
      title: t.features.items.scheduler.title,
      description: t.features.items.scheduler.description,
      icon: Cpu,
    },
    {
      title: t.features.items.chunkGeneration.title,
      description: t.features.items.chunkGeneration.description,
      icon: Zap,
    },
    {
      title: t.features.items.configuration.title,
      description: t.features.items.configuration.description,
      icon: FileSliders,
    },
    {
      title: t.features.items.community.title,
      description: t.features.items.community.description,
      icon: Lightbulb,
    },
    {
      title: t.features.items.profiling.title,
      description: t.features.items.profiling.description,
      icon: CircleGauge,
    },
    {
      title: t.features.items.performance.title,
      description: t.features.items.performance.description,
      icon: ChevronsUp,
    }
  ] as const;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-0">
      <header className="max-w-2xl mt-24 text-center mx-auto">
        <h2 className="font-semibold text-3xl text-white">{t.features.title}</h2>
        <p className="mt-3 text-lg text-neutral-300">{t.features.subtitle}</p>
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
