// =============================================================================
// CONTACT SECTION COMPONENT
// Contact form and information
// =============================================================================

'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button, Card, CardContent } from '@/components/ui';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useUISound } from '@/hooks/useSoundManager';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const titleRef = useScrollAnimation<HTMLHeadingElement>({ preset: 'fadeInUp' });
  const { playSuccess } = useUISound();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    playSuccess();

    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'info@maxnate.africa',
      href: 'mailto:info@maxnate.africa',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Johannesburg, South Africa',
      href: '#',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+27 (0) 11 123 4567',
      href: 'tel:+27111234567',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-primary-navy-light/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-accent-gold text-sm font-semibold tracking-wider uppercase mb-4 block"
          >
            Get in Touch
          </motion.span>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6"
          >
            Let&apos;s Build <span className="text-accent-gold">Together</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Ready to transform your business with technology? Get in touch with us 
            to discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Card variant="elevated">
              <CardContent className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-text-muted mb-6">
                      Thank you for reaching out. We&apos;ll get back to you soon.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-primary-navy border border-border focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold text-text-primary placeholder-text-muted transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-primary-navy border border-border focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold text-text-primary placeholder-text-muted transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-text-secondary mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-primary-navy border border-border focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold text-text-primary placeholder-text-muted transition-colors"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-text-secondary mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-primary-navy border border-border focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold text-text-primary placeholder-text-muted transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Contact Information
              </h3>
              <p className="text-text-secondary">
                Reach out to us directly or fill in the form. Our team is ready 
                to help you bring your vision to life.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-primary-navy/50 hover:border-accent-gold/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-text-muted">{item.label}</div>
                    <div className="text-text-primary font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="h-64 rounded-xl border border-border bg-primary-navy-light/30 flex items-center justify-center">
              <div className="text-center text-text-muted">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Interactive Map Coming Soon</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
