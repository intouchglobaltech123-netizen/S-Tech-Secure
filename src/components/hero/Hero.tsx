import { useEffect, useRef } from "react";
import { Camera, Trophy, ShieldCheck } from "lucide-react";

export function Hero({ active = true }: { active?: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Trim the last 0.5s: check playback at 60fps and loop smoothly
  useEffect(() => {
    let animId: number;

    const checkVideoTrim = () => {
      const v = videoRef.current;
      if (v && v.duration && !v.paused) {
        if (v.currentTime >= Math.max(0, v.duration - 0.5)) {
          v.currentTime = 0;
          v.play().catch(() => {});
        }
      }
      animId = requestAnimationFrame(checkVideoTrim);
    };

    animId = requestAnimationFrame(checkVideoTrim);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="relative z-30 w-full overflow-hidden"
      style={{
        backgroundColor: "#070A12",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Fullscreen Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={() => {
              const v = videoRef.current;
              if (v && v.duration && v.currentTime >= Math.max(0, v.duration - 0.5)) {
                v.currentTime = 0;
                v.play().catch(() => {});
              }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/services/hero.mp4" type="video/mp4" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Vignette & Readability Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070A12]/75 via-[#070A12]/40 to-[#070A12]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/90 via-transparent to-[#070A12]/50" />
        </div>

        {/* Left-Aligned Text Content Stack */}
        <div
          className="absolute left-6 sm:left-12 lg:left-16 xl:left-20 top-[16%] sm:top-[18%] lg:top-1/2 lg:-translate-y-1/2 z-20 max-w-[620px] text-left select-none"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="h-2 w-2 rounded-full bg-[#FF7A00] shadow-[0_0_8px_#FF7A00] animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#FFA726] uppercase">
              SMART SECURITY &amp; AUTOMATION
            </span>
          </div>

          {/* Clean, Bold, High-Impact 2-Line Headline */}
          <h1 className="font-black tracking-tight leading-[0.98] text-left">
            <span
              className="block text-white"
              style={{ fontSize: "clamp(38px, 5.8vw, 76px)" }}
            >
              24/7 Security &amp;
            </span>
            <span
              className="block bg-gradient-to-r from-white via-neutral-100 to-[#FF7A00] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(255,122,0,0.4)]"
              style={{ fontSize: "clamp(40px, 6.2vw, 82px)" }}
            >
              Smart Automation
            </span>
          </h1>

          {/* Clean, Refined Subheading */}
          <p className="mt-4 sm:mt-5 text-white/80 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-[500px]">
            Advanced CCTV surveillance and intelligent automation for complete peace of mind and effortless living.
          </p>

          {/* Proof Badges (Placed directly after text) */}
          <div className="mt-6 flex flex-wrap items-center gap-3 select-none pointer-events-auto">
            {/* Stat 1: 500+ Installations */}
            <div className="group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-white/15 hover:border-[#FF7A00]/50 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300">
              <div className="w-8 h-8 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.25)] group-hover:scale-110 transition-transform duration-200">
                <Camera className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center leading-none">
                  <span className="font-sans text-base sm:text-lg font-black text-white tracking-tight">500</span>
                  <span className="font-sans text-xs sm:text-sm font-black text-[#FF7A00] ml-0.5">+</span>
                </div>
                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 mt-1 font-bold group-hover:text-white transition-colors">
                  Installations
                </span>
              </div>
            </div>

            {/* Stat 2: 6+ Years Exp */}
            <div className="group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-white/15 hover:border-[#FF7A00]/50 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300">
              <div className="w-8 h-8 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.25)] group-hover:scale-110 transition-transform duration-200">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center leading-none">
                  <span className="font-sans text-base sm:text-lg font-black text-white tracking-tight">6</span>
                  <span className="font-sans text-xs sm:text-sm font-black text-[#FF7A00] ml-0.5">+</span>
                </div>
                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 mt-1 font-bold group-hover:text-white transition-colors">
                  Years Exp
                </span>
              </div>
            </div>

            {/* Stat 3: 50+ Brands */}
            <div className="group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-white/15 hover:border-[#FF7A00]/50 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300">
              <div className="w-8 h-8 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.25)] group-hover:scale-110 transition-transform duration-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center leading-none">
                  <span className="font-sans text-base sm:text-lg font-black text-white tracking-tight">50</span>
                  <span className="font-sans text-xs sm:text-sm font-black text-[#FF7A00] ml-0.5">+</span>
                </div>
                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 mt-1 font-bold group-hover:text-white transition-colors">
                  Brands
                </span>
              </div>
            </div>
          </div>


        </div>




      </div>
    </div>
  );
}

export default Hero;
