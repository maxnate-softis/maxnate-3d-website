// =============================================================================
// CUSTOM CURSOR COMPONENT
// =============================================================================

'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { isTouchDevice } from '@/lib/performance';
import { cn } from '@/lib/utils';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { cursorType, cursorScale } = useAppStore();

  // Motion values for smooth animation
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring configuration for smooth following
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Don't show cursor on touch devices
    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Hide default cursor
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && isTouchDevice()) return null;

  const getCursorContent = () => {
    switch (cursorType) {
      case 'loading':
        return (
          <motion.div
            className="w-4 h-4 border-2 border-accent-gold border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        );
      case 'pointer':
        return (
          <motion.div
            className="w-full h-full bg-accent-gold/30 rounded-full border border-accent-gold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          />
        );
      case 'text':
        return (
          <motion.div className="w-0.5 h-5 bg-accent-gold" />
        );
      case 'drag':
        return (
          <motion.div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
            <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
            <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
          </motion.div>
        );
      default:
        return (
          <motion.div
            className="w-2 h-2 bg-accent-gold rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        );
    }
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999]',
          'flex items-center justify-center',
          !isVisible && 'opacity-0'
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32 * cursorScale,
          height: 32 * cursorScale,
          marginLeft: -16 * cursorScale,
          marginTop: -16 * cursorScale,
        }}
        animate={{
          scale: cursorScale,
        }}
        transition={{ duration: 0.15 }}
      >
        {getCursorContent()}
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9998]',
          'w-1 h-1 bg-accent-gold/50 rounded-full',
          !isVisible && 'opacity-0'
        )}
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: -2,
          marginTop: -2,
        }}
      />
    </>
  );
};
