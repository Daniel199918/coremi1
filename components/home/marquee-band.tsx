/**
 * Bande typographique défilante : les métiers en très grand corps
 * serif au trait, en séparateur de sections. Purement décorative
 * (aria-hidden), CSS seul, en pause au survol et en mouvement réduit.
 */
const items = [
  "Rénovation",
  "Transformation",
  "Annexes",
  "Châssis",
  "Menuiseries extérieures",
  "Finitions",
];

export function MarqueeBand() {
  return (
    <section aria-hidden="true" className="marquee border-y border-ink-950/10 bg-bone-deep py-7">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-baseline">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-baseline whitespace-nowrap px-6 font-display text-5xl font-medium tracking-tight text-transparent sm:text-6xl [-webkit-text-stroke:1px_var(--color-stone-400)]"
              >
                {item}
                <span
                  aria-hidden="true"
                  className="ml-12 inline-block h-2.5 w-2.5 self-center bg-accent-600 [-webkit-text-stroke:0]"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
