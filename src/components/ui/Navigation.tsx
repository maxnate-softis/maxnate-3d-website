// =============================================================================
// NAVIGATION COMPONENT
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { useAppStore } from '@/stores/useAppStore';
import { useUISound } from '@/hooks/useSoundManager';
import { Button } from './Button';
import { SoundToggle } from './SoundToggle';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu, closeMenu, scrollY, scrollDirection } =
    useAppStore();
  const { playClick } = useUISound();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const handleNavClick = () => {
    playClick();
    closeMenu();
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{
          y: scrollDirection === 'down' && scrollY > 200 ? -100 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-primary-navy/80 backdrop-blur-lg border-b border-border'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-text-primary font-bold text-xl"
              onClick={handleNavClick}
            >
              <motion.div
                className="w-8 h-8 bg-accent-gold rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary-navy font-bold">M</span>
              </motion.div>
              <span>{SITE_CONFIG.name}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors duration-200',
                    pathname === link.href
                      ? 'text-accent-gold'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                  onClick={handleNavClick}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-gold"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <SoundToggle />
                <ThemeToggle />
              </div>

              <Button
                variant="primary"
                size="sm"
                className="hidden lg:flex"
                onClick={() => (window.location.href = '/contact')}
              >
                Get in Touch
              </Button>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-text-primary"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <motion.div
                  className="w-6 h-5 flex flex-col justify-between"
                  animate={isMenuOpen ? 'open' : 'closed'}
                >
                  <motion.span
                    className="w-full h-0.5 bg-current origin-left"
                    variants={{
                      open: { rotate: 45, y: -2 },
                      closed: { rotate: 0, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="w-full h-0.5 bg-current"
                    variants={{
                      open: { opacity: 0, x: -20 },
                      closed: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="w-full h-0.5 bg-current origin-left"
                    variants={{
                      open: { rotate: -45, y: 2 },
                      closed: { rotate: 0, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-primary-navy/95 backdrop-blur-lg"
              onClick={closeMenu}
            />

            {/* Menu content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-primary-navy-light border-l border-border"
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                {/* Nav links */}
                <div className="flex flex-col gap-4">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'block py-3 text-xl font-medium transition-colors',
                          pathname === link.href
                            ? 'text-accent-gold'
                            : 'text-text-secondary hover:text-text-primary'
                        )}
                        onClick={handleNavClick}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile controls */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <SoundToggle />
                    <ThemeToggle />
                  </div>
                  <Button variant="primary" size="md">
                    Contact
                  </Button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
