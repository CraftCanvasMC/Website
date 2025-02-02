'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { GradientBackground } from '~/components/ui/gradient-background';

import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('features')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <section className='relative isolate'>
      <GradientBackground />

      <div className='mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'>
            Heavily optimized Minecraft server software
          </h1>

          <p className='mt-6 text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8'>
            Powerful fork of PurpurMC that introduces experimental yet effective performance optimizations, featuring{' '}
            <a
              href='https://github.com/CraftCanvasMC/Canvas/?tab=readme-ov-file#multithreaded-dimension-ticking'
              className='text-white underline underline-offset-3'
              target='_blank'
              rel='noopener noreferrer'
            >
              multithreaded dimension ticking
            </a>
            ,{' '}
            <a
              href='https://github.com/CraftCanvasMC/Canvas/?tab=readme-ov-file#chunk-gen-optimizations'
              className='text-white underline underline-offset-3'
              target='_blank'
              rel='noopener noreferrer'
            >
              improved chunk generation
            </a>
            ,{' '}
            <a
              href='https://github.com/CraftCanvasMC/Canvas/?tab=readme-ov-file#entity-optimizations'
              className='text-white underline underline-offset-3'
              target='_blank'
              rel='noopener noreferrer'
            >
              optimized entity handling
            </a>{' '}
            and many more! Built to soar.
          </p>

          <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row'>
            <Button asChild className='w-full sm:w-auto'>
              <Link href='/downloads'>Go to Downloads</Link>
            </Button>
            <Button asChild variant='ghost' className='w-full sm:w-auto'>
              <a href='#features' onClick={scrollToFeatures}>
                Learn more
                <ArrowRight className='ml-2 h-4 w-4' aria-hidden='true' />
              </a>
            </Button>
          </div>
        </div>

        <div className='mt-16 sm:mt-20'>
          <div className='relative overflow-hidden rounded-xl bg-neutral-800/50 p-2 ring-1 shadow-2xl shadow-neutral-900/50 ring-neutral-700/50 backdrop-blur-sm'>
            <figure className='relative aspect-video'>
              <Image
                src='/preview.webp'
                alt='Performance demonstration showing Canvas MC running with approximately 1,500 villagers on a Ryzen 5 7600 processor'
                fill
                className='rounded-lg object-cover'
                priority
              />
              <figcaption className='absolute right-4 bottom-4 left-4 max-w-md rounded-lg bg-neutral-900/80 p-3 text-sm text-neutral-200 backdrop-blur-sm'>
                CanvasMC with ~1,500 villagers on Ryzen 5 7600
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
