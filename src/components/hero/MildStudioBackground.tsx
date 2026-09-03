"use client";

import { useEffect, useRef } from "react";

interface AmbientOrb {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export function MildStudioBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse Tracking with smooth fluid physics
    let mouseX = width * 0.7;
    let mouseY = height * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Floating Volumetric Studio Light Orbs (NO LINES, pure organic light)
    const orbs: AmbientOrb[] = [
      {
        x: width * 0.72,
        y: height * 0.48,
        radius: 460,
        color: "rgba(255, 122, 0, 0.13)", // Warm Amber Studio Spotlight
        vx: 0.15,
        vy: -0.12,
      },
      {
        x: width * 0.3,
        y: height * 0.38,
        radius: 520,
        color: "rgba(56, 189, 248, 0.08)", // Cool Cyan Ambient Fill
        vx: -0.12,
        vy: 0.15,
      },
      {
        x: width * 0.55,
        y: height * 0.75,
        radius: 400,
        color: "rgba(99, 102, 241, 0.06)", // Deep Indigo Depth
        vx: 0.1,
        vy: 0.1,
      },
      {
        x: width * 0.85,
        y: height * 0.3,
        radius: 350,
        color: "rgba(251, 146, 60, 0.09)", // Warm Orange Accent
        vx: -0.14,
        vy: -0.08,
      },
    ];

    // Floating optical bokeh dust (soft, delicate, NO lines)
    const bokeh: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];
    for (let i = 0; i < 35; i++) {
      bokeh.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.1),
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    const render = () => {
      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Rich Mild Dark Slate Base (NO lines, pure smooth studio gradient)
      const bgGrad = ctx.createRadialGradient(
        width * 0.7,
        height * 0.5,
        120,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, "#222D40");     // Mild illuminated slate center
      bgGrad.addColorStop(0.4, "#172030");   // Soft deep graphite mid
      bgGrad.addColorStop(0.75, "#101622");  // Velvet dark slate
      bgGrad.addColorStop(1, "#0A0E17");     // Deep mild perimeter
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Soft Volumetric Studio Orbs (Pure diffused light, zero lines)
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        // Subtle parallax attraction to mouse
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 500 && dist > 0) {
          orb.x += (dx / dist) * 0.4;
          orb.y += (dy / dist) * 0.4;
        }

        const orbGrad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        orbGrad.addColorStop(0, orb.color);
        orbGrad.addColorStop(0.5, orb.color.replace(/[\d\.]+\)$/, "0.03)"));
        orbGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Focal Camera Studio Spotlight (Soft radial halo behind right showcase)
      const spotX = width > 1024 ? width * 0.72 : width * 0.5;
      const spotY = height * 0.5;
      const spotGrad = ctx.createRadialGradient(
        spotX,
        spotY,
        0,
        spotX,
        spotY,
        Math.min(width, height) * 0.45
      );
      spotGrad.addColorStop(0, "rgba(255, 122, 0, 0.14)");   // Warm amber light pool
      spotGrad.addColorStop(0.4, "rgba(255, 160, 60, 0.05)");
      spotGrad.addColorStop(0.8, "rgba(56, 189, 248, 0.03)"); // Cyan rim
      spotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(spotX, spotY, Math.min(width, height) * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // 4. Soft Floating Cinematic Dust Bokeh (Pure soft circles, NO lines)
      for (let i = 0; i < bokeh.length; i++) {
        const b = bokeh[i];
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < 0) b.x = width;
        if (b.x > width) b.x = 0;
        if (b.y < 0) b.y = height;
        if (b.y > height) b.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Soft Vignette (mild, comfortable, non-pitch)
      const vig = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        height * 0.4,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      vig.addColorStop(0, "rgba(0, 0, 0, 0)");
      vig.addColorStop(0.7, "rgba(10, 14, 22, 0.2)");
      vig.addColorStop(1, "rgba(8, 12, 18, 0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
      {/* 60fps Volumetric Canvas (Zero Lines) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          filter: "contrast(1.05) brightness(1.02)",
        }}
        aria-hidden="true"
      />

      {/* Subtle organic film grain texture to eliminate banding and add physical luxury touch */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export default MildStudioBackground;
