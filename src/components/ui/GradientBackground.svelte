<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Props {
    layers?: number;
    points?: number;
    variance?: number;
    speed?: number;
    pulseSpeed?: number;
    frozen?: boolean;
    class?: string;
  }

  let {
    layers = 2,
    points = 20,
    variance = 5,
    speed = 0.00002,
    pulseSpeed = 0.0002,
    frozen = false,
    class: className = ''
  }: Props = $props();

  let innerDiv: HTMLDivElement;
  let animationFrame: number | undefined;

  interface GradientColor {
    from: { h: number; s: number; l: number };
    via: { h: number; s: number; l: number };
    to: { h: number; s: number; l: number };
    angle: number;
  }

  interface Point {
    x: number;
    y: number;
    xTarget: number;
    yTarget: number;
  }

  function randomHSL(hMin: number, hMax: number, sMin = 80, sMax = 100, lMin = 40, lMax = 60) {
    const h = Math.floor(Math.random() * (hMax - hMin) + hMin);
    const s = Math.floor(Math.random() * (sMax - sMin) + sMin);
    const l = Math.floor(Math.random() * (lMax - lMin) + lMin);
    return { h, s, l };
  }

  function createGradients(count: number): GradientColor[] {
    return Array.from({ length: count }, () => ({
      from: randomHSL(250, 280),
      via: randomHSL(180, 210),
      to: randomHSL(270, 300),
      angle: Math.random() * 360,
    }));
  }

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  function generatePoints(count: number): Point[] {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      xTarget: Math.random() * 100,
      yTarget: Math.random() * 100,
    }));
  }

  let gradientColors = createGradients(layers);
  let polyPoints = generatePoints(points);

  onMount(() => {
    if (frozen || !innerDiv) return;

    let lastTime = performance.now();
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30;
    let isScrolling = false;
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
        lastTime = performance.now();
        lastFrameTime = lastTime;
      }, 150);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastTime = performance.now();
        lastFrameTime = lastTime;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = (time: number) => {
      animationFrame = requestAnimationFrame(animate);
      if (isScrolling) return;

      const deltaSinceLastFrame = time - lastFrameTime;
      if (deltaSinceLastFrame < frameInterval) return;

      const delta = Math.min(time - lastTime, 50);
      lastTime = time;
      lastFrameTime = time;

      gradientColors = gradientColors.map((g) => ({
        ...g,
        angle: (g.angle + delta * speed * 0.1) % 360,
      }));

      polyPoints = polyPoints.map((p) => {
        let { x, y, xTarget, yTarget } = p;
        x = lerp(x, xTarget, speed * delta);
        y = lerp(y, yTarget, speed * delta);

        if (Math.abs(x - xTarget) < 0.5) xTarget = Math.random() * 100;
        if (Math.abs(y - yTarget) < 0.5) yTarget = Math.random() * 100;

        return { x, y, xTarget, yTarget };
      });

      const pulse = Math.sin(time * pulseSpeed) * 0.15 + 0.85;
      const gradientStyle = gradientColors
        .map(
          (g) =>
            `linear-gradient(${g.angle}deg, hsl(${g.from.h},${g.from.s}%,${g.from.l}%) 0%, hsl(${g.via.h},${g.via.s}%,${g.via.l}%) 50%, hsl(${g.to.h},${g.to.s}%,${g.to.l}%) 100%)`
        )
        .join(', ');
      const polygonString = polyPoints.map((p) => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(', ');
      
      innerDiv.style.background = gradientStyle;
      innerDiv.style.clipPath = `polygon(${polygonString})`;
      innerDiv.style.opacity = pulse.toString();
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });

  const initialGradientStyle = gradientColors
    .map(
      (g) =>
        `linear-gradient(${g.angle}deg, hsl(${g.from.h},${g.from.s}%,${g.from.l}%) 0%, hsl(${g.via.h},${g.via.s}%,${g.via.l}%) 50%, hsl(${g.to.h},${g.to.s}%,${g.to.l}%) 100%)`
    )
    .join(', ');

  const initialPolygonString = polyPoints.map((p) => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(', ');
</script>

<div
  aria-hidden="true"
  class="fixed inset-0 -z-10 transform-gpu overflow-hidden opacity-36 blur-3xl {className}"
  style="will-change: auto; contain: layout style paint;"
>
  <div
    bind:this={innerDiv}
    class="w-full h-full absolute opacity-36"
    style="
      background: {initialGradientStyle};
      clip-path: polygon({initialPolygonString});
      opacity: {frozen ? 0.85 : 0.85};
      will-change: opacity, clip-path;
    "
  ></div>
</div>
