// =============================================================================
// LOADING SCREEN COMPONENT
// =============================================================================

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { SITE_CONFIG } from '@/lib/constants';

export const LoadingScreen = () => {
  const { loadingProgress, setLoading, setLoadingProgress } =
    useAppStore();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(100);
        clearInterval(interval);

        // Delay hiding the loader for smooth transition
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => setShowLoader(false), 500);
        }, 500);
      } else {
        setLoadingProgress(Math.min(progress, 95));
      }
    }, 200);

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      setLoading(false);
      setTimeout(() => setShowLoader(false), 500);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [setLoading, setLoadingProgress]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary-navy"
        >
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.div
              className="w-20 h-20 bg-accent-gold rounded-2xl flex items-center justify-center"
              animate={{
                rotateY: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="text-primary-navy font-bold text-3xl">M</span>
            </motion.div>
          </motion.div>

          {/* Company name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-text-primary mb-8"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-primary-navy-lighter rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-gold"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-text-muted"
          >
            {loadingProgress < 100
              ? 'Loading experience...'
              : 'Ready'}
          </motion.p>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent-gold/20 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
