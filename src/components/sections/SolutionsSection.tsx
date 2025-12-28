// =============================================================================
// SOLUTIONS SECTION COMPONENT
// Showcase of company solutions with interactive cards
// =============================================================================

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { Scene, NetworkGraph } from '@/components/canvas';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SOLUTIONS } from '@/lib/constants';

// Solution Icons
const icons: Record<string, React.ReactNode> = {
  'Software Development': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  'AI & Machine Learning': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'Cloud Infrastructure': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  'Digital Transformation': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  'Cybersecurity': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'Consulting': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0] as const, // easeOut bezier curve
    },
  },
};

export function SolutionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const titleRef = useScrollAnimation<HTMLHeadingElement>({ preset: 'fadeInUp' });
  const subtitleRef = useScrollAnimation<HTMLParagraphElement>({ preset: 'fadeInUp', delay: 0.2 });

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background 3D Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] opacity-30 hidden lg:block">
        <Scene className="w-full h-full">
          <ambientLight intensity={0.5} />
          <NetworkGraph nodeCount={30} radius={3} />
        </Scene>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-accent-gold text-sm font-semibold tracking-wider uppercase mb-4 block"
          >
            Our Solutions
          </motion.span>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6"
          >
            Comprehensive Technology{' '}
            <span className="text-accent-gold">Solutions</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            We deliver end-to-end technology solutions tailored for African businesses,
            from custom software development to enterprise digital transformation.
          </p>
        </div>

        {/* Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SOLUTIONS.map((solution) => (
            <motion.div key={solution.id} variants={itemVariants}>
              <Card
                variant="interactive"
                as3D
                className="h-full hover:border-accent-gold/50 group"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold mb-4 group-hover:bg-accent-gold/20 transition-colors">
                    {icons[solution.title] || (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-accent-gold transition-colors">
                    {solution.title}
                  </CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-text-muted"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
