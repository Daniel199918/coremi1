import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { QuoteForm } from "@/components/forms/quote-form";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact et demande de devis gratuit",
  description:
    "Contactez COREMI pour votre projet de construction, rénovation ou châssis à Bruxelles et en Brabant wallon. Devis gratuit et détaillé, réponse rapide.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Un projet en tête ? Parlons-en."
        description="Présentez-nous votre projet et recevez une première réponse adaptée à vos besoins, sans engagement."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Coordonnées */}
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-navy-950">
                  Nos coordonnées
                </h2>
                {/* ⚠️ Coordonnées temporaires — à confirmer dans content/site.ts */}
                <ul className="mt-6 space-y-5">
                  <li>
                    <a
                      href={contact.phoneHref}
                      className="group flex items-center gap-4"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950 text-white transition-colors group-hover:bg-accent-600">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-navy-900/50">
                          Téléphone
                        </span>
                        <span className="font-semibold text-navy-950">{contact.phone}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contact.email}`} className="group flex items-center gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950 text-white transition-colors group-hover:bg-accent-600">
                        <Mail className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-navy-900/50">
                          E-mail
                        </span>
                        <span className="font-semibold text-navy-950">{contact.email}</span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-white">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-navy-900/50">
                        Zone d&apos;intervention
                      </span>
                      <span className="font-semibold text-navy-950">{siteConfig.serviceArea}</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-white">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-navy-900/50">
                        Horaires
                      </span>
                      {contact.hours.map((h) => (
                        <span key={h.days} className="block text-sm text-navy-950">
                          <span className="font-semibold">{h.days}</span> : {h.hours}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-950 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Appeler maintenant
                </a>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy-200 px-6 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-navy-50"
                >
                  <MessageCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
                  Écrire sur WhatsApp
                </a>
              </div>

              {/* Zone géographique */}
              <div className="rounded-xl bg-navy-50 p-6">
                <h3 className="font-display font-bold text-navy-950">
                  Où intervenons-nous ?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
                  {siteConfig.serviceAreaDetail}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-950/5 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-navy-950">
                Demandez votre devis gratuit
              </h2>
              <p className="mt-2 text-sm text-navy-900/60">
                Les champs marqués d&apos;un{" "}
                <span className="text-accent-600" aria-hidden="true">*</span> sont
                obligatoires. Réponse rapide garantie.
              </p>
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
