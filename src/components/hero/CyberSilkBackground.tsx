import { useEffect, useRef } from "react";

export function CyberSilkBackground() {
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

    // Mouse tracking
    let mouseX = width * 0.5;
    let mouseY = height * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Interactive Floating Light Spheres (Ambient studio glow)
    const orbs = [
      {
        x: width * 0.7,
        y: height * 0.45,
        radius: 340,
        color: "rgba(255, 122, 0, 0.12)", // Warm Amber
        vx: 0.3,
        vy: -0.2,
      },
      {
        x: width * 0.35,
        y: height * 0.55,
        radius: 400,
        color: "rgba(34, 211, 238, 0.08)", // Cool Cyan
        vx: -0.25,
        vy: 0.3,
      },
      {
        x: width * 0.6,
        y: height * 0.75,
        radius: 280,
        color: "rgba(16, 185, 129, 0.06)", // Emerald
        vx: 0.2,
        vy: 0.25,
      },
    ];

    // Constellation / Particle Field
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }[] = [];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Deep, Rich Titanium Obsidian Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#080B12");
      bgGrad.addColorStop(0.5, "#04060A");
      bgGrad.addColorStop(1, "#020305");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Organic Floating Ambient Studio Glow Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        // Subtle mouse influence
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 400 && dist > 0) {
          orb.x += (dx / dist) * 0.5;
          orb.y += (dy / dist) * 0.5;
        }

        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.6, orb.color.replace(/[\d\.]+\)$/, "0.03)"));
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // 2. Draw Multi-Layer Flowing Fluid Cyber Silk Waves
      const waveCount = 5;
      for (let w = 0; w < waveCount; w++) {
        ctx.save();
        ctx.beginPath();

        const baseHeight = height * (0.42 + w * 0.08);
        const mouseFactor = (1 - w / waveCount) * 45;
        const mxOffset = ((mouseX - width / 2) / width) * mouseFactor;
        const myOffset = ((mouseY - height / 2) / height) * mouseFactor;

        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        const step = 40;
        for (let x = 0; x <= width; x += step) {
          const normX = x / width;
          const wave1 = Math.sin(normX * 3.5 + time + w * 0.7) * 40;
          const wave2 = Math.cos(normX * 2.2 - time * 0.8 + w) * 30;
          const wave3 = Math.sin(normX * 6 + time * 1.4) * 15;

          // Local cursor dip / swell
          const cDist = Math.abs(x - mouseX);
          const cEffect = Math.max(0, 1 - cDist / 300) * 35;

          const y = baseHeight + wave1 + wave2 + wave3 + myOffset + cEffect;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Elegant semi-transparent silk gradient
        const silkGrad = ctx.createLinearGradient(0, baseHeight - 60, width, height);
        if (w === 0) {
          silkGrad.addColorStop(0, "rgba(255, 122, 0, 0.09)"); // Amber highlight wave
          silkGrad.addColorStop(0.5, "rgba(255, 170, 40, 0.04)");
          silkGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else if (w === 1) {
          silkGrad.addColorStop(0, "rgba(34, 211, 238, 0.08)"); // Cyan wave
          silkGrad.addColorStop(0.6, "rgba(6, 182, 212, 0.02)");
          silkGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else if (w === 2) {
          silkGrad.addColorStop(0, "rgba(255, 255, 255, 0.05)"); // Crisp White silk crest
          silkGrad.addColorStop(0.7, "rgba(255, 255, 255, 0.01)");
          silkGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          silkGrad.addColorStop(0, "rgba(16, 185, 129, 0.04)"); // Emerald depth
          silkGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        }

        ctx.fillStyle = silkGrad;
        ctx.fill();

        // Delicate illuminated crest stroke along the wave top
        ctx.strokeStyle =
          w === 0
            ? "rgba(255, 160, 40, 0.25)"
            : w === 1
            ? "rgba(34, 211, 238, 0.2)"
            : "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = w === 0 ? 1.5 : 1;
        ctx.stroke();

        ctx.restore();
      }

      // 3. Floating Neural Particle Mesh (Interactive with cursor)
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse proximity link
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);

        let alpha = p.alpha;
        if (dist < 180) {
          alpha = Math.min(1, p.alpha * 2.5);
          // Connect to cursor with delicate thread
          ctx.strokeStyle = `rgba(255, 160, 40, ${(1 - dist / 180) * 0.28})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        // Connect adjacent particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (pDist < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - pDist / 100) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = dist < 180 ? "#FFB066" : "rgba(255, 255, 255, 0.8)";
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (dist < 180 ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 4. Subtle Radial Vignette around borders
      const vig = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.35,
        width / 2,
        height / 2,
        height * 0.95
      );
      vig.addColorStop(0, "rgba(0, 0, 0, 0)");
      vig.addColorStop(0.7, "rgba(0, 0, 0, 0.3)");
      vig.addColorStop(1, "rgba(0, 0, 0, 0.85)");
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{
        filter: "contrast(1.1) brightness(1.02)",
      }}
      aria-hidden="true"
    />
  );
}

export default CyberSilkBackground;
