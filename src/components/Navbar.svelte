<script lang="ts">
  import { ExternalLink, Menu, X } from 'lucide-svelte';
  import { siteConfig } from '../config/site';
  import GithubIcon from './icons/GithubIcon.svelte';
  import DiscordIcon from './icons/DiscordIcon.svelte';
  import DonateIcon from './icons/DonateIcon.svelte';
  import Redirecting from './Redirecting.svelte';
  import gsap from 'gsap';
  import { hoverLift } from '../lib/animations';

  interface NavbarItem {
    href: string;
    label: string;
    icon?: any;
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

  let isOpen = $state(false);
  let redirecting = $state(false);
  let redirectTarget = $state<string | undefined>(undefined);
  let mobileMenuElement = $state<HTMLDivElement | undefined>(undefined);

  let currentPath = $state('');
  
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname;
  }

  $effect(() => {
    if (mobileMenuElement) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuElement,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  });

  function handleExternalRedirect(url: string) {
    const urlObj = new URL(url);
    redirectTarget = urlObj.hostname.replace(/^www\./, '');
    redirecting = true;
    setTimeout(() => {
      window.location.href = url;
    }, 1300);
  }

  function handleClick(e: MouseEvent, href: string) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      e.preventDefault();
      handleExternalRedirect(href);
    }
  }
</script>

<nav class="fixed inset-x-0 top-0 z-50 w-[calc(100%-var(--removed-body-scroll-bar-size,0px))] border-neutral-800 border-b bg-[var(--background)]/90 backdrop-blur-sm">
  <div
    style="
      transform: scale(1.3);
      transform-origin: top left;
      width: calc(100% / 1.3);
      height: calc(100px / 1.3);
    "
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-15 items-center justify-between">
        <div class="flex items-center space-x-6">
          <a href="/" class="flex items-center space-x-2" aria-label="Home">
            <img src="/logo.png" alt="" width="26" height="26" />
            <span class="font-semibold text-sm">{siteConfig.name}</span>
          </a>

          <div class="hidden md:flex md:space-x-4">
            {#each LINKS as link}
              {@const isActive = currentPath === link.href}
              {@const isExternal = link.href.startsWith('http')}
              <a
                href={link.href}
                onclick={(e) => handleClick(e, link.href)}
                class="flex items-center gap-1.5 text-sm transition-colors {isActive ? 'text-white' : 'text-neutral-300 hover:text-neutral-100'}"
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {#if isExternal}
                  <ExternalLink class="size-0" aria-hidden />
                {/if}
              </a>
            {/each}
          </div>
        </div>

        <div class="hidden md:flex md:items-center md:space-x-5">
          {#each SOCIAL as link}
            {@const IconComponent = link.icon}
            <a
              use:hoverLift={'small'}
              href={link.href}
              onclick={(e) => handleClick(e, link.href)}
              class="flex items-center gap-1.5 text-sm transition-colors text-neutral-300 hover:text-neutral-100 will-change-transform"
            >
              <IconComponent class="size-5" />
            </a>
          {/each}
        </div>

        <button
          type="button"
          onclick={() => (isOpen = !isOpen)}
          class="rounded-md p-2.5 text-neutral-300 hover:bg-neutral-800 md:hidden"
          aria-label={`${isOpen ? 'Close' : 'Open'} menu`}
          aria-expanded={isOpen}
        >
          {#if isOpen}
            <X class="size-6" aria-hidden />
          {:else}
            <Menu class="size-6" aria-hidden />
          {/if}
        </button>
      </div>
    </div>

    {#if isOpen}
      <div bind:this={mobileMenuElement} class="absolute top-15 right-0 left-0 border-neutral-800 border-y bg-[var(--background)] pt-5 md:hidden">
        <div class="space-y-1 px-2 pb-3">
          {#each LINKS as link}
            {@const isActive = currentPath === link.href}
            <a
              href={link.href}
              onclick={(e) => handleClick(e, link.href)}
              class="rounded-md px-3 py-2 hover:bg-neutral-800 flex items-center gap-1.5 text-sm transition-colors {isActive ? 'text-white' : 'text-neutral-300 hover:text-neutral-100'}"
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </a>
          {/each}
          <div class="-mx-4 pt-3">
            <div class="border-neutral-800 border-t">
              <div class="flex gap-2 px-6 pt-3">
                {#each SOCIAL as link}
                  {@const IconComponent = link.icon}
                  <a
                    href={link.href}
                    onclick={(e) => handleClick(e, link.href)}
                    class="rounded-md p-1.5 hover:bg-neutral-800 flex items-center gap-1.5 text-sm transition-colors text-neutral-300 hover:text-neutral-100"
                  >
                    <IconComponent class="size-5" />
                  </a>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</nav>

<Redirecting bind:show={redirecting} target={redirectTarget} />
