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

  /*
   * Le fichier fait ~1520 × 355 px, soit un ratio d'environ 4,3:1.
   * On fixe la hauteur et on laisse la largeur suivre (`w-auto`) : le
   * ratio d'origine est donc toujours respecté, jamais étiré. `contain`
   * garantit le même résultat même si une règle extérieure venait à
   * contraindre la boîte. `sizes` évite de télécharger une image bien
   * plus large que la taille réellement affichée.
   */
  return (
    <Image
      src={light ? "/images/logo-coremi-texte-blanc.png" : "/images/logo-coremi-texte-fonce.png"}
      alt="COREMI — Construction & Châssis"
      width={light ? 1527 : 1516}
      height={light ? 356 : 354}
      priority
      sizes="(max-width: 640px) 150px, 200px"
      className={cn("h-8 w-auto object-contain sm:h-9 lg:h-10", className)}
    />
  );
}
