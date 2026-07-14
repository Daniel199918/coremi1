# Architecture

Ce document décrit l'architecture du projet, ses conventions et la marche
à suivre pour l'étendre. Il doit être tenu à jour à chaque évolution
structurelle.

## Vue d'ensemble

```
┌─────────────────────────────────────────────┐
│                   Vercel                    │
│  ┌───────────────────────────────────────┐  │
│  │            Next.js 15 (App Router)    │  │
│  │                                       │  │
│  │  middleware.ts ── rafraîchit la       │  │
│  │        │          session à chaque    │  │
│  │        │          requête             │  │
│  │  ┌─────▼─────┐   ┌────────────────┐   │  │
│  │  │  Server    │   │    Client      │   │  │
│  │  │ Components │   │  Components    │   │  │
│  │  │  + Actions │   │  (hooks)       │   │  │
│  │  └─────┬─────┘   └───────┬────────┘   │  │
│  └────────┼─────────────────┼────────────┘  │
└───────────┼─────────────────┼───────────────┘
            │                 │
   lib/supabase/server   lib/supabase/client
            │                 │
┌───────────▼─────────────────▼───────────────┐
│                  Supabase                   │
│   Auth  ·  PostgreSQL (RLS)  ·  Storage     │
└─────────────────────────────────────────────┘
```

## Couches et responsabilités

| Dossier | Responsabilité | Règles |
| --- | --- | --- |
| `app/` | Routing, pages, layouts, Server Actions, Route Handlers | Pas de logique métier complexe : déléguer aux services |
| `components/` | Composants React réutilisables | `ui/` = génériques sans logique métier ; `auth/`, `layout/` = par domaine |
| `hooks/` | Hooks React client | Préfixe `use-`, un hook par fichier |
| `lib/` | Infrastructure : clients Supabase, env, schémas Zod | Aucune dépendance vers `app/` ou `components/` |
| `services/` | Accès aux données, logique métier | Le client Supabase est **injecté en paramètre** → utilisable côté serveur et client, testable |
| `types/` | Types partagés + types générés de la BDD | `database.types.ts` est régénéré, ne pas l'éditer à la main au-delà du schéma réel |
| `utils/` | Fonctions pures sans dépendance | Testées dans `tests/` |
| `supabase/` | Migrations SQL, config CLI, seed | Toute modification de schéma passe par une migration |

### Règle de dépendance

```
app → components → hooks → services → lib → types/utils
```

Les dépendances vont de gauche à droite, jamais l'inverse.

## Authentification

- **Clients** : `lib/supabase/client.ts` (navigateur) et `lib/supabase/server.ts`
  (Server Components / Actions / Route Handlers). Ne jamais utiliser l'un à la
  place de l'autre.
- **Session** : rafraîchie à chaque requête par `middleware.ts`
  (via `lib/supabase/middleware.ts`).
- **Protection des routes** : double garde — redirection dans le middleware
  (`PROTECTED_PREFIXES`) **et** vérification serveur dans
  `app/(protected)/layout.tsx`. La garde serveur fait foi.
- **Formulaires** : Server Actions (`app/(auth)/actions.ts`) validées par Zod
  (`lib/validations/auth.ts`), consommées via `useActionState`.

## Base de données

Voir [`docs/DATABASE.md`](docs/DATABASE.md) pour le guide complet
(ajout de table, RLS, migrations, régénération des types).

Principes non négociables :

1. **RLS activée sur chaque table** du schéma `public`, sans exception.
2. **Toute modification de schéma = une migration** dans `supabase/migrations/`
   (nommage : `YYYYMMDDHHMMSS_description.sql`).
3. **Types régénérés** après chaque migration (`types/database.types.ts`).
4. La clé `service_role` ne sort jamais du serveur et n'est utilisée qu'en
   dernier recours.

## Sécurité

- Secrets uniquement en variables d'environnement (`.env.local` en local,
  dashboard Vercel en production). Validation fail-fast dans `lib/env.ts`.
- Les variables `NEXT_PUBLIC_*` sont publiques par nature : jamais de secret.
- La sécurité des données repose sur les **RLS**, pas sur le code client.
- En-têtes de sécurité HTTP configurés dans `next.config.ts`.
- Validation systématique des entrées utilisateur avec Zod côté serveur.

## Ajouter une fonctionnalité — checklist

1. Migration SQL si nouveau schéma (`supabase/migrations/`) + RLS.
2. Régénérer `types/database.types.ts`.
3. Service dans `services/` (client injecté, retour `ServiceResult<T>`).
4. UI : composants dans `components/<domaine>/`, page dans `app/`.
5. Tests (`tests/`), lint, typecheck, build : tout doit passer.
6. Mettre à jour `CHANGELOG.md` (et `ROADMAP.md` / ce fichier si pertinent).
7. Commit clair + push → déploiement Vercel automatique.
