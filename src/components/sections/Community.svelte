<script lang="ts">
  import { CircuitBoard, Github, MessageCircle } from 'lucide-svelte';
  import Button from '../ui/Button.svelte';
  import Card from '../ui/Card.svelte';
  import { jenkinsConfig } from '../../config/jenkins';
  import { siteConfig } from '../../config/site';

  const COMMUNITIES = [
    {
      title: 'Discord',
      description:
        'Join our Discord community to get support, share your experiences, and connect with other Canvas users.',
      icon: MessageCircle,
      buttonText: 'Join Discord',
      href: siteConfig.links.discord,
    },
    {
      title: 'GitHub',
      description: 'Contribute to Canvas development, report issues, and explore our open source codebase on GitHub.',
      icon: Github,
      buttonText: 'View GitHub',
      href: siteConfig.links.github.org,
    },
    {
      title: 'Jenkins',
      description: 'Access our latest builds, development versions, and track our continuous integration progress.',
      icon: CircuitBoard,
      buttonText: 'Visit Jenkins',
      href: jenkinsConfig.baseUrl,
    },
  ] as const;
</script>

<section class="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
  <header class="max-w-2xl text-center mx-auto">
    <h2 class="font-semibold text-3xl text-white">Join our community</h2>
    <p class="mt-3 text-lg text-neutral-300">
      Connect with the Canvas community, contribute to development, and stay up to date.
    </p>
  </header>

  <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each COMMUNITIES as { title, description, icon: Icon, buttonText, href }}
      <Card class="flex flex-col p-6 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:ring-neutral-600/60 gap-2 transform-gpu transition-transform duration-200 hover:scale-[1.02]">
        <div class="flex gap-4">
          <div class="shrink-0">
            <div class="rounded-lg bg-neutral-700/50 p-2.5">
              <Icon class="size-5 text-neutral-100" />
            </div>
          </div>
          <div>
            <h3 class="font-medium text-neutral-100">{title}</h3>
            <p class="mt-1.5 text-neutral-400 text-sm">{description}</p>
          </div>
        </div>
        <div class="mt-6 border-neutral-800 border-t pt-4">
          <Button variant="secondary" class="w-full" href={href}>
            {#snippet children()}
              {buttonText}
            {/snippet}
          </Button>
        </div>
      </Card>
    {/each}
  </div>
</section>
