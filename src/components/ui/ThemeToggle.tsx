// =============================================================================
// THEME TOGGLE COMPONENT
// =============================================================================

'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme, setResolvedTheme } = useThemeStore();

  // Sync with system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateResolvedTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();
    mediaQuery.addEventListener('change', updateResolvedTheme);

    return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
  }, [theme, setResolvedTheme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-lg transition-colors duration-200',
        'hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent-gold/50'
      )}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        // Sun icon (switch to light)
        <motion.svg
          className="w-5 h-5 text-accent-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>
      ) : (
        // Moon icon (switch to dark)
        <motion.svg
          className="w-5 h-5 text-text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      )}
    </motion.button>
  );
};
