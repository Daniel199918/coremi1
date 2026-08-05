import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { modalites } from "@/content/facts";
import { siteConfig } from "@/content/site";

/**
 * « Clair, du devis au paiement » : réassurance commerciale (devis,
 * paiement échelonné, suivi, aides) présentée en tableau éditorial
 * numéroté façon cahier des charges, avec un accès WhatsApp direct.
 * Inspiré de la clarté commerciale des entreprises générales belges,
 * dans la direction artistique COREMI.
 */
export function PracticalSection() {
  const { contact } = siteConfig;

  return (
    <section className="py-24 sm:py-32" aria-labelledby="modalites">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                index="06"
                eyebrow="Travailler avec nous"
                title="Clair, du devis au paiement"
                description="Pas de zone grise. Vous savez à l'avance ce que vous payez, quand, et à qui vous parlez. Le reste, ce sont les travaux."
              />
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 border-t border-ink-950/10 pt-8">
                <p className="text-sm leading-relaxed text-ink-600">
                  Une question avant de vous lancer ? Le plus simple reste un mot direct.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center justify-center gap-3 border border-ink-950/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Écrire sur WhatsApp
                  </a>
                  <Link
                    href="/devis"
                    className="btn-press group inline-flex items-center justify-center gap-3 bg-accent-600 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
                  >
                    Demander une analyse gratuite
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Tableau des modalités */}
          <div className="lg:col-span-8">
            <div className="border-t border-ink-950/15">
              {modalites.map((item, i) => (
                <Reveal key={item.kicker} delay={0.05 * i}>
                  <div className="grid gap-x-8 gap-y-3 border-b border-ink-950/15 py-8 sm:grid-cols-[8rem_1fr]">
                    <div>
                      <span className="annotation text-accent-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                        {item.kicker}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-medium text-ink-950">{item.title}</h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-ink-600">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mt-5 text-sm text-ink-500">
                TVA réduite et aides mentionnées à titre informatif : l&apos;éligibilité
                dépend de votre situation et de la réglementation en vigueur au moment
                des travaux.{" "}
                <Link
                  href="/prix-et-aides"
                  className="font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                >
                  Comment se construit un prix
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
