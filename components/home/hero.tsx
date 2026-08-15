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

  // Bloc typographique commun (titre, texte, CTA).
  const copy = (
    <>
      <p className="rise rise-1 annotation flex items-center gap-4 text-white [text-shadow:0_1px_14px_rgb(18_16_12/0.8)]">
        <span aria-hidden="true" className="h-px w-12 bg-accent-500" />
        Rénovation &amp; châssis · Bruxelles et Brabant wallon
      </p>

      {/* Titre volontairement court : la taille peut donc monter plus haut
          que sur l'ancienne accroche, qui tenait sur trois lignes. */}
      <h1 className="rise rise-2 mt-7 max-w-4xl font-display text-[clamp(3rem,7.6vw,7.5rem)] font-medium leading-[0.98] tracking-tight text-bone [text-shadow:0_2px_28px_rgb(18_16_12/0.45)]">
        Votre maison.
        <br />
        <em className="italic text-accent-400">Mieux pensée.</em>
      </h1>

      <p className="rise rise-3 mt-6 max-w-xl text-base leading-relaxed text-white/95 [text-shadow:0_1px_14px_rgb(18_16_12/0.8)] sm:mt-7 sm:text-lg">
        Rénover, ce n&apos;est pas tout refaire. Nous cherchons d&apos;abord ce
        qui changera votre quotidien — la lumière, le confort, les ouvertures —
        puis nous le réalisons nous-mêmes.
      </p>

      <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
        <Link
          href="/devis"
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
    </>
  );

  return (
    <section
      ref={sectionRef}
      data-hero
      aria-label="COREMI — rénovation et châssis à Bruxelles et en Brabant wallon"
      className="relative -mt-[68px] bg-ink-950"
      style={scrub ? { height: "280vh" } : undefined}
    >
      {scrub ? (
        /* ---- Bureau : vidéo plein écran épinglée, défilement scrubé ---- */
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
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

          {/* Voile allégé d'environ un tiers par rapport à la version
              précédente : l'image respire davantage. Il reste assez dense
              en bas de cadre, là où se trouve le texte blanc, pour que le
              contraste de lecture soit conservé. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950/62 via-ink-950/14 to-transparent sm:from-ink-950/58 sm:via-ink-950/8 sm:to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink-950/24 to-transparent lg:block"
          />
          <span aria-hidden="true" className="grain" />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-9 pt-24 sm:px-8 lg:pb-12">
            {copy}
            <div className="rise rise-4 mt-10 hidden items-end justify-between border-t border-bone/35 pt-5 lg:flex">
              {/* Trois repères de méthode. Aucun argument commercial ici :
                  l'acompte et la gratuité du devis se traitent près du
                  formulaire et dans la FAQ, pas en ouverture de site.
                  Aucune mention de gros œuvre non plus — COREMI n'en
                  réalise pas. */}
              <ul className="annotation flex gap-10 text-white/90 [text-shadow:0_1px_14px_rgb(18_16_12/0.8)]">
                <li>Un seul interlocuteur</li>
                <li>Pose et raccords par nos équipes</li>
                <li>Devis poste par poste</li>
              </ul>
              <p className="annotation flex items-center gap-6 text-white/90 [text-shadow:0_1px_14px_rgb(18_16_12/0.8)]">
                <span className="scroll-cue flex items-center gap-2" aria-hidden="true">
                  <ArrowDown className="h-4 w-4" />
                  Faire défiler
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ---- Mobile / tactile : vidéo cadrée (scène entière) + texte dessous ---- */
        <div className="flex min-h-svh flex-col">
          {/* Média cadré dans sa vraie proportion : on voit toute la maison */}
          <div className="relative w-full overflow-hidden pt-[68px]">
            <div className="relative aspect-video w-full">
              {mode === "loop" ? (
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
                <Image
                  src="/images/hero-villa-finie.webp"
                  alt="Villa contemporaine rénovée par COREMI, façade et menuiseries extérieures achevées."
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              )}
              <span aria-hidden="true" className="grain" />
              {/* Fondu vers le bas pour lier la vidéo au bloc texte */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950 to-transparent"
              />
            </div>
          </div>

          {/* Bloc texte sur fond sombre */}
          <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 py-9 sm:px-8 sm:py-12">
            {copy}
            <ul className="rise rise-4 annotation mt-8 flex flex-wrap gap-x-6 gap-y-2 text-stone-400">
              <li>Un seul interlocuteur</li>
              <li>Pose et raccords par nos équipes</li>
              <li>Devis poste par poste</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
