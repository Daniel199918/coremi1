import { materials } from "@/content/chassis";

/** Comparaison éditoriale des matériaux de châssis (PVC / alu / bois). */
export function MaterialsTable() {
  return (
    <div className="grid gap-px border border-ink-950/10 bg-ink-950/10 lg:grid-cols-3">
      {materials.map((material, i) => (
        <article key={material.name} className="flex flex-col bg-bone p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-display text-3xl text-ink-950">{material.name}</h3>
          <p className="mt-2 text-sm font-medium text-ink-600">{material.strapline}</p>
          <dl className="mt-8 flex-1 space-y-4 border-t border-ink-950/10 pt-6">
            {material.points.map((point) => (
              <div key={point.label} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm">
                <dt className="font-semibold uppercase tracking-wider text-ink-500 text-[0.68rem] leading-5">
                  {point.label}
                </dt>
                <dd className="text-ink-800">{point.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 border-l-2 border-accent-600 pl-4 text-sm leading-relaxed text-ink-600">
            {material.bestFor}
          </p>
        </article>
      ))}
    </div>
  );
}
