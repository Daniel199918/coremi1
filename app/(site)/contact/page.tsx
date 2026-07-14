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
    "Décrivez votre projet de construction, rénovation ou châssis à Bruxelles ou en Brabant wallon. Devis détaillé gratuit, réponse rapide, sans engagement.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        index="06"
        eyebrow="Contact"
        title="Racontez-nous votre projet"
        description="Trois minutes suffisent. Nous revenons vers vous rapidement avec une première réponse claire, puis un devis détaillé si vous souhaitez avancer."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Coordonnées */}
          <Reveal>
            <div>
              {/* ⚠️ Coordonnées temporaires — à confirmer dans content/site.ts */}
              <ul className="divide-y divide-ink-950/10 border-y border-ink-950/10">
                <li>
                  <a href={contact.phoneHref} className="group flex items-center gap-5 py-5">
                    <Phone className="h-5 w-5 text-accent-600" aria-hidden="true" />
                    <span>
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
                        Téléphone
                      </span>
                      <span className="font-display text-xl text-ink-950 group-hover:text-accent-600">
                        {contact.phone}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="group flex items-center gap-5 py-5">
                    <Mail className="h-5 w-5 text-accent-600" aria-hidden="true" />
                    <span>
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
                        E-mail
                      </span>
                      <span className="font-display text-xl text-ink-950 group-hover:text-accent-600">
                        {contact.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-5 py-5">
                  <MapPin className="h-5 w-5 text-accent-600" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
                      Zone d&apos;intervention
                    </span>
                    <span className="font-display text-xl text-ink-950">{siteConfig.serviceArea}</span>
                  </span>
                </li>
                <li className="flex items-start gap-5 py-5">
                  <Clock className="mt-1 h-5 w-5 text-accent-600" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
                      Horaires
                    </span>
                    {contact.hours.map((h) => (
                      <span key={h.days} className="block text-ink-800">
                        {h.days} : {h.hours}
                      </span>
                    ))}
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-3 bg-ink-950 px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:bg-ink-800"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Appeler maintenant
                </a>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-ink-950/25 px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:border-ink-950"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Écrire sur WhatsApp
                </a>
              </div>

              <div className="mt-10 border-l-2 border-accent-600 pl-5">
                <h2 className="font-display text-xl text-ink-950">Où intervenons-nous ?</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {siteConfig.serviceAreaDetail}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.1}>
            <div className="border border-ink-950/10 bg-bone p-6 sm:p-10">
              <h2 className="font-display text-3xl text-ink-950">Demande de devis gratuit</h2>
              <p className="mt-3 text-sm text-ink-500">
                Les champs marqués d&apos;un{" "}
                <span className="text-accent-600" aria-hidden="true">*</span> sont
                obligatoires. Vos données servent uniquement à traiter votre demande.
              </p>
              <div className="mt-10">
                <QuoteForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
