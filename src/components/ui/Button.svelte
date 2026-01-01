<script lang="ts">
  import { type Snippet } from 'svelte';
  import { hoverScale } from '../../lib/animations';

  interface Props {
    variant?: 'default' | 'secondary' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
    disabled?: boolean;
    children: Snippet;
    onclick?: (e: MouseEvent) => void;
    target?: string;
    rel?: string;
  }

  let {
    variant = 'default',
    size = 'default',
    href,
    type = 'button',
    class: className = '',
    disabled = false,
    children,
    onclick,
    target,
    rel
  }: Props = $props();

  const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 will-change-transform';

  const variantClasses = {
    default: 'bg-white text-neutral-900 hover:bg-neutral-100/90',
    secondary: 'bg-neutral-800 text-neutral-50 hover:bg-neutral-800/80',
    ghost: 'text-neutral-100 hover:bg-neutral-800/80',
  };

  const sizeClasses = {
    default: 'h-10 px-5 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-11 rounded-md px-7',
    icon: 'h-9 w-9',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
</script>

{#if href}
  <a use:hoverScale={'medium'} href={href} class={classes} onclick={onclick} aria-disabled={disabled} target={target} rel={rel}>
    {@render children()}
  </a>
{:else}
  <button use:hoverScale={'medium'} type={type} class={classes} onclick={onclick} disabled={disabled}>
    {@render children()}
  </button>
{/if}
