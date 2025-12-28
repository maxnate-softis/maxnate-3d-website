// =============================================================================
// SCROLL ANIMATION HOOK (GSAP ScrollTrigger)
// =============================================================================

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation presets
export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
  },
  fadeInDown: {
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
  },
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
  },
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
  },
  scaleIn: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
  },
  rotateIn: {
    from: { rotateX: 90, opacity: 0 },
    to: { rotateX: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
  },
} as const;

type PresetName = keyof typeof animationPresets;

interface ScrollAnimationOptions {
  preset?: PresetName;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
  };
  stagger?: number;
  delay?: number;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const element = ref.current;
    const {
      preset = 'fadeInUp',
      from: customFrom,
      to: customTo,
      trigger = {},
      stagger,
      delay = 0,
    } = options;

    const presetConfig = animationPresets[preset];
    const from = customFrom || presetConfig.from;
    const to = {
      ...presetConfig.to,
      ...customTo,
      delay,
      stagger,
      scrollTrigger: {
        trigger: element,
        start: trigger.start || 'top 80%',
        end: trigger.end || 'bottom 20%',
        scrub: trigger.scrub || false,
        pin: trigger.pin || false,
        markers: trigger.markers || false,
      },
    };

    gsap.fromTo(element, from, to);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [options, prefersReducedMotion]);

  return ref;
};

// Hook for staggered children animations
export const useStaggerAnimation = <T extends HTMLElement>(
  childSelector: string,
  options: Omit<ScrollAnimationOptions, 'stagger'> & { stagger?: number } = {}
) => {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const parent = ref.current;
    const children = parent.querySelectorAll(childSelector);

    if (children.length === 0) return;

    const {
      preset = 'fadeInUp',
      from: customFrom,
      to: customTo,
      trigger = {},
      stagger = 0.1,
      delay = 0,
    } = options;

    const presetConfig = animationPresets[preset];
    const from = customFrom || presetConfig.from;
    const to = {
      ...presetConfig.to,
      ...customTo,
      delay,
      stagger,
      scrollTrigger: {
        trigger: parent,
        start: trigger.start || 'top 80%',
        end: trigger.end || 'bottom 20%',
        scrub: trigger.scrub || false,
        markers: trigger.markers || false,
      },
    };

    gsap.fromTo(children, from, to);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === parent) {
          t.kill();
        }
      });
    };
  }, [childSelector, options, prefersReducedMotion]);

  return ref;
};

// Hook for pinned sections with scroll-driven animations
export const usePinnedSection = <T extends HTMLElement>(
  options: {
    duration?: number;
    onUpdate?: (progress: number) => void;
  } = {}
) => {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const element = ref.current;
    const { duration = 1, onUpdate } = options;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: `+=${window.innerHeight * duration}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        onUpdate?.(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [options, prefersReducedMotion]);

  return ref;
};
