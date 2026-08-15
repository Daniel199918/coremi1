import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GridLines } from "@/components/ui/grid-lines";
import { ChassisQuiz } from "@/components/chassis/chassis-quiz";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Quel châssis choisir ? — quiz d'orientation",
  description:
    "Onze questions pour cerner le matériau et le type de châssis adaptés à votre projet : priorités, dimensions, bruit, sécurité, budget.",
  alternates: { canonical: "/chassis/quiz" },
};

export default function ChassisQuizPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Châssis & portes", item: `${siteConfig.url}/chassis` },
      { "@type": "ListItem", position: 3, name: "Quiz", item: `${siteConfig.url}/chassis/quiz` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-ink-950/10 bg-bone-deep">
        <GridLines />
        <Container className="relative py-14 sm:py-20">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500"
          >
            <Link href="/chassis" className="hover:text-accent-700">
              Châssis &amp; portes
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-accent-600">Quiz</span>
          </nav>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink-950 sm:text-5xl">
            Quelle solution de châssis choisir ?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            Onze questions, deux minutes. Le résultat vous dit quel matériau se justifie
            dans votre cas, <em className="italic">pourquoi</em>, et surtout ce que vous
            acceptez en échange — parce qu&apos;il y a toujours un compromis.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ChassisQuiz />
            </div>
            <aside className="lg:col-span-5">
              <h2 className="font-display text-2xl text-ink-950">Comment ça marche</h2>
              <ul className="mt-6 space-y-6">
                {[
                  {
                    t: "Aucune marque n'est favorisée",
                    d: "Les fabricants ne sont cités que lorsqu'ils proposent réellement le matériau retenu. Aucun accord commercial n'intervient dans le résultat.",
                  },
                  {
                    t: "Le résultat s'explique",
                    d: "Chaque recommandation est justifiée par vos réponses, et accompagnée du compromis qu'elle implique.",
                  },
                  {
                    t: "Ce n'est pas un devis",
                    d: "Seule une visite sur place permet de valider une solution : l'état des baies ne se voit pas depuis un questionnaire.",
                  },
                  {
                    t: "Rien n'est envoyé",
                    d: "Vos réponses restent dans votre navigateur. Elles ne sont reprises dans une demande de devis que si vous cliquez explicitement.",
                  },
                ].map((i) => (
                  <li key={i.t}>
                    <h3 className="font-semibold text-ink-950">{i.t}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-600">{i.d}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-ink-950/15 pt-8">
                <p className="text-sm leading-relaxed text-ink-600">
                  Vous préférez comprendre avant de répondre ?{" "}
                  <Link
                    href="/chassis"
                    className="font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                  >
                    Le guide complet des châssis
                  </Link>{" "}
                  détaille les matériaux, le vitrage, la pose et les erreurs à éviter.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
