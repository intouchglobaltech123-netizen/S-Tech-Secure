export function CheckerGridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 bg-[#F4F6F9]">
      {/* 1. Geometric Checkerboard & Precision Grid Canvas */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Checkerboard Pattern (64px x 64px) */}
          <pattern
            id="tech-checker-pattern"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            {/* Alternating Checker Fill Squares */}
            <rect
              x="0"
              y="0"
              width="32"
              height="32"
              fill="rgba(15, 23, 42, 0.035)"
            />
            <rect
              x="32"
              y="32"
              width="32"
              height="32"
              fill="rgba(15, 23, 42, 0.035)"
            />

            {/* Grid Outer Hairline Border */}
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="rgba(15, 23, 42, 0.07)"
              strokeWidth="1"
            />

            {/* Micro Crosses '+' at Grid Intersections */}
            <path
              d="M 30 32 L 34 32 M 32 30 L 32 34"
              stroke="rgba(15, 23, 42, 0.12)"
              strokeWidth="1"
            />
          </pattern>

          {/* Radial Spotlight Mask for Smooth Vignette Falloff */}
          <radialGradient id="checker-glow" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <mask id="checker-mask">
            <rect width="100%" height="100%" fill="url(#checker-glow)" />
          </mask>
        </defs>

        {/* Primary Checkerboard Texture */}
        <rect
          width="100%"
          height="100%"
          fill="url(#tech-checker-pattern)"
        />

        {/* Highlighted Spotlight Overlay */}
        <rect
          width="100%"
          height="100%"
          fill="url(#tech-checker-pattern)"
          mask="url(#checker-mask)"
          opacity="0.9"
        />
      </svg>

      {/* 2. Ambient Soft Glow Orbs in Background */}
      <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-[#FF7A00]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-[50%] right-[10%] w-[700px] h-[700px] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-[#FF7A00]/4 blur-[160px] rounded-full pointer-events-none" />

      {/* 3. Subtle Animated Laser Horizon Line */}
      <div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/25 to-transparent pointer-events-none"
        style={{
          top: "0%",
          animation: "scanline 12s linear infinite",
        }}
      />
    </div>
  );
}

export default CheckerGridBackground;
