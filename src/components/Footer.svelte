<script lang="ts">
  import { Heart } from 'lucide-svelte';
  import { jenkinsConfig } from '../config/jenkins';
  import { siteConfig } from '../config/site';
  import GithubIcon from './icons/GithubIcon.svelte';
  import DiscordIcon from './icons/DiscordIcon.svelte';
  import { hoverLift } from '../lib/animations';
  import { t } from '../lib/i18n';

  const LINKS = {
    projectDev: [
      { href: siteConfig.links.github.repo, labelKey: 'footer.links.githubRepo' },
      { href: jenkinsConfig.baseUrl, labelKey: 'footer.links.jenkins' },
      { href: '/downloads', labelKey: 'footer.links.downloads' },
      { href: 'https://github.com/CraftCanvasMC/Website/blob/main/docs/API.md', labelKey: 'footer.links.apiDocs' },
    ],
    getInvolved: [
      { href: `${siteConfig.links.github.repo}/issues`, labelKey: 'footer.links.githubIssues' },
      { href: siteConfig.links.donate, labelKey: 'footer.links.donate' },
    ],
    aboutCanvas: [
      { href: `${siteConfig.links.github.repo}/blob/master/LICENSE`, labelKey: 'footer.links.license' },
    ],
  } as const;

  const SOCIALS = [
    { href: siteConfig.links.github.org, icon: GithubIcon, labelKey: 'nav.github' },
    { href: siteConfig.links.discord, icon: DiscordIcon, labelKey: 'nav.discord' },
  ] as const;

  const currentYear = new Date().getFullYear();
</script>

<footer class="relative mt-10 border-neutral-800/80 border-t lg:mt-14 bg-[var(--background)] clear-both">
  <div class="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5">
      <section class="text-left lg:col-span-2">
        <a href="/" class="inline-flex items-center gap-2 rounded-xl hover:opacity-90">
          <img src="/logo.png" alt="CanvasMC Logo" width="26" height="26" />
          <h2 class="font-semibold">{siteConfig.name}</h2>
        </a>

        <div class="mt-4 flex gap-4">
          {#each SOCIALS as { href, icon, labelKey }}
            {@const IconComponent = icon}
            <a
              use:hoverLift={'small'}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${$t(labelKey)} (opens in new tab)`}
              class="text-neutral-300 transition-colors hover:text-neutral-100"
            >
              <IconComponent class="size-5" />
            </a>
          {/each}
        </div>
      </section>

      <div class="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
        {#each Object.entries(LINKS) as [sectionKey, links]}
          <section class="space-y-3">
            <h3 class="font-medium text-sm">{$t(`footer.sections.${sectionKey}`)}</h3>
            <ul class="space-y-1.5">
              {#each links as { href, labelKey }}
                <li>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    class="text-neutral-400 text-sm transition-colors duration-200 hover:text-white"
                  >
                    {$t(labelKey)}
                  </a>
                </li>
              {/each}
            </ul>
          </section>
        {/each}
      </div>
    </div>

    <div class="mt-8 space-y-4 border-neutral-800/80 border-t pt-8">
      <p class="text-neutral-500 text-xs leading-relaxed">
        {$t('footer.disclaimer')}
      </p>
      
      <div class="flex flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center">
        <p class="text-neutral-400">
          &copy; {currentYear} {siteConfig.name}
        </p>
        <div class="flex items-center gap-1 text-neutral-400">
          {$t('footer.builtWith')} <Heart class="size-3" fill="currentColor" /> {$t('footer.by')}
          <p class="underline underline-offset-2 hover:text-neutral-200">
            {siteConfig.name} {$t('footer.team')}
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
