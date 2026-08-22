import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ─── 3D FEATHER WING BACKPACK MODEL ──────────────────────────────
function WingBackpack({ color = '#ec4899', accentColor = '#00e5cc', autoRotate = true }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Central Harness Backpack Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 16]} />
        <meshPhysicalMaterial
          color="#1e1e24"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Glowing Energy Core */}
      <mesh position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Left Wing Plumes (Arched Feathers) */}
      {[-1, 1].map((side) => (
        <group key={side} scale={[side, 1, 1]}>
          {[...Array(6)].map((_, i) => {
            const angle = (i / 5) * 1.4 - 0.2;
            const length = 1.6 + (1 - Math.abs(i - 2.5) / 2.5) * 0.9;
            return (
              <group
                key={i}
                position={[0.2, 0.1 + i * 0.12, -0.05]}
                rotation={[0, 0.2, angle]}
              >
                {/* Feather Stem */}
                <mesh position={[length * 0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.015, 0.03, length, 8]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Feather Plume Blade */}
                <mesh position={[length * 0.5, 0.08, 0]}>
                  <planeGeometry args={[length * 0.9, 0.3]} />
                  <meshPhysicalMaterial
                    color={i % 2 === 0 ? color : accentColor}
                    emissive={i % 2 === 0 ? color : accentColor}
                    emissiveIntensity={0.6}
                    roughness={0.3}
                    metalness={0.2}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.9}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// ─── 3D CARNIVAL TIARA / CROWN ────────────────────────────────────
function CarnivalTiara({ color = '#f59e0b', gemColor = '#00e5cc' }) {
  return (
    <group position={[0, 0.3, 0]}>
      {/* Crown Arch */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.06, 16, 48, Math.PI * 1.2]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.95}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>
      {/* Crown Spikes & Jewels */}
      {[...Array(7)].map((_, i) => {
        const theta = ((i - 3) / 3) * 0.9;
        const x = Math.sin(theta) * 0.7;
        const y = Math.cos(theta) * 0.35 + 0.1;
        const height = 0.3 + (1 - Math.abs(i - 3) / 3) * 0.35;
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, -theta * 0.8]}>
            <mesh position={[0, height * 0.5, 0]}>
              <coneGeometry args={[0.05, height, 8]} />
              <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, height * 0.85, 0.04]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial
                color={gemColor}
                emissive={gemColor}
                emissiveIntensity={2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ─── 3D CARNIVAL MASK ─────────────────────────────────────────────
function MasqueradeMask({ color = '#06b6d4', accent = '#f59e0b' }) {
  return (
    <group position={[0, 0.3, 0]}>
      <mesh>
        <torusGeometry args={[0.75, 0.22, 16, 32]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1}
        />
      </mesh>
      {/* Left Eye Cutout */}
      <mesh position={[-0.35, 0, 0.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Right Eye Cutout */}
      <mesh position={[0.35, 0, 0.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Gold Feather Crest on Mask */}
      {[...Array(5)].map((_, i) => {
        const angle = ((i - 2) / 2) * 0.5;
        return (
          <mesh
            key={i}
            position={[0, 0.35 + i * 0.04, 0]}
            rotation={[0, 0, angle]}
          >
            <coneGeometry args={[0.04, 0.45, 8]} />
            <meshPhysicalMaterial color={accent} metalness={0.9} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── STUDIO PEDESTAL TURNTABLE ─────────────────────────────────────
function StudioPedestal({ color = '#00e5cc' }) {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Cylindrical Stage Base */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.3, 48]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.3}
          metalness={0.8}
          clearcoat={0.5}
        />
      </mesh>

      {/* Glowing Neon Ring Border */}
      <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.48, 0.03, 16, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
        />
      </mesh>

      {/* Reflective Stage Top Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.45, 48]} />
        <meshPhysicalMaterial
          color="#080c14"
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ─── MAIN 3D COSTUME STAGE COMPONENT ──────────────────────────────
export default function CostumeStage3D({
  itemType = 'wings', // 'wings' | 'tiara' | 'mask'
  color = '#ec4899',
  accentColor = '#00e5cc',
  title = 'Frontline Showpiece 3D',
  price = '$1,250',
  className = 'w-full h-80 rounded-2xl overflow-hidden relative'
}) {
  const [activeProp, setActiveProp] = useState(itemType);

  return (
    <div className={`bg-gradient-to-b from-slate-900 via-gray-950 to-black border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] ${className}`}>
      {/* Stage Header Info */}
      <div className="absolute top-3 left-4 z-10 pointer-events-none">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
          3D Interactive Studio
        </span>
        <h4 className="text-sm font-bold text-white mt-1 drop-shadow">{title}</h4>
        {price && <p className="text-xs text-amber-400 font-semibold">{price}</p>}
      </div>

      {/* Prop Switcher Pill Controls */}
      <div className="absolute top-3 right-3 z-10 flex gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/10">
        {[
          { id: 'wings', label: 'Wings 🪽' },
          { id: 'mask', label: 'Mask 🎭' },
          { id: 'tiara', label: 'Tiara 👑' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveProp(item.id)}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              activeProp === item.id
                ? 'bg-cyan-500 text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Interactive 3D Canvas with Suspense Fallback */}
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center flex-col gap-2 text-cyan-400">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold tracking-wider uppercase">Loading 3D Studio...</span>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 1.2, 3.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          {/* Studio Three-Point Lighting */}
          <ambientLight intensity={0.6} />
          <spotLight position={[5, 6, 4]} intensity={1.8} angle={0.4} penumbra={0.6} color="#ffffff" />
          <pointLight position={[-4, 3, -3]} intensity={1.2} color={accentColor} />
          <pointLight position={[3, -1, 2]} intensity={0.8} color={color} />

          {/* Ambient Floating Sparkles */}
          <Sparkles count={40} scale={4} size={2.5} speed={0.4} opacity={0.6} color={accentColor} />

          {/* Studio Pedestal */}
          <StudioPedestal color={accentColor} />

          {/* Floating 3D Props */}
          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
            {activeProp === 'wings' && <WingBackpack color={color} accentColor={accentColor} />}
            {activeProp === 'mask' && <MasqueradeMask color={accentColor} accent={color} />}
            {activeProp === 'tiara' && <CarnivalTiara color={color} gemColor={accentColor} />}
          </Float>

          {/* Orbit Drag & Pinch Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={1.8}
            maxDistance={5.5}
            maxPolarAngle={Math.PI / 2 + 0.05}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>

      {/* Rotation Hint */}
      <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none z-10">
        <span className="text-[10px] text-gray-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
          Drag to rotate • Scroll to zoom
        </span>
      </div>
    </div>
  );
}
