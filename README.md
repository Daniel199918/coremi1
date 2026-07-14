# Coremi

Application web moderne construite avec **Next.js 15**, **TypeScript**, **Supabase** et déployée en continu sur **Vercel**.

## Stack technique

| Couche | Technologie |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router, React 19, Server Actions) |
| Langage | [TypeScript](https://www.typescriptlang.org) (mode strict) |
| Backend | [Supabase](https://supabase.com) — Auth, PostgreSQL, Storage, RLS |
| Styles | [Tailwind CSS 4](https://tailwindcss.com) |
| Validation | [Zod](https://zod.dev) |
| Tests | [Vitest](https://vitest.dev) |
| Déploiement | [Vercel](https://vercel.com) (automatique à chaque push sur `main`) |

## Démarrage rapide

### 1. Prérequis

- Node.js ≥ 20
- Un projet [Supabase](https://supabase.com/dashboard)

### 2. Installation

```bash
git clone https://github.com/Daniel199918/coremi1.git
cd coremi1
npm install
```

### 3. Variables d'environnement

```bash
cp .env.example .env.local
```

Puis renseigner les valeurs depuis le dashboard Supabase
(**Settings → API**) : URL du projet et clé publique (`anon`).

> Aucun secret ne doit jamais être écrit dans le code ni commité.
> Voir [`docs/SETUP.md`](docs/SETUP.md) pour le guide complet.

### 4. Lancer le projet

```bash
npm run dev        # http://localhost:3000
```

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Démarrer le build de production |
| `npm run lint` | Analyse ESLint |
| `npm run typecheck` | Vérification des types TypeScript |
| `npm test` | Tests unitaires (Vitest) |
| `npm run format` | Formatage Prettier |

## Structure du projet

```
app/          Pages et routes (App Router)
components/   Composants React réutilisables (ui/, auth/, layout/)
hooks/        Hooks React personnalisés
lib/          Clients Supabase, validation d'env, schémas Zod
services/     Logique d'accès aux données (profils, storage…)
types/        Types TypeScript (dont types générés de la BDD)
utils/        Fonctions utilitaires pures
supabase/     Migrations SQL, config CLI, seed
tests/        Tests unitaires
docs/         Documentation complémentaire
public/       Assets statiques
```

Voir [`ARCHITECTURE.md`](ARCHITECTURE.md) pour les détails et conventions.

## Documentation

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — architecture, conventions, comment ajouter une table
- [`CHANGELOG.md`](CHANGELOG.md) — historique des changements
- [`ROADMAP.md`](ROADMAP.md) — fonctionnalités prévues
- [`docs/SETUP.md`](docs/SETUP.md) — configuration Supabase & Vercel pas à pas
- [`docs/DATABASE.md`](docs/DATABASE.md) — conventions base de données & migrations

## Déploiement

Chaque push sur `main` déclenche automatiquement un déploiement Vercel.
Les variables d'environnement de production sont gérées dans
**Vercel → Settings → Environment Variables** — jamais dans le code.
