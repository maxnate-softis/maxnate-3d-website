// =============================================================================
// CUSTOM CURSOR HOOK
// =============================================================================

'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { isTouchDevice } from '@/lib/performance';

interface CursorPosition {
  x: number;
  y: number;
}

export const useCustomCursor = () => {
  const positionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const targetRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const animateRef = useRef<(() => void) | null>(null);

  const { cursorType, cursorScale, setCursorType, setCursorScale } = useAppStore();

  // Don't use custom cursor on touch devices
  const isTouch = typeof window !== 'undefined' && isTouchDevice();

  // Smooth cursor movement with lerp
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Set up animation function
  useEffect(() => {
    const animate = () => {
      const pos = positionRef.current;
      const target = targetRef.current;

      pos.x = lerp(pos.x, target.x, 0.15);
      pos.y = lerp(pos.y, target.y, 0.15);

      // Dispatch custom event for cursor component
      window.dispatchEvent(
        new CustomEvent('cursorMove', {
          detail: { x: pos.x, y: pos.y },
        })
      );

      rafRef.current = requestAnimationFrame(animate);
    };
    
    animateRef.current = animate;
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Handle element interactions
  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'pointer'
      ) {
        setCursorType('pointer');
        setCursorScale(1.5);
        return;
      }

      // Check for text inputs
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        setCursorType('text');
        setCursorScale(1);
        return;
      }

      // Check for draggable elements
      if (target.draggable || target.dataset.cursor === 'drag') {
        setCursorType('drag');
        setCursorScale(1.2);
        return;
      }

      // Default
      setCursorType('default');
      setCursorScale(1);
    },
    [setCursorType, setCursorScale]
  );

  // Handle loading states
  const setLoading = useCallback(
    (loading: boolean) => {
      if (loading) {
        setCursorType('loading');
        setCursorScale(1);
      } else {
        setCursorType('default');
        setCursorScale(1);
      }
    },
    [setCursorType, setCursorScale]
  );

  useEffect(() => {
    if (isTouch) return;

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [isTouch, handleMouseMove, handleMouseOver]);

  return {
    cursorType,
    cursorScale,
    setLoading,
    isEnabled: !isTouch,
  };
};

// Hook for magnetic button effect
export const useMagneticButton = (strength: number = 0.3) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return buttonRef;
};
