import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  
  // Enable React Compiler
  reactCompiler: true,
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/maxnate-assets/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Transpile Three.js packages
  transpilePackages: ['three'],
  
  // Experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'gsap', '@react-three/drei'],
  },
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache 3D assets aggressively
        source: '/models/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache textures aggressively
        source: '/textures/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
