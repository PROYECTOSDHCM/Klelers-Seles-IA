import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// --- Particle System that reacts to mouse ---
const Particles = ({ count = 3000, accentCount = 500 }) => {
  const mesh = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    // White particles
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 10 - 5;
      temp.push(x, y, z);
    }
    // Orange/Accent particles
    for (let i = 0; i < accentCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10 - 2;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count, accentCount]);

  const colors = useMemo(() => {
    const temp = [];
    const colorWhite = new THREE.Color('#FFFFFF');
    const colorOrange = new THREE.Color('#FF4B00');

    for (let i = 0; i < count; i++) {
      temp.push(colorWhite.r, colorWhite.g, colorWhite.b);
    }
    for (let i = 0; i < accentCount; i++) {
      temp.push(colorOrange.r, colorOrange.g, colorOrange.b);
    }
    return new Float32Array(temp);
  }, [count, accentCount]);

  // Store original positions to allow "return to home" effect
  const originalPositions = useMemo(() => particles.slice(), [particles]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;

    // Mouse position in 3D space (approximate projection)
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < (count + accentCount); i++) {
      const i3 = i * 3;

      // Perlin-ish flow (Sine waves)
      const x = originalPositions[i3];
      const y = originalPositions[i3 + 1];
      const z = originalPositions[i3 + 2];

      // Flow movement
      positions[i3] = x + Math.sin(time * 0.1 + y) * 0.5;
      positions[i3 + 1] = y + Math.cos(time * 0.1 + x) * 0.5;

      // Mouse attraction
      const dx = mouseX - positions[i3];
      const dy = mouseY - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 8) { // Attraction radius
        const force = (8 - dist) * 0.02;
        positions[i3] += dx * force;
        positions[i3 + 1] += dy * force;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Parallax rotation
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * 0.1, 0.1);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.1, 0.1);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};
export const Background3D = () => {
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 800 : 3000;
  const accentParticleCount = isMobile ? 150 : 500;

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#FF4B00" />

        <Particles count={particleCount} accentCount={accentParticleCount} />
        <Environment preset="city" />
      </Canvas>
      {/* Overlay gradient to fade bottom into content if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
};