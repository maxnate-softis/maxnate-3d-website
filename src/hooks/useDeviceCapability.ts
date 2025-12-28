// =============================================================================
// DEVICE CAPABILITY HOOK
// =============================================================================

'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import {
  getDeviceCapabilities,
  DeviceCapabilities,
} from '@/lib/performance';

const defaultCapabilities: DeviceCapabilities = {
  performanceTier: 'medium',
  webgl2: true,
  reducedMotion: false,
  mobile: false,
  touch: false,
  pixelRatio: 1,
  connectionSpeed: 'medium',
};

export const useDeviceCapability = () => {
  const [capabilities, setCapabilities] =
    useState<DeviceCapabilities>(defaultCapabilities);
  const [isDetected, setIsDetected] = useState(false);
  const setPerformanceTier = useAppStore((state) => state.setPerformanceTier);

  useEffect(() => {
    const detected = getDeviceCapabilities();
    setCapabilities(detected);
    setPerformanceTier(detected.performanceTier);
    setIsDetected(true);
  }, [setPerformanceTier]);

  return {
    ...capabilities,
    isDetected,
  };
};
