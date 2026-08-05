import Image from "next/image";
import { cn } from "@/utils";

/**
 * Logo de marque tierce (fabricant) — composant unique et réutilisable.
 *
 * Garanties de rendu :
 * - le ratio d'origine est toujours conservé : hauteur maximale + largeur
 *   automatique + `object-contain`, jamais de dimensions imposées ;
 * - une hauteur de tuile commune donne une échelle cohérente entre des
 *   logos de proportions très différentes ;
 * - un espace de protection interne évite que le logo touche un bord ;
 * - le fond s'adapte au fichier : `tone="dark"` pour un logo fourni en
 *   version blanche, qui serait invisible sur fond clair ;
 * - un texte alternatif descriptif est obligatoire.
 *
 * Les fichiers ne sont ni recolorés, ni recadrés, ni redessinés : ce sont
 * les fichiers publiés par les fabricants sur leurs sites officiels.
 */

type BrandLogoProps = {
  name: string;
  /** Chemin du fichier officiel, `null` s'il n'est pas encore disponible. */
  src: string | null;
  /** Dimensions intrinsèques, nécessaires au calcul du ratio. */
  width?: number;
  height?: number;
  /** Fond de la tuile : `dark` pour les logos fournis en blanc. */
  tone?: "light" | "dark";
  className?: string;
};

export function BrandLogo({
  name,
  src,
  width,
  height,
  tone = "light",
  className,
}: BrandLogoProps) {
  if (!src || !width || !height) {
    return (
      <div
        className={cn(
          "flex h-20 w-full items-center justify-center border border-dashed border-ink-950/25 bg-bone px-5",
          className
        )}
      >
        <span className="text-center">
          <span className="block font-display text-lg leading-tight text-ink-950">{name}</span>
          <span className="mt-0.5 block text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">
            logo officiel à fournir
          </span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-20 w-full items-center justify-center border px-6",
        tone === "dark" ? "border-ink-950/15 bg-ink-950" : "border-ink-950/10 bg-bone",
        className
      )}
    >
      <Image
        src={src}
        alt={`Logo ${name}`}
        width={width}
        height={height}
        className="max-h-9 w-auto max-w-full object-contain"
        sizes="220px"
      />
    </div>
  );
}
