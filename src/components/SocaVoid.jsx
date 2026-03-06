import React, { useRef, useEffect, useCallback } from 'react';

/**
 * SOCA VOID — Immersive animated background engine
 * 
 * Features:
 * - Obsidian dark matter base with shifting ultraviolet/magenta nebula
 * - Microgravity (0.05G) particle physics with fluid dynamics
 * - Ethereal 3D carnival feathers with neon wireframes
 * - Iridescent gem-beads & holographic confetti
 * - Mouse repulsor field (200px radius)
 * - Click gravitational pull toward center
 * - Bioluminescent glow & ambient occlusion
 */

// ─── CONFIGURATION ───────────────────────────────────────────────
const CONFIG = {
    BG_COLOR: '#0F111A',
    GRAVITY: 0.05,
    VISCOSITY: 0.985,
    REPULSOR_RADIUS: 200,
    REPULSOR_STRENGTH: 3,
    GRAVITY_PULL_STRENGTH: 0.15,
    GRAVITY_PULL_DURATION: 800,
    PARTICLE_COUNT: {
        feathers: 18,
        gems: 25,
        confetti: 35,
        waves: 6,
    },
    NEBULA_SPEED: 0.0003,
};

// ─── COLOR PALETTES ──────────────────────────────────────────────
const NEON = {
    cyan: 'rgba(0, 255, 255,',
    magenta: 'rgba(255, 0, 200,',
    gold: 'rgba(255, 215, 0,',
    ultraviolet: 'rgba(138, 43, 226,',
    rose: 'rgba(255, 80, 150,',
};

// ─── UTILITY ─────────────────────────────────────────────────────
const rand = (min, max) => Math.random() * (max - min) + min;
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

// ─── FEATHER PARTICLE ────────────────────────────────────────────
function createFeather(w, h) {
    const colors = [NEON.cyan, NEON.magenta, NEON.gold];
    const color = colors[Math.floor(rand(0, colors.length))];
    return {
        type: 'feather',
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.3, 0.3),
        vy: rand(-0.2, 0.2),
        size: rand(25, 55),
        rotation: rand(0, Math.PI * 2),
        rotationSpeed: rand(-0.008, 0.008),
        rotationY: rand(0, Math.PI * 2),
        rotationYSpeed: rand(-0.006, 0.006),
        rotationZ: rand(0, Math.PI * 2),
        rotationZSpeed: rand(-0.004, 0.004),
        color,
        opacity: rand(0.15, 0.4),
        glowPulse: rand(0, Math.PI * 2),
        barbs: Math.floor(rand(8, 14)),
    };
}

// ─── GEM-BEAD PARTICLE ──────────────────────────────────────────
function createGem(w, h) {
    const hue = rand(0, 360);
    return {
        type: 'gem',
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.1, 0.1),
        size: rand(3, 8),
        rotation: rand(0, Math.PI * 2),
        rotationSpeed: rand(-0.02, 0.02),
        hue,
        opacity: rand(0.3, 0.7),
        facets: Math.floor(rand(5, 9)),
        glowPulse: rand(0, Math.PI * 2),
        iridescenceShift: rand(0, 360),
        iridescenceSpeed: rand(0.3, 1.2),
    };
}

// ─── CONFETTI PARTICLE ───────────────────────────────────────────
function createConfetti(w, h) {
    const hue = rand(0, 360);
    return {
        type: 'confetti',
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.2, 0.2),
        vy: rand(-0.15, 0.15),
        width: rand(4, 10),
        height: rand(2, 5),
        rotation: rand(0, Math.PI * 2),
        rotationSpeed: rand(-0.03, 0.03),
        flipAngle: rand(0, Math.PI * 2),
        flipSpeed: rand(0.01, 0.04),
        hue,
        opacity: rand(0.2, 0.55),
        holographic: Math.random() > 0.5,
    };
}

// ─── SOUNDWAVE PARTICLE ─────────────────────────────────────────
function createWave(w, h) {
    return {
        type: 'wave',
        x: rand(w * 0.1, w * 0.9),
        y: rand(h * 0.3, h * 0.7),
        amplitude: rand(15, 40),
        frequency: rand(0.01, 0.03),
        phase: rand(0, Math.PI * 2),
        phaseSpeed: rand(0.01, 0.025),
        length: rand(80, 200),
        opacity: rand(0.06, 0.15),
        color: [NEON.cyan, NEON.magenta, NEON.ultraviolet][Math.floor(rand(0, 3))],
        vx: rand(-0.05, 0.05),
        vy: rand(-0.03, 0.03),
    };
}

// ─── DRAW FUNCTIONS ──────────────────────────────────────────────

function drawFeather(ctx, p, time) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    // 3D foreshortening via rotationY
    const scaleX = Math.cos(p.rotationY) * 0.6 + 0.4;
    const scaleY = Math.cos(p.rotationZ) * 0.3 + 0.7;
    ctx.scale(scaleX, scaleY);

    const glowIntensity = Math.sin(p.glowPulse + time * 0.8) * 0.15 + 0.25;
    const baseOpacity = p.opacity + glowIntensity;

    // Bioluminescent glow
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 1.5);
    glow.addColorStop(0, `${p.color}${(baseOpacity * 0.3).toFixed(2)})`);
    glow.addColorStop(1, `${p.color}0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Central rachis (shaft)
    ctx.strokeStyle = `${p.color}${(baseOpacity * 0.9).toFixed(2)})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -p.size * 0.5);
    ctx.quadraticCurveTo(p.size * 0.05, 0, 0, p.size * 0.5);
    ctx.stroke();

    // Barbs — neon wireframe feather geometry
    ctx.lineWidth = 0.6;
    for (let i = 0; i < p.barbs; i++) {
        const t = i / p.barbs;
        const y = lerp(-p.size * 0.45, p.size * 0.4, t);
        const barbLen = p.size * 0.4 * Math.sin(t * Math.PI);
        const curve = Math.sin(t * Math.PI) * p.size * 0.08;

        ctx.strokeStyle = `${p.color}${(baseOpacity * (0.4 + t * 0.4)).toFixed(2)})`;

        // Left barb
        ctx.beginPath();
        ctx.moveTo(curve, y);
        ctx.quadraticCurveTo(-barbLen * 0.6, y - barbLen * 0.1, -barbLen, y + barbLen * 0.15);
        ctx.stroke();

        // Right barb
        ctx.beginPath();
        ctx.moveTo(curve, y);
        ctx.quadraticCurveTo(barbLen * 0.6, y - barbLen * 0.1, barbLen, y + barbLen * 0.15);
        ctx.stroke();
    }

    ctx.restore();
}

function drawGem(ctx, p, time) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    const iridHue = (p.hue + p.iridescenceShift + time * p.iridescenceSpeed) % 360;
    const glowPulse = Math.sin(p.glowPulse + time * 1.2) * 0.2 + 0.5;
    const alpha = p.opacity * glowPulse;

    // Outer glow
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3);
    glow.addColorStop(0, `hsla(${iridHue}, 100%, 70%, ${alpha * 0.4})`);
    glow.addColorStop(1, `hsla(${iridHue}, 100%, 50%, 0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, p.size * 3, 0, Math.PI * 2);
    ctx.fill();

    // Faceted gem body
    ctx.beginPath();
    for (let i = 0; i < p.facets; i++) {
        const angle = (i / p.facets) * Math.PI * 2;
        const r = p.size * (0.8 + Math.sin(angle * 3 + time * 0.5) * 0.2);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();

    const gemGrad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
    gemGrad.addColorStop(0, `hsla(${iridHue}, 90%, 65%, ${alpha})`);
    gemGrad.addColorStop(0.5, `hsla(${(iridHue + 60) % 360}, 90%, 75%, ${alpha * 0.8})`);
    gemGrad.addColorStop(1, `hsla(${(iridHue + 120) % 360}, 90%, 60%, ${alpha * 0.6})`);
    ctx.fillStyle = gemGrad;
    ctx.fill();

    ctx.strokeStyle = `hsla(${iridHue}, 100%, 80%, ${alpha * 0.7})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Specular highlight
    ctx.beginPath();
    ctx.arc(-p.size * 0.25, -p.size * 0.25, p.size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
    ctx.fill();

    ctx.restore();
}

function drawConfetti(ctx, p, time) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    // 3D flip effect
    const flipScale = Math.cos(p.flipAngle);
    ctx.scale(1, Math.abs(flipScale) * 0.7 + 0.3);

    const hue = p.holographic ? (p.hue + time * 30) % 360 : p.hue;
    const alpha = p.opacity * (Math.abs(flipScale) * 0.5 + 0.5);

    // Glow
    ctx.shadowColor = `hsla(${hue}, 100%, 60%, ${alpha * 0.5})`;
    ctx.shadowBlur = 8;

    ctx.fillStyle = `hsla(${hue}, 85%, 65%, ${alpha})`;
    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);

    // Holographic sheen
    if (p.holographic) {
        const sheen = ctx.createLinearGradient(-p.width / 2, 0, p.width / 2, 0);
        sheen.addColorStop(0, `hsla(${(hue + 90) % 360}, 100%, 80%, ${alpha * 0.3})`);
        sheen.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.2})`);
        sheen.addColorStop(1, `hsla(${(hue + 180) % 360}, 100%, 80%, ${alpha * 0.3})`);
        ctx.fillStyle = sheen;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
    }

    ctx.shadowBlur = 0;
    ctx.restore();
}

function drawWave(ctx, p, time) {
    ctx.save();
    ctx.translate(p.x, p.y);

    const pulseAlpha = Math.sin(time * 0.5 + p.phase) * 0.5 + 0.5;
    ctx.strokeStyle = `${p.color}${(p.opacity * pulseAlpha).toFixed(3)})`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';

    ctx.beginPath();
    for (let i = 0; i <= p.length; i++) {
        const x = i - p.length / 2;
        const envelope = Math.sin((i / p.length) * Math.PI);
        const y = Math.sin(i * p.frequency + p.phase + time * p.phaseSpeed * 60) * p.amplitude * envelope;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Glow line
    ctx.strokeStyle = `${p.color}${(p.opacity * pulseAlpha * 0.3).toFixed(3)})`;
    ctx.lineWidth = 4;
    ctx.filter = 'blur(3px)';
    ctx.beginPath();
    for (let i = 0; i <= p.length; i++) {
        const x = i - p.length / 2;
        const envelope = Math.sin((i / p.length) * Math.PI);
        const y = Math.sin(i * p.frequency + p.phase + time * p.phaseSpeed * 60) * p.amplitude * envelope;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.filter = 'none';

    ctx.restore();
}

// ─── NEBULA BACKGROUND ───────────────────────────────────────────
function drawNebula(ctx, w, h, time) {
    // Base
    ctx.fillStyle = CONFIG.BG_COLOR;
    ctx.fillRect(0, 0, w, h);

    // Nebula clouds — UV/Magenta shifting
    const clouds = [
        { x: w * 0.3, y: h * 0.4, r: w * 0.4, h1: 270, h2: 300, phase: 0 },
        { x: w * 0.7, y: h * 0.6, r: w * 0.35, h1: 280, h2: 320, phase: 2 },
        { x: w * 0.5, y: h * 0.2, r: w * 0.3, h1: 260, h2: 290, phase: 4 },
    ];

    clouds.forEach((c) => {
        const shift = Math.sin(time * CONFIG.NEBULA_SPEED * 60 + c.phase) * 0.5 + 0.5;
        const hue = lerp(c.h1, c.h2, shift);
        const cx = c.x + Math.sin(time * 0.0002 * 60 + c.phase) * 30;
        const cy = c.y + Math.cos(time * 0.00015 * 60 + c.phase) * 20;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, c.r);
        grad.addColorStop(0, `hsla(${hue}, 80%, 20%, 0.08)`);
        grad.addColorStop(0.5, `hsla(${hue}, 70%, 15%, 0.04)`);
        grad.addColorStop(1, `hsla(${hue}, 60%, 10%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    });
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────
export default function SocaVoid() {
    const canvasRef = useRef(null);
    const stateRef = useRef({
        particles: [],
        mouse: { x: -1000, y: -1000 },
        clicking: false,
        clickTime: 0,
        animId: null,
        time: 0,
    });

    // Initialize particles
    const initParticles = useCallback((w, h) => {
        const p = [];
        for (let i = 0; i < CONFIG.PARTICLE_COUNT.feathers; i++) p.push(createFeather(w, h));
        for (let i = 0; i < CONFIG.PARTICLE_COUNT.gems; i++) p.push(createGem(w, h));
        for (let i = 0; i < CONFIG.PARTICLE_COUNT.confetti; i++) p.push(createConfetti(w, h));
        for (let i = 0; i < CONFIG.PARTICLE_COUNT.waves; i++) p.push(createWave(w, h));
        stateRef.current.particles = p;
    }, []);

    // Physics update
    const updateParticle = useCallback((p, w, h, mouse, clicking, clickCenter, dt) => {
        // Microgravity drift
        p.vy += CONFIG.GRAVITY * 0.01 * dt;

        // Mouse repulsor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.max(dist(p.x, p.y, mouse.x, mouse.y), 1);
        if (d < CONFIG.REPULSOR_RADIUS) {
            const force = (1 - d / CONFIG.REPULSOR_RADIUS) * CONFIG.REPULSOR_STRENGTH * dt * 0.05;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
        }

        // Click gravity pull toward center
        if (clicking) {
            const cdx = clickCenter.x - p.x;
            const cdy = clickCenter.y - p.y;
            const cd = Math.max(dist(p.x, p.y, clickCenter.x, clickCenter.y), 1);
            const pullForce = CONFIG.GRAVITY_PULL_STRENGTH * dt * 0.05;
            p.vx += (cdx / cd) * pullForce;
            p.vy += (cdy / cd) * pullForce;
        }

        // Viscosity damping
        p.vx *= CONFIG.VISCOSITY;
        p.vy *= CONFIG.VISCOSITY;

        // Position update
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Rotation
        if (p.rotation !== undefined) p.rotation += (p.rotationSpeed || 0) * dt;
        if (p.rotationY !== undefined) p.rotationY += (p.rotationYSpeed || 0) * dt;
        if (p.rotationZ !== undefined) p.rotationZ += (p.rotationZSpeed || 0) * dt;
        if (p.flipAngle !== undefined) p.flipAngle += (p.flipSpeed || 0) * dt;
        if (p.phase !== undefined) p.phase += (p.phaseSpeed || 0) * dt;

        // Wrap around edges with padding
        const pad = 60;
        if (p.x < -pad) p.x = w + pad;
        if (p.x > w + pad) p.x = -pad;
        if (p.y < -pad) p.y = h + pad;
        if (p.y > h + pad) p.y = -pad;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const state = stateRef.current;

        // Size canvas to window
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (state.particles.length === 0) {
                initParticles(window.innerWidth, window.innerHeight);
            }
        };
        resize();
        window.addEventListener('resize', resize);

        // Mouse tracking
        const onMouseMove = (e) => {
            state.mouse = { x: e.clientX, y: e.clientY };
        };
        const onMouseDown = (e) => {
            state.clicking = true;
            state.clickTime = Date.now();
            state.clickCenter = { x: e.clientX, y: e.clientY };
        };
        const onMouseUp = () => {
            state.clicking = false;
        };
        const onTouchMove = (e) => {
            if (e.touches.length > 0) {
                state.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };
        const onTouchStart = (e) => {
            if (e.touches.length > 0) {
                state.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                state.clicking = true;
                state.clickTime = Date.now();
                state.clickCenter = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };
        const onTouchEnd = () => {
            state.clicking = false;
            state.mouse = { x: -1000, y: -1000 };
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd);

        // Animation loop
        let lastTime = performance.now();

        const animate = (now) => {
            const rawDt = now - lastTime;
            const dt = Math.min(rawDt / 16.67, 3); // Cap to prevent huge jumps
            lastTime = now;
            state.time += dt;

            const w = window.innerWidth;
            const h = window.innerHeight;

            // Auto-expire click gravity
            const clickActive = state.clicking && (Date.now() - state.clickTime < CONFIG.GRAVITY_PULL_DURATION);

            // Draw nebula background
            drawNebula(ctx, w, h, state.time);

            // Update & draw all particles (sorted by type for z-layering)
            const sorted = [...state.particles].sort((a, b) => {
                const order = { wave: 0, confetti: 1, gem: 2, feather: 3 };
                return (order[a.type] || 0) - (order[b.type] || 0);
            });

            sorted.forEach((p) => {
                updateParticle(p, w, h, state.mouse, clickActive, state.clickCenter || { x: w / 2, y: h / 2 }, dt);

                switch (p.type) {
                    case 'feather':
                        drawFeather(ctx, p, state.time);
                        break;
                    case 'gem':
                        drawGem(ctx, p, state.time);
                        break;
                    case 'confetti':
                        drawConfetti(ctx, p, state.time);
                        break;
                    case 'wave':
                        drawWave(ctx, p, state.time);
                        break;
                }
            });

            state.animId = requestAnimationFrame(animate);
        };

        state.animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(state.animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [initParticles, updateParticle]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
            aria-hidden="true"
        />
    );
}
