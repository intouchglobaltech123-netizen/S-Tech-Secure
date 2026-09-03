import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const stats: StatItem[] = [
  { value: 500, suffix: "+", label: "Installations Completed", icon: "📷" },
  { value: 6, suffix: "+", label: "Years Experience", icon: "🏆" },
  { value: 50, suffix: "+", label: "Trusted Brands", icon: "🔒" },
  { value: 24, suffix: "/7", label: "Support Available", icon: "⚡" },
];

function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({ stat, started }: { stat: StatItem; started: boolean }) {
  const count = useCountUp(stat.value, 1800, started);
  return (
    <div className="group relative flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl bg-white border border-neutral-100 shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_45px_rgba(255,122,0,0.12)] hover:border-[#FF7A00]/25 transition-all duration-300 hover:-translate-y-1">
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {stat.icon}
      </div>

      {/* Counter */}
      <div className="flex items-end gap-0.5 mb-2">
        <span className="text-5xl sm:text-6xl font-black text-[#111827] leading-none tabular-nums">
          {count}
        </span>
        <span className="text-3xl sm:text-4xl font-black text-[#FF7A00] leading-none mb-1">
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm font-semibold text-[#6B7280] tracking-wide uppercase">
        {stat.label}
      </p>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-[#FF7A00] to-[#FF8F00] rounded-full transition-all duration-500" />
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 px-6 sm:px-12 lg:px-[100px]"
      aria-label="STEC Secure statistics and achievements"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="h-2 w-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
              PROVEN TRACK RECORD
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
            Trusted by Hundreds Across <span className="text-[#FF7A00]">Tamil Nadu</span>
          </h2>
          <p className="mt-3 text-[#4B5563] text-sm sm:text-base font-normal max-w-xl">
            From homes to factories — our numbers reflect the trust thousands of customers have placed in us.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
