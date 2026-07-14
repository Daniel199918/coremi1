-- ============================================================================
-- Migration initiale
-- - Fonction réutilisable handle_updated_at (à réutiliser sur chaque table)
-- - Table public.profiles (1-1 avec auth.users)
-- - Row Level Security sur profiles
-- - Création automatique du profil à l'inscription
-- - Bucket de stockage "avatars" + policies
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Fonction générique : met à jour updated_at avant chaque UPDATE.
-- À réutiliser pour toute nouvelle table possédant une colonne updated_at.
-- ----------------------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- Table profiles : données publiques de chaque utilisateur.
-- ----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Profil applicatif de chaque utilisateur, lié 1-1 à auth.users.';

-- RLS : activée par défaut sur toute table exposée (obligatoire).
alter table public.profiles enable row level security;

create policy "select_own_profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "update_own_profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Pas de policy INSERT/DELETE : le profil est créé par trigger et
-- supprimé en cascade avec le compte auth.users.

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- Création automatique du profil à l'inscription (trigger sur auth.users).
-- security definer : s'exécute avec les droits du propriétaire, car
-- l'utilisateur n'a pas encore de session au moment de l'insertion.
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'display_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- Storage : bucket public "avatars".
-- Chaque utilisateur ne peut écrire que dans son dossier : <user_id>/...
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "avatars_public_read"
  on storage.objects
  for select
  using (bucket_id = 'avatars');

create policy "avatars_insert_own_folder"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "avatars_update_own_folder"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "avatars_delete_own_folder"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
