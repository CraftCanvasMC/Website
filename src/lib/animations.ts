import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.ticker.fps(-1);
  gsap.config({ 
    force3D: true,
    nullTargetWarn: false,
    autoSleep: 60,
  });
}

export const HOVER_ANIMATIONS = {
  scale: {
    small: { scale: 1.02, duration: 0.15, ease: 'power1.out' },
    medium: { scale: 1.05, duration: 0.15, ease: 'power1.out' },
    large: { scale: 1.1, duration: 0.15, ease: 'power1.out' },
  },
  lift: {
    small: { y: -2, duration: 0.15, ease: 'power1.out' },
    medium: { y: -4, duration: 0.15, ease: 'power1.out' },
    large: { y: -8, duration: 0.15, ease: 'power1.out' },
  },
} as const;

export const ENTRANCE_ANIMATIONS = {
  fadeIn: { opacity: 0, duration: 0.8, ease: 'power2.out' },
  slideUp: { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' },
  slideDown: { y: -30, opacity: 0, duration: 0.8, ease: 'power2.out' },
  scaleIn: { scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out' },
  slideLeft: { x: -30, opacity: 0, duration: 0.8, ease: 'power2.out' },
  slideRight: { x: 30, opacity: 0, duration: 0.8, ease: 'power2.out' },
} as const;

export function hoverScale(node: HTMLElement, intensity: 'small' | 'medium' | 'large' = 'medium') {
  const config = HOVER_ANIMATIONS.scale[intensity];

  const handleMouseEnter = () => {
    node.style.willChange = 'transform';
    gsap.to(node, { 
      ...config, 
      force3D: true,
      overwrite: 'auto',
      immediateRender: false,
      lazy: false
    });
  };

  const handleMouseLeave = () => {
    gsap.to(node, { 
      scale: 1, 
      duration: config.duration, 
      ease: config.ease,
      force3D: true,
      overwrite: 'auto',
      immediateRender: false,
      lazy: false,
      onComplete: () => {
        node.style.willChange = 'auto';
      }
    });
  };

  node.addEventListener('mouseenter', handleMouseEnter, { passive: true });
  node.addEventListener('mouseleave', handleMouseLeave, { passive: true });

  return {
    destroy() {
      gsap.killTweensOf(node);
      node.style.willChange = 'auto';
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    },
  };
}

export function hoverLift(node: HTMLElement, intensity: 'small' | 'medium' | 'large' = 'medium') {
  const config = HOVER_ANIMATIONS.lift[intensity];
  
  // Set will-change only during hover for better performance
  const handleMouseEnter = () => {
    node.style.willChange = 'transform';
    gsap.to(node, { 
      ...config,
      force3D: true,
      overwrite: 'auto',
      immediateRender: false,
      lazy: false
    });
  };

  const handleMouseLeave = () => {
    gsap.to(node, { 
      y: 0, 
      duration: config.duration, 
      ease: config.ease,
      force3D: true,
      overwrite: 'auto',
      immediateRender: false,
      lazy: false,
      onComplete: () => {
        node.style.willChange = 'auto';
      }
    });
  };

  node.addEventListener('mouseenter', handleMouseEnter, { passive: true });
  node.addEventListener('mouseleave', handleMouseLeave, { passive: true });

  return {
    destroy() {
      gsap.killTweensOf(node);
      node.style.willChange = 'auto';
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    },
  };
}

export function entrance(
  node: HTMLElement,
  { type = 'fadeIn', delay = 0, duration }: { type?: keyof typeof ENTRANCE_ANIMATIONS; delay?: number; duration?: number } = {}
) {
  const config = ENTRANCE_ANIMATIONS[type];
  const animConfig = duration !== undefined ? { ...config, duration } : config;
  
  gsap.set(node, { 
    opacity: 0,
    y: type === 'slideUp' ? 30 : type === 'slideDown' ? -30 : 0,
    x: type === 'slideLeft' ? -30 : type === 'slideRight' ? 30 : 0,
    scale: type === 'scaleIn' ? 0.95 : 1,
    visibility: 'visible',
  });
  
  gsap.to(node, { 
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    duration: animConfig.duration,
    delay,
    ease: animConfig.ease,
    force3D: true,
    overwrite: 'auto',
    onComplete: () => {
      gsap.set(node, { clearProps: 'transform,opacity' });
    }
  });

  return {
    destroy() {
      gsap.killTweensOf(node);
    },
  };
}

export function staggerEntrance(
  node: HTMLElement,
  { type = 'fadeIn', stagger = 0.1, selector = '> *' }: { 
    type?: keyof typeof ENTRANCE_ANIMATIONS; 
    stagger?: number;
    selector?: string;
  } = {}
) {
  const config = ENTRANCE_ANIMATIONS[type];
  const children = node.querySelectorAll(selector);
  
  gsap.set(children, { 
    opacity: 0,
    y: type === 'slideUp' ? 30 : type === 'slideDown' ? -30 : 0,
    x: type === 'slideLeft' ? -30 : type === 'slideRight' ? 30 : 0,
    scale: type === 'scaleIn' ? 0.95 : 1,
    visibility: 'visible',
  });
  
  gsap.to(children, {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    duration: config.duration,
    stagger,
    ease: config.ease,
    force3D: true,
    overwrite: 'auto',
    onComplete: () => {
      gsap.set(children, { clearProps: 'transform,opacity' });
    }
  });

  return {
    destroy() {
      gsap.killTweensOf(children);
    },
  };
}

export function shake(node: HTMLElement, intensity: number = 10) {
  gsap.to(node, {
    keyframes: [
      { x: -intensity },
      { x: intensity },
      { x: -intensity },
      { x: intensity },
      { x: 0 },
    ],
    duration: 0.4,
    ease: 'power2.inOut',
  });
}

export function pulse(node: HTMLElement, scale: number = 1.05, duration: number = 0.6) {
  gsap.to(node, {
    scale,
    duration: duration / 2,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
  });
}

export function rotate(node: HTMLElement, rotation: number = 360, duration: number = 0.6) {
  gsap.to(node, {
    rotation,
    duration,
    ease: 'power2.out',
  });
}

if (typeof window !== 'undefined') {
  (window as any).gsapDebug = () => {
    const activeTweens = gsap.globalTimeline.getChildren().length;
    console.log('[GSAP] Active tweens:', activeTweens);
    console.log('[GSAP] Ticker time:', gsap.ticker.time);
    return activeTweens;
  };
}
