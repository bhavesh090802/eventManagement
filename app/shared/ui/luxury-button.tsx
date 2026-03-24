import type { PropsWithChildren } from "react";
import { cn } from "../lib/cn";

type LuxuryButtonProps = PropsWithChildren<{
  className?: string;
}>;

export function LuxuryButton({ children, className }: LuxuryButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative overflow-hidden rounded-full border border-[var(--color-gold)]",
        "bg-[var(--color-charcoal)] px-6 py-3 text-sm tracking-[0.18em] text-[var(--color-alabaster)] uppercase",
        "transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#f6e29a]/55 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
