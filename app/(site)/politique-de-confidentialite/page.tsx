import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site COREMI : traitement des données du formulaire de contact, droits RGPD.",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false },
};

/**
 * ⚠️ PAGE À FAIRE VALIDER : ce texte est un modèle de base conforme à
 * l'esprit du RGPD, à faire relire/compléter par COREMI (ou un conseil
 * juridique) avant la mise en production définitive.
 */
export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero title="Politique de confidentialité" />
      <section className="py-16">
        <Container className="max-w-3xl space-y-8 leading-relaxed text-ink-600">
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">
              Responsable du traitement
            </h2>
            <p className="mt-3">
              {siteConfig.legalName}, joignable à l&apos;adresse {siteConfig.contact.email},
              est responsable du traitement des données collectées sur ce site.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">
              Données collectées et finalité
            </h2>
            <p className="mt-3">
              Lorsque vous remplissez le formulaire de demande de devis, nous collectons
              uniquement les informations nécessaires au traitement de votre demande : nom,
              prénom, téléphone, adresse e-mail, commune et description de votre projet.
              Ces données sont utilisées exclusivement pour vous recontacter et établir
              votre devis. Elles ne sont ni revendues, ni utilisées à des fins publicitaires.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">
              Durée de conservation
            </h2>
            <p className="mt-3">
              Vos données sont conservées le temps du traitement de votre demande et, en cas
              de collaboration, pendant la durée légale applicable aux documents
              contractuels et comptables.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">Vos droits</h2>
            <p className="mt-3">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement, de limitation et d&apos;opposition concernant
              vos données personnelles. Pour l&apos;exercer, contactez-nous à{" "}
              {siteConfig.contact.email}. Vous pouvez également introduire une réclamation
              auprès de l&apos;Autorité de protection des données belge
              (autoriteprotectiondonnees.be).
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950">Cookies</h2>
            <p className="mt-3">
              Ce site n&apos;utilise pas de cookies publicitaires ni de traçage tiers. Seuls
              des cookies techniques strictement nécessaires au fonctionnement du site
              peuvent être déposés.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
