import { useState } from "react";

/**
 * Numbered FAQ list with smooth open/close.
 * Answers always stay in the page HTML (just collapsed), so search engines can read them.
 */
export function FaqList({
  items,
  className = "",
  idPrefix = "faq",
}: {
  items: { q: string; a: string }[];
  className?: string;
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`rounded-3xl bg-white border border-neutral-200 divide-y divide-neutral-100 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const answerId = `${idPrefix}-answer-${i}`;
        return (
          <div key={item.q} className="px-5 sm:px-7">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group w-full flex items-start gap-4 py-5 text-left cursor-pointer"
              >
                <span
                  className={`pt-0.5 text-sm font-bold tabular-nums transition-colors ${
                    isOpen ? "text-[#FF7A00]" : "text-neutral-300"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 text-[15px] sm:text-base font-semibold leading-snug transition-colors ${
                    isOpen ? "text-[#111827]" : "text-neutral-700 group-hover:text-[#111827]"
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-base leading-none transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-[#FF7A00] bg-[#FF7A00] text-white"
                      : "border-neutral-200 text-neutral-500 group-hover:border-neutral-300"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={answerId}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pl-9 pr-11 text-sm sm:text-[15px] text-neutral-600 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FaqList;
