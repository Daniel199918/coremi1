# Base de données — conventions et guide

## Principes

1. **Une migration par changement de schéma** — jamais de modification
   manuelle du schéma en production.
2. **RLS activée sur chaque table** du schéma `public`, dès sa création.
3. **Types TypeScript régénérés** après chaque migration.

## Nommage

| Élément | Convention | Exemple |
| --- | --- | --- |
| Table | pluriel, snake_case | `projects`, `team_members` |
| Colonne | snake_case | `display_name`, `created_at` |
| Migration | `YYYYMMDDHHMMSS_description.sql` | `20260714100000_initial_schema.sql` |
| Policy | `action_scope` | `select_own_profile` |

Colonnes standard sur chaque table :

```sql
id          uuid primary key default gen_random_uuid(),
created_at  timestamptz not null default now(),
updated_at  timestamptz not null default now()
```

## Ajouter une nouvelle table — modèle

Créer `supabase/migrations/<timestamp>_create_<table>.sql` :

```sql
-- Exemple : table projects appartenant à un utilisateur
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "select_own_projects"
  on public.projects for select to authenticated
  using ((select auth.uid()) = owner_id);

create policy "insert_own_projects"
  on public.projects for insert to authenticated
  with check ((select auth.uid()) = owner_id);

create policy "update_own_projects"
  on public.projects for update to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

create policy "delete_own_projects"
  on public.projects for delete to authenticated
  using ((select auth.uid()) = owner_id);

-- Réutilise la fonction générique créée dans la migration initiale
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();
```

Bonnes pratiques RLS :

- Toujours `(select auth.uid())` (et non `auth.uid()` nu) : mise en cache
  par requête, bien plus performant.
- Une policy par action (`select` / `insert` / `update` / `delete`),
  ciblée sur le rôle `to authenticated`.
- `update` exige `using` **et** `with check`.

## Appliquer la migration

```bash
npx supabase db push          # projet distant (après supabase link)
# ou en local :
npx supabase db reset         # ré-applique tout + seed
```

## Régénérer les types

```bash
npx supabase gen types typescript --project-id fbmejufilzffgzsxxtmt > types/database.types.ts
```

Puis créer le service correspondant dans `services/` et exposer les types
utiles dans `types/index.ts`.
