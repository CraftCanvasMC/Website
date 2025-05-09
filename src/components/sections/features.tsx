'use client';

import { Cpu, FileSliders, Layers, Terminal, Users, Zap } from 'lucide-react';
import { Card } from '~/components/ui/card';

const FEATURES = [
  {
    title: 'Multithreaded Performance',
    description:
      'Leverage multiple CPU cores for ticking the server, dramatically improving performance.',
    icon: Cpu,
  },
  {
    title: 'Enhanced Entity Handling',
    description:
      'Better entity handling with asynchronous pathfinding, threaded entity tracking and many more optimizations.',
    icon: Layers,
  },
  {
    title: 'Optimized Chunk Generation',
    description: 'With fixed linear scaling, chunk performance is unparalleled compared to other forks',
    icon: Zap,
  },
  {
    title: 'Prioritized Plugin Support',
    description:
      'Prioritizes plugin support when making major changes to ensure your plugins will stay compatible.',
    icon: Terminal,
  },
  {
    title: 'Optional Regionizing',
    description: 'Implementing a rewrite of Folias regionizing implementation, we add optional regionizing to the server',
    icon: Users,
  },
  {
    title: 'Extensive Configuration',
    description:
      'Fine-tune every aspect of your server with documented configuration options and performance settings.',
    icon: FileSliders,
  },
] as const;

export function Features() {
  return (
    <section className='mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28'>
      <header className='max-w-2xl'>
        <h2 className='font-semibold text-3xl text-white'>What makes Canvas special?</h2>
        <p className='mt-3 text-lg text-neutral-300'>
          Find out what makes Canvas different from other Minecraft server software.
        </p>
      </header>

      <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {FEATURES.map(({ title, description, icon: Icon }) => (
          <Card key={title} className='p-5 transition-all duration-200 hover:ring-neutral-600/60'>
            <div className='flex gap-4'>
              <div className='shrink-0'>
                <div className='rounded-lg bg-neutral-700/50 p-2.5'>
                  <Icon className='size-5 text-neutral-100' />
                </div>
              </div>
              <div>
                <h3 className='font-medium text-neutral-100'>{title}</h3>
                <p className='mt-1.5 text-neutral-400 text-sm'>{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
