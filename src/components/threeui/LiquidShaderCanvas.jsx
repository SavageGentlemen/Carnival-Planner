import React, { useRef, useMemo, useEffect } from 'react';

/**
 * ThreeUI-inspired Liquid Shader Canvas
 * Lightweight, GPU-accelerated 60fps WebGL fluid wave shader.
 * Reacts to mouse coordinates and creates fluid organic gradients.
 */
export default function LiquidShaderCanvas({
  className = 'w-full h-full absolute inset-0 -z-10 pointer-events-none',
  speed = 0.0015,
  colorScheme = 'carnival' // 'carnival' | 'electric' | 'sunset'
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    let animationFrameId;
    let startTime = Date.now();
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / rect.width;
      mouse.targetY = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader (Procedural Fluid Waves)
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform int u_scheme;

      // Simplex noise / sine wave harmonics
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec2 p = st * 2.0 - vec2(1.0);
        float d = length(p);

        // Fluid distortion
        float wave1 = sin(p.x * 3.0 + u_time * 0.8 + u_mouse.x * 2.0) * 0.5;
        float wave2 = cos(p.y * 3.5 - u_time * 0.6 + u_mouse.y * 2.0) * 0.5;
        float combined = sin(wave1 + wave2 + d * 4.0 - u_time);

        // Color palettes
        vec3 col1 = vec3(0.0, 0.9, 0.8);   // Teal
        vec3 col2 = vec3(0.92, 0.28, 0.6); // Pink / Magenta
        vec3 col3 = vec3(0.96, 0.62, 0.04);// Gold
        vec3 dark = vec3(0.03, 0.05, 0.08);// Dark base

        if (u_scheme == 1) { // Electric
          col1 = vec3(0.0, 0.95, 1.0);
          col2 = vec3(0.44, 0.0, 1.0);
          col3 = vec3(0.0, 1.0, 0.4);
        } else if (u_scheme == 2) { // Sunset
          col1 = vec3(1.0, 0.25, 0.4);
          col2 = vec3(0.98, 0.57, 0.1);
          col3 = vec3(0.66, 0.33, 0.97);
        }

        vec3 color = mix(dark, col1, clamp(combined * 0.4 + 0.1, 0.0, 1.0));
        color = mix(color, col2, clamp(sin(p.x * 2.0 - u_time * 0.5) * 0.35 + 0.15, 0.0, 1.0));
        color = mix(color, col3, clamp((1.0 - d) * 0.25, 0.0, 1.0));

        // Subtle vignette
        color *= smoothstep(1.8, 0.2, d);

        gl_FragColor = vec4(color, 0.85);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const schemeLoc = gl.getUniformLocation(program, 'u_scheme');

    const schemeId = colorScheme === 'electric' ? 1 : colorScheme === 'sunset' ? 2 : 0;
    gl.uniform1i(schemeLoc, schemeId);

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = () => {
      resize();
      const elapsed = (Date.now() - startTime) * speed;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, [speed, colorScheme]);

  return <canvas ref={canvasRef} className={className} />;
}
