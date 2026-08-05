import Image from "next/image";
import { cn } from "@/utils";

/**
 * Logo de marque tierce (fabricant) — composant unique et réutilisable.
 *
 * Garanties de rendu :
 * - le ratio d'origine est toujours conservé (`object-contain`, jamais
 *   `cover`, jamais de largeur et de hauteur imposées ensemble) ;
 * - une hauteur maximale commune donne une échelle visuelle cohérente
 *   entre des logos de proportions très différentes ;
 * - un espace de protection interne évite que le logo ne touche un bord
 *   ou un logo voisin ;
 * - le fond est neutre et clair, pour la lisibilité des logos sombres
 *   comme colorés ;
 * - un texte alternatif descriptif est obligatoire.
 *
 * ⚠️ TANT QU'AUCUN FICHIER OFFICIEL N'EST FOURNI, le composant affiche
 * un emplacement réservé portant le nom de la marque. C'est volontaire :
 * récupérer un logo depuis un moteur de recherche poserait un problème
 * de qualité et de droits d'usage. Voir `brands.ts` pour la liste
 * précise des fichiers attendus.
 */

type BrandLogoProps = {
  name: string;
  /** Chemin du fichier officiel, `null` tant qu'il n'a pas été fourni. */
  src: string | null;
  /** Dimensions intrinsèques du fichier, nécessaires au calcul du ratio. */
  width?: number;
  height?: number;
  className?: string;
};

export function BrandLogo({ name, src, width, height, className }: BrandLogoProps) {
  if (!src || !width || !height) {
    return (
      <div
        className={cn(
          "flex h-16 w-full items-center justify-center border border-dashed border-ink-950/25 bg-bone px-5",
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
        "flex h-16 w-full items-center justify-center border border-ink-950/10 bg-bone px-5",
        className
      )}
    >
      <Image
        src={src}
        alt={`Logo ${name}`}
        width={width}
        height={height}
        className="max-h-10 w-auto object-contain"
        sizes="200px"
      />
    </div>
  );
}
