import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 sm:py-32", className)}
    >
      <div className={cn(bleed ? "w-full" : "mx-auto w-full max-w-7xl px-5 sm:px-6")}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.05] font-semibold text-gradient-steel">
        {title}
      </h2>
      {copy ? <p className="mt-5 text-muted-foreground">{copy}</p> : null}
    </div>
  );
}
