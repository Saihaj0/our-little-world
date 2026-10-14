"use client";

/**
 * Ambient background — blurred burgundy gradients plus a tiny canvas of
 * drifting particles (stars and the occasional heart).
 *
 * Performance + accessibility notes:
 * - The canvas caps particle count on small screens and pauses when the
 *   tab is hidden.
 * - Under prefers-reduced-motion the canvas is not started at all; the
 *   static gradient wash remains.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  heart: boolean;
  twinkle: number;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isSmall = window.innerWidth < 768;
    const count = isSmall ? 26 : 54;

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.00018,
      vy: -(Math.random() * 0.00022 + 0.00006),
      alpha: Math.random() * 0.5 + 0.25,
      heart: Math.random() < 0.08,
      twinkle: Math.random() * Math.PI * 2,
    }));

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function drawHeart(x: number, y: number, size: number, alpha: number) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 16, size / 16);
      ctx.beginPath();
      ctx.moveTo(8, 14);
      ctx.bezierCurveTo(2, 9, 0, 5, 3, 3);
      ctx.bezierCurveTo(5.5, 1.4, 8, 3.4, 8, 5);
      ctx.bezierCurveTo(8, 3.4, 10.5, 1.4, 13, 3);
      ctx.bezierCurveTo(16, 5, 14, 9, 8, 14);
      ctx.closePath();
      ctx.fillStyle = `rgba(240, 169, 192, ${alpha})`;
      ctx.fill();
      ctx.restore();
    }

    let t = 0;
    function frame() {
      if (!ctx || !running) return;
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
        const twinkle = 0.65 + 0.35 * Math.sin(t * 1.4 + p.twinkle);
        const px = p.x * width;
        const py = p.y * height;
        if (p.heart) {
          drawHeart(px, py, p.r * 9, p.alpha * twinkle * 0.8);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(248, 234, 240, ${p.alpha * twinkle})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-ink" />
      {/* Blurred burgundy light pools */}
      <div className="absolute -top-[20vh] left-1/2 h-[75vh] w-[95vw] -translate-x-1/2 rounded-full bg-burgundy/70 blur-[130px]" />
      <div className="absolute bottom-[-15vh] right-[-10vw] h-[55vh] w-[55vw] rounded-full bg-rose/8 blur-[120px]" />
      <div className="absolute top-[40vh] left-[-15vw] h-[45vh] w-[45vw] rounded-full bg-burgundy-soft/60 blur-[110px]" />
      {!reducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
