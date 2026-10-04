<script lang="ts">
  import { ExternalLink, Menu, X } from "lucide-svelte";
  import { siteConfig } from "@/config/site";
  import GithubIcon from "./icons/GithubIcon.svelte";
  import DiscordIcon from "./icons/DiscordIcon.svelte";
  import DonateIcon from "./icons/DonateIcon.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import LanguageSelector from "./LanguageSelector.svelte";
  import gsap from "gsap";
  import { t } from "@/lib/i18n";

  interface NavbarItem {
    href: string;
    translationKey: string;
    showExternalIcon?: boolean;
    icon?: any;
  }

  const LINKS: NavbarItem[] = [
    { href: "/downloads", translationKey: "nav.downloads" },
    { href: "/blog", translationKey: "nav.blog" },
    { href: "/stats/canvas", translationKey: "nav.stats" },
    { href: "https://docs.canvasmc.io", translationKey: "nav.documentation" },
    { href: "https://maven.canvasmc.io", translationKey: "nav.maven" },
  ];

  const SOCIAL: NavbarItem[] = [
    {
      href: siteConfig.links.github.org,
      translationKey: "nav.github",
      icon: GithubIcon,
    },
    {
      href: siteConfig.links.discord,
      translationKey: "nav.discord",
      icon: DiscordIcon,
    },
    {
      href: siteConfig.links.donate,
      translationKey: "nav.donate",
      icon: DonateIcon,
    },
  ];

  let isOpen = $state(false);
  let mobileMenuElement = $state<HTMLDivElement | undefined>(undefined);

  let currentPath = $state("");

  if (typeof window !== "undefined") {
    currentPath = window.location.pathname;
  }

  $effect(() => {
    if (mobileMenuElement) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuElement,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  });

  function isActiveLink(href: string) {
    if (href.startsWith("http")) return false;
    return currentPath === href || currentPath.startsWith(`${href}/`);
  }

  const linkBase =
    "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors";
  const linkIdle =
    "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100";
  const linkActive = "bg-neutral-800 text-white";
  const iconButton =
    "inline-flex size-9 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100";

  function handleExternalRedirect(url: string) {
    window.location.href = url;
  }

  function handleClick(e: MouseEvent, href: string) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      e.preventDefault();
      handleExternalRedirect(href);
    }
  }
</script>

<nav
  class="fixed inset-x-0 top-0 z-50 w-[calc(100%-var(--removed-body-scroll-bar-size,0px))] border-neutral-800 border-b bg-[var(--background)]/80 backdrop-blur-md"
>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between gap-4">
      <div class="flex items-center gap-6">
        <a
          href="/"
          class="flex shrink-0 items-center gap-2"
          aria-label={$t("nav.home")}
        >
          <img src="/logo.png" alt="" width="32" height="32" class="size-7" />
          <span class="font-semibold text-lg tracking-tight"
            >{siteConfig.name}</span
          >
        </a>

        <div class="hidden items-center gap-1 md:flex">
          {#each LINKS as link (link.href)}
            {@const isActive = isActiveLink(link.href)}
            {@const showExternalIcon =
              link.href.startsWith("http") || Boolean(link.showExternalIcon)}
            <a
              href={link.href}
              onclick={(e) => handleClick(e, link.href)}
              class="{linkBase} {isActive ? linkActive : linkIdle}"
              aria-current={isActive ? "page" : undefined}
            >
              {$t(link.translationKey)}
              {#if showExternalIcon}
                <ExternalLink class="size-3 opacity-60" aria-hidden />
              {/if}
            </a>
          {/each}
        </div>
      </div>

      <div class="hidden items-center gap-1 md:flex">
        {#each SOCIAL as link (link.href)}
          {@const IconComponent = link.icon}
          <a
            href={link.href}
            onclick={(e) => handleClick(e, link.href)}
            class={iconButton}
            aria-label={$t(link.translationKey)}
            title={$t(link.translationKey)}
          >
            <IconComponent class="size-5" />
          </a>
        {/each}
        <div class="mx-2 h-5 w-px bg-[var(--border)]" aria-hidden="true"></div>
        <LanguageSelector />
        <ThemeToggle class={iconButton} size={20} />
      </div>

      <div class="flex items-center gap-1 md:hidden">
        <LanguageSelector />
        <ThemeToggle class={iconButton} size={20} />
        <button
          type="button"
          onclick={() => (isOpen = !isOpen)}
          class={iconButton}
          aria-label={`${isOpen ? $t("common.close") : $t("common.open")} ${$t("nav.menu")}`}
          aria-expanded={isOpen}
        >
          {#if isOpen}
            <X class="size-5" aria-hidden />
          {:else}
            <Menu class="size-5" aria-hidden />
          {/if}
        </button>
      </div>
    </div>
  </div>

  {#if isOpen}
    <div
      bind:this={mobileMenuElement}
      class="absolute top-16 right-0 left-0 border-neutral-800 border-b bg-[var(--background)] md:hidden"
    >
      <div class="space-y-1 px-4 py-3">
        {#each LINKS as link (link.href)}
          {@const isActive = isActiveLink(link.href)}
          {@const showExternalIcon =
            link.href.startsWith("http") || Boolean(link.showExternalIcon)}
          <a
            href={link.href}
            onclick={(e) => handleClick(e, link.href)}
            class="{linkBase} text-base {isActive ? linkActive : linkIdle}"
            aria-current={isActive ? "page" : undefined}
          >
            {$t(link.translationKey)}
            {#if showExternalIcon}
              <ExternalLink class="size-3 opacity-60" aria-hidden />
            {/if}
          </a>
        {/each}
      </div>
      <div class="flex gap-1 border-neutral-800 border-t px-4 py-3">
        {#each SOCIAL as link (link.href)}
          {@const IconComponent = link.icon}
          <a
            href={link.href}
            onclick={(e) => handleClick(e, link.href)}
            class={iconButton}
            aria-label={$t(link.translationKey)}
            title={$t(link.translationKey)}
          >
            <IconComponent class="size-5" />
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>
