import Image from "next/image";
import { cn } from "@/utils";

type LogoProps = {
  /** "dark" = logo à texte foncé (fond clair) · "light" = logo à texte blanc (fond sombre) */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Logo officiel COREMI, détouré sur fond transparent (PNG avec canal
 * alpha). Aucune boîte de fond quelle que soit la surface : la version
 * à texte foncé s'utilise sur fond clair, celle à texte blanc sur fond
 * sombre. Le dessin du logo n'est pas modifié — seul l'arrière-plan a
 * été rendu transparent.
 */
export function Logo({ variant = "dark", className }: LogoProps) {
  const light = variant === "light";

  return (
    <Image
      src={light ? "/images/logo-coremi-texte-blanc.png" : "/images/logo-coremi-texte-fonce.png"}
      alt="COREMI — Construction & Châssis"
      width={light ? 1527 : 1516}
      height={light ? 356 : 354}
      priority={!light}
      className={cn("h-9 w-auto md:h-10", className)}
    />
  );
}
