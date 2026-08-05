import type { Metadata } from "next";
import { Clock, ShieldCheck, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GridLines } from "@/components/ui/grid-lines";
import { QuoteQuiz } from "@/components/forms/quote-quiz";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Demander un devis gratuit — châssis, portes, vitrages",
  description:
    "Décrivez votre projet en quelques questions : châssis, portes, vitrages ou rénovation. Devis détaillé gratuit, sans engagement, à Bruxelles et en Brabant wallon.",
  alternates: { canonical: "/devis" },
};

const reassurance = [
  {
    icon: Wallet,
    title: "Gratuit et sans engagement",
    text: "La visite et le devis ne vous coûtent rien. Vous signez seulement si l'offre vous convient.",
  },
  {
    icon: ShieldCheck,
    title: "Aucun acompte au départ",
    text: "Vous ne payez rien avant le début des travaux, sauf la commande des châssis sur mesure.",
  },
  {
    icon: Clock,
    title: "Deux minutes, pas un formulaire",
    text: "Quelques questions simples. Vos coordonnées ne sont demandées qu'à la fin.",
  },
];

export default function DevisPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-950/10 bg-bone-deep">
        <GridLines />
        <Container className="relative py-14 sm:py-20">
          <p className="mb-5 flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
            <span className="text-accent-600">06</span> Demande de devis
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink-950 sm:text-5xl">
            Parlez-nous de votre projet
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            Pas de long formulaire : quelques questions, une réponse à la fois.
            Nous revenons vers vous pour convenir d&apos;une visite et établir un
            devis détaillé, poste par poste.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <QuoteQuiz />
            </div>

            <aside className="lg:col-span-5">
              <ul className="space-y-8">
                {reassurance.map((r) => {
                  const Icon = r.icon;
                  return (
                    <li key={r.title} className="flex gap-5">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
                      <div>
                        <h2 className="font-display text-xl text-ink-950">{r.title}</h2>
                        <p className="mt-2 leading-relaxed text-ink-600">{r.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 border-t border-ink-950/15 pt-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Vous préférez parler à quelqu&apos;un ?
                </h2>
                <div className="mt-4 space-y-2">
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="block font-display text-2xl text-ink-950 transition-colors hover:text-accent-600"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="block text-ink-600 underline decoration-accent-600 underline-offset-4 hover:text-ink-950"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-ink-500">
                  Zone d&apos;intervention : {siteConfig.serviceArea}.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
