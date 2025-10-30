'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { jenkinsConfig } from '~/config/jenkins';
import { siteConfig } from '~/config/site';
import { DiscordIcon, GithubIcon } from './icons';

const LINKS = {
  'Project & Development': [
    { href: siteConfig.links.github.repo, label: 'GitHub Repository' },
    { href: jenkinsConfig.baseUrl, label: 'Jenkins CI' },
    { href: '/downloads', label: 'Downloads' },
    { href: 'https://github.com/CraftCanvasMC/Website/blob/main/docs/API.md', label: 'API Documentation' },
  ],
  'Get Involved': [
    { href: `${siteConfig.links.github.repo}/issues`, label: 'GitHub Issues' },
    { href: siteConfig.links.donate, label: 'Donate' },
  ],
  'About Canvas': [
    { href: `${siteConfig.links.github.repo}/blob/master/LICENSE`, label: 'License' },
  ],
} as const;

const SOCIALS = [
  { href: siteConfig.links.github.org, Icon: GithubIcon, label: 'GitHub' },
  { href: siteConfig.links.discord, Icon: DiscordIcon, label: 'Discord' },
] as const;

export function Footer() {
  return (
    <footer className='mt-10 border-neutral-800/80 border-t lg:mt-14 bg-background'>
      <div className='container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
        <div className='grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5'>
          <section className='text-left lg:col-span-2'>
            <Link href='/' className='inline-flex items-center gap-2 rounded-xl hover:opacity-90'>
              <Image src='/logo.png' alt='CanvasMC Logo' width={26} height={26} />
              <h2 className='font-semibold'>{siteConfig.name}</h2>
            </Link>

            <div className='mt-4 flex gap-4'>
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`${label} (opens in new tab)`}
                  className='text-neutral-300 transition-colors hover:text-neutral-100'
                >
                  <Icon className='size-5' />
                </a>
              ))}
            </div>
          </section>

          <div className='grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3'>
            {Object.entries(LINKS).map(([title, links]) => (
              <section key={title} className='space-y-3'>
                <h3 className='font-medium text-sm'>{title}</h3>
                <ul className='space-y-1.5'>
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className='text-neutral-400 text-sm transition-colors duration-200 hover:text-white'
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className='mt-8 flex flex-col items-start justify-between gap-4 border-neutral-800/80 border-t pt-8 text-sm sm:flex-row sm:items-center'>
          <p className='text-neutral-400'>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className='flex items-center gap-1 text-neutral-400'>
            Built with <Heart className='size-3' fill='currentColor' /> by the
            <p className='underline underline-offset-2 hover:text-neutral-200'>
              {siteConfig.name} Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
