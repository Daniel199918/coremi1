-- ============================================================================
-- Durcissement sécurité (suite aux advisors Supabase)
-- 1. Les fonctions trigger ne doivent pas être exécutables via l'API REST.
-- 2. La lecture "large" du bucket public permettait de LISTER tous les
--    fichiers ; un bucket public n'en a pas besoin pour servir les URLs
--    publiques. On restreint le listing au dossier du propriétaire.
-- ============================================================================

revoke execute on function public.handle_new_user() from anon, authenticated, public;
revoke execute on function public.handle_updated_at() from anon, authenticated, public;

drop policy if exists "avatars_public_read" on storage.objects;

create policy "avatars_list_own_folder"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
