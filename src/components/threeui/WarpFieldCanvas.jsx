import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── PARTICLE VORTEX / WARP FIELD ─────────────────────────────────
function Particles({ count = 1200, speed = 0.8, colorMode = 'caribbean', mouseRef }) {
  const pointsRef = useRef();
  
  // Color palette definitions
  const palettes = useMemo(() => ({
    caribbean: ['#00e5cc', '#06b6d4', '#ec4899', '#f59e0b', '#8b5cf6'],
    sunset: ['#f43f5e', '#fb923c', '#facc15', '#a855f7'],
    neonNight: ['#00f0ff', '#ff007f', '#7000ff', '#00ff66'],
    goldVip: ['#f59e0b', '#fbbf24', '#fef08a', '#d97706']
  }), []);

  const [positions, colors, scales, speeds, originalZ] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spd = new Float32Array(count);
    const origZ = new Float32Array(count);
    
    const palette = palettes[colorMode] || palettes.caribbean;
    const threeColors = palette.map(c => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      // Cylinder / tunnel distribution
      const radius = 2 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 50;

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(theta);
      pos[i * 3 + 2] = z;
      origZ[i] = z;

      const chosenColor = threeColors[Math.floor(Math.random() * threeColors.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      sca[i] = 0.6 + Math.random() * 2.2;
      spd[i] = 0.5 + Math.random() * 1.5;
    }

    return [pos, col, sca, spd, origZ];
  }, [count, colorMode, palettes]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;
    const posArray = posAttr.array;
    const time = state.clock.getElapsedTime();

    // Mouse parallax target
    const mx = mouseRef?.current?.x || 0;
    const my = mouseRef?.current?.y || 0;

    pointsRef.current.rotation.z = time * 0.05 * speed;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, my * 0.15, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mx * 0.15, 0.05);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Move particles along Z axis toward camera
      posArray[idx + 2] += delta * 12 * speeds[i] * speed;

      // Wrap around tunnel
      if (posArray[idx + 2] > 20) {
        posArray[idx + 2] = -30;
      }

      // Subtle spiral breathing
      const angle = time * 0.2 * speeds[i];
      const origX = positions[idx];
      const origY = positions[idx + 1];
      posArray[idx] = origX + Math.sin(angle + i) * 0.3;
      posArray[idx + 1] = origY + Math.cos(angle + i) * 0.3;
    }

    posAttr.needsUpdate = true;
  });

  // Circular blurred glow texture for particles
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.28}
        map={particleTexture}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ─── AMBIENT GLOWING RINGS ─────────────────────────────────────────
function NeonRings() {
  const ringGroup = useRef();

  useFrame((state) => {
    if (ringGroup.current) {
      ringGroup.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={ringGroup}>
      <mesh position={[0, 0, -10]}>
        <torusGeometry args={[8, 0.03, 16, 64]} />
        <meshBasicMaterial color="#00e5cc" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh position={[0, 0, -20]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[12, 0.04, 16, 64]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.25} wireframe />
      </mesh>
      <mesh position={[0, 0, -30]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[16, 0.05, 16, 64]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  );
}

// ─── EXPORTED WRAPPER CANVAS ──────────────────────────────────────
export default function WarpFieldCanvas({
  count = 1000,
  speed = 0.8,
  colorMode = 'caribbean',
  showRings = true,
  className = 'w-full h-full absolute inset-0 -z-10 pointer-events-none'
}) {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseRef.current = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: -(e.clientY / innerHeight) * 2 + 1
    };
  };

  return (
    <div 
      className={className}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 65, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#080c14']} />
        <fog attach="fog" args={['#080c14', 15, 45]} />
        {showRings && <NeonRings />}
        <Particles count={count} speed={speed} colorMode={colorMode} mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
