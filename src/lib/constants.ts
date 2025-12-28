// =============================================================================
// MAXNATE WEBSITE - GLOBAL CONSTANTS
// =============================================================================

// -----------------------------------------------------------------------------
// SITE METADATA
// -----------------------------------------------------------------------------
export const SITE_CONFIG = {
  name: 'Maxnate',
  tagline: 'Building African solutions with global-grade technology',
  description:
    'We design, engineer, and deploy digital systems that improve how communities live, work, and grow.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://maxnate.africa',
  email: 'hello@maxnate.africa',
  location: 'Africa',
} as const;

// -----------------------------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------------------------
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Impact', href: '/impact' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// -----------------------------------------------------------------------------
// COLORS (Design System)
// -----------------------------------------------------------------------------
export const COLORS = {
  // Primary palette
  primary: {
    navy: '#0A1628',
    navyLight: '#111D32',
    navyLighter: '#1A2942',
  },
  // Accent colors
  accent: {
    gold: '#D4A853',
    goldLight: '#E5C078',
    earth: '#8B4513',
  },
  // Semantic colors
  semantic: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A0AEC0',
    muted: '#718096',
  },
  // Border
  border: '#2D3748',
} as const;

// -----------------------------------------------------------------------------
// TYPOGRAPHY
// -----------------------------------------------------------------------------
export const TYPOGRAPHY = {
  fontFamily: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
} as const;

// -----------------------------------------------------------------------------
// SPACING
// -----------------------------------------------------------------------------
export const SPACING = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

// -----------------------------------------------------------------------------
// 3D CONFIGURATION
// -----------------------------------------------------------------------------
export const THREE_CONFIG = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 0, 5] as [number, number, number],
  },
  lighting: {
    ambient: {
      intensity: 0.4,
    },
    directional: {
      intensity: 1,
      position: [5, 5, 5] as [number, number, number],
    },
  },
  postProcessing: {
    bloom: {
      luminanceThreshold: 0.9,
      luminanceSmoothing: 0.4,
      intensity: 0.5,
    },
    depthOfField: {
      focusDistance: 0,
      focalLength: 0.02,
      bokehScale: 2,
    },
    vignette: {
      offset: 0.3,
      darkness: 0.5,
    },
    chromaticAberration: {
      offset: [0.0005, 0.0005] as [number, number],
    },
  },
  particles: {
    high: 1000,
    medium: 500,
    low: 100,
  },
} as const;

// -----------------------------------------------------------------------------
// ANIMATION CONFIGURATION
// -----------------------------------------------------------------------------
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
  },
  ease: {
    default: 'power2.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
  },
  scroll: {
    scrub: 1,
    start: 'top top',
    end: 'bottom bottom',
  },
} as const;

// -----------------------------------------------------------------------------
// SOUND CONFIGURATION
// -----------------------------------------------------------------------------
export const SOUND_CONFIG = {
  defaultMuted: true,
  volumes: {
    hover: 0.3,
    click: 0.5,
    whoosh: 0.4,
    ambient: 0.1,
    chime: 0.4,
  },
} as const;

// -----------------------------------------------------------------------------
// PERFORMANCE TIERS
// -----------------------------------------------------------------------------
export type PerformanceTier = 'high' | 'medium' | 'low';

export const PERFORMANCE_CONFIG = {
  high: {
    postProcessing: true,
    particles: THREE_CONFIG.particles.high,
    shadows: 'soft',
    lod: 'high',
  },
  medium: {
    postProcessing: 'bloom-only',
    particles: THREE_CONFIG.particles.medium,
    shadows: 'hard',
    lod: 'medium',
  },
  low: {
    postProcessing: false,
    particles: THREE_CONFIG.particles.low,
    shadows: false,
    lod: 'low',
  },
} as const;

// -----------------------------------------------------------------------------
// BREAKPOINTS
// -----------------------------------------------------------------------------
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// -----------------------------------------------------------------------------
// SOLUTIONS DATA
// -----------------------------------------------------------------------------
export const SOLUTIONS = [
  {
    id: 'digital-infrastructure',
    title: 'Digital Infrastructure',
    shortDescription: 'Foundation for digital services',
    description:
      'Build reliable, scalable digital foundations that power your operations.',
    icon: 'server',
    color: COLORS.accent.gold,
    features: ['Cloud Architecture', 'DevOps & CI/CD', 'Infrastructure as Code', 'Monitoring & Observability'],
  },
  {
    id: 'business-systems',
    title: 'Business Systems',
    shortDescription: 'Operations & efficiency tools',
    description:
      'Automate workflows, integrate systems, and improve operational efficiency.',
    icon: 'workflow',
    color: COLORS.semantic.info,
    features: ['ERP Integration', 'Custom Software', 'Workflow Automation', 'Data Analytics'],
  },
  {
    id: 'communication-identity',
    title: 'Communication & Identity',
    shortDescription: 'Secure identification systems',
    description:
      'Implement secure, unified identity solutions and communication platforms.',
    icon: 'id-card',
    color: COLORS.semantic.success,
    features: ['SSO & IAM', 'Biometric Systems', 'Secure Messaging', 'API Security'],
  },
  {
    id: 'community-platforms',
    title: 'Community Platforms',
    shortDescription: 'Community engagement tools',
    description:
      'Connect and engage communities with purpose-built digital platforms.',
    icon: 'users',
    color: COLORS.accent.earth,
    features: ['Mobile Apps', 'Web Portals', 'Real-time Features', 'Content Management'],
  },
] as const;

// -----------------------------------------------------------------------------
// PROCESS STEPS
// -----------------------------------------------------------------------------
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Understand the Community',
    description:
      'Deep research into the problem space, stakeholders, and context.',
    duration: '2-4 weeks',
  },
  {
    step: 2,
    title: 'Design the System',
    description:
      'Architecture planning, wireframes, and technical specifications.',
    duration: '2-3 weeks',
  },
  {
    step: 3,
    title: 'Engineer with Precision',
    description: 'Agile development with continuous testing and iteration.',
    duration: '6-12 weeks',
  },
  {
    step: 4,
    title: 'Deploy, Iterate, Support',
    description: 'Launch, monitor, and continuously improve.',
    duration: 'Ongoing',
  },
] as const;

// -----------------------------------------------------------------------------
// ENGINEERING PRINCIPLES
// -----------------------------------------------------------------------------
export const ENGINEERING_PRINCIPLES = [
  {
    id: 'security',
    title: 'Security First',
    description: 'Every system designed with security at its core.',
    icon: 'shield',
  },
  {
    id: 'scalability',
    title: 'Scalable Architecture',
    description: 'Built to grow with your needs.',
    icon: 'expand',
  },
  {
    id: 'maintenance',
    title: 'Long-term Maintenance',
    description: 'We stay with you after launch.',
    icon: 'calendar',
  },
  {
    id: 'documentation',
    title: 'Documentation Culture',
    description: 'Everything documented, nothing hidden.',
    icon: 'book',
  },
] as const;
