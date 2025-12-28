// =============================================================================
// POST-PROCESSING EFFECTS
// Cinematic effects for premium visual quality
// =============================================================================

'use client';

import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useAppStore } from '@/stores/useAppStore';
import { Vector2 } from 'three';

export function PostProcessing() {
  const performanceTier = useAppStore((state) => state.performanceTier);

  // Minimal effects for medium tier
  if (performanceTier === 'medium') {
    return (
      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    );
  }

  // Full effects for high tier
  return (
    <EffectComposer>
      {/* Bloom for glowing elements */}
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.8}
      />
      
      {/* Subtle chromatic aberration for cinematic look */}
      <ChromaticAberration
        offset={new Vector2(0.0005, 0.0005)}
        radialModulation={false}
        modulationOffset={0.1}
      />
      
      {/* Vignette for focus */}
      <Vignette
        offset={0.3}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
      
      {/* Film grain for texture */}
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.02}
      />
    </EffectComposer>
  );
}
