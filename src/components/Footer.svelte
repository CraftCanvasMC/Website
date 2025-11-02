<script lang="ts">
  import { Heart } from 'lucide-svelte';
  import { jenkinsConfig } from '../config/jenkins';
  import { siteConfig } from '../config/site';
  import GithubIcon from './icons/GithubIcon.svelte';
  import DiscordIcon from './icons/DiscordIcon.svelte';
  import { hoverLift, scrollReveal, scrollStagger } from '../lib/animations';

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
    { href: siteConfig.links.github.org, icon: GithubIcon, label: 'GitHub' },
    { href: siteConfig.links.discord, icon: DiscordIcon, label: 'Discord' },
  ] as const;

  const currentYear = new Date().getFullYear();
</script>

<footer class="mt-10 border-neutral-800/80 border-t lg:mt-14 bg-[var(--background)]">
  <div class="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5">
      <section use:scrollReveal={{ type: 'fadeIn', start: 'top 90%' }} class="text-left lg:col-span-2">
        <a href="/" class="inline-flex items-center gap-2 rounded-xl hover:opacity-90">
          <img src="/logo.png" alt="CanvasMC Logo" width="26" height="26" />
          <h2 class="font-semibold">{siteConfig.name}</h2>
        </a>

        <div class="mt-4 flex gap-4">
          {#each SOCIALS as { href, icon, label }}
            {@const IconComponent = icon}
            <a
              use:hoverLift={'small'}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in new tab)`}
              class="text-neutral-300 transition-colors hover:text-neutral-100 will-change-transform"
            >
              <IconComponent class="size-5" />
            </a>
          {/each}
        </div>
      </section>

      <div use:scrollStagger={{ type: 'slideUp', stagger: 0.1, selector: '> section', start: 'top 90%' }} class="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
        {#each Object.entries(LINKS) as [title, links]}
          <section class="space-y-3">
            <h3 class="font-medium text-sm">{title}</h3>
            <ul class="space-y-1.5">
              {#each links as { href, label }}
                <li>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    class="text-neutral-400 text-sm transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              {/each}
            </ul>
          </section>
        {/each}
      </div>
    </div>

    <div class="mt-8 flex flex-col items-start justify-between gap-4 border-neutral-800/80 border-t pt-8 text-sm sm:flex-row sm:items-center">
      <p class="text-neutral-400">
        &copy; {currentYear} {siteConfig.name}
      </p>
      <div class="flex items-center gap-1 text-neutral-400">
        Built with <Heart class="size-3" fill="currentColor" /> by the
        <p class="underline underline-offset-2 hover:text-neutral-200">
          {siteConfig.name} Team
        </p>
      </div>
    </div>
  </div>
</footer>
