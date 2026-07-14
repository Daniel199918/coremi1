# Roadmap

Feuille de route du projet. Mise à jour au fil du développement —
les éléments terminés sont déplacés dans le [CHANGELOG](CHANGELOG.md).

## ✅ Fondations (v0.1.0)

- [x] Scaffold Next.js 15 + TypeScript strict + Tailwind CSS 4
- [x] Authentification Supabase (email / mot de passe)
- [x] Base de données PostgreSQL avec RLS et migrations
- [x] CI GitHub Actions + déploiement continu Vercel
- [x] Documentation initiale

## 🎯 Court terme

- [ ] Page de profil : édition du nom et upload d'avatar (le service et les policies storage existent déjà)
- [ ] Réinitialisation de mot de passe (email de récupération)
- [ ] Page de confirmation « vérifiez vos emails » après inscription (si confirmation email activée)
- [ ] Tests de composants (Testing Library) et tests E2E (Playwright)

## 📦 Moyen terme

- [ ] Premières tables métier (voir conventions dans `docs/DATABASE.md`)
- [ ] Connexion OAuth (Google, GitHub) — la route `/auth/callback` est prête
- [ ] Internationalisation (fr/en)
- [ ] Monitoring d'erreurs (Sentry) et analytics (Vercel Analytics)

## 🌅 Long terme

- [ ] Rôles et permissions (admin / membre)
- [ ] Fonctionnalités temps réel (Supabase Realtime)
- [ ] Edge Functions Supabase pour la logique backend avancée
