"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isAmber: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  alpha: number;
}

export function CyberMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const setupSize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const container = containerRef.current;
      width = container ? container.clientWidth : window.innerWidth;
      height = container ? container.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupSize();
    window.addEventListener("resize", setupSize);

    // Also observe container size changes
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => setupSize());
      resizeObserver.observe(containerRef.current);
    }

    // Mouse Tracking for Interactive Web Connections
    let mouseX = width * 0.5;
    let mouseY = height * 0.35;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let isMouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Generate Network Nodes
    const nodeCount = Math.floor(Math.min(48, Math.max(26, (width * height) / 32000)));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const isAmber = Math.random() > 0.42;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: isAmber ? Math.random() * 1.8 + 1.8 : Math.random() * 1.4 + 1.1,
        isAmber,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        alpha: Math.random() * 0.35 + 0.4,
      });
    }

    const render = () => {
      // Smooth mouse damping
      if (isMouseActive) {
        mouseX += (targetMouseX - mouseX) * 0.06;
        mouseY += (targetMouseY - mouseY) * 0.06;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Move nodes with gentle drift
        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.pulsePhase += n1.pulseSpeed;

        // Smooth viewport wrapping
        if (n1.x < -30) n1.x = width + 30;
        if (n1.x > width + 30) n1.x = -30;
        if (n1.y < -30) n1.y = height + 30;
        if (n1.y > height + 30) n1.y = -30;

        // Link with other nodes within range
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.hypot(dx, dy);

          const maxDist = 140;
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            const isAmberLink = n1.isAmber || n2.isAmber;

            if (isAmberLink) {
              ctx.strokeStyle = `rgba(255, 122, 0, ${proximity * 0.28})`;
              ctx.lineWidth = 0.85;
            } else {
              ctx.strokeStyle = `rgba(148, 163, 184, ${proximity * 0.18})`;
              ctx.lineWidth = 0.55;
            }

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Interactive Mouse Attraction Thread
        if (isMouseActive) {
          const mDist = Math.hypot(mouseX - n1.x, mouseY - n1.y);
          if (mDist < 170) {
            const mFactor = 1 - mDist / 170;
            ctx.strokeStyle = `rgba(255, 122, 0, ${mFactor * 0.38})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }

      // 2. Draw glowing optical nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(n.pulsePhase) * 0.3 + 0.7;

        if (n.isAmber) {
          // Soft outer optical halo
          const haloGrad = ctx.createRadialGradient(
            n.x,
            n.y,
            0,
            n.x,
            n.y,
            n.radius * 3.8
          );
          haloGrad.addColorStop(0, "rgba(255, 122, 0, 0.28)");
          haloGrad.addColorStop(0.5, "rgba(255, 122, 0, 0.08)");
          haloGrad.addColorStop(1, "rgba(255, 122, 0, 0)");

          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 3.8, 0, Math.PI * 2);
          ctx.fill();

          // Core Amber Node
          ctx.fillStyle = `rgba(255, 122, 0, ${n.alpha * pulse})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();

          // Center bright pinpoint
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Secondary Slate Satellite Node
          ctx.fillStyle = `rgba(71, 85, 105, ${n.alpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", setupSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* 1. Subtle Precision Architectural Hairline Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.45]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="arch-tech-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="0.6"
              strokeDasharray="2 4"
            />
            {/* Micro Crosshair Registration Marks */}
            <path
              d="M 26 28 L 30 28 M 28 26 L 28 30"
              stroke="#94A3B8"
              strokeWidth="0.75"
            />
          </pattern>

          {/* Vignette mask for smooth edge fade */}
          <radialGradient id="grid-vignette" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-vignette)" />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#arch-tech-grid)"
          mask="url(#grid-mask)"
        />
      </svg>

      {/* 2. Soft Luminous Studio Atmosphere Orbs */}
      <div className="absolute -top-[10%] right-[5%] w-[600px] h-[600px] bg-gradient-to-br from-[#FF7A00]/[0.055] to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -left-[10%] w-[650px] h-[650px] bg-gradient-to-tr from-[#38BDF8]/[0.035] to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[10%] right-[15%] w-[550px] h-[550px] bg-gradient-to-tl from-[#FF7A00]/[0.045] to-transparent blur-[150px] rounded-full pointer-events-none" />

      {/* 3. Hi-DPI Interactive Connected Network Mesh Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.95 }}
      />
    </div>
  );
}

export default CyberMeshBackground;


