'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { jenkinsConfig } from '~/config/jenkins';
import { siteConfig } from '~/config/site';
import { useTranslation } from '~/lib/use-translation';
import { DiscordIcon, GithubIcon } from './icons';

function getLinks(t: any) {
  return {
    [t.footer.sections.projectDevelopment]: [
      { href: siteConfig.links.github.repo, label: t.footer.links.githubRepo },
      { href: jenkinsConfig.baseUrl, label: t.footer.links.jenkins },
      { href: '/downloads', label: t.footer.links.downloads },
      { href: 'https://github.com/CraftCanvasMC/Website/blob/main/docs/API.md', label: t.footer.links.apiDocs },
    ],
    [t.footer.sections.getInvolved]: [
      { href: `${siteConfig.links.github.repo}/issues`, label: t.footer.links.githubIssues },
      { href: siteConfig.links.donate, label: t.footer.links.donate },
    ],
    [t.footer.sections.aboutCanvas]: [
      { href: `${siteConfig.links.github.repo}/blob/master/LICENSE`, label: t.footer.links.license },
    ],
  } as const;
}

const SOCIALS = [
  { href: siteConfig.links.github.org, Icon: GithubIcon, label: 'GitHub' },
  { href: siteConfig.links.discord, Icon: DiscordIcon, label: 'Discord' },
] as const;

export function Footer() {
  const { t, language } = useTranslation();
  const LINKS = getLinks(t);
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
            {language === 'tr' ? (
              <>
                <p className='underline underline-offset-2 hover:text-neutral-200'>
                  {siteConfig.name} {t.footer.teamLabel}
                </p>
                {t.footer.builtWithLoveSuffix}
                <Heart className='size-3' fill='currentColor' />
                {t.footer.builtWithLovePrefix}
              </>
            ) : (
              <>
                {t.footer.builtWithLovePrefix}
                <Heart className='size-3' fill='currentColor' />
                {t.footer.builtWithLoveSuffix}
                <p className='underline underline-offset-2 hover:text-neutral-200'>
                  {siteConfig.name} {t.footer.teamLabel}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
