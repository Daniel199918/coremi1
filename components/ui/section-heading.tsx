import { cn } from "@/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "dark" pour les sections sur fond marine. */
  tone?: "light" | "dark";
  className?: string;
};

/** En-tête de section uniforme : surtitre, titre H2, description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-[0.2em]",
            dark ? "text-accent-400" : "text-accent-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-navy-100/80" : "text-navy-900/70")}>
          {description}
        </p>
      )}
    </div>
  );
}
