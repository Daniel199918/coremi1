"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * Hero « chantier au défilement » : une vidéo de construction (des
 * fondations à la villa terminée) qui AVANCE au rythme du scroll.
 *
 * Trois modes, choisis au montage selon les capacités du navigateur :
 *  - scrub  (souris + bureau) : la section est haute ; la vidéo est
 *    épinglée et son `currentTime` est piloté par la progression du
 *    scroll, lissé au requestAnimationFrame — façon Apple.
 *  - loop   (tactile / mobile) : lecture automatique muette en boucle,
 *    hero plein écran classique (le scrub image-par-image est trop
 *    coûteux sur mobile).
 *  - static (prefers-reduced-motion, sans JS) : image fixe de la villa
 *    terminée, aucun mouvement.
 *
 * Rendu SSR / sans JS : mode `static` — le hero reste lisible et
 * complet immédiatement, puis JS l'améliore.
 *
 * La vidéo est une ILLUSTRATION d'un chantier de construction — pas la
 * documentation d'un chantier COREMI précis (mention affichée).
 */

type Mode = "static" | "loop" | "scrub";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export function Hero() {
  const [mode, setMode] = useState<Mode>("static");
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Choix du mode selon les préférences et le type d'entrée.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(hover: none)");

    const decide = () => {
      if (reduce.matches) setMode("static");
      else if (touch.matches) setMode("loop");
      else setMode("scrub");
    };

    decide();
    reduce.addEventListener("change", decide);
    touch.addEventListener("change", decide);
    return () => {
      reduce.removeEventListener("change", decide);
      touch.removeEventListener("change", decide);
    };
  }, []);

  // Mode scrub : la vidéo suit le scroll. Pour éviter les saccades, on
  // n'empile jamais les recherches (seek) : on demande une nouvelle image
  // uniquement quand la précédente est arrivée (événement « seeked »).
  useEffect(() => {
    if (mode !== "scrub") return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let raf = 0;
    let targetTime = 0;
    let seeking = false;

    const requestSeek = () => {
      if (seeking) return;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (duration <= 0) return;
      // rien à faire si on est déjà quasi sur la bonne image (~1/2 image)
      if (Math.abs(video.currentTime - targetTime) < 1 / 48) return;
      seeking = true;
      try {
        video.currentTime = targetTime;
      } catch {
        seeking = false;
      }
    };

    const onSeeked = () => {
      seeking = false;
      requestSeek(); // rattrape la dernière position visée pendant le seek
    };

    const tick = () => {
      const total = section.offsetHeight - window.innerHeight;
      const progress =
        total > 0 ? clamp(-section.getBoundingClientRect().top / total, 0, 1) : 0;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      targetTime = progress * duration;
      requestSeek();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      video.addEventListener("seeked", onSeeked);
      raf = requestAnimationFrame(tick);
    };

    if (video.readyState >= 1) start();
    else video.addEventListener("loadedmetadata", start, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", start);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [mode]);

  const scrub = mode === "scrub";

  return (
    <section
      ref={sectionRef}
      aria-label="COREMI — entreprise générale de construction et de châssis"
      className="relative bg-ink-950"
      style={scrub ? { height: "280vh" } : undefined}
    >
      <div
        className={
          scrub
            ? "sticky top-0 flex h-svh flex-col overflow-hidden"
            : "relative flex min-h-[92svh] flex-col overflow-hidden"
        }
      >
        {/* Média de fond selon le mode */}
        {mode === "static" ? (
          <Image
            src="/images/hero-villa-finie.webp"
            alt="Villa contemporaine achevée : illustration d'un chantier de construction, des fondations à la maison terminée."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : mode === "loop" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-villa-finie.webp"
          >
            <source src="/videos/hero-construction-mobile.mp4" type="video/mp4" />
          </video>
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            poster="/images/hero-poster-debut.webp"
          >
            <source src="/videos/hero-construction.mp4" type="video/mp4" />
          </video>
        )}

        {/* Scrims + grain, pour asseoir la typographie */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/25 to-transparent sm:from-ink-950/75 sm:via-ink-950/15 sm:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink-950/35 to-transparent lg:block"
        />
        <span aria-hidden="true" className="grain" />

        {/* Composition typographique */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-9 pt-24 sm:px-8 lg:pb-12">
          <p className="rise rise-1 annotation flex items-center gap-4 text-stone-200">
            <span aria-hidden="true" className="h-px w-12 bg-accent-500" />
            Entreprise générale · Bruxelles &amp; Brabant wallon
          </p>

          <h1 className="rise rise-2 mt-7 max-w-4xl font-display text-[clamp(2.7rem,6.4vw,6.2rem)] font-medium leading-[1.02] tracking-tight text-bone [text-shadow:0_2px_28px_rgb(18_16_12/0.45)]">
            Bâtir juste, du gros œuvre
            <br className="hidden sm:block" /> au{" "}
            <em className="italic text-accent-400">dernier châssis.</em>
          </h1>

          <p className="rise rise-3 mt-7 max-w-xl text-lg leading-relaxed text-stone-200/90">
            COREMI construit, rénove et pose vos châssis avec un devis détaillé,
            un interlocuteur unique et des finitions qui tiennent dans le temps.
          </p>

          <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="btn-press group flex items-center justify-center gap-3 bg-accent-600 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-500"
            >
              Demander un devis
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/realisations"
              className="btn-press border border-bone/40 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-bone hover:border-bone hover:bg-bone hover:text-ink-950"
            >
              Nos réalisations
            </Link>
          </div>

          {/* Cartouche : repères factuels + invite au défilement */}
          <div className="rise rise-4 mt-10 hidden items-end justify-between border-t border-bone/20 pt-5 lg:flex">
            <ul className="annotation flex gap-10 text-stone-300">
              <li>Devis détaillé gratuit</li>
              <li>Interlocuteur unique</li>
              <li>Gros œuvre → finitions</li>
            </ul>
            <p className="annotation flex items-center gap-6 text-stone-300">
              <span>Illustration — des fondations à la maison finie</span>
              {scrub && (
                <span className="scroll-cue flex items-center gap-2" aria-hidden="true">
                  <ArrowDown className="h-4 w-4" />
                  Faire défiler
                </span>
              )}
            </p>
          </div>
          <p className="rise rise-4 annotation mt-8 text-stone-300 lg:hidden">
            Illustration — des fondations à la maison finie
          </p>
        </div>
      </div>
    </section>
  );
}
