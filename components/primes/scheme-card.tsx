import { ExternalLink } from "lucide-react";
import {
  statusLabels,
  type Scheme,
  type SchemeStatus,
} from "@/content/primes";
import { cn } from "@/utils";

/**
 * Pastille de statut d'un dispositif. Le statut est délibérément visible :
 * une aide « suspendue » ou « à vérifier » n'a pas la même valeur qu'une
 * aide ouverte, et le lecteur doit le voir avant de lire le reste.
 */
export function StatusBadge({ status }: { status: SchemeStatus }) {
  const tone: Record<SchemeStatus, string> = {
    actif: "border-emerald-700/30 bg-emerald-700/10 text-emerald-900",
    modifie: "border-amber-700/30 bg-amber-700/10 text-amber-900",
    suspendu: "border-accent-600/30 bg-accent-600/10 text-accent-800",
    termine: "border-ink-950/25 bg-ink-950/5 text-ink-600",
    "a-verifier": "border-ink-950/25 bg-bone-deep text-ink-700",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
        tone[status]
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

/**
 * Fiche d'un dispositif d'aide.
 *
 * Le résumé et le statut sont visibles immédiatement ; le détail
 * (conditions, documents, étapes, erreurs fréquentes) est replié dans un
 * `<details>` natif — pas de JavaScript, et le contenu reste accessible
 * au clavier comme aux moteurs de recherche.
 */
export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const s = scheme;
  return (
    <article id={s.id} className="border border-ink-950/15 bg-bone">
      <div className="border-b border-ink-950/10 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h3 className="font-display text-2xl leading-snug text-ink-950">{s.name}</h3>
          <StatusBadge status={s.status} />
        </div>
        {s.statusNote && (
          <p className="mt-2 text-sm font-medium text-ink-700">{s.statusNote}</p>
        )}
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-600">{s.summary}</p>

        {(s.startDate || s.endDate) && (
          <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-2 text-sm">
            {s.startDate && (
              <div>
                <dt className="inline text-ink-500">Début : </dt>
                <dd className="inline font-medium text-ink-950">{s.startDate}</dd>
              </div>
            )}
            {s.endDate && (
              <div>
                <dt className="inline text-ink-500">Fin : </dt>
                <dd className="inline font-medium text-ink-950">{s.endDate}</dd>
              </div>
            )}
          </dl>
        )}

        {/* Travaux concernés */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {s.works.map((w) => (
            <li key={w} className="border border-ink-950/20 px-3 py-1.5 text-xs text-ink-700">
              {w}
            </li>
          ))}
        </ul>
      </div>

      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-700 transition-colors hover:bg-bone-deep sm:px-8">
          Conditions, documents et étapes
          <span aria-hidden="true" className="text-accent-600 group-open:hidden">
            +
          </span>
          <span aria-hidden="true" className="hidden text-accent-600 group-open:inline">
            −
          </span>
        </summary>

        <div className="space-y-8 border-t border-ink-950/10 px-6 py-7 sm:px-8">
          {/* Conditions */}
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Principales conditions
            </h4>
            <dl className="mt-4 border-t border-ink-950/10">
              {s.conditions.map((c) => (
                <div key={c.title} className="border-b border-ink-950/10 py-4">
                  <dt className="font-semibold text-ink-950">{c.title}</dt>
                  <dd className="mt-1.5 leading-relaxed text-ink-600">{c.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Méthode de calcul */}
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Comment le montant se calcule
            </h4>
            <p className="mt-3 leading-relaxed text-ink-600">{s.amountMethod}</p>
          </section>

          {/* Documents */}
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Documents généralement nécessaires
            </h4>
            <ul className="mt-3 space-y-2">
              {s.documents.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed text-ink-600">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent-600" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* Étapes */}
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Étapes de la demande
            </h4>
            <ol className="mt-3 space-y-3">
              {s.steps.map((st, i) => (
                <li key={st} className="flex gap-4 leading-relaxed text-ink-600">
                  <span className="font-display text-base font-medium leading-6 text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {st}
                </li>
              ))}
            </ol>
          </section>

          {/* Erreurs fréquentes */}
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Erreurs qui font échouer un dossier
            </h4>
            <ul className="mt-3 space-y-2">
              {s.mistakes.map((m) => (
                <li key={m} className="flex gap-3 leading-relaxed text-ink-600">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-ink-950/40" />
                  {m}
                </li>
              ))}
            </ul>
          </section>

          {/* Sources + date */}
          <section className="border-t border-ink-950/10 pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Sources officielles
            </h4>
            <ul className="mt-3 space-y-2">
              {s.sources.map((src) => (
                <li key={src.href}>
                  <a
                    href={src.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-sm font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                  >
                    {src.label}
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-500">
              Informations vérifiées le {s.lastChecked}. Seule l&apos;administration
              compétente peut confirmer votre éligibilité.
            </p>
          </section>
        </div>
      </details>
    </article>
  );
}
