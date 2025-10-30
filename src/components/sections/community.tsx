'use client';

import { CircuitBoard, Github, MessageCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { jenkinsConfig } from '~/config/jenkins';
import { siteConfig } from '~/config/site';
import { useTranslation } from '~/lib/use-translation';

export function Community() {
  const { t } = useTranslation();
  const COMMUNITIES = [
    {
      title: t.community.items.discord.title,
      description: t.community.items.discord.description,
      icon: MessageCircle,
      buttonText: t.community.items.discord.buttonText,
      href: siteConfig.links.discord,
    },
    {
      title: t.community.items.github.title,
      description: t.community.items.github.description,
      icon: Github,
      buttonText: t.community.items.github.buttonText,
      href: siteConfig.links.github.org,
    },
    {
      title: t.community.items.jenkins.title,
      description: t.community.items.jenkins.description,
      icon: CircuitBoard,
      buttonText: t.community.items.jenkins.buttonText,
      href: jenkinsConfig.baseUrl,
    },
  ] as const;
  return (
    <section className='mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28'>
      <header className='max-w-2xl text-center mx-auto'>
        <h2 className='font-semibold text-3xl text-white'>{t.community.title}</h2>
        <p className='mt-3 text-lg text-neutral-300'>
          {t.community.subtitle}
        </p>
      </header>

      <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {COMMUNITIES.map(({ title, description, icon: Icon, buttonText, href }) => (
          <Card key={title} className='flex flex-col p-6 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:ring-neutral-600/60 gap-2 transform transition-transform duration-200 hover:scale-105'>
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
            <div className='mt-6 border-neutral-800 border-t pt-4'>
              <Button asChild variant='secondary' className='w-full'>
                <a href={href} target='_blank' rel='noopener noreferrer'>
                  {buttonText}
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
