import { cn } from "@/utils";

type LogoProps = {
  /** "dark" = texte marine (fond clair) · "light" = texte blanc (fond marine) */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Logo COREMI (recréation vectorielle du logo officiel :
 * toit rouge, silhouette maison avec fenêtre et escalier, wordmark).
 * Remplaçable par un fichier définitif dans /public si besoin.
 */
export function Logo({ variant = "dark", className }: LogoProps) {
  const ink = variant === "light" ? "#ffffff" : "#16273c";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 56"
        aria-hidden="true"
        className="h-10 w-auto shrink-0 md:h-11"
        fill="none"
      >
        {/* Toit rouge */}
        <path
          d="M4 42 30 10l14 17"
          stroke="#d7282f"
          strokeWidth="7"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Cheminée */}
        <path d="M47 34V12h6v44" stroke={ink} strokeWidth="6" strokeLinecap="square" />
        {/* Mur + sol */}
        <path d="M17 28v22M17 50h27" stroke={ink} strokeWidth="5" strokeLinecap="square" />
        {/* Fenêtre */}
        <path
          d="M22 30h9v9h-9zM26.5 30v9M22 34.5h9"
          stroke={ink}
          strokeWidth="2.4"
        />
        {/* Escalier */}
        <path
          d="M34 34h5v5h5v5h5"
          stroke={ink}
          strokeWidth="4"
          strokeLinecap="square"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-xl font-bold tracking-[0.18em] md:text-2xl"
          style={{ color: ink }}
        >
          COREMI
        </span>
        <span
          className="mt-1 text-[0.55rem] font-medium tracking-[0.28em] md:text-[0.6rem]"
          style={{ color: ink, opacity: 0.75 }}
        >
          CONSTRUCTION &amp; CHÂSSIS
        </span>
      </span>
    </span>
  );
}
