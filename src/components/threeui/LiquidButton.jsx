import React from 'react';
import { motion } from 'framer-motion';

/**
 * ThreeUI-inspired Liquid Glow CTA Button
 * Features:
 * - Animated rotating liquid neon border
 * - Shimmer sweep reflection on hover
 * - Haptic spring physics on click
 * - Supports presets: 'cyan', 'sunset', 'gold', 'purple', 'glass'
 */
export default function LiquidButton({
  children,
  onClick,
  variant = 'cyan', // 'cyan' | 'sunset' | 'gold' | 'purple' | 'glass'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  icon: Icon,
  disabled = false,
  loading = false,
  className = '',
  type = 'button'
}) {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm font-bold rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base font-extrabold rounded-2xl gap-2.5',
    xl: 'px-9 py-4.5 text-lg font-black rounded-3xl gap-3'
  };

  const variantGradients = {
    cyan: {
      bg: 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600',
      borderGlow: 'from-teal-400 via-cyan-300 to-emerald-400',
      shadow: 'shadow-[0_0_25px_rgba(6,182,212,0.45)]',
      hoverShadow: 'hover:shadow-[0_0_35px_rgba(20,184,166,0.7)]',
      textColor: 'text-white'
    },
    sunset: {
      bg: 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500',
      borderGlow: 'from-pink-400 via-rose-300 to-amber-300',
      shadow: 'shadow-[0_0_25px_rgba(244,63,94,0.45)]',
      hoverShadow: 'hover:shadow-[0_0_35px_rgba(236,72,153,0.7)]',
      textColor: 'text-white'
    },
    gold: {
      bg: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500',
      borderGlow: 'from-amber-300 via-yellow-200 to-amber-400',
      shadow: 'shadow-[0_0_25px_rgba(245,158,11,0.45)]',
      hoverShadow: 'hover:shadow-[0_0_35px_rgba(250,204,21,0.75)]',
      textColor: 'text-gray-950 font-black'
    },
    purple: {
      bg: 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600',
      borderGlow: 'from-purple-400 via-fuchsia-300 to-indigo-400',
      shadow: 'shadow-[0_0_25px_rgba(147,51,234,0.45)]',
      hoverShadow: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]',
      textColor: 'text-white'
    },
    glass: {
      bg: 'bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10',
      borderGlow: 'from-white/40 via-cyan-300/40 to-white/40',
      shadow: 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
      hoverShadow: 'hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]',
      textColor: 'text-white'
    }
  };

  const currentVariant = variantGradients[variant] || variantGradients.cyan;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -1.5 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 ${sizeStyles[size]} ${currentVariant.shadow} ${currentVariant.hoverShadow} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {/* Animated Liquid Border Ring */}
      <div 
        className={`absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r ${currentVariant.borderGlow} opacity-75 blur-[2px] group-hover:opacity-100 group-hover:blur-[3px] transition-all duration-300 animate-pulse`}
      />

      {/* Button Background Body */}
      <div className={`relative w-full h-full rounded-[inherit] ${currentVariant.bg} flex items-center justify-center gap-2 px-inherit py-inherit z-10`}>
        {/* Shimmer Sweep Animation on Hover */}
        <div 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"
        />

        {/* Loading Spinner or Icon */}
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          Icon && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 duration-200" />
        )}

        {/* Label */}
        <span className={`relative z-10 tracking-wide ${currentVariant.textColor}`}>
          {children}
        </span>
      </div>
    </motion.button>
  );
}
