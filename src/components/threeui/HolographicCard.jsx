import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * ThreeUI-inspired Holographic 3D Tilt Card (GPU Accelerated)
 * Features:
 * - Real-time 3D spring tilt physics tracking cursor
 * - Zero React re-render cursor glare & holographic foil via CSS variables
 * - 120fps hardware acceleration
 * - Customizable rarity tiers (Bronze, Silver, Gold, Platinum, Legendary, Epic, Rare)
 */
export default function HolographicCard({
  children,
  className = '',
  tier = 'GOLD',
  enableGlare = true,
  enableHoloFoil = true,
  maxTilt = 12,
  scaleOnHover = 1.02,
  onClick
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Buttery smooth spring physics
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    // Direct CSS variable updates for 120fps without React re-renders
    const glareX = ((mouseX / width) * 100).toFixed(1);
    const glareY = ((mouseY / height) * 100).toFixed(1);
    const angle = ((Math.atan2(mouseY - height / 2, mouseX - width / 2) * (180 / Math.PI) + 90) % 360).toFixed(1);

    cardRef.current.style.setProperty('--glare-x', `${glareX}%`);
    cardRef.current.style.setProperty('--glare-y', `${glareY}%`);
    cardRef.current.style.setProperty('--foil-angle', `${angle}deg`);
  }, [x, y]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--glare-opacity', '0.6');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--glare-opacity', '0');
    }
  };

  // Tier-specific glow styling
  const tierGlows = {
    BRONZE: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] border-amber-500/40',
    SILVER: 'hover:shadow-[0_0_25px_rgba(203,213,225,0.25)] border-slate-300/40',
    GOLD: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] border-yellow-400/50',
    PLATINUM: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] border-purple-400/50',
    LEGENDARY: 'hover:shadow-[0_0_40px_rgba(250,204,21,0.5)] border-yellow-300/70',
    EPIC: 'hover:shadow-[0_0_35px_rgba(236,72,153,0.45)] border-pink-400/60',
    RARE: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] border-cyan-400/50'
  };

  const currentTierGlow = tierGlows[tier.toUpperCase()] || tierGlows.GOLD;

  return (
    <div style={{ perspective: '1000px' }} className="inline-block w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          '--glare-x': '50%',
          '--glare-y': '50%',
          '--glare-opacity': '0',
          '--foil-angle': '135deg',
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className={`relative rounded-3xl overflow-hidden cursor-pointer transition-shadow duration-300 border backdrop-blur-xl ${currentTierGlow} ${className}`}
      >
        {/* Child Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>

        {/* Holographic Iridescent Foil Refraction Layer */}
        {enableHoloFoil && (
          <div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 mix-blend-color-dodge"
            style={{
              opacity: isHovered ? 0.35 : 0.04,
              background: `linear-gradient(var(--foil-angle, 135deg), 
                rgba(255,0,128,0.4) 0%, 
                rgba(255,200,0,0.4) 25%, 
                rgba(0,255,200,0.4) 50%, 
                rgba(0,128,255,0.4) 75%, 
                rgba(255,0,255,0.4) 100%)`,
              backgroundSize: '200% 200%',
            }}
          />
        )}

        {/* Dynamic Specular Glare / Flash Light */}
        {enableGlare && (
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-150 mix-blend-overlay"
            style={{
              opacity: 'var(--glare-opacity, 0)',
              background: `radial-gradient(circle 240px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
            }}
          />
        )}

        {/* Neon Edge Highlight */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none z-40 border border-white/20 transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.85 : 0.2 }}
        />
      </motion.div>
    </div>
  );
}
