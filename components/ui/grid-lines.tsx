import { cn } from "@/utils";

/**
 * Hairlines verticales façon plan d'architecte, en arrière-plan de section.
 * Purement décoratif (aria-hidden), très faible contraste.
 */
export function GridLines({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 hidden lg:block", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 calc(100% / 6 - 1px), ${
          tone === "dark" ? "rgba(251,250,247,0.05)" : "rgba(19,17,9,0.05)"
        } calc(100% / 6 - 1px) calc(100% / 6))`,
      }}
    />
  );
}

/** Petit repère « + » de plan d'architecte. */
export function PlusMark({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none font-sans text-lg font-light",
        tone === "dark" ? "text-bone/25" : "text-ink-950/20",
        className
      )}
    >
      +
    </span>
  );
}
