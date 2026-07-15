# Changelog

Tous les changements notables de ce projet sont documentés dans ce fichier.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/)
et le projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [Unreleased]

### v5 — couleurs officielles de la marque (audits ui-ux-pro-max + ui-styling)

- Palette entièrement re-basée sur l'identité COREMI : rouge du logo mesuré sur le fichier officiel (`#d02020`, contraste 5,4:1 avec texte blanc — AA), noirs profonds neutres et blanc cassé/gris neutres en remplacement des beiges « corten » précédents.
- Rebrand centralisé via les tokens `@theme` : boutons, soulignés, schémas techniques, hairlines et sections sombres basculent d'un seul point de vérité.
- Accent de marque dans le titre du hero (« dernier châssis. » en rouge COREMI) et flèches directionnelles sur les CTA principaux, repris des maquettes fournies.

### Couche « craft » CSS v4.5 (audit ui-ux-pro-max)

- Tokens de mouvement unifiés (`--ease-out-soft`, `--ease-out-expo`, durées tap/ui/scène) appliqués à toutes les micro-interactions.
- Grain photographique en CSS pur (bruit SVG inline, aucun asset réseau) sur le hero et la conclusion sombre.
- Dérive parallaxe des photos éditoriales au défilement via les scroll-driven animations CSS (`animation-timeline: view()`), servie uniquement aux navigateurs compatibles et jamais en mouvement réduit.
- Cadre « passe-partout » hairline dans la photo panoramique des réalisations, façon planche d'architecte.
- Micro-interactions des boutons principaux : soulèvement au survol, appui au clic (transform uniquement, aucun reflow).
- Finitions typographiques : `text-wrap: balance` sur les titres, `pretty` sur les paragraphes, ombre portée douce du titre hero pour un contraste robuste sur photo, curseur et sélection à l'accent.
- Ombre du header au défilement, barre de défilement fine assortie à la palette minérale.

### Refonte v4 — photos réelles des chantiers COREMI

- Intégration des cinq premières photos réelles de réalisations COREMI (villa contemporaine vitrée sur trois vues, maison au bardage anthracite, entrée aux menuiseries aluminium noires), optimisées et nommées descriptivement dans `public/images/realisations/`.
- Hero d'accueil recomposé : photo réelle plein écran avec cadrage dédié desktop (panorama) et mobile (recadrage 4:5), composition asymétrique ancrée en bas, voile de lisibilité renforcé sur mobile, légende de réalisation en cartouche.
- Page Réalisations reconstruite en fiches éditoriales : fiche vedette multi-photos avec cartouche (lieu, année, éléments visibles), fiches secondaires asymétriques, note de documentation honnête. Retrait des six projets fictifs de démonstration et du curseur avant/après synthétique.
- Photos réelles diffusées dans tout le site : manifeste d'accueil, vignettes métiers, sélection de réalisations, doubles focus expertise, pages Construction & rénovation, Châssis et À propos, arrière-plan de l'appel à l'action final.
- Nouvelle image Open Graph issue d'une photo réelle. Les communes et années restent en placeholders `[COMMUNE]` / `[ANNÉE]` jusqu'à confirmation ; aucune information inventée.

### Corrigé

- Logo : le site affiche désormais le logo officiel COREMI exact (fichiers fournis, versions fond clair et fond sombre) au lieu d'une recréation vectorielle. Seules les marges vides des fichiers ont été recadrées ; le fond blanc/noir des fichiers est fondu dans la page via `mix-blend-mode`, sans aucune retouche du logo.

### Refonte v3 - "Materiaux & Elevations"

- Nouvelle direction artistique : palette minerale (blanc chaud, pierre, terre, graphite, noir mineral) avec accent rouge oxyde facon corten ; annotations techniques en monospace (cotes, cartouches, reperes de plan).
- Serie d'illustrations architecturales vectorielles sur mesure generees par script (elevation nocturne, coupes de chassis, calepinage, chantier filaire, avant/apres) en remplacement des placeholders generiques.
- Hero recompose : mise en page asymetrique, typographie monumentale, panneau elevation pleine hauteur, entree animee en CSS pur, indicateur de defilement.
- Accueil : manifeste editorial avec figure legendee, metiers en rangees immersives agrandies, methode reecrite en "coupe de chantier" a six phases cotees, conclusion visuelle avec cartouche de coordonnees.
- Page Chassis : schemas techniques des types d'ouverture (fixe, battant, oscillo-battant) dessines selon la convention menuisier.

### Refonte v2 — direction artistique éditoriale

- Nouvelle direction artistique « minimalisme architectural » : palette blanc cassé / pierre / anthracite (rouge COREMI réservé aux actions), typographie Fraunces (titres serif éditoriaux) + Inter, hairlines façon plans d'architecte, mises en page asymétriques.
- Accueil recomposé : hero plein écran, présentation, métiers en liste éditoriale, réalisations asymétriques, engagements vérifiables, méthode en 4 étapes, doubles focus construction/châssis, FAQ, CTA final.
- Nouvelles pages : `/construction-renovation` et `/chassis` (avec comparateur PVC / aluminium / bois) ; redirections 301 depuis les anciennes URLs `/services/*`.
- Nouveaux composants : FAQ accessible (`<details>` natif), curseur avant/après accessible, comparateur de matériaux, repères graphiques de plan.
- Conformité éditoriale : suppression des chiffres non vérifiés (années, projets, %) et des avis de démonstration ; placeholders visibles `[ANNÉES D'EXPÉRIENCE]`, `[CERTIFICATIONS]` ; page Avis honnête renvoyant vers Google.
- Robustesse : composant Reveal réécrit sans framer-motion (contenu visible sans JavaScript, animation au scroll via IntersectionObserver, `prefers-reduced-motion` respecté) ; dépendance framer-motion retirée.
- SEO : FAQPage JSON-LD sur l'accueil, sitemap et données structurées mis à jour, textes réécrits pour le SEO local naturel (Bruxelles, Brabant wallon).

### Ajouté

- Site vitrine COREMI complet (12 pages) : accueil, services + 4 pages détaillées, réalisations avec filtres, à propos, avis, contact/devis, mentions légales, politique de confidentialité.
- Design system COREMI : palette marine/rouge/blanc, typographies Archivo + Inter (next/font), composants UI réutilisables (ButtonLink, Container, SectionHeading, cartes).
- Header sticky premium avec menu mobile plein écran ; footer complet.
- Animations d'apparition au scroll (Framer Motion) respectant `prefers-reduced-motion`.
- Formulaire de demande de devis : validation Zod côté serveur, honeypot anti-spam, messages d'erreur accessibles, prêt à brancher sur Resend (aucun secret dans le code).
- Contenus centralisés dans `content/` (coordonnées ⚠️ à confirmer, services, projets démo, avis démo, chiffres ⚠️ à confirmer).
- Images placeholder brandées générées par script (`scripts/generate-placeholders.mjs`), remplaçables par les vraies photos sans toucher au code.
- SEO local : métadonnées par page, Open Graph, sitemap.xml, robots.txt, données structurées Schema.org `GeneralContractor`.
- Ancienne page d'accueil déplacée : l'authentification Supabase (login/register/dashboard) reste fonctionnelle avec son propre layout.

## [0.1.1] - 2026-07-14

### Sécurité

- Révocation de l'exécution des fonctions trigger (`handle_new_user`, `handle_updated_at`) via l'API REST pour les rôles `anon` et `authenticated`.
- Le listing du bucket `avatars` est restreint au dossier du propriétaire (les URLs publiques des fichiers restent servies normalement).
- Résultat : zéro avertissement aux advisors de sécurité Supabase.

## [0.1.0] - 2026-07-14

### Ajouté

- Initialisation du projet Next.js 15 (App Router, React 19, TypeScript strict, Tailwind CSS 4).
- Intégration Supabase : clients navigateur/serveur (`@supabase/ssr`), rafraîchissement de session via middleware.
- Authentification email + mot de passe : inscription, connexion, déconnexion (Server Actions + Zod).
- Routes de confirmation d'email (`/auth/confirm`) et de callback OAuth (`/auth/callback`).
- Page tableau de bord protégée (`/dashboard`) avec garde d'authentification (middleware + layout serveur).
- Migration initiale de la base : table `profiles` avec RLS, trigger de création automatique du profil, trigger `updated_at`, bucket de stockage `avatars` avec policies par utilisateur.
- Services typés injectables (`profile.service`, `storage.service`) et hook `useUser`.
- Validation des variables d'environnement au démarrage (`lib/env.ts`, Zod) ; `.env.example` documenté.
- Composants UI de base (`Button`, `Input`, `ErrorAlert`) et en-tête global.
- Outillage qualité : ESLint, Prettier, Vitest (tests unitaires utils + validations), CI GitHub Actions (lint, typecheck, tests, build).
- Configuration Vercel (`vercel.json`, région `cdg1`, déploiement auto sur `main`) et en-têtes de sécurité HTTP.
- Documentation : `README.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `docs/SETUP.md`, `docs/DATABASE.md`.
