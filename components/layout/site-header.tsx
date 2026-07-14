"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { navigation, siteConfig } from "@/content/site";
import { cn } from "@/utils";

/**
 * Header éditorial : sticky, hairline, condensation subtile au scroll,
 * menu mobile plein écran anthracite.
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          ? "border-ink-950/10 bg-bone/95 backdrop-blur-sm"
          : "border-ink-950/10 bg-bone"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          aria-label="COREMI — retour à l'accueil"
          className={cn("py-3.5 transition-transform duration-300", scrolled && "scale-[0.92]")}
        >
          <Logo variant="dark" />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-5 xl:flex">
          {navigation.slice(1).map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                  active ? "text-ink-950" : "text-ink-600 hover:text-ink-950",
                  active &&
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent-600"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink-950 transition-colors hover:text-accent-600"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {siteConfig.contact.phone}
          </a>
          <Link
            href="/contact"
            className="whitespace-nowrap bg-accent-600 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-700"
          >
            Demander un devis
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="cursor-pointer p-2.5 text-ink-950 xl:hidden"
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Menu mobile plein écran */}
      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-x-0 top-[63px] bottom-0 z-40 flex flex-col overflow-y-auto bg-ink-950 px-6 py-10 transition-opacity duration-200 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav aria-label="Navigation mobile" className="flex flex-col">
          {navigation.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline gap-4 border-b border-bone/10 py-5 font-display text-2xl text-bone transition-colors hover:text-stone-300"
            >
              <span className="text-xs font-sans font-semibold tracking-widest text-accent-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-10">
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center justify-center gap-2 border border-bone/25 px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bone"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.contact.phone}
          </a>
          <Link
            href="/contact"
            className="bg-accent-600 px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </div>
    </header>
  );
}
