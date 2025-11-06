<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    class?: string;
    size?: number;
  }

  let { class: className = '', size = 24 }: Props = $props();
  const maskId = `moon-mask-${size}-${Math.random().toString(36).slice(2, 8)}`;

  const storageKey = 'theme-preference';
  let theme = $state<'light' | 'dark'>('light');
  let mounted = $state(false);

  const getColorPreference = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    
    const stored = localStorage.getItem(storageKey);
    if (stored && (stored === 'light' || stored === 'dark')) {
      return stored;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const reflectPreference = (value: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    if (root) {
      root.setAttribute('data-theme', value);
    }
  };

  const setPreference = (value: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(storageKey, value);
    theme = value;
    reflectPreference(value);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setPreference(newTheme);
      });
    } else {
      setPreference(newTheme);
    }
  };

  onMount(() => {
    // Get initial preference
    const initialTheme = getColorPreference();
    theme = initialTheme;
    reflectPreference(initialTheme);
    mounted = true;

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(storageKey)) {
        const newTheme = e.matches ? 'dark' : 'light';
        theme = newTheme;
        reflectPreference(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  });
</script>

<button
  class="theme-toggle {className}"
  onclick={toggleTheme}
  title="Toggle theme"
  aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} theme` : 'Toggle theme'}
  aria-live="polite"
>
  <svg
    class="sun-and-moon"
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
  >
    <mask class="moon" id={maskId} maskUnits="userSpaceOnUse" style="mask-type:luminance">
      <rect x="0" y="0" width="24" height="24" fill="white" />
      <circle cx="24" cy="10" r="6" fill="black" />
    </mask>
    <circle class="sun" cx="12" cy="12" r="6" mask={`url(#${maskId})`} fill="currentColor" />
    <g class="sun-beams" stroke="currentColor">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
    <path class="moon-fallback" d="M12 18a6 6 0 0 1 0-12 6 6 0 0 0 0 12z" fill="currentColor" />
  </svg>
</button>

<style>
  @import "https://unpkg.com/open-props/easings.min.css";

  .theme-toggle {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    outline-offset: 5px;
    color: rgb(212 212 212);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .theme-toggle:hover {
    color: rgb(245 245 245);
    transform: scale(1.1);
  }

  :global([data-theme="light"]) .theme-toggle {
    color: #4f46e5;
  }

  :global([data-theme="light"]) .theme-toggle:hover {
    color: #6366f1;
    transform: scale(1.1);
  }

  .sun-and-moon > :is(.moon, .sun, .sun-beams) {
    transform-origin: center;
  }

  .sun-and-moon > :is(.moon, .sun) {
    fill: currentColor;
  }

  .sun-and-moon > .sun-beams {
    stroke: currentColor;
    stroke-width: 2px;
  }

  :global([data-theme="dark"]) .sun-and-moon > .sun {
    transform: scale(1.75);
  }

  :global([data-theme="dark"]) .sun-and-moon > .sun-beams {
    opacity: 0;
  }

  :global([data-theme="dark"]) .sun-and-moon > .moon > circle {
    transform: translateX(-7px);
  }

  .moon-fallback { display: none; }
  @supports (mask-type: luminance) {
    .moon-fallback { display: none; }
  }

  :global([data-theme="dark"]) .sun-and-moon:not(:has(mask)) .moon-fallback,
  :global([data-theme="dark"]) .sun-and-moon.mask-fallback .moon-fallback {
    display: block;
  }

  @supports (cx: 1) {
    :global([data-theme="dark"]) .sun-and-moon > .moon > circle {
      cx: 17;
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .sun-and-moon > .sun {
      transition: transform .5s var(--ease-elastic-3);
    }

    .sun-and-moon > .sun-beams {
      transition: transform .5s var(--ease-elastic-4), opacity .5s var(--ease-3);
    }

    .sun-and-moon .moon > circle {
      transition: transform .25s var(--ease-out-5);
    }

    @supports (cx: 1) {
      .sun-and-moon .moon > circle {
        transition: cx .25s var(--ease-out-5);
      }
    }

    :global([data-theme="dark"]) .sun-and-moon > .sun {
      transition-timing-function: var(--ease-3);
      transition-duration: .25s;
      transform: scale(1.75);
    }

    :global([data-theme="dark"]) .sun-and-moon > .sun-beams {
      transition-duration: .15s;
      transform: rotateZ(-25deg);
    }

    :global([data-theme="dark"]) .sun-and-moon > .moon > circle {
      transition-duration: .5s;
      transition-delay: .25s;
    }
  }
</style>
