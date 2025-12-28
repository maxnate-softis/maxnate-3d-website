// =============================================================================
// HOME PAGE
// Main landing page with all sections
// =============================================================================

import {
  HeroSection,
  SolutionsSection,
  AboutSection,
  ProcessSection,
  ContactSection,
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <AboutSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
