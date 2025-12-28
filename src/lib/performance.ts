// =============================================================================
// PERFORMANCE DETECTION UTILITIES
// =============================================================================

import { PerformanceTier } from './constants';

/**
 * Detect the performance tier of the user's device based on WebGL capabilities
 */
export const getPerformanceTier = (): PerformanceTier => {
  if (typeof window === 'undefined') return 'medium';

  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl2') || canvas.getContext('webgl');

  if (!gl) return 'low';

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    : '';

  // Check for software rendering or very low-end GPUs
  if (/SwiftShader|Microsoft Basic|llvmpipe/.test(renderer)) {
    return 'low';
  }

  // Check for integrated graphics (generally medium tier)
  if (/Intel|Mali|Adreno 3|Adreno 4|Adreno 5|PowerVR/.test(renderer)) {
    return 'medium';
  }

  // Check for high-end mobile GPUs
  if (/Adreno 6|Adreno 7|Apple/.test(renderer)) {
    return 'high';
  }

  // Default to high for discrete GPUs (NVIDIA, AMD)
  if (/NVIDIA|AMD|Radeon|GeForce|RTX|GTX/.test(renderer)) {
    return 'high';
  }

  // Fallback to medium for unknown
  return 'medium';
};

/**
 * Check if the device supports WebGL 2
 */
export const supportsWebGL2 = (): boolean => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  return !!canvas.getContext('webgl2');
};

/**
 * Check if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if the device is a mobile device
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Check if the device is a touch device
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get device pixel ratio (clamped for performance)
 */
export const getDevicePixelRatio = (max: number = 2): number => {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.devicePixelRatio, max);
};

/**
 * Check connection speed (Network Information API)
 */
export const getConnectionSpeed = (): 'slow' | 'medium' | 'fast' => {
  if (typeof window === 'undefined') return 'medium';

  const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  if (!connection?.effectiveType) return 'medium';

  switch (connection.effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'slow';
    case '3g':
      return 'medium';
    case '4g':
    default:
      return 'fast';
  }
};

/**
 * Comprehensive device capability assessment
 */
export interface DeviceCapabilities {
  performanceTier: PerformanceTier;
  webgl2: boolean;
  reducedMotion: boolean;
  mobile: boolean;
  touch: boolean;
  pixelRatio: number;
  connectionSpeed: 'slow' | 'medium' | 'fast';
}

export const getDeviceCapabilities = (): DeviceCapabilities => {
  return {
    performanceTier: getPerformanceTier(),
    webgl2: supportsWebGL2(),
    reducedMotion: prefersReducedMotion(),
    mobile: isMobileDevice(),
    touch: isTouchDevice(),
    pixelRatio: getDevicePixelRatio(),
    connectionSpeed: getConnectionSpeed(),
  };
};
