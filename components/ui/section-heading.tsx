import { cn } from "@/utils";

type SectionHeadingProps = {
  /** Index éditorial de section, ex. "01". */
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "dark" pour les sections sur fond anthracite. */
  tone?: "light" | "dark";
  className?: string;
};

/** En-tête de section éditorial : index, surtitre, grand titre serif. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {(index || eyebrow) && (
        <p
          className={cn(
            "mb-5 flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.25em]",
            align === "center" && "justify-center",
            dark ? "text-stone-300" : "text-ink-500"
          )}
        >
          {index && <span className="text-accent-600">{index}</span>}
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl",
          dark ? "text-bone" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-stone-200/85" : "text-ink-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
