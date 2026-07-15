import Image from "next/image";
import { cn } from "@/utils";

type LogoProps = {
  /** "dark" = version fond clair (header) · "light" = version fond sombre (footer, menu) */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Logo officiel COREMI, affiché tel quel depuis les fichiers fournis
 * (aucune recréation ni retouche du dessin ; seules les marges vides
 * ont été recadrées). Le fond du fichier (blanc pur ou noir pur) est
 * fondu dans la couleur de la page via mix-blend-mode, ce qui n'altère
 * pas le logo lui-même.
 */
export function Logo({ variant = "dark", className }: LogoProps) {
  const light = variant === "light";

  return (
    <Image
      src={light ? "/images/logo-coremi-fond-sombre.webp" : "/images/logo-coremi-fond-clair.webp"}
      alt="COREMI — Construction & Châssis"
      width={light ? 1527 : 1516}
      height={light ? 356 : 354}
      priority={!light}
      className={cn(
        "h-9 w-auto md:h-10",
        light ? "mix-blend-screen" : "mix-blend-multiply",
        className
      )}
    />
  );
}
