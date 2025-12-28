// =============================================================================
// FOOTER COMPONENT
// =============================================================================

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

const footerLinks = {
  company: NAV_LINKS.filter((link) =>
    ['/', '/about', '/contact'].includes(link.href)
  ),
  services: NAV_LINKS.filter((link) =>
    ['/solutions', '/how-we-work', '/impact'].includes(link.href)
  ),
  social: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Twitter', href: '#', icon: 'twitter' },
    { label: 'GitHub', href: '#', icon: 'github' },
  ],
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-navy-light border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-10 h-10 bg-accent-gold rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary-navy font-bold text-lg">M</span>
              </motion.div>
              <span className="text-xl font-bold text-text-primary">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Building African solutions with global-grade technology. We design,
              engineer, and deploy digital systems that improve how communities
              live, work, and grow.
            </p>
            <p className="text-text-muted text-sm">
              📍 {SITE_CONFIG.location}
            </p>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Connect</h3>
            <p className="text-text-secondary text-sm mb-4">
              {SITE_CONFIG.email}
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-primary-navy-lighter flex items-center justify-center text-text-secondary hover:text-accent-gold hover:bg-accent-gold/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {social.icon === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social.icon === 'github' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-text-muted hover:text-text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-text-muted hover:text-text-secondary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
