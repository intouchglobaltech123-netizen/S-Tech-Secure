import { Suspense, lazy, useEffect, useState } from "react";
import { useHydrated, useReducedMotion } from "@/hooks/use-reduced-motion";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/** Premium static fallback when WebGL is unavailable. */
function StaticFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-48 w-72">
        <div className="absolute inset-0 atmos-glow" />
        <div className="absolute left-1/2 top-1/2 h-16 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-surface-elevated via-foreground/70 to-surface-elevated opacity-80 blur-[1px]" />
        <div className="absolute left-[76%] top-1/2 h-14 w-14 -translate-y-1/2 rounded-full border border-border-strong bg-background shadow-glow" />
      </div>
    </div>
  );
}

export function WebglCameraStage({ onActive }: { onActive?: (index: number) => void }) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(hasWebgl());
  }, []);

  if (!hydrated || supported === null) return <StaticFallback />;
  if (!supported) return <StaticFallback />;

  return (
    <Suspense fallback={<StaticFallback />}>
      <HeroScene reducedMotion={reduced} {...(onActive ? { onActive } : {})} />
    </Suspense>
  );
}
