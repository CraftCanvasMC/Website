'use client';

import { ExternalLink, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig } from '~/config/site';
import { cn } from '~/lib/utils';
import { DiscordIcon, GithubIcon, DonateIcon } from './icons';
import { Redirecting } from './redirecting';

interface NavbarItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const LINKS: NavbarItem[] = [
  { href: '/downloads', label: 'Downloads' },
  { href: 'https://docs.canvasmc.io', label: 'Docs' },
  { href: 'https://maven.canvasmc.io', label: 'Maven' },
];

const SOCIAL: NavbarItem[] = [
  { href: siteConfig.links.github.org, label: 'GitHub', icon: GithubIcon },
  { href: siteConfig.links.discord, label: 'Discord', icon: DiscordIcon },
  { href: siteConfig.links.donate, label: 'Donate', icon: DonateIcon },
];

function NavbarLink({
  href,
  label,
  icon: Icon,
  className,
  onExternalRedirect,
}: NavbarItem & { className?: string; onExternalRedirect?: (url: string) => void }) {
  const isActive = usePathname() === href;
  const isExternal = href.startsWith('http');

  const handleClick = (e: React.MouseEvent) => {
    if (isExternal && onExternalRedirect) {
      e.preventDefault();
      onExternalRedirect(href);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-1.5 text-sm transition-colors',
        isActive ? 'text-white' : 'text-neutral-300 hover:text-neutral-100',
        className,
      )}
      aria-current={isActive ? 'page' : undefined}
      {...(isExternal ? { prefetch: false } : { prefetch: true })}
    >
      {Icon ? (
        <Icon className="size-5" />
      ) : (
        <>
          {label}
          {isExternal && <ExternalLink className="size-0" aria-hidden />}
        </>
      )}
    </Link>
  );
}

function MobileMenu({
  isOpen,
  onExternalRedirect,
}: {
  isOpen: boolean;
  onExternalRedirect: (url: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-15 right-0 left-0 border-neutral-800 border-y bg-background pt-5 md:hidden">
      <div className="space-y-1 px-2 pb-3">
        {LINKS.map((link) => (
          <NavbarLink
            key={link.href}
            {...link}
            className="rounded-md px-3 py-2 hover:bg-neutral-800"
            onExternalRedirect={onExternalRedirect}
          />
        ))}
        <div className="-mx-4 pt-3">
          <div className="border-neutral-800 border-t">
            <div className="flex gap-2 px-6 pt-3">
              {SOCIAL.map((link) => (
                <NavbarLink
                  key={link.href}
                  {...link}
                  className="rounded-md p-1.5 hover:bg-neutral-800"
                  onExternalRedirect={onExternalRedirect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState<string>();

  const handleExternalRedirect = (url: string) => {
    setRedirectTarget(new URL(url).hostname.replace(/^www\./, ''));
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = url;
    }, 1300);
  };

  useEffect(() => {
    const clearRedirect = () => setRedirecting(false);
    window.addEventListener('pageshow', clearRedirect);
    return () => window.removeEventListener('pageshow', clearRedirect);
  }, []);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 w-[calc(100%-var(--removed-body-scroll-bar-size,0px))] border-neutral-800 border-b bg-background/90 backdrop-blur-sm">
        <div
          style={{
            transform: 'scale(1.3)',
            transformOrigin: 'top left',
            width: 'calc(100% / 1.3)',
            height: 'calc(100px / 1.3)',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-15 items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link prefetch href="/" className="flex items-center space-x-2 hover:opacity-90" aria-label="Home">
                  <Image src="/logo.png" alt="" width={26} height={26} />
                  <span className="font-semibold text-sm">{siteConfig.name}</span>
                </Link>

                <div className="hidden md:flex md:space-x-4">
                  {LINKS.map((link) => (
                    <NavbarLink key={link.href} {...link} onExternalRedirect={handleExternalRedirect} />
                  ))}
                </div>
              </div>

              <div className="hidden md:flex md:items-center md:space-x-5">
                {SOCIAL.map((link) => (
                  <NavbarLink key={link.href} {...link} onExternalRedirect={handleExternalRedirect} />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen((p) => !p)}
                className="rounded-md p-2.5 text-neutral-300 hover:bg-neutral-800 md:hidden"
                aria-label={`${isOpen ? 'Close' : 'Open'} menu`}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
              </button>
            </div>
          </div>

          <MobileMenu isOpen={isOpen} onExternalRedirect={handleExternalRedirect} />
        </div>
      </nav>

      <Redirecting show={redirecting} target={redirectTarget} />
    </>
  );
}
