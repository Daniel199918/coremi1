import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { MaterialsTable } from "@/components/chassis/materials-table";
import { OpeningSchemas } from "@/components/chassis/opening-schemas";
import { CtaSection } from "@/components/home/cta-section";
import { chassisPrestations } from "@/content/chassis";

export const metadata: Metadata = {
  title: "Pose et remplacement de châssis PVC et aluminium à Bruxelles",
  description:
    "Châssis PVC, aluminium et bois, portes d'entrée et vitrages à Bruxelles et en Brabant wallon. Prise de mesures, conseil sur les matériaux, pose soignée avec finitions intérieures.",
  alternates: { canonical: "/chassis" },
};

export default function ChassisPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Châssis & portes"
        title="Le bon châssis, bien posé, change toute la maison"
        description="Isolation, silence, luminosité, sécurité : vos châssis travaillent tous les jours. Nous vous aidons à choisir le bon matériau, puis nous le posons dans les règles de l'art."
      />

      {/* Comparaison des matériaux */}
      <section className="py-20 sm:py-28" aria-labelledby="materiaux">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Choisir son matériau"
              title="PVC, aluminium ou bois ?"
              description="Il n'y a pas de meilleur matériau dans l'absolu. Il y a celui qui convient à votre maison, à vos habitudes et à votre budget. Voici comment nous les comparons avec vous."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14">
              <MaterialsTable />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-sm text-ink-500">
              Le choix se confirme toujours sur place, châssis existants sous les yeux.
              La visite et le conseil font partie du devis gratuit.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Prestations châssis */}
      <section
        id="portes"
        className="scroll-mt-28 border-y border-ink-950/10 bg-bone-deep py-20 sm:py-28"
        aria-labelledby="prestations-chassis"
      >
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Nos prestations"
              title="Châssis, portes, vitrages"
              description="Du remplacement d'un seul vitrage au renouvellement complet des menuiseries d'une habitation."
            />
            <div className="img-drift relative mt-10 hidden aspect-[4/3] overflow-hidden bg-stone-100 lg:block">
              <Image
                src="/images/realisations/entree-chassis-noirs.jpg"
                alt="Menuiseries en aluminium noir posées par COREMI : entrée vitrée toute hauteur et porte de garage sectionnelle noire."
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            {chassisPrestations.map((prestation, i) => (
              <Reveal key={prestation.title} delay={0.05 * i}>
                <article className="border-b border-ink-950/10 py-7 first:border-t">
                  <h3 className="flex items-baseline gap-4 font-display text-2xl text-ink-950">
                    <span className="text-sm font-sans font-semibold tracking-widest text-accent-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {prestation.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-600 lg:pl-10">
                    {prestation.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Types d'ouverture — schémas techniques */}
      <section className="py-20 sm:py-28" aria-labelledby="ouvertures">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Types d'ouverture"
              title="Fixe, battant ou oscillo-battant ?"
              description="Chaque baie a son usage. Nous dessinons le bon type d'ouverture pièce par pièce, comme sur un plan de menuiserie."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14">
              <OpeningSchemas />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Isolation, en clair */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
              <span className="text-accent-600">03</span> Isolation
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-display text-3xl font-medium leading-snug text-ink-950 sm:text-4xl">
              Des châssis récents avec un vitrage performant réduisent les pertes de
              chaleur et le bruit de la rue. L&apos;écart se sent dès le premier hiver,
              et sur la facture.
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-600">
              Nous dimensionnons le vitrage selon l&apos;orientation et l&apos;usage de
              chaque pièce : double ou triple vitrage, verre acoustique côté rue,
              vitrage sécurisé au rez-de-chaussée. Sans survendre ce dont vous
              n&apos;avez pas besoin.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
