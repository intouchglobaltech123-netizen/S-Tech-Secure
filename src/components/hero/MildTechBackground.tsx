"use client";

import { useEffect, useRef } from "react";

interface SensorNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  isAmber: boolean;
  pulse: number;
  pulseSpeed: number;
}

export function MildTechBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
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

    // Mouse Tracking with smooth physics
    let mouseX = width * 0.7;
    let mouseY = height * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Connected IoT Sensor Network Nodes
    const nodeCount = Math.min(42, Math.max(22, Math.floor((width * height) / 30000)));
    const nodes: SensorNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const isAmber = Math.random() > 0.65;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: isAmber ? Math.random() * 2.2 + 1.8 : Math.random() * 1.6 + 1.2,
        baseAlpha: Math.random() * 0.35 + 0.25,
        isAmber,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    // Soft animated wave ribbons
    let time = 0;

    const render = () => {
      time += 0.008;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Rich Mild Dark Studio Gradient (Comfortable Slate Navy & Graphite)
      const bgGrad = ctx.createRadialGradient(
        width * 0.72,
        height * 0.48,
        80,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      // Soft mild dark illumination around the camera display zone
      bgGrad.addColorStop(0, "#26344A");     // Mild luminous slate
      bgGrad.addColorStop(0.35, "#1B2435");  // Rich dark denim graphite
      bgGrad.addColorStop(0.7, "#121824");   // Deep mild slate
      bgGrad.addColorStop(1, "#0C101A");     // Soft perimeter (not pure black)
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Elegant Precision Engineering Grid with Subtle Crosshairs
      ctx.save();
      const gridSize = 56;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Micro crosshair markers '+' at major intersections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      const step = gridSize * 2;
      for (let x = gridSize; x < width; x += step) {
        for (let y = gridSize; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 3. Gentle Flowing Cyber Silk Waves (Mild & Atmospheric)
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.save();
        ctx.beginPath();

        const baseH = height * (0.55 + w * 0.12);
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseH);

        for (let x = 0; x <= width; x += 35) {
          const nx = x / width;
          const yWave =
            Math.sin(nx * 4 + time + w * 1.2) * 32 +
            Math.cos(nx * 2.5 - time * 0.7 + w) * 20;

          // Gentle mouse dip
          const mDist = Math.abs(x - mouseX);
          const mDip = Math.max(0, 1 - mDist / 320) * 25;

          ctx.lineTo(x, baseH + yWave + mDip);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, baseH - 40, width, height);
        if (w === 0) {
          waveGrad.addColorStop(0, "rgba(255, 122, 0, 0.07)"); // Warm amber wave
          waveGrad.addColorStop(0.6, "rgba(255, 160, 40, 0.02)");
          waveGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else if (w === 1) {
          waveGrad.addColorStop(0, "rgba(56, 189, 248, 0.06)"); // Cool cyan wave
          waveGrad.addColorStop(0.7, "rgba(14, 165, 233, 0.015)");
          waveGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          waveGrad.addColorStop(0, "rgba(148, 163, 184, 0.04)"); // Soft slate crest
          waveGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        }

        ctx.fillStyle = waveGrad;
        ctx.fill();

        // Delicate crest line
        ctx.strokeStyle =
          w === 0
            ? "rgba(255, 160, 40, 0.18)"
            : w === 1
            ? "rgba(56, 189, 248, 0.15)"
            : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      // 4. Update and Draw IoT Sensor Constellation Nodes
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Subtle mouse attraction
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const distToMouse = Math.hypot(dx, dy);
        if (distToMouse < 220 && distToMouse > 0) {
          n.x += (dx / distToMouse) * 0.4;
          n.y += (dy / distToMouse) * 0.4;
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          const maxDist = 135;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.strokeStyle = n.isAmber || n2.isAmber
              ? `rgba(255, 122, 0, ${alpha})`
              : `rgba(56, 189, 248, ${alpha * 0.8})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Node Glow Halo
        const pulseFactor = 0.8 + Math.sin(n.pulse) * 0.2;
        const currentAlpha = n.baseAlpha * pulseFactor;

        ctx.fillStyle = n.isAmber
          ? `rgba(255, 122, 0, ${currentAlpha})`
          : `rgba(56, 189, 248, ${currentAlpha * 0.9})`;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 5. Ambient Camera Spotlight Beam (Focal zone behind right showcase)
      const spotlightX = width > 1024 ? width * 0.72 : width * 0.5;
      const spotlightY = height * 0.5;

      ctx.save();
      // Outer soft aura
      const aura = ctx.createRadialGradient(spotlightX, spotlightY, 20, spotlightX, spotlightY, 420);
      aura.addColorStop(0, "rgba(255, 122, 0, 0.12)");   // Warm Amber Core
      aura.addColorStop(0.4, "rgba(56, 189, 248, 0.05)"); // Cool Cyan Rim
      aura.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(spotlightX, spotlightY, 420, 0, Math.PI * 2);
      ctx.fill();

      // Delicate concentric radar orbits around camera
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(spotlightX, spotlightY, 220, time * 0.2, Math.PI * 2 + time * 0.2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 122, 0, 0.1)";
      ctx.beginPath();
      ctx.arc(spotlightX, spotlightY, 320, -time * 0.15, Math.PI * 2 - time * 0.15);
      ctx.stroke();
      ctx.restore();

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
        filter: "contrast(1.08) brightness(1.04)",
      }}
      aria-hidden="true"
    />
  );
}

export default MildTechBackground;
