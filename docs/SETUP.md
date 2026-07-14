# Guide de configuration — Supabase & Vercel

Guide pas à pas pour brancher le projet sur ses services externes.

## 1. Supabase

Le projet Supabase de production est **`coremi`**
(`fbmejufilzffgzsxxtmt`, région `eu-west-3` / Paris).

Dashboard : https://supabase.com/dashboard/project/fbmejufilzffgzsxxtmt

### Récupérer les clés

1. Dashboard → **Settings → API**.
2. Copier :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / publishable key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Configurer les URLs de redirection

Dashboard → **Authentication → URL Configuration** :

- **Site URL** : l'URL de production Vercel (ex. `https://coremi.vercel.app`)
- **Redirect URLs** :
  - `http://localhost:3000/auth/callback`
  - `https://<domaine-production>/auth/callback`

### Migrations

Les migrations vivent dans `supabase/migrations/`. Deux façons de les appliquer :

**Via le CLI Supabase (recommandé) :**

```bash
npx supabase login
npx supabase link --project-ref fbmejufilzffgzsxxtmt
npx supabase db push
```

**Via le dashboard :** SQL Editor → coller le contenu de la migration → Run.

### Développement local (optionnel)

```bash
npx supabase start   # démarre Postgres + Auth + Storage en local (Docker)
npx supabase db reset  # applique migrations + seed.sql
```

## 2. Vercel

Le projet Vercel **`coremi1`** existe déjà (équipe `coremi`) et un premier
déploiement de production est en ligne : https://coremi1.vercel.app

### Connecter le dépôt GitHub (à faire une fois, ~1 minute)

Pour activer le déploiement automatique à chaque push :

1. Dashboard Vercel → projet **coremi1** → **Settings → Git**.
2. **Connect Git Repository** → choisir `Daniel199918/coremi1`.
3. Ajouter les variables d'environnement (section suivante) si ce n'est
   pas déjà fait.

Une fois connecté, **chaque push sur `main` déclenche automatiquement un
déploiement de production**, et chaque pull request génère un déploiement
de prévisualisation. C'est le comportement par défaut de l'intégration
Git de Vercel (confirmé par `vercel.json`).

### Variables d'environnement

Vercel → **Settings → Environment Variables** — ajouter pour
*Production*, *Preview* et *Development* :

| Nom | Valeur |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase |

> Astuce : l'intégration officielle
> [Supabase ↔ Vercel](https://vercel.com/marketplace/supabase)
> synchronise ces variables automatiquement.

## 3. En local

```bash
cp .env.example .env.local
# puis remplir les deux variables avec les valeurs du dashboard Supabase
npm install
npm run dev
```

## 4. Vérifier que tout fonctionne

1. `npm run dev` → http://localhost:3000
2. Créer un compte via **/register**.
3. Vérifier dans Supabase (**Table Editor → profiles**) que le profil a été
   créé automatiquement.
4. Se déconnecter / reconnecter via **/login**.
