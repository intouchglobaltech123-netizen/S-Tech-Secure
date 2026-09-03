import { useEffect, useRef } from "react";

export function ApertureBackground() {
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
    let mouseX = width * 0.65;
    let mouseY = height * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let angle = 0;
    let irisOpen = 0.5;

    // Floating optical dust specs (Cinema lens floaters)
    const dust: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];
    for (let i = 0; i < 45; i++) {
      dust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    const render = () => {
      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      angle += 0.003;
      irisOpen = 0.48 + Math.sin(angle * 3) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Mild Dark Graphite & Slate Canvas Base
      const bgGrad = ctx.createRadialGradient(
        width * 0.65,
        height * 0.5,
        80,
        width * 0.65,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, "#222C3E");    // Mild dark slate illumination at focal zone
      bgGrad.addColorStop(0.35, "#18202F"); // Rich dark graphite midtones
      bgGrad.addColorStop(0.7, "#111724");  // Smooth deep charcoal
      bgGrad.addColorStop(1, "#0C101A");    // Mild dark perimeter
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Tech Grid on Canvas for mild dark depth
      ctx.save();
      const gridSize = 48;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
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
      ctx.restore();

      // Aperture Center aligns with the camera's display zone on the right
      const centerX = width > 1024 ? width * 0.68 : width * 0.5;
      const centerY = height * 0.5;

      // Mouse Parallax Offset
      const pX = centerX + (mouseX - width / 2) * 0.05;
      const pY = centerY + (mouseY - height / 2) * 0.05;

      const baseR = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.translate(pX, pY);

      // 1. Outer Chassis Ring with Laser Ticks
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 1.25, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Ring Millimeter Ticks
      const tickCount = 72;
      for (let i = 0; i < tickCount; i++) {
        const a = (i * Math.PI * 2) / tickCount + angle * 0.4;
        const isMajor = i % 6 === 0;
        const rInner = baseR * (isMajor ? 1.2 : 1.23);
        const rOuter = baseR * 1.25;

        ctx.strokeStyle = isMajor
          ? "rgba(255, 255, 255, 0.18)"
          : "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = isMajor ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * rInner, Math.sin(a) * rInner);
        ctx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
        ctx.stroke();
      }

      // 2. Middle Ring: Optical Telemetry Ring (counter-rotation)
      ctx.strokeStyle = "rgba(34, 211, 238, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.98, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed Focal Ring
      ctx.save();
      ctx.setLineDash([8, 14]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.09)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.92, -angle * 0.8, Math.PI * 2 - angle * 0.8);
      ctx.stroke();
      ctx.restore();

      // Precision Degree Labels on Ring
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const markers = ["000°", "045°", "090°", "135°", "180°", "225°", "270°", "315°"];
      markers.forEach((txt, idx) => {
        const a = (idx * Math.PI * 2) / markers.length + angle * 0.3;
        const r = baseR * 1.05;
        ctx.fillText(txt, Math.cos(a) * r, Math.sin(a) * r);
      });

      // 3. Mechanical Aperture Iris Blades (8 Blades)
      const bladeCount = 9;
      const bladeRadius = baseR * 0.72;
      const innerR = bladeRadius * irisOpen;

      for (let i = 0; i < bladeCount; i++) {
        const bAngle = (i * Math.PI * 2) / bladeCount + angle;
        const nextAngle = ((i + 1) * Math.PI * 2) / bladeCount + angle;

        ctx.save();
        ctx.beginPath();
        // Point on inner aperture opening
        const x1 = Math.cos(bAngle) * innerR;
        const y1 = Math.sin(bAngle) * innerR;

        // Outer anchor on blade barrel
        const x2 = Math.cos(bAngle + 0.45) * bladeRadius;
        const y2 = Math.sin(bAngle + 0.45) * bladeRadius;

        const x3 = Math.cos(nextAngle) * bladeRadius;
        const y3 = Math.sin(nextAngle) * bladeRadius;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();

        // Shaded metallic blade gradient (Mild dark steel)
        const bladeGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        bladeGrad.addColorStop(0, "rgba(42, 54, 78, 0.85)");
        bladeGrad.addColorStop(0.5, "rgba(26, 36, 52, 0.65)");
        bladeGrad.addColorStop(1, "rgba(16, 23, 35, 0.9)");

        ctx.fillStyle = bladeGrad;
        ctx.fill();

        // High precision blade edge line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      // 4. Optical Lens Flare / Core Caustic Glow (Mild Amber & Sapphire)
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, innerR);
      coreGrad.addColorStop(0, "rgba(255, 122, 0, 0.14)");
      coreGrad.addColorStop(0.4, "rgba(56, 189, 248, 0.08)");
      coreGrad.addColorStop(0.8, "rgba(24, 32, 48, 0.4)");
      coreGrad.addColorStop(1, "rgba(14, 19, 30, 0.7)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, innerR, 0, Math.PI * 2);
      ctx.fill();

      // 5. Horizontal Anamorphic Cinema Lens Streak
      const streakGrad = ctx.createLinearGradient(-width * 0.5, 0, width * 0.5, 0);
      streakGrad.addColorStop(0, "rgba(34, 211, 238, 0)");
      streakGrad.addColorStop(0.4, "rgba(34, 211, 238, 0.05)");
      streakGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.22)");
      streakGrad.addColorStop(0.6, "rgba(255, 255, 255, 0.05)");
      streakGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = streakGrad;
      ctx.fillRect(-width * 0.5, -1.5, width, 3);

      ctx.restore();

      // 6. Floating Cinema Optical Dust / Bokeh
      ctx.save();
      for (const d of dust) {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        ctx.fillStyle = "rgba(255, 255, 255, " + d.alpha + ")";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 7. Soft Edge Vignette (Mild Dark instead of black)
      const vig = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.35,
        width / 2,
        height / 2,
        height * 0.95
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(0.7, "rgba(10, 15, 24, 0.15)");
      vig.addColorStop(1, "rgba(8, 12, 20, 0.5)");
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
        filter: "contrast(1.15) brightness(1.02)",
      }}
      aria-hidden="true"
    />
  );
}

export default ApertureBackground;
