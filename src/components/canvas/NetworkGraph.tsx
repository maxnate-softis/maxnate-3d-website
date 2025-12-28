// =============================================================================
// NETWORK GRAPH COMPONENT
// 3D neural network visualization representing interconnected technology
// =============================================================================

'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/stores/useAppStore';
import { COLORS } from '@/lib/constants';

interface NetworkNode {
  position: THREE.Vector3;
  connections: number[];
  velocity: THREE.Vector3;
  basePosition: THREE.Vector3;
}

interface NetworkGraphProps {
  nodeCount?: number;
  radius?: number;
  connectionDistance?: number;
}

export function NetworkGraph({
  nodeCount = 50,
  radius = 4,
  connectionDistance = 2,
}: NetworkGraphProps) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const performanceTier = useAppStore((state) => state.performanceTier);
  const [hovered, setHovered] = useState(false);

  // Adjust node count based on performance
  const adjustedNodeCount = useMemo(() => {
    if (performanceTier === 'low') return Math.floor(nodeCount * 0.4);
    if (performanceTier === 'medium') return Math.floor(nodeCount * 0.7);
    return nodeCount;
  }, [nodeCount, performanceTier]);

  // Generate network nodes
  const nodes = useMemo<NetworkNode[]>(() => {
    const tempNodes: NetworkNode[] = [];

    for (let i = 0; i < adjustedNodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);

      const position = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      tempNodes.push({
        position: position.clone(),
        basePosition: position.clone(),
        connections: [],
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
      });
    }

    // Find connections between nearby nodes
    for (let i = 0; i < tempNodes.length; i++) {
      for (let j = i + 1; j < tempNodes.length; j++) {
        const dist = tempNodes[i].position.distanceTo(tempNodes[j].position);
        if (dist < connectionDistance) {
          tempNodes[i].connections.push(j);
          tempNodes[j].connections.push(i);
        }
      }
    }

    return tempNodes;
  }, [adjustedNodeCount, radius, connectionDistance]);

  // Create sphere instances for nodes
  const nodePositions = useMemo(() => {
    return nodes.map((node) => node.position.toArray());
  }, [nodes]);

  // Create line geometry for connections
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const goldColor = new THREE.Color(COLORS.accent.gold);
    const navyColor = new THREE.Color(COLORS.primary.navyLight);

    nodes.forEach((node, i) => {
      node.connections.forEach((connectionIndex) => {
        if (connectionIndex > i) {
          positions.push(
            node.position.x,
            node.position.y,
            node.position.z,
            nodes[connectionIndex].position.x,
            nodes[connectionIndex].position.y,
            nodes[connectionIndex].position.z
          );
          // Gradient color based on position
          colors.push(
            goldColor.r,
            goldColor.g,
            goldColor.b,
            navyColor.r,
            navyColor.g,
            navyColor.b
          );
        }
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );
    return geometry;
  }, [nodes]);

  // Animate network
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Rotate the entire group
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Scale on hover
    const targetScale = hovered ? 1.1 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Update line positions if nodes move (performance intensive)
    if (linesRef.current && performanceTier === 'high') {
      const positions = linesRef.current.geometry.attributes.position
        .array as Float32Array;
      let posIndex = 0;

      nodes.forEach((node, i) => {
        // Gentle floating animation for each node
        node.position.x =
          node.basePosition.x + Math.sin(time + i) * 0.1;
        node.position.y =
          node.basePosition.y + Math.cos(time * 0.8 + i * 0.5) * 0.1;
        node.position.z =
          node.basePosition.z + Math.sin(time * 0.6 + i * 0.3) * 0.1;

        node.connections.forEach((connectionIndex) => {
          if (connectionIndex > i) {
            positions[posIndex++] = node.position.x;
            positions[posIndex++] = node.position.y;
            positions[posIndex++] = node.position.z;
            positions[posIndex++] = nodes[connectionIndex].position.x;
            positions[posIndex++] = nodes[connectionIndex].position.y;
            positions[posIndex++] = nodes[connectionIndex].position.z;
          }
        });
      });

      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          linewidth={1}
        />
      </lineSegments>

      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={COLORS.accent.gold}
            emissive={COLORS.accent.gold}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Ambient light for nodes */}
      <pointLight
        position={[0, 0, 0]}
        color={COLORS.accent.gold}
        intensity={0.5}
        distance={radius * 2}
      />
    </group>
  );
}
