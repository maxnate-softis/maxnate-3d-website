// =============================================================================
// SCENE WRAPPER COMPONENT
// Main 3D canvas with performance-adaptive rendering
// =============================================================================

'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useCallback, useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { PostProcessing } from './PostProcessing';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export function Scene({ children, className }: SceneProps) {
  const performanceTier = useAppStore((state) => state.performanceTier);
  const setPerformanceTier = useAppStore((state) => state.setPerformanceTier);
  const [dpr, setDpr] = useState(
    performanceTier === 'high' ? 2 : performanceTier === 'medium' ? 1.5 : 1
  );

  // Handle performance degradation
  const handleDecline = useCallback(() => {
    setDpr((prev) => Math.max(0.5, prev - 0.5));
    if (performanceTier === 'high') {
      setPerformanceTier('medium');
    } else if (performanceTier === 'medium') {
      setPerformanceTier('low');
    }
  }, [performanceTier, setPerformanceTier]);

  // Handle performance improvement
  const handleIncline = useCallback(() => {
    setDpr((prev) => Math.min(2, prev + 0.25));
  }, []);

  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        gl={{
          antialias: performanceTier !== 'low',
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, 0, 5],
        }}
        shadows={performanceTier === 'high'}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Performance Monitoring */}
        <PerformanceMonitor
          onIncline={handleIncline}
          onDecline={handleDecline}
          flipflops={3}
          factor={0.5}
        >
          {/* Adaptive Features */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          {/* Suspense for async loading */}
          <Suspense fallback={null}>
            {children}
            
            {/* Post-processing effects (only on high/medium) */}
            {performanceTier !== 'low' && <PostProcessing />}
            
            {/* Preload all assets */}
            <Preload all />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
