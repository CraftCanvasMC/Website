'use client';

import { cn } from '~/lib/utils';
import { useEffect, useRef, useMemo } from 'react';
import type { HTMLAttributes } from 'react';

const globalState = {
  gradientColors: null as ReturnType<typeof createGradients> | null,
  polyPoints: null as ReturnType<typeof generatePoints> | null,
};

interface GradientBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  layers?: number;
  points?: number;
  variance?: number;
  speed?: number;
  pulseSpeed?: number;
  frozen?: boolean;
}

function randomHSL(hMin: number, hMax: number, sMin = 80, sMax = 100, lMin = 40, lMax = 60) {
  const h = Math.floor(Math.random() * (hMax - hMin) + hMin);
  const s = Math.floor(Math.random() * (sMax - sMin) + sMin);
  const l = Math.floor(Math.random() * (lMax - lMin) + lMin);
  return { h, s, l };
}

function createGradients(layers: number) {
  return Array.from({ length: layers }, () => ({
    from: randomHSL(250, 280),
    via: randomHSL(180, 210),
    to: randomHSL(270, 300),
    angle: Math.random() * 360,
  }));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function generatePoints(count: number, variance: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    xTarget: Math.random() * 100,
    yTarget: Math.random() * 100,
  }));
}

export function GradientBackground({
  layers = 2,
  points = 16,
  variance = 5,
  speed = 0.00002,
  pulseSpeed = 0.0002,
  frozen = false,
  className,
  ...props
}: GradientBackgroundProps) {
  const gradientColorsRef = useRef(globalState.gradientColors ?? createGradients(layers));
  const polyPointsRef = useRef(globalState.polyPoints ?? generatePoints(points, variance));
  const elementRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef(0);
  const frameInterval = 1000 / 30;

  useEffect(() => {
    globalState.gradientColors = gradientColorsRef.current;
    globalState.polyPoints = polyPointsRef.current;
  }, []);

  useEffect(() => {
    if (frozen) return;

    const innerDiv = innerDivRef.current;
    if (!innerDiv) return;

    let lastTime = performance.now();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastTime = performance.now();
        lastFrameTime.current = lastTime;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const deltaSinceLastFrame = time - lastFrameTime.current;
      if (deltaSinceLastFrame < frameInterval) return;

      const delta = Math.min(time - lastTime, 50);
      lastTime = time;
      lastFrameTime.current = time;

      gradientColorsRef.current = gradientColorsRef.current.map((g) => ({
        ...g,
        angle: (g.angle + delta * speed * 0.1) % 360,
      }));

      polyPointsRef.current = polyPointsRef.current.map((p) => {
        let { x, y, xTarget, yTarget } = p;
        x = lerp(x, xTarget, speed * delta);
        y = lerp(y, yTarget, speed * delta);

        if (Math.abs(x - xTarget) < 0.5) xTarget = Math.random() * 100;
        if (Math.abs(y - yTarget) < 0.5) yTarget = Math.random() * 100;

        return { x, y, xTarget, yTarget };
      });

      const pulse = Math.sin(time * pulseSpeed) * 0.15 + 0.85;
      const gradientStyle = gradientColorsRef.current.map((g) => `linear-gradient(${g.angle}deg, hsl(${g.from.h},${g.from.s}%,${g.from.l}%) 0%, hsl(${g.via.h},${g.via.s}%,${g.via.l}%) 50%, hsl(${g.to.h},${g.to.s}%,${g.to.l}%) 100%)`).join(', ');
      const polygonString = polyPointsRef.current.map((p) => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(', ');
      innerDiv.style.background = gradientStyle;
      innerDiv.style.clipPath = `polygon(${polygonString})`;
      innerDiv.style.opacity = pulse.toString();
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [speed, pulseSpeed, frozen, frameInterval]);
  const initialGradientStyle = useMemo(() => gradientColorsRef.current.map((g) => `linear-gradient(${g.angle}deg, hsl(${g.from.h},${g.from.s}%,${g.from.l}%) 0%, hsl(${g.via.h},${g.via.s}%,${g.via.l}%) 50%, hsl(${g.to.h},${g.to.s}%,${g.to.l}%) 100%)`).join(', '), []);

  const initialPolygonString = useMemo(() => polyPointsRef.current.map((p) => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(', '), []);

  return (
    <div
      ref={elementRef}
      aria-hidden="true"
      className={cn(
        'fixed inset-0 -z-10 transform-gpu overflow-hidden opacity-36 blur-3xl',
        className
      )}
      style={{
        willChange: 'transform, opacity',
        contain: 'layout style paint',
      }}
      {...props}
    >
      <div
        ref={innerDivRef}
        className="w-full h-full absolute opacity-36"
        style={{
          background: initialGradientStyle,
          clipPath: `polygon(${initialPolygonString})`,
          opacity: frozen ? 0.85 : 0.85,
          willChange: 'opacity, clip-path',
        }}
      />
    </div>
  );
}