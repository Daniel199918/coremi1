import { cn } from "@/utils";

type LogoProps = {
  /** "dark" = texte anthracite (fond clair) · "light" = texte blanc cassé (fond sombre) */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Logo COREMI (recréation vectorielle du logo officiel :
 * toit rouge, silhouette maison avec fenêtre et escalier, wordmark).
 * Remplaçable par un fichier définitif dans /public si besoin.
 */
export function Logo({ variant = "dark", className }: LogoProps) {
  const ink = variant === "light" ? "#fbfaf7" : "#1d1b16";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 56"
        aria-hidden="true"
        className="h-9 w-auto shrink-0 md:h-10"
        fill="none"
      >
        <path
          d="M4 42 30 10l14 17"
          stroke="#d7282f"
          strokeWidth="7"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path d="M47 34V12h6v44" stroke={ink} strokeWidth="6" strokeLinecap="square" />
        <path d="M17 28v22M17 50h27" stroke={ink} strokeWidth="5" strokeLinecap="square" />
        <path d="M22 30h9v9h-9zM26.5 30v9M22 34.5h9" stroke={ink} strokeWidth="2.4" />
        <path d="M34 34h5v5h5v5h5" stroke={ink} strokeWidth="4" strokeLinecap="square" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-lg font-bold tracking-[0.22em] md:text-xl"
          style={{ color: ink }}
        >
          COREMI
        </span>
        <span
          className="mt-1 text-[0.5rem] font-medium tracking-[0.3em] md:text-[0.55rem]"
          style={{ color: ink, opacity: 0.7 }}
        >
          CONSTRUCTION &amp; CHÂSSIS
        </span>
      </span>
    </span>
  );
}
