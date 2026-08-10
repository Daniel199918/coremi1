import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { footerServiceLinks, navigation, siteConfig } from "@/content/site";
import { zones } from "@/content/zones";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="bg-ink-950 text-stone-200">
      {/* Bandeau CTA compact */}
      <div className="border-b border-bone/10">
        <Container className="flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
          <p className="max-w-md font-display text-3xl leading-tight text-bone">
            Parlez-nous de votre projet.
          </p>
          <Link
            href="/devis"
            className="btn-press bg-accent-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
          >
            Décrire mon projet
          </Link>
        </Container>
      </div>

      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marque */}
        <div>
          <Link href="/" aria-label="COREMI — retour à l'accueil">
            <Logo variant="light" />
          </Link>
          <p className="mt-6 text-sm leading-relaxed text-stone-300/80">
            Entreprise générale de construction et de châssis. Gros œuvre, rénovation,
            extensions et menuiseries extérieures à Bruxelles et en Brabant wallon.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Pages du site">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
            Navigation
          </h2>
          <ul className="mt-6 space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-stone-200/85 transition-colors hover:text-bone">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/avis" className="text-stone-200/85 transition-colors hover:text-bone">
                Avis clients
              </Link>
            </li>
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Nos services">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
            Services
          </h2>
          <ul className="mt-6 space-y-3 text-sm">
            {footerServiceLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-stone-200/85 transition-colors hover:text-bone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
            Contact
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-stone-200/85">
            {contact.phone && (
              <li>
                <a href={contact.phoneHref} className="transition-colors hover:text-bone">
                  {contact.phone}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-bone">
                {contact.email}
              </a>
            </li>
            <li className="pt-2 text-stone-300/70">
              Zone d&apos;intervention :
              <br />
              {siteConfig.serviceArea}
            </li>
          </ul>
        </div>
      </Container>

      {/* Maillage local : toutes les communes couvertes */}
      <Container className="border-t border-bone/10 py-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
          Nos zones d&apos;intervention
        </h2>
        <nav aria-label="Communes desservies" className="mt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-stone-200/70">
            {zones.map((zone) => (
              <li key={zone.slug}>
                <Link
                  href={`/zones/${zone.slug}`}
                  className="transition-colors hover:text-bone"
                >
                  {zone.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/zones"
          className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-accent-500 transition-colors hover:text-accent-400"
        >
          Voir toutes les zones
        </Link>
      </Container>

      {/* Wordmark fantôme : la marque en très grand corps, en filigrane */}
      <div aria-hidden="true" className="overflow-clip px-3">
        <p className="select-none whitespace-nowrap text-center font-display text-[clamp(4rem,16vw,16rem)] font-medium leading-[0.75] tracking-tight text-bone/[0.05]">
          COREMI
        </p>
      </div>

      <div className="border-t border-bone/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-stone-400/70 sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <nav aria-label="Liens légaux" className="flex gap-6">
            <Link href="/mentions-legales" className="transition-colors hover:text-bone">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="transition-colors hover:text-bone">
              Politique de confidentialité
            </Link>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
