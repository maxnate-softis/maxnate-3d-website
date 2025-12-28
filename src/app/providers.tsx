// =============================================================================
// APP PROVIDERS
// Client-side providers wrapper
// =============================================================================

'use client';

import { useEffect, useState } from 'react';
import { Navigation, Footer, LoadingScreen, CustomCursor } from '@/components/ui';
import { useAppStore } from '@/stores/useAppStore';
import { getDeviceCapabilities } from '@/lib/performance';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const isLoading = useAppStore((state) => state.isLoading);
  const setLoading = useAppStore((state) => state.setLoading);
  const setPerformanceTier = useAppStore((state) => state.setPerformanceTier);

  useEffect(() => {
    // Set performance tier based on device capabilities
    const capabilities = getDeviceCapabilities();
    setPerformanceTier(capabilities.performanceTier);

    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
      setMounted(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading, setPerformanceTier]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}

      {/* Custom Cursor (desktop only) */}
      {mounted && <CustomCursor />}

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
}
