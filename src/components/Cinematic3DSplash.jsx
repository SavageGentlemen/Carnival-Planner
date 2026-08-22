import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ─── CARNIVAL FEATHER ─────────────────────────────────────────────
// A long curved plume shape built from a tapered cylinder + bend
function CarnivalFeather({ position, color, scale = 1 }) {
  const ref = useRef();
  const speed = useMemo(() => 0.3 + Math.random() * 0.4, []);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * speed + phase) * 0.3;
      ref.current.rotation.x = Math.cos(state.clock.getElapsedTime() * speed * 0.7 + phase) * 0.15;
    }
  });

  // Feather = tapered cylinder (spine) + flat elongated planes (barbs)
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <group ref={ref} position={position} scale={scale}>
        {/* Feather Spine (rachis) */}
        <mesh rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.015, 0.04, 2.8, 8]} />
          <meshPhysicalMaterial
            color="#f5f0e8"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>

        {/* Feather Vane (barbs) — multiple angled planes */}
        {[...Array(12)].map((_, i) => {
          const yPos = -1.2 + i * 0.22;
          const width = 0.15 + Math.sin((i / 11) * Math.PI) * 0.45;
          const side = i % 2 === 0 ? 1 : -1;
          return (
            <mesh
              key={i}
              position={[side * width * 0.5, yPos, 0]}
              rotation={[0, 0, side * 0.25]}
            >
              <planeGeometry args={[width, 0.18]} />
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                roughness={0.4}
                metalness={0.2}
                side={THREE.DoubleSide}
                transparent
                opacity={0.85}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

// ─── CARNIVAL MASK ────────────────────────────────────────────────
// Eye mask shape built from a wide torus + eye holes
function CarnivalMask({ position, color, scale = 1 }) {
  const ref = useRef();
  const speed = useMemo(() => 0.2 + Math.random() * 0.3, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={2.5}>
      <group ref={ref} position={position} scale={scale}>
        {/* Mask body — wide flat elliptical shape */}
        <mesh>
          <torusGeometry args={[0.9, 0.25, 8, 32]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Left eye cutout decoration */}
        <mesh position={[-0.4, 0, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#000" emissive="#111" />
        </mesh>
        {/* Right eye cutout decoration */}
        <mesh position={[0.4, 0, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#000" emissive="#111" />
        </mesh>
        {/* Decorative stick handle */}
        <mesh position={[1.1, -0.3, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
          <meshStandardMaterial color="#d4a574" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── DRINK CUP (Solo / Party Cup) ────────────────────────────────
function DrinkCup({ position, color, scale = 1 }) {
  const ref = useRef();
  const wobble = useMemo(() => 0.4 + Math.random() * 0.5, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * wobble) * 0.2;
      ref.current.rotation.z = Math.cos(state.clock.getElapsedTime() * wobble * 0.8) * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
      <group ref={ref} position={position} scale={scale}>
        {/* Cup body — tapered cylinder */}
        <mesh>
          <cylinderGeometry args={[0.35, 0.25, 0.9, 16, 1, true]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.15}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Cup bottom */}
        <mesh position={[0, -0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.25, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Liquid inside */}
        <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.32, 16]} />
          <meshPhysicalMaterial
            color="#ff6b35"
            emissive="#ff4500"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.0}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Straw */}
        <mesh position={[0.15, 0.45, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 6]} />
          <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── STEELPAN DRUM ────────────────────────────────────────────────
function SteelPan({ position, scale = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={1.5}>
      <group ref={ref} position={position} scale={scale}>
        {/* Drum body */}
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 0.35, 24]} />
          <meshPhysicalMaterial
            color="#c0c0c0"
            roughness={0.15}
            metalness={0.95}
            clearcoat={0.8}
            clearcoatRoughness={0.05}
          />
        </mesh>
        {/* Playing surface — slightly concave look with darker inner */}
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.02, 24]} />
          <meshPhysicalMaterial
            color="#8a8a8a"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Note circles on surface */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const r = 0.35;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0.2, Math.sin(angle) * r]}>
              <ringGeometry args={[0.06, 0.1, 16]} />
              <meshStandardMaterial
                color="#555"
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

// ─── MARDI GRAS BEADS ────────────────────────────────────────────
function BeadString({ position, color, scale = 1 }) {
  const ref = useRef();
  const speed = useMemo(() => 0.5 + Math.random() * 0.4, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * speed) * 0.4;
    }
  });

  const beadCount = 10;
  return (
    <Float speed={1.3} rotationIntensity={1.2} floatIntensity={2}>
      <group ref={ref} position={position} scale={scale}>
        {[...Array(beadCount)].map((_, i) => {
          const angle = (i / beadCount) * Math.PI;
          const x = Math.cos(angle) * 0.8;
          const y = Math.sin(angle) * 0.5 - 0.3;
          return (
            <mesh key={i} position={[x, y, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                roughness={0.05}
                metalness={0.9}
                clearcoat={1}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

// ─── CONFETTI PIECE ───────────────────────────────────────────────
function ConfettiPiece({ position, color, scale = 1 }) {
  const ref = useRef();
  const speed = useMemo(() => 1 + Math.random() * 2, []);
  const axis = useMemo(() => Math.random() > 0.5 ? 'x' : 'z', []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation[axis] = state.clock.getElapsedTime() * speed;
      ref.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={3} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={scale}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// ─── MAIN SCENE ───────────────────────────────────────────────────
function CarnivalScene() {
  // Deterministic positions via useMemo so objects don't jump on re-render
  const confettiData = useMemo(() =>
    [...Array(45)].map(() => ({
      pos: [(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10],
      color: ['#00e5cc', '#06b6d4', '#ec4899', '#f59e0b', '#a855f7', '#10b981', '#fbbf24'][Math.floor(Math.random() * 7)],
      scale: 0.5 + Math.random() * 1.2
    })), []);

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00e5cc" />
      <pointLight position={[-10, -6, -8]} intensity={1.8} color="#ec4899" />
      <pointLight position={[0, 8, -6]} intensity={1.5} color="#f59e0b" />
      <directionalLight position={[0, 6, 6]} intensity={1} color="#ffffff" />

      {/* ── CARNIVAL FEATHERS (scattered) ── */}
      <CarnivalFeather position={[-5, 3.2, -2]} color="#00e5cc" scale={1.25} />
      <CarnivalFeather position={[5.2, 2.2, -3]} color="#ec4899" scale={1.1} />
      <CarnivalFeather position={[-2.2, -3.2, -1]} color="#f59e0b" scale={0.95} />
      <CarnivalFeather position={[3.8, -2.2, -4]} color="#a855f7" scale={1.15} />
      <CarnivalFeather position={[0, 4.5, -5]} color="#06b6d4" scale={0.85} />
      <CarnivalFeather position={[-5.5, 0.5, -3]} color="#f43f5e" scale={1.05} />

      {/* ── CARNIVAL MASKS ── */}
      <CarnivalMask position={[4.2, 1.2, -2]} color="#f59e0b" scale={0.75} />
      <CarnivalMask position={[-3.2, -1.8, -3]} color="#ec4899" scale={0.65} />

      {/* ── DRINK CUPS ── */}
      <DrinkCup position={[-5.8, -2.6, -1]} color="#00e5cc" scale={0.8} />
      <DrinkCup position={[5.8, -1.2, -2]} color="#3b82f6" scale={0.7} />
      <DrinkCup position={[1.2, -4.2, -3]} color="#10b981" scale={0.65} />

      {/* ── STEELPAN ── */}
      <SteelPan position={[0, -1.6, -4]} scale={0.65} />

      {/* ── BEAD STRINGS ── */}
      <BeadString position={[-3.2, 2.8, -1]} color="#f59e0b" scale={1.2} />
      <BeadString position={[4.2, 3.2, -2]} color="#ec4899" scale={1} />
      <BeadString position={[2.2, -3.8, -2]} color="#a855f7" scale={0.9} />
      <BeadString position={[-5.2, -0.6, -3]} color="#00e5cc" scale={0.8} />

      {/* ── CONFETTI ── */}
      {confettiData.map((c, i) => (
        <ConfettiPiece key={i} position={c.pos} color={c.color} scale={c.scale} />
      ))}

      {/* ── THREEUI SPARKLE DUST & NEON MOTE PARTICLES ── */}
      <Sparkles count={120} scale={16} size={3} speed={0.4} opacity={0.75} color="#00e5cc" />
      <Sparkles count={80} scale={14} size={2} speed={0.6} opacity={0.6} color="#ec4899" />
      <Sparkles count={60} scale={12} size={2.5} speed={0.3} opacity={0.5} color="#fbbf24" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 + 0.15}
        minPolarAngle={Math.PI / 2 - 0.3}
      />
    </>
  );
}

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn("WebGL 3D Canvas initialization warning:", error);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function checkWebGLSupport() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export default function Cinematic3DSplash() {
  const [hasWebGL, setHasWebGL] = React.useState(true);

  React.useEffect(() => {
    setHasWebGL(checkWebGLSupport());
  }, []);

  if (!hasWebGL) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ pointerEvents: 'none' }}>
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 9], fov: 55 }}
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.25]}
        >
          <CarnivalScene />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}


