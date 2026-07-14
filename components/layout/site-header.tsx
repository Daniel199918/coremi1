"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { navigation, siteConfig } from "@/content/site";
import { cn } from "@/utils";

/**
 * Header premium : sticky, changement subtil après scroll,
 * menu mobile plein écran accessible.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloque le scroll du fond quand le menu mobile est ouvert
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-navy-100 bg-white/95 shadow-sm shadow-navy-950/5 backdrop-blur"
          : "border-transparent bg-white"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          aria-label="COREMI — retour à l'accueil"
          className={cn("py-3 transition-all duration-300", scrolled ? "scale-[0.94]" : "")}
        >
          <Logo variant="dark" />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-accent-600"
                    : "text-navy-900/80 hover:bg-navy-50 hover:text-navy-950"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-navy-950 transition-colors hover:text-accent-600"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.contact.phone}
          </a>
          <ButtonLink href="/contact" variant="accent">
            Demander un devis
          </ButtonLink>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="rounded-md p-2.5 text-navy-950 hover:bg-navy-50 lg:hidden"
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Menu mobile plein écran */}
      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-x-0 top-[65px] bottom-0 z-40 flex flex-col bg-navy-950 px-6 py-8 transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-3.5 font-display text-xl font-semibold text-white hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 pb-4">
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3.5 font-semibold text-white"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            {siteConfig.contact.phone}
          </a>
          <ButtonLink href="/contact" variant="accent" size="lg" className="w-full">
            Demander un devis gratuit
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
