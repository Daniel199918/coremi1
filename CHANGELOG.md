# Changelog

Tous les changements notables de ce projet sont documentés dans ce fichier.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/)
et le projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [Unreleased]

### v7 — « La maison se construit » (scène 3D axonométrique au scroll)

- Nouvelle pièce maîtresse de l'accueil : une coupe axonométrique de maison — stylisée d'après la villa réelle (toit à pergola, deux niveaux vitrés, châssis noirs) — qui s'assemble phase par phase quand on défile : terrain, fondations, dalle, gros œuvre (murs qui montent), toiture et pergola, châssis et vitrages (cadres soulignés en rouge de marque), puis finitions, terrasse et cotes. Section épinglée sur ~4 écrans, légendes de phase synchronisées, rail de progression.
- Dessin 100 % SVG vectoriel animé par scroll-driven animations CSS (`view-timeline`, `animation-range`) : léger, net à toute échelle, sans dépendance 3D (ni Three.js ni GSAP nécessaires), sans JavaScript. Le défilement natif reste maître.
- Honnêteté : cartouche « dessin illustratif COREMI · pas un chantier réel » directement sur le schéma ; ce n'est pas présenté comme une photo de chantier.
- Version simplifiée automatique : sur mobile, tablette (&lt; 1024 px) et en `prefers-reduced-motion`, la maison s'affiche complète avec les cinq phases listées — accessible et sans mise en page épinglée.
- La timeline « Votre projet en six couches » (redondante) est retirée de l'accueil au profit de cette narration visuelle ; sections renumérotées.

### v6 — hero « visite du chantier » (scrollytelling)

- L'écran d'accueil reste épinglé pendant environ 2,6 écrans de défilement : la caméra voyage dans la réalisation — vue du jardin, puis on s'avance dans l'allée d'accès, puis on débouche sur la terrasse — avec zoom continu entre les vues, légendes synchronisées (01/02/03) et rail de progression rouge.
- Le bloc titre s'efface quand la visite commence ; la scène se cale sous le header sticky.
- Implémentation en scroll-driven animations CSS pures (`view-timeline`, `animation-range`), sans JavaScript ni scroll-jacking : le défilement natif reste maître. Repli automatique sur le hero statique pour les navigateurs non compatibles et en `prefers-reduced-motion`.
- Outillage : script `scripts/scrolly-test.mjs` de capture de la séquence à plusieurs positions de défilement.

### v5.2 — signatures éditoriales (inspiration Awwwards)

- Curseur d'accent : point rouge COREMI à inertie qui suit le pointeur et s'ouvre en pastille étiquetée (« Voir », « Découvrir ») sur les cartes de réalisations et les lignes métiers ; le curseur natif reste visible.
- Métiers réinventés en liste typographique pure : au survol d'une ligne, la photo du métier flotte et suit le curseur (fenêtre volante avec ombre portée et rotation légère) ; liste intacte sans JavaScript, au tactile et en mouvement réduit.
- Bande typographique défilante entre les sections de l'accueil : les métiers en très grand serif au trait, point rouge de marque en séparateur, pause au survol, statique en mouvement réduit.
- Wordmark fantôme « COREMI » en très grand corps dans le pied de page.
- Outillage : script de capture pleine page `scripts/shot.mjs` (puppeteer-core + Chromium préinstallé) avec défilement automatique pour déclencher les chargements différés.

### v5.1 — profondeur 3D

- Hero à double plan : parallaxe de pointeur (la photo dérive à contre-sens du curseur, la typographie l'accompagne sur un plan rapproché) et « dolly » au défilement (la caméra se pose, zoom arrière en CSS scroll-driven pur).
- Cartes 3D inclinables : les photos de réalisations (accueil, galerie, doubles focus) pivotent en perspective réelle vers le curseur, avec un reflet radial qui suit le pointeur.
- Apparitions au scroll en perspective : les sections se redressent légèrement (rotateX) en entrant dans le viewport, comme des panneaux qui se posent.
- Discipline de performance intacte : transform/opacity uniquement, variables CSS sans re-render React, rAF-throttling, inactif au tactile (`hover: none`) et en `prefers-reduced-motion` ; aucune dépendance ajoutée.

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
