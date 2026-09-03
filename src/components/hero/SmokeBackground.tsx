import { useEffect, useRef } from "react";

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  growth: number;
  angle: number;
  spin: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  seed: number;
  layer: "deep" | "mid" | "wisp" | "cursor";
}

export function SmokeBackground() {
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

    // Mouse Tracking Physics
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let mouseVx = 0;
    let mouseVy = 0;
    let mouseSpeed = 0;
    let isMouseMoving = false;
    let mouseTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (prevMouseX > 0) {
        mouseVx = currentX - prevMouseX;
        mouseVy = currentY - prevMouseY;
        mouseSpeed = Math.hypot(mouseVx, mouseVy);
      }
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = currentX;
      mouseY = currentY;
      isMouseMoving = true;

      if (mouseTimeout) clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
        mouseSpeed = 0;
        mouseVx = 0;
        mouseVy = 0;
      }, 120);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 1. Pre-render volumetric soft cloudy smoke sprite
    const spriteSize = 384;
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteSize;
    spriteCanvas.height = spriteSize;
    const sCtx = spriteCanvas.getContext("2d");

    if (sCtx) {
      const center = spriteSize / 2;
      const gradient = sCtx.createRadialGradient(
        center,
        center,
        0,
        center,
        center,
        center
      );
      gradient.addColorStop(0, "rgba(245, 248, 255, 0.65)");
      gradient.addColorStop(0.18, "rgba(230, 238, 250, 0.48)");
      gradient.addColorStop(0.4, "rgba(195, 210, 230, 0.22)");
      gradient.addColorStop(0.68, "rgba(150, 170, 195, 0.07)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      sCtx.fillStyle = gradient;
      sCtx.beginPath();
      sCtx.arc(center, center, center, 0, Math.PI * 2);
      sCtx.fill();
    }

    // 2. High density particle system spanning the ENTIRE background
    const maxParticles = 160;
    const particles: SmokeParticle[] = [];

    const spawnParticle = (initialRandomY = false): SmokeParticle => {
      // Span across the WHOLE screen width with horizontal overflow
      const originX = Math.random() * (width + 300) - 150;
      const originY = initialRandomY
        ? Math.random() * height
        : height + Math.random() * 80;

      const layerRoll = Math.random();
      let layer: "deep" | "mid" | "wisp" = "mid";
      let baseSize = 100;
      let maxSize = 420;
      let maxAlpha = 0.18;
      let vy = -(0.8 + Math.random() * 1.2);

      if (layerRoll < 0.35) {
        // Deep background giant volumetric cloud
        layer = "deep";
        baseSize = 180 + Math.random() * 100;
        maxSize = 650 + Math.random() * 300;
        maxAlpha = 0.11 + Math.random() * 0.08;
        vy = -(0.5 + Math.random() * 0.7);
      } else if (layerRoll > 0.8) {
        // Foreground light curling wisp
        layer = "wisp";
        baseSize = 70 + Math.random() * 50;
        maxSize = 320 + Math.random() * 160;
        maxAlpha = 0.22 + Math.random() * 0.12;
        vy = -(1.1 + Math.random() * 1.4);
      } else {
        // Midground curling smoke plume
        baseSize = 110 + Math.random() * 70;
        maxSize = 460 + Math.random() * 220;
        maxAlpha = 0.16 + Math.random() * 0.12;
      }

      const maxLife = 240 + Math.random() * 180;

      return {
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 0.9,
        vy,
        size: baseSize,
        maxSize,
        growth: 1.1 + Math.random() * 1.2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.006,
        alpha: 0,
        maxAlpha,
        life: initialRandomY ? Math.random() * maxLife : 0,
        maxLife,
        seed: Math.random() * 1000,
        layer,
      };
    };

    // Pre-populate across the entire viewport immediately
    for (let i = 0; i < maxParticles; i++) {
      particles.push(spawnParticle(true));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Solid deep black foundation
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // 3. Cursor Interactive Smoke Emitter
      if (isMouseMoving && mouseSpeed > 1.8 && mouseX > 0 && mouseY > 0) {
        // Spawn 1 to 2 cursor smoke puffs trailing behind mouse movement
        const emitCount = mouseSpeed > 8 ? 2 : 1;
        for (let k = 0; k < emitCount; k++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 25,
            y: mouseY + (Math.random() - 0.5) * 25,
            vx: mouseVx * 0.12 + (Math.random() - 0.5) * 1.2,
            vy: mouseVy * 0.12 - (0.5 + Math.random() * 0.8),
            size: 45 + Math.random() * 35,
            maxSize: 220 + Math.random() * 120,
            growth: 1.8 + Math.random() * 1.5,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.035,
            alpha: 0,
            maxAlpha: 0.32 + Math.random() * 0.18,
            life: 0,
            maxLife: 110 + Math.random() * 70,
            seed: Math.random() * 1000,
            layer: "cursor",
          });
        }

        // Limit particles to prevent memory growth
        if (particles.length > 220) {
          particles.splice(0, particles.length - 220);
        }
      }

      // Draw all smoke particles across the entire viewport
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.life++;
        if (p.life >= p.maxLife || p.y < -p.maxSize) {
          if (p.layer === "cursor") {
            particles.splice(i, 1);
            i--;
            continue;
          } else {
            particles[i] = spawnParticle();
            continue;
          }
        }

        // 4. Cursor Repulsion & Dynamic Fluid Swirl
        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);
          const influenceRadius = 190;

          if (dist < influenceRadius && dist > 0) {
            const force = (1 - dist / influenceRadius) * 4.2;
            const angle = Math.atan2(dy, dx);
            // Push smoke gently away from cursor
            p.vx += Math.cos(angle) * force * 0.38;
            p.vy += Math.sin(angle) * force * 0.38;
            // Add rotational swirl around cursor
            p.spin += (Math.random() - 0.5) * 0.015 * force;
          }
        }

        // Smooth momentum damping back to natural rise
        p.vx *= 0.96;

        // Multi-frequency organic turbulence across the whole screen
        p.x += p.vx + Math.sin(p.life * 0.016 + p.seed) * 1.2;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.size < p.maxSize) {
          p.size += p.growth;
        }

        // Smooth volumetric birth and dissipation curves
        const progress = p.life / p.maxLife;
        if (progress < 0.22) {
          p.alpha = (progress / 0.22) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.22) / 0.78) * p.maxAlpha;
        }

        // Render soft volumetric smoke puff
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.drawImage(
          spriteCanvas,
          -p.size / 2,
          -p.size / 2,
          p.size,
          p.size
        );
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout) clearTimeout(mouseTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{
        filter: "contrast(1.15) brightness(1.05)",
      }}
      aria-hidden="true"
    />
  );
}

export default SmokeBackground;
