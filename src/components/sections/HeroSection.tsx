// =============================================================================
// HERO SECTION COMPONENT
// Main landing section with 3D background
// =============================================================================

'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Scene, FloatingParticles, GeometricComposition } from '@/components/canvas';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SITE_CONFIG } from '@/lib/constants';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animations
  const titleRef = useScrollAnimation<HTMLHeadingElement>({ preset: 'fadeInUp', delay: 0.2 });
  const subtitleRef = useScrollAnimation<HTMLParagraphElement>({ preset: 'fadeInUp', delay: 0.4 });
  const ctaRef = useScrollAnimation<HTMLDivElement>({ preset: 'fadeInUp', delay: 0.6 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene className="w-full h-full">
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <FloatingParticles count={800} size={0.02} spread={15} />
          <GeometricComposition />
        </Scene>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary-navy/80 via-primary-navy/60 to-primary-navy" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <span className="px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-sm font-medium">
            🌍 Empowering African Innovation
          </span>
        </motion.div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight"
        >
          Building the Future of{' '}
          <span className="text-gradient bg-gradient-to-r from-accent-gold via-accent-goldLight to-accent-gold bg-clip-text text-transparent">
            African Technology
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10"
        >
          {SITE_CONFIG.description}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            magnetic
            onClick={() => {
              document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Our Solutions
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get in Touch
          </Button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-text-muted"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
