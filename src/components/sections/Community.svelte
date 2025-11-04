<script lang="ts">
  import { CircuitBoard, Github, MessageCircle } from 'lucide-svelte';
  import Button from '../ui/Button.svelte';
  import Card from '../ui/Card.svelte';
  import { jenkinsConfig } from '../../config/jenkins';
  import { siteConfig } from '../../config/site';
  import { scrollReveal, scrollStagger } from '../../lib/animations';
  import { t } from '../../lib/i18n';

  const COMMUNITIES = [
    {
      titleKey: 'community.discord.title',
      descriptionKey: 'community.discord.description',
      icon: MessageCircle,
      buttonTextKey: 'community.discord.action',
      href: siteConfig.links.discord,
    },
    {
      titleKey: 'community.github.title',
      descriptionKey: 'community.github.description',
      icon: Github,
      buttonTextKey: 'community.github.action',
      href: siteConfig.links.github.org,
    },
    {
      titleKey: 'community.jenkins.title',
      descriptionKey: 'community.jenkins.description',
      icon: CircuitBoard,
      buttonTextKey: 'community.jenkins.action',
      href: jenkinsConfig.baseUrl,
    },
  ] as const;
</script>

<section class="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
  <header use:scrollReveal={{ type: 'fadeIn', start: 'top 85%' }} class="max-w-2xl text-center mx-auto">
    <h2 class="font-semibold text-3xl text-white">{$t('community.heading')}</h2>
    <p class="mt-3 text-lg text-neutral-300">
      {$t('community.subheading')}
    </p>
  </header>

  <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each COMMUNITIES as { titleKey, descriptionKey, icon: Icon, buttonTextKey, href }, index}
      <div use:scrollReveal={{ type: 'slideUp', start: 'top 85%', delay: index * 0.2 }}>
        <Card enableHover={true} class="flex flex-col p-6 bg-white/5 hover:bg-white/10 transition-colors hover:ring-neutral-600/60 gap-2">
          <div class="flex gap-4">
            <div class="shrink-0">
              <div class="rounded-lg bg-neutral-700/50 p-2.5">
                <Icon class="size-5 text-neutral-100" />
              </div>
            </div>
            <div>
              <h3 class="font-medium text-neutral-100">{$t(titleKey)}</h3>
              <p class="mt-1.5 text-neutral-400 text-sm">{$t(descriptionKey)}</p>
            </div>
          </div>
          <div class="mt-6 border-neutral-800 border-t pt-4">
            <Button variant="secondary" class="w-full" href={href}>
              {#snippet children()}
                {$t(buttonTextKey)}
              {/snippet}
            </Button>
          </div>
        </Card>
      </div>
    {/each}
  </div>
</section>
