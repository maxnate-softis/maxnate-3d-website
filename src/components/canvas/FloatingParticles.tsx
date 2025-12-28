// =============================================================================
// FLOATING PARTICLES COMPONENT
// Ambient particles that react to mouse movement
// =============================================================================

'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/stores/useAppStore';

interface FloatingParticlesProps {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
  speed?: number;
}

// Seeded random for consistent results
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function FloatingParticles({
  count = 1000,
  size = 0.015,
  color = '#D4A853',
  spread = 10,
  speed = 0.3,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const performanceTier = useAppStore((state) => state.performanceTier);
  const [seed] = useState(() => Date.now());

  // Adjust count based on performance tier
  const adjustedCount = useMemo(() => {
    if (performanceTier === 'low') return Math.floor(count * 0.3);
    if (performanceTier === 'medium') return Math.floor(count * 0.6);
    return count;
  }, [count, performanceTier]);

  // Generate particle positions using seeded random
  const particles = useMemo(() => {
    const positions = new Float32Array(adjustedCount * 3);
    const velocities = new Float32Array(adjustedCount * 3);

    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3;
      positions[i3] = (seededRandom(seed + i * 3) - 0.5) * spread;
      positions[i3 + 1] = (seededRandom(seed + i * 3 + 1) - 0.5) * spread;
      positions[i3 + 2] = (seededRandom(seed + i * 3 + 2) - 0.5) * spread;

      velocities[i3] = (seededRandom(seed + i * 3 + 3) - 0.5) * speed * 0.01;
      velocities[i3 + 1] = (seededRandom(seed + i * 3 + 4) - 0.5) * speed * 0.01;
      velocities[i3 + 2] = (seededRandom(seed + i * 3 + 5) - 0.5) * speed * 0.01;
    }

    return { positions, velocities };
  }, [adjustedCount, spread, speed, seed]);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3;

      // Add gentle floating motion
      positions[i3] += particles.velocities[i3] + Math.sin(time + i) * 0.0001;
      positions[i3 + 1] +=
        particles.velocities[i3 + 1] + Math.cos(time + i * 0.5) * 0.0002;
      positions[i3 + 2] +=
        particles.velocities[i3 + 2] + Math.sin(time * 0.5 + i) * 0.0001;

      // Wrap around boundaries
      const halfSpread = spread / 2;
      if (positions[i3] > halfSpread) positions[i3] = -halfSpread;
      if (positions[i3] < -halfSpread) positions[i3] = halfSpread;
      if (positions[i3 + 1] > halfSpread) positions[i3 + 1] = -halfSpread;
      if (positions[i3 + 1] < -halfSpread) positions[i3 + 1] = halfSpread;
      if (positions[i3 + 2] > halfSpread) positions[i3 + 2] = -halfSpread;
      if (positions[i3 + 2] < -halfSpread) positions[i3 + 2] = halfSpread;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Gentle rotation
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });

  // Create geometry with positions
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    return geo;
  }, [particles.positions]);

  return (
    <Points ref={pointsRef} geometry={geometry} limit={adjustedCount}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}
