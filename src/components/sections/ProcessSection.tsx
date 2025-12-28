// =============================================================================
// PROCESS SECTION COMPONENT
// How we work - step by step process
// =============================================================================

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PROCESS_STEPS } from '@/lib/constants';

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const titleRef = useScrollAnimation<HTMLHeadingElement>({ preset: 'fadeInUp' });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-accent-gold text-sm font-semibold tracking-wider uppercase mb-4 block"
          >
            Our Process
          </motion.span>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6"
          >
            How We <span className="text-accent-gold">Work</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A structured approach to delivering exceptional results, from initial 
            consultation to ongoing support.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-gold/50 via-accent-gold to-accent-gold/50" />

          <div className="space-y-12 lg:space-y-0">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className={`lg:flex lg:items-center lg:gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'
                  }`}
                >
                  <div
                    className={`p-6 rounded-xl border border-border bg-primary-navy-light/50 inline-block ${
                      index % 2 === 0 ? 'lg:ml-auto' : ''
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-muted max-w-md">{step.description}</p>
                  </div>
                </div>

                {/* Step Number */}
                <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold text-primary-navy font-bold text-xl z-10 relative">
                  {step.step}
                  {/* Pulse animation */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className="absolute inset-0 rounded-full bg-accent-gold"
                  />
                </div>

                {/* Empty space for alignment */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
