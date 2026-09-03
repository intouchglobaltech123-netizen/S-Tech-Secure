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
  hueShift: number; // 0 for neutral smoke, positive for amber warm, negative for cyan
}

interface SensorSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  color: string;
}

export function ProBackground() {
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

    // Mouse Physics
    let mouseX = width * 0.6;
    let mouseY = height * 0.45;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
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
      }, 140);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 1. Offscreen Sprite Generation: Neutral Volumetric Smoke
    const spriteSize = 384;
    const neutralSprite = document.createElement("canvas");
    neutralSprite.width = spriteSize;
    neutralSprite.height = spriteSize;
    const sCtx1 = neutralSprite.getContext("2d");
    if (sCtx1) {
      const center = spriteSize / 2;
      const grad = sCtx1.createRadialGradient(center, center, 0, center, center, center);
      grad.addColorStop(0, "rgba(240, 245, 255, 0.65)");
      grad.addColorStop(0.2, "rgba(220, 230, 245, 0.45)");
      grad.addColorStop(0.45, "rgba(180, 200, 225, 0.20)");
      grad.addColorStop(0.72, "rgba(140, 160, 190, 0.06)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx1.fillStyle = grad;
      sCtx1.beginPath();
      sCtx1.arc(center, center, center, 0, Math.PI * 2);
      sCtx1.fill();
    }

    // Warm Amber Studio Light Sprite (Right illumination)
    const amberSprite = document.createElement("canvas");
    amberSprite.width = spriteSize;
    amberSprite.height = spriteSize;
    const sCtx2 = amberSprite.getContext("2d");
    if (sCtx2) {
      const center = spriteSize / 2;
      const grad = sCtx2.createRadialGradient(center, center, 0, center, center, center);
      grad.addColorStop(0, "rgba(255, 155, 45, 0.55)");
      grad.addColorStop(0.25, "rgba(255, 122, 0, 0.35)");
      grad.addColorStop(0.5, "rgba(200, 90, 0, 0.12)");
      grad.addColorStop(0.75, "rgba(120, 50, 0, 0.04)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx2.fillStyle = grad;
      sCtx2.beginPath();
      sCtx2.arc(center, center, center, 0, Math.PI * 2);
      sCtx2.fill();
    }

    // Cool Cyan Studio Light Sprite (Left illumination)
    const cyanSprite = document.createElement("canvas");
    cyanSprite.width = spriteSize;
    cyanSprite.height = spriteSize;
    const sCtx3 = cyanSprite.getContext("2d");
    if (sCtx3) {
      const center = spriteSize / 2;
      const grad = sCtx3.createRadialGradient(center, center, 0, center, center, center);
      grad.addColorStop(0, "rgba(34, 211, 238, 0.55)");
      grad.addColorStop(0.25, "rgba(6, 182, 212, 0.35)");
      grad.addColorStop(0.5, "rgba(14, 116, 144, 0.12)");
      grad.addColorStop(0.75, "rgba(8, 60, 80, 0.04)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx3.fillStyle = grad;
      sCtx3.beginPath();
      sCtx3.arc(center, center, center, 0, Math.PI * 2);
      sCtx3.fill();
    }

    // 2. High Density Particle Pool
    const maxParticles = 140;
    const particles: SmokeParticle[] = [];

    const spawnParticle = (initialRandomY = false): SmokeParticle => {
      const originX = Math.random() * (width + 300) - 150;
      const originY = initialRandomY
        ? Math.random() * height
        : height + Math.random() * 90;

      const layerRoll = Math.random();
      let layer: "deep" | "mid" | "wisp" = "mid";
      let baseSize = 120;
      let maxSize = 450;
      let maxAlpha = 0.18;
      let vy = -(0.8 + Math.random() * 1.1);

      if (layerRoll < 0.35) {
        layer = "deep";
        baseSize = 200 + Math.random() * 120;
        maxSize = 700 + Math.random() * 250;
        maxAlpha = 0.11 + Math.random() * 0.08;
        vy = -(0.5 + Math.random() * 0.6);
      } else if (layerRoll > 0.8) {
        layer = "wisp";
        baseSize = 70 + Math.random() * 50;
        maxSize = 340 + Math.random() * 150;
        maxAlpha = 0.24 + Math.random() * 0.12;
        vy = -(1.1 + Math.random() * 1.3);
      } else {
        baseSize = 130 + Math.random() * 70;
        maxSize = 500 + Math.random() * 200;
        maxAlpha = 0.16 + Math.random() * 0.11;
      }

      // Determine dual studio lighting: Right side gets amber tint, left side gets cyan tint
      const ratio = originX / width;
      let hueShift = 0;
      if (ratio > 0.55 && Math.random() < 0.45) {
        hueShift = 1; // amber
      } else if (ratio < 0.45 && Math.random() < 0.35) {
        hueShift = -1; // cyan
      }

      const maxLife = 240 + Math.random() * 180;

      return {
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 0.85,
        vy,
        size: baseSize,
        maxSize,
        growth: 1.1 + Math.random() * 1.1,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.006,
        alpha: 0,
        maxAlpha,
        life: initialRandomY ? Math.random() * maxLife : 0,
        maxLife,
        seed: Math.random() * 1000,
        layer,
        hueShift,
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      particles.push(spawnParticle(true));
    }

    // 3. Floating Sensor Sparks (High-tech Optical Spark Field)
    const sparks: SensorSpark[] = [];
    const sparkCount = 42;
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.3 + Math.random() * 0.6),
        size: 1 + Math.random() * 2.2,
        alpha: Math.random() * 0.7 + 0.3,
        maxAlpha: 0.5 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? "#22D3EE" : "#FF7A00",
      });
    }

    // Grid animation offset
    let gridOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep Obsidian Base
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // 1. Interactive Studio Spotlight behind the Camera (follows mouse smoothly)
      const spotGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        40,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.65
      );
      spotGrad.addColorStop(0, "rgba(255, 122, 0, 0.08)");
      spotGrad.addColorStop(0.35, "rgba(34, 211, 238, 0.05)");
      spotGrad.addColorStop(0.7, "rgba(10, 15, 28, 0.3)");
      spotGrad.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. 3D Perspective Ground Matrix (Cyber Wireframe Floor)
      gridOffset = (gridOffset + 0.5) % 40;
      const horizonY = height * 0.58;
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;

      // Vertical perspective lines converging to horizon
      const vanishX = width * 0.65; // aligns behind camera
      const lineCount = 32;
      for (let i = 0; i <= lineCount; i++) {
        const xBottom = (width / lineCount) * i * 1.8 - width * 0.4;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(xBottom, height);
        ctx.stroke();
      }

      // Horizontal ground grid rungs receding in perspective
      for (let y = horizonY; y < height; y += (y - horizonY) * 0.28 + 6) {
        const alpha = Math.min(0.08, ((y - horizonY) / (height - horizonY)) * 0.09);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Cursor Move Smoke Trail Generator
      if (isMouseMoving && mouseSpeed > 2 && mouseX > 0 && mouseY > 0) {
        const emitCount = mouseSpeed > 9 ? 2 : 1;
        for (let k = 0; k < emitCount; k++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 30,
            y: mouseY + (Math.random() - 0.5) * 30,
            vx: mouseVx * 0.12 + (Math.random() - 0.5) * 1.2,
            vy: mouseVy * 0.12 - (0.5 + Math.random() * 0.8),
            size: 50 + Math.random() * 35,
            maxSize: 240 + Math.random() * 120,
            growth: 1.8 + Math.random() * 1.5,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.035,
            alpha: 0,
            maxAlpha: 0.35 + Math.random() * 0.15,
            life: 0,
            maxLife: 110 + Math.random() * 70,
            seed: Math.random() * 1000,
            layer: "cursor",
            hueShift: Math.random() > 0.5 ? 1 : -1,
          });
        }
        if (particles.length > 220) {
          particles.splice(0, particles.length - 220);
        }
      }

      // 4. Render Volumetric Smoke with Studio Lighting
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

        // Fluid Cursor Repulsion & Swirl
        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);
          const influenceRadius = 190;

          if (dist < influenceRadius && dist > 0) {
            const force = (1 - dist / influenceRadius) * 4.2;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.38;
            p.vy += Math.sin(angle) * force * 0.38;
            p.spin += (Math.random() - 0.5) * 0.015 * force;
          }
        }

        p.vx *= 0.96;
        p.x += p.vx + Math.sin(p.life * 0.016 + p.seed) * 1.2;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.size < p.maxSize) {
          p.size += p.growth;
        }

        const progress = p.life / p.maxLife;
        if (progress < 0.22) {
          p.alpha = (progress / 0.22) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.22) / 0.78) * p.maxAlpha;
        }

        // Pick sprite based on lighting
        let activeSprite = neutralSprite;
        if (p.hueShift === 1) activeSprite = amberSprite;
        else if (p.hueShift === -1) activeSprite = cyanSprite;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.drawImage(activeSprite, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      // 5. Render Sensor Sparks / Bokeh Micro-Particles
      ctx.save();
      for (let j = 0; j < sparks.length; j++) {
        const s = sparks[j];
        s.x += s.vx;
        s.y += s.vy;
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        // Proximity glow to cursor
        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.hypot(dx, dy);
        let boost = 1;
        if (dist < 150) {
          boost = 1 + (1 - dist / 150) * 1.8;
          // Connect nearby sparks with faint laser lines
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 150) * 0.25})`;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.min(1, s.alpha * boost);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (boost > 1 ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

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
        filter: "contrast(1.18) brightness(1.02)",
      }}
      aria-hidden="true"
    />
  );
}

export default ProBackground;
