# Enterprise App Bootstrap — Architecture et philosophie

Ce guide décrit le socle d'application d'entreprise fourni dans le pack.

## Objectif

Construire un starter généralisable pour des applications métier internes : shell applicatif, sécurité, données, workflows, reporting, audit, observabilité, centre d'aide et conventions de développement.

## Principes

- Monolithe modulaire avant microservices.
- Séparation stricte entre shell, modules métier, services, repositories et adaptateurs.
- RBAC côté serveur, jamais uniquement côté interface.
- Multi-organisation et workspace-ready.
- Audit systématique des actions sensibles.
- Feature flags pour activer les modules progressivement.
- Design system centralisé via tokens CSS.
- Tests unitaires et e2e sur les parcours critiques.

## Modules inclus

- Dashboard.
- Work queue.
- Records.
- Approvals.
- Reports.
- Audit log.
- Settings.
- Security settings.
- Members.
- Feature flags.
- Help center.

## Architecture logique

```text
src/app          routes Next.js
src/components   composants UI et shell
src/config       navigation, workspaces, features
src/features     modules métier
src/server       services, repositories, policies
src/lib          utilitaires, logs, erreurs
```

## Sécurité

Le starter prévoit : authentification abstraite, sessions, MFA-ready, SSO-ready, permissions côté serveur, audit, validation Zod, corrélation des requêtes, idempotence et principes OWASP.

## Données

Le modèle attendu est orienté PostgreSQL, avec repositories remplaçables et validation d'entrée. Le starter peut démarrer avec données mockées pour l'UX puis brancher Prisma ou Drizzle.

## Workflows

Les workflows sont conçus autour de statuts, transitions, approbations, propriétaires, échéances, commentaires, pièces jointes et journal d'audit.

## Design system

Le système repose sur variables CSS, Tailwind, composants shadcn-like, dark mode, densité entreprise, tableaux, filtres et cartes.

## Exploitation

Le pack contient Dockerfile, compose, scripts, CI, tests et conventions pour `.env.example`.

## Ajout d'un module métier

1. Ajouter une entrée dans `src/config/navigation.ts`.
2. Créer `src/features/<module>`.
3. Ajouter schemas, services, repository et policy.
4. Créer routes UI et API.
5. Ajouter audit events et tests.
6. Documenter dans le centre d'aide.

## Démarrage

```bash
cd packages/enterprise-app-bootstrap
cp .env.example .env.local
npm install
npm run dev
```
