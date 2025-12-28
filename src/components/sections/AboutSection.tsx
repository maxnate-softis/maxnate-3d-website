// =============================================================================
// ABOUT SECTION COMPONENT
// Company story and values
// =============================================================================

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ENGINEERING_PRINCIPLES } from '@/lib/constants';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '10+', label: 'Countries Served' },
  { value: '24/7', label: 'Support Available' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const titleRef = useScrollAnimation<HTMLHeadingElement>({ preset: 'fadeInUp' });
  const textRef = useScrollAnimation<HTMLDivElement>({ preset: 'fadeInUp', delay: 0.2 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-primary-navy-light/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-accent-gold text-sm font-semibold tracking-wider uppercase mb-4 block"
            >
              About Maxnate Africa
            </motion.span>
            
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6"
            >
              Engineering Excellence for{' '}
              <span className="text-accent-gold">Africa&apos;s Future</span>
            </h2>

            <div ref={textRef} className="space-y-6 text-text-secondary">
              <p className="text-lg">
                Maxnate Africa is a leading technology company dedicated to empowering 
                African businesses through innovative software solutions and digital transformation.
              </p>
              <p>
                Founded with the vision of bridging the technology gap in Africa, we combine 
                global expertise with local understanding to deliver solutions that truly make 
                a difference. Our team of expert engineers and consultants work alongside 
                businesses to build scalable, secure, and sustainable technology ecosystems.
              </p>
              <p>
                From startups to enterprises, we partner with organizations across the continent 
                to drive growth, efficiency, and competitive advantage through technology.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold text-accent-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Principles */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary mb-8">
              Our Engineering Principles
            </h3>
            {ENGINEERING_PRINCIPLES.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-primary-navy/50 hover:border-accent-gold/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center text-accent-gold flex-shrink-0">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">
                      {principle.title}
                    </h4>
                    <p className="text-sm text-text-muted">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
