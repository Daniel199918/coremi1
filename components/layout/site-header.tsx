"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { navigation, primaryCta, siteConfig, type NavItem } from "@/content/site";
import { cn } from "@/utils";

/**
 * En-tête du site.
 *
 * Cinq entrées seulement, plus le bouton de devis : la barre reste
 * lisible et le logo garde de l'air. « Solutions » et « À propos »
 * ouvrent un sous-menu (survol + clavier sur desktop, accordéon sur
 * mobile).
 *
 * Sur l'accueil, tant que le hero vidéo occupe l'écran, l'en-tête est
 * transparent et en blanc ; il devient opaque dès la section suivante.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // L'en-tête reste transparent tant que le hero occupe le haut de l'écran.
  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setOverHero(false);
      return;
    }
    const compute = () => setOverHero(hero.getBoundingClientRect().bottom > 88);
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [isHome, pathname]);

  // Fermeture des menus à chaque navigation.
  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setOpenMobileGroup(null);
  }, [pathname]);

  // Menu mobile : on bloque le défilement de la page derrière.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Échap ferme tout ; un clic à l'extérieur ferme le sous-menu desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const overlay = overHero && !open;
  const isActive = (item: NavItem) =>
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href) ||
        (item.children?.some((c) => pathname.startsWith(c.href.split("#")[0] ?? c.href)) ?? false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        overlay
          ? "border-transparent bg-transparent"
          : scrolled
            ? "border-ink-950/10 bg-bone/95 shadow-[0_12px_32px_-24px_rgb(18_16_12/0.45)] backdrop-blur"
            : "border-ink-950/10 bg-bone"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-5 sm:px-8">
        {/* Logo — ratio d'origine préservé, hauteur fixe, largeur automatique */}
        <Link
          href="/"
          aria-label="COREMI — retour à l'accueil"
          className={cn(
            "shrink-0 py-4",
            overlay && "drop-shadow-[0_1px_10px_rgb(0_0_0/0.45)]"
          )}
        >
          <Logo variant={overlay ? "light" : "dark"} />
        </Link>

        {/* Navigation desktop */}
        <div ref={navRef} className="ml-auto hidden items-center gap-1 xl:flex">
          <nav aria-label="Navigation principale" className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(item);
              const hasChildren = Boolean(item.children?.length);
              const expanded = openMenu === item.label;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap px-3 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] transition-colors",
                      overlay
                        ? "text-white/85 hover:text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.5)]"
                        : active
                          ? "text-ink-950"
                          : "text-ink-600 hover:text-ink-950",
                      overlay && active && "text-white",
                      active &&
                        "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-accent-600"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(expanded ? null : item.label)}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] transition-colors",
                      overlay
                        ? "text-white/85 hover:text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.5)]"
                        : active
                          ? "text-ink-950"
                          : "text-ink-600 hover:text-ink-950",
                      overlay && active && "text-white",
                      active &&
                        "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-accent-600"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>

                  {expanded && (
                    <div className="absolute left-0 top-full z-50 w-[22rem] border border-ink-950/10 bg-bone p-2 shadow-[0_24px_48px_-24px_rgb(18_16_12/0.35)]">
                      <ul>
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-3 transition-colors hover:bg-bone-deep"
                            >
                              <span className="block text-sm font-semibold text-ink-950">
                                {child.label}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-ink-500">
                                {child.description}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sous 1536 px, le numéro écrit repoussait le bouton de devis
              hors écran : on garde l'icône seule, avec un nom accessible
              explicite pour les lecteurs d'écran. */}
          <a
            href={siteConfig.contact.phoneHref}
            aria-label={`Appeler le ${siteConfig.contact.phone}`}
            className={cn(
              "ml-3 flex items-center gap-2 whitespace-nowrap px-2 text-sm font-semibold transition-colors",
              overlay
                ? "text-white hover:text-accent-400 [text-shadow:0_1px_10px_rgb(0_0_0/0.5)]"
                : "text-ink-950 hover:text-accent-600"
            )}
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden 2xl:inline">{siteConfig.contact.phone}</span>
          </a>

          <Link
            href={primaryCta.href}
            className="btn-press ml-2 whitespace-nowrap bg-accent-600 px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-accent-700"
          >
            {primaryCta.label}
          </Link>
        </div>

        {/* Actions mobile */}
        <div className="ml-auto flex items-center gap-1 xl:hidden">
          <a
            href={siteConfig.contact.phoneHref}
            aria-label={`Appeler le ${siteConfig.contact.phone}`}
            className={cn(
              "p-2.5 transition-colors",
              overlay ? "text-white drop-shadow-[0_1px_10px_rgb(0_0_0/0.5)]" : "text-ink-950"
            )}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className={cn(
              "cursor-pointer p-2.5 transition-colors",
              overlay ? "text-white drop-shadow-[0_1px_10px_rgb(0_0_0/0.5)]" : "text-ink-950"
            )}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile — liens larges, actions principales fixées en bas */}
      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col bg-ink-950 transition-[opacity,visibility] duration-200 xl:hidden",
          // `invisible` (visibility:hidden) et pas seulement opacity-0 :
          // sans cela, les liens du menu fermé restent dans l'ordre de
          // tabulation et sont annoncés par les lecteurs d'écran.
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
          <ul className="flex flex-col">
            {navigation.map((item) => {
              if (!item.children?.length) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center border-b border-bone/10 py-5 font-display text-2xl text-bone"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const expanded = openMobileGroup === item.label;
              return (
                <li key={item.label} className="border-b border-bone/10">
                  <button
                    type="button"
                    onClick={() => setOpenMobileGroup(expanded ? null : item.label)}
                    aria-expanded={expanded}
                    className="flex w-full cursor-pointer items-center justify-between py-5 text-left font-display text-2xl text-bone"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("h-5 w-5 transition-transform", expanded && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                  {expanded && (
                    <ul className="pb-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block border-l-2 border-accent-600/50 py-3.5 pl-5 text-base text-stone-200"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Zone d'action, atteignable au pouce */}
        <div className="border-t border-bone/10 bg-ink-950 px-5 pb-8 pt-5">
          <Link
            href={primaryCta.href}
            className="btn-press block bg-accent-600 px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
          >
            {primaryCta.label}
          </Link>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center justify-center gap-2 border border-bone/25 px-4 py-3.5 text-sm font-semibold text-bone"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Appeler
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center justify-center gap-2 border border-bone/25 px-4 py-3.5 text-sm font-semibold text-bone"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Écrire
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
