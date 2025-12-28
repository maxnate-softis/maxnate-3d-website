// =============================================================================
// GEOMETRIC SHAPES COMPONENT
// Floating geometric primitives for visual interest
// =============================================================================

'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '@/lib/constants';
import { useAppStore } from '@/stores/useAppStore';

type ShapeType = 'icosahedron' | 'octahedron' | 'torus' | 'torusKnot' | 'dodecahedron';

interface GeometricShapeProps {
  type?: ShapeType;
  position?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  distort?: number;
  floatIntensity?: number;
}

export function GeometricShape({
  type = 'icosahedron',
  position = [0, 0, 0],
  scale = 1,
  color = COLORS.accent.gold,
  speed = 1,
  distort = 0.3,
  floatIntensity = 1,
}: GeometricShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const performanceTier = useAppStore((state) => state.performanceTier);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Rotation animation
    meshRef.current.rotation.x = time * speed * 0.3;
    meshRef.current.rotation.y = time * speed * 0.2;

    // Scale on hover
    const targetScale = hovered ? scale * 1.2 : scale;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  const getGeometry = () => {
    const detail = performanceTier === 'low' ? 0 : performanceTier === 'medium' ? 1 : 2;
    
    switch (type) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, detail]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, detail]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, detail]} />;
      default:
        return <icosahedronGeometry args={[1, detail]} />;
    }
  };

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={floatIntensity}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getGeometry()}
        {performanceTier === 'high' ? (
          <MeshDistortMaterial
            color={color}
            distort={distort}
            speed={2}
            roughness={0.4}
            metalness={0.8}
            envMapIntensity={1}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            roughness={0.4}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        )}
      </mesh>
    </Float>
  );
}

// Preset geometric compositions
export function GeometricComposition() {
  const performanceTier = useAppStore((state) => state.performanceTier);

  return (
    <group>
      {/* Main central shape */}
      <GeometricShape
        type="icosahedron"
        position={[0, 0, 0]}
        scale={1.5}
        color={COLORS.accent.gold}
        speed={0.5}
        floatIntensity={0.5}
      />

      {/* Surrounding shapes - reduced on lower performance */}
      {performanceTier !== 'low' && (
        <>
          <GeometricShape
            type="octahedron"
            position={[-3, 1, -1]}
            scale={0.5}
            color={COLORS.accent.goldLight}
            speed={0.8}
          />
          <GeometricShape
            type="dodecahedron"
            position={[3, -0.5, -2]}
            scale={0.4}
            color={COLORS.accent.gold}
            speed={0.6}
          />
        </>
      )}

      {performanceTier === 'high' && (
        <>
          <GeometricShape
            type="torus"
            position={[-2, -1.5, 0]}
            scale={0.3}
            color={COLORS.accent.gold}
            speed={1}
          />
          <GeometricShape
            type="torusKnot"
            position={[2, 2, -1]}
            scale={0.25}
            color={COLORS.accent.goldLight}
            speed={0.7}
          />
        </>
      )}
    </group>
  );
}
