'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

export function Hero() {
  return (
    <section className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-22">
        <div className="flex flex-col items-center text-center gap-12 lg:flex-row lg:justify-center lg:items-center lg:text-left">
          <Card className="max-w-xl p-8 border border-white/10 backdrop-blur-sm bg-white/5 transition-all">
            <h1 className="font-bold text-4xl leading-tight lg:text-5xl bg-gradient-to-r from-white via-neutral-300 to-white bg-clip-text text-transparent">
              High performance Minecraft server software
            </h1>
            <p className="mt-7 text-2xl bg-gradient-to-r from-neutral-100 via-neutral-400 to-neutral-100 bg-clip-text text-transparent">
              CanvasMC is a fork of the Folia Minecraft server software that fixes gameplay
              inconsistencies, bugs, and introduces further performance enhancements to the
              dedicated server
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="gap-2 transform transition-transform duration-200 hover:scale-105"
              >
                <Link href="/downloads">Download Canvas</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a
                  href="https://docs.canvasmc.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transform transition-transform duration-200 hover:scale-105"
                >
                  Documentation
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </Card>

          <div className="hidden lg:flex justify-center relative shrink-0">
            <div className="absolute inset-0 flex justify-center items-center">
              <Image
                src="/logo_big.webp"
                alt="Canvas Logo Glow Layer"
                width={460}
                height={460}
                className="blur-[40px] opacity-60 mix-blend-screen pointer-events-none select-none scale-105"
                priority
              />
            </div>

            <div className="relative">
              <Image
                src="/logo_big.webp"
                alt="Canvas Logo"
                width={460}
                height={460}
                className="pointer-events-none select-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
