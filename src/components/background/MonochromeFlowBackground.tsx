export function MonochromeFlowBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 50% Black & 50% White Dynamic Fluid Mesh Base */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, #181E29 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 20%, #FFFFFF 0%, transparent 50%), " +
            "radial-gradient(ellipse at 20% 80%, #FFFFFF 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 80%, #0F131A 0%, transparent 50%), " +
            "linear-gradient(135deg, #0B0E14 0%, #1A2230 25%, #E2E8F0 50%, #F8FAFC 75%, #0B0E14 100%)",
          backgroundSize: "250% 250%",
          animation: "monoGradientFlow 20s ease-in-out infinite alternate",
        }}
      />

      {/* Floating Animated Black Fluid Orb 1 */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full bg-[#07090E]/90 blur-[130px]"
        style={{
          top: "10%",
          left: "5%",
          animation: "orbDriftOne 22s ease-in-out infinite alternate",
        }}
      />

      {/* Floating Animated Radiant White Fluid Orb 2 */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full bg-white/95 blur-[140px]"
        style={{
          top: "30%",
          right: "5%",
          animation: "orbDriftTwo 25s ease-in-out infinite alternate",
        }}
      />

      {/* Floating Animated Deep Charcoal Fluid Orb 3 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-[#111722]/85 blur-[120px]"
        style={{
          bottom: "20%",
          left: "15%",
          animation: "orbDriftTwo 28s ease-in-out infinite alternate",
        }}
      />

      {/* Floating Animated Pure Light Fluid Orb 4 */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full bg-white/90 blur-[130px]"
        style={{
          bottom: "5%",
          right: "15%",
          animation: "orbDriftOne 24s ease-in-out infinite alternate",
        }}
      />

      {/* Subtle Monochrome Tech Scan Grid Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="mono-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mono-grid-pattern)" />
      </svg>
    </div>
  );
}

export default MonochromeFlowBackground;
