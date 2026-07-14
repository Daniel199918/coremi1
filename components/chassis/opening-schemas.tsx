/**
 * Schémas techniques des types d'ouverture de châssis, dessinés en SVG
 * selon la convention des menuisiers : les pointillés convergent vers
 * le côté des charnières.
 */

type SchemaProps = { className?: string };

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 100 120" className="w-full" role="img" aria-hidden="true">
      <rect x="4" y="4" width="92" height="112" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="14" y="14" width="72" height="92" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {children}
    </svg>
  );
}

const dash = { stroke: "var(--color-accent-600)", strokeWidth: 1.8, strokeDasharray: "5 4", fill: "none" } as const;

export const openingSchemas: {
  name: string;
  description: string;
  Schema: (props: SchemaProps) => React.ReactNode;
}[] = [
  {
    name: "Fixe",
    description: "Un maximum de lumière, aucune ouverture. Idéal en allège ou en imposte.",
    Schema: () => (
      <Frame>
        <line x1="14" y1="14" x2="86" y2="106" {...dash} />
        <line x1="86" y1="14" x2="14" y2="106" {...dash} />
      </Frame>
    ),
  },
  {
    name: "Battant",
    description: "Ouverture à la française, vers l'intérieur. Le classique des pièces de vie.",
    Schema: () => (
      <Frame>
        <path d="M 14 14 L 86 60 L 14 106" {...dash} />
      </Frame>
    ),
  },
  {
    name: "Oscillo-battant",
    description: "Bascule pour aérer, ouvre en grand pour nettoyer. Le plus demandé.",
    Schema: () => (
      <Frame>
        <path d="M 14 14 L 86 60 L 14 106" {...dash} />
        <path d="M 14 106 L 50 14 L 86 106" {...dash} />
      </Frame>
    ),
  },
];

/** Bande de schémas d'ouverture, style dessin technique. */
export function OpeningSchemas() {
  return (
    <ul className="grid gap-px border border-ink-950/15 bg-ink-950/15 sm:grid-cols-3">
      {openingSchemas.map(({ name, description, Schema }) => (
        <li key={name} className="bg-bone p-8 text-ink-900">
          <div className="mx-auto max-w-[9rem]">
            <Schema />
          </div>
          <h3 className="annotation mt-6 text-ink-950">{name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
        </li>
      ))}
    </ul>
  );
}
