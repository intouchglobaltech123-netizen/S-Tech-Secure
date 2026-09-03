import { useEffect, useState } from "react";

export const IMAGES = [
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: "#F4845F",
    panel: "#F79B7F",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    bg: "#6BBF7A",
    panel: "#85CC92",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    bg: "#E882B4",
    panel: "#ED9DC4",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
    bg: "#6EB5FF",
    panel: "#8DC4FF",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: "#9D84E8",
    panel: "#B39FF0",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    bg: "#F5B041",
    panel: "#F8C471",
  },
];

const GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

export function ToonhubHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    } else {
      setActiveIndex((prev) => (prev + IMAGES.length - 1) % IMAGES.length);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const getItemStyle = (index: number) => {
    const total = IMAGES.length;
    const offset = (index - activeIndex + total) % total;

    const baseTransition =
      "transform 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)";

    if (offset === 0) {
      return {
        position: "absolute" as const,
        aspectRatio: "0.6 / 1",
        transform: `translateX(-50%) scale(${isMobile ? 0.95 : 1.15})`,
        filter: "none",
        opacity: 1,
        zIndex: 25,
        left: "50%",
        height: isMobile ? "46%" : "64%",
        bottom: isMobile ? "18%" : "3%",
        transition: baseTransition,
        willChange: "transform, opacity, left",
      };
    } else if (offset === 1) {
      return {
        position: "absolute" as const,
        aspectRatio: "0.6 / 1",
        transform: `translateX(-50%) scale(${isMobile ? 0.78 : 0.88})`,
        filter: "none",
        opacity: 0.9,
        zIndex: 16,
        left: isMobile ? "78%" : "68%",
        height: isMobile ? "13%" : "22%",
        bottom: isMobile ? "26%" : "11%",
        transition: baseTransition,
        willChange: "transform, opacity, left",
      };
    } else if (offset === 2) {
      return {
        position: "absolute" as const,
        aspectRatio: "0.6 / 1",
        transform: `translateX(-50%) scale(${isMobile ? 0.65 : 0.74})`,
        filter: "none",
        opacity: 0.75,
        zIndex: 9,
        left: isMobile ? "92%" : "85%",
        height: isMobile ? "11%" : "17%",
        bottom: isMobile ? "26%" : "12%",
        transition: baseTransition,
        willChange: "transform, opacity, left",
      };
    } else if (offset === 3) {
      return {
        position: "absolute" as const,
        aspectRatio: "0.6 / 1",
        transform: `translateX(-50%) scale(${isMobile ? 0.5 : 0.6})`,
        filter: "none",
        opacity: 0,
        pointerEvents: "none" as const,
        zIndex: 0,
        left: "50%",
        height: isMobile ? "9%" : "14%",
        bottom: isMobile ? "28%" : "14%",
        transition: baseTransition,
        willChange: "transform, opacity, left",
      };
    } else if (offset === 4) {
      return {
        position: "absolute" as const,
        aspectRatio: "0.6 / 1",
        transform: `translateX(-50%) scale(${isMobile ? 0.65 : 0.74})`,
        filter: "none",
        opacity: 0.75,
        zIndex: 9,
        left: isMobile ? "8%" : "15%",
        height: isMobile ? "11%" : "17%",
        bottom: isMobile ? "26%" : "12%",
        transition: baseTransition,
        willChange: "transform, opacity, left",
      };
    } else {
      return {
        position: "absolute" as const,
        aspectRatio: "0.6 / 1",
        transform: `translateX(-50%) scale(${isMobile ? 0.78 : 0.88})`,
        filter: "none",
        opacity: 0.9,
        zIndex: 16,
        left: isMobile ? "22%" : "32%",
        height: isMobile ? "13%" : "22%",
        bottom: isMobile ? "26%" : "11%",
        transition: baseTransition,
        willChange: "transform, opacity, left",
      };
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: `url("${GRAIN_DATA_URI}")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            opacity: 0.4,
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 top-[8%] sm:top-[11%] flex flex-col items-center justify-center pointer-events-none select-none text-center px-4"
          style={{
            zIndex: 2,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <h1
            className="font-extrabold uppercase leading-[0.95] text-white tracking-tight text-center"
            style={{
              fontSize: "clamp(34px, 7.8vw, 112px)",
              letterSpacing: "-0.03em",
              textShadow: "0 6px 30px rgba(0,0,0,0.18)",
            }}
          >
            <span className="block">24/7 CCTV</span>
            <span className="block">Surveillance</span>
            <span className="block">for Ultimate</span>
            <span className="block">Peace of Mind</span>
          </h1>
        </div>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((img, i) => (
            <div key={`${img.src}-${i}`} style={getItemStyle(i)}>
              <img
                src={img.src}
                alt={`STEC Secure CCTV & Security Hardware ${i + 1}`}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  userSelect: "none",
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="absolute bottom-6 left-4 sm:bottom-16 sm:left-20"
          style={{
            zIndex: 60,
            maxWidth: "320px",
          }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white"
            style={{
              opacity: 0.95,
              letterSpacing: "0.02em",
            }}
          >
            TOONHUB FIGURINES
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm text-white"
            style={{
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ToonhubHero;
