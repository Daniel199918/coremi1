import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de COREMI, entreprise de construction et châssis.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

/**
 * ⚠️ PAGE À COMPLÉTER avec les informations légales officielles de COREMI :
 * numéro d'entreprise (BCE), numéro de TVA, siège social, assurances, etc.
 */
export default function MentionsLegalesPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero title="Mentions légales" />
      <section className="py-16">
        <Container className="max-w-3xl space-y-8 leading-relaxed text-ink-600">
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">Éditeur du site</h2>
            <p className="mt-3">
              {siteConfig.legalName}
              <br />
              {contact.address.street}, {contact.address.postalCode} {contact.address.city},{" "}
              {contact.address.country}
              <br />
              {contact.phone ? `Téléphone : ${contact.phone} — ` : ""}E-mail : {contact.email}
              <br />
              Numéro d&apos;entreprise (BCE) : <strong>{siteConfig.enterpriseNumber}</strong>
              <br />
              TVA : <strong>{siteConfig.vatNumber}</strong>
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">Hébergement</h2>
            <p className="mt-3">
              Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
              États-Unis — vercel.com
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">
              Propriété intellectuelle
            </h2>
            <p className="mt-3">
              L&apos;ensemble des contenus de ce site (textes, images, logo, mise en page) est
              la propriété de {siteConfig.legalName}, sauf mention contraire. Toute
              reproduction sans autorisation préalable est interdite.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">Responsabilité</h2>
            <p className="mt-3">
              Les informations publiées sur ce site sont fournies à titre indicatif et peuvent
              être modifiées à tout moment. Seul un devis signé engage contractuellement{" "}
              {siteConfig.legalName}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
