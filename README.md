# Enterprise App Bootstrap & Style Reference Kit

Monorepo de livraison contenant **deux packages indépendants** :

1. [`packages/enterprise-app-bootstrap`](packages/enterprise-app-bootstrap) — un socle **Next.js / React / TypeScript** complet pour démarrer une application d'entreprise (back-office, console d'administration, portail B2B, outil de gouvernance) avec RBAC serveur, audit, workflows, multi-organisation et design system intégrés.
2. [`packages/mistral-style-reference-kit`](packages/mistral-style-reference-kit) — un kit de référence visuelle **non officiel**, fournissant tokens, composants et icônes originales pour habiller ce socle (ou tout autre projet) dans une grammaire visuelle inspirée des patterns publics de la documentation Mistral.

Les deux packages sont autonomes et peuvent être utilisés séparément.

## Sommaire

- [Présentation](#présentation)
- [Structure du dépôt](#structure-du-dépôt)
- [Package : enterprise-app-bootstrap](#package--enterprise-app-bootstrap)
- [Package : mistral-style-reference-kit](#package--mistral-style-reference-kit)
- [Carte de la documentation](#carte-de-la-documentation)
- [Licence et attribution](#licence-et-attribution)

## Présentation

Ce dépôt n'est pas une démo jetable : c'est un **point de départ industrialisable**. L'objectif est de fournir, dès le premier commit, les fondations qu'une équipe doit habituellement reconstruire à chaque nouveau produit interne :

- un shell applicatif cohérent (navigation, thème, command palette, responsive) ;
- une séparation stricte entre UI, services applicatifs, policies et persistance ;
- des contrôles d'autorisation **côté serveur**, jamais uniquement dans l'interface ;
- une structure prête pour le multi-organisation et le multi-workspace ;
- des modules métier de référence (dashboard, file de travail, données, rapports, approbations, audit) ;
- un design system pilotable par tokens plutôt que par duplication de composants ;
- les briques d'exploitation attendues : tests, CI, Docker, observabilité, gestion des erreurs.

Chaque adaptateur fourni (session, repository, audit, jobs, feature flags) est un **point de remplacement explicite** : le code de démonstration tourne sans base de données ni IdP, mais documente précisément où brancher les systèmes réels avant la mise en production.

## Structure du dépôt

```text
enterprise-app-bootstrap-kit/
├── README.md                          # ce document
├── docs/                              # guides transverses de haut niveau
│   ├── enterprise-app-bootstrap.md    # philosophie, architecture, anatomie complète du socle
│   └── mistral-style-reference.md     # guide de style condensé
├── preview/
│   ├── mistral-style-showcase.html    # showcase clair/sombre autonome (ouvrable directement)
│   └── mistral-style-preview.png      # capture du showcase
├── scripts/
│   └── publish.sh                     # rattache un remote Git et pousse main (utile pour un fork)
└── packages/
    ├── enterprise-app-bootstrap/      # application Next.js complète (voir plus bas)
    └── mistral-style-reference-kit/   # kit de style autonome (voir plus bas)
```

## Package : enterprise-app-bootstrap

Socle applicatif complet — pas un simple thème de documentation.

### Stack technique

| Domaine | Choix |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| UI | Tailwind CSS 4, Radix UI, `class-variance-authority`, `lucide-react`, `next-themes` |
| Données & formulaires | TanStack Table, React Hook Form, Zod, `date-fns` |
| Interactions | `cmdk` (command palette), `sonner` (toasts) |
| Qualité | ESLint, TypeScript, Vitest, Testing Library, Playwright |
| Exploitation | GitHub Actions (lint, type-check, tests, build), Docker multi-stage, Compose |

### Écrans fournis

| Route | Illustre |
|---|---|
| `/dashboard` | KPIs, graphique, activité récente, alertes actionnables |
| `/work` | File de tâches : priorités, statuts, propriétaire, filtres |
| `/records` | Table métier : recherche, tri, filtres, sélection, pagination |
| `/reports` | Reporting, segmentation, export |
| `/approvals` | Workflow de décision et double contrôle |
| `/audit-log` | Journal d'audit, corrélation, export CSV |
| `/settings` | Profil organisationnel (formulaire validé) |
| `/settings/members` | Membres, rôles, cycle de vie des accès |
| `/settings/security` | MFA, SSO, sessions, contrôles réseau |
| `/settings/feature-flags` | Livraison progressive |
| `/help` | Centre d'aide intégré à l'application |
| `/api/health` | Sonde de santé |
| `/api/records` | Exemple d'API contrôlée par permissions |

### Architecture

Monolithe modulaire avec frontières explicites, plutôt que des microservices imposés dès le départ :

```text
Route / UI → Feature component → Service applicatif → Policy + validation → Repository / adapter → Infrastructure
```

```text
src/app          routes, layouts et handlers Next.js (pas de règle métier ici)
src/components    design system (ui/), patterns (common/), shell (layout/), thème (theme/)
src/config        navigation, produit, feature flags, workspaces
src/features      modules métier verticaux (dashboard, work, records, approvals, audit, settings, auth)
src/server        services, repositories, policies, audit, events, jobs, idempotency, intégrations
src/lib           utilitaires transverses (erreurs, formatage, observabilité)
src/types         types partagés
```

Règle de dépendance à respecter : `repository → React` ou `composant UI → base de données` sont interdits ; tout passe par `service applicatif → policy → repository`. Détail complet : [`docs/ARCHITECTURE.md`](packages/enterprise-app-bootstrap/docs/ARCHITECTURE.md).

### Identité, rôles et permissions

Six rôles prédéfinis — `owner`, `admin`, `manager`, `analyst`, `member`, `viewer` — mappés à des permissions explicites (`records.write`, `approvals.review`, `security.manage`, etc.) dans [`src/features/auth/permissions.ts`](packages/enterprise-app-bootstrap/src/features/auth/permissions.ts). L'interface masque les actions non autorisées, mais **chaque service serveur revérifie la permission** avant d'écrire — la navigation n'est jamais une preuve d'autorisation.

### Sécurité

Authentification mockée mais remplaçable par OIDC/SAML, RBAC côté serveur, validation Zod systématique aux frontières, audit structuré, en-têtes HTTP de base. La checklist complète de mise en production (IdP, CSP, secrets, rate limiting, sauvegardes, tests d'isolation inter-tenant…) est dans [`docs/SECURITY.md`](packages/enterprise-app-bootstrap/docs/SECURITY.md) et [`SECURITY.md`](packages/enterprise-app-bootstrap/SECURITY.md).

### Démarrage rapide

```bash
cd packages/enterprise-app-bootstrap
cp .env.example .env.local
npm install
npm run dev
```

Ouvrir `http://localhost:3000`. La session de démonstration utilise le rôle `admin` ; pour tester un autre rôle, définir `MOCK_ROLE` dans `.env.local` (`owner`, `admin`, `manager`, `analyst`, `member`, `viewer`).

### Scripts disponibles

```bash
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
npm run test         # tests unitaires (Vitest)
npm run build        # build production Next.js
npm run test:e2e     # Playwright (npx playwright install chromium au préalable)
```

### Conteneurisation

```bash
cp .env.example .env
docker compose up --build
```

Le `Dockerfile` est multi-stage (`deps` → `builder` → `runner`), tourne en mode `standalone` Next.js et démarre sous un utilisateur non-root.

### Du prototype à la production

Ce qui est simulé volontairement, et par quoi le remplacer :

| Zone | Adaptateur fourni | Attendu en production |
|---|---|---|
| Authentification | session mock | IdP OIDC/SAML |
| Autorisation | RBAC en mémoire | policies + scopes + tests d'isolation |
| Données | repository en mémoire | base transactionnelle (PostgreSQL conseillé) |
| Audit | logs structurés | stockage append-only |
| Jobs | exécution in-process | queue durable + dead-letter |
| Événements | console | outbox + broker |
| Feature flags | config/env | provider gouverné |
| Intégrations | `integrationFetch()` centralisé | résilience, retries, secrets gérés |
| Observabilité | logger minimal | logs/métriques/traces centralisés (OpenTelemetry) |

Guide détaillé, profils de configuration (minimal, opérations, réglementé, SaaS B2B) et checklist de fork complète : [`docs/enterprise-app-bootstrap.md`](docs/enterprise-app-bootstrap.md).

## Package : mistral-style-reference-kit

> **Kit non officiel.** Construit par analyse des patterns visuels **publics** de la documentation Mistral (dépôt `mistralai/platform-docs-public`, Apache License 2.0) — pas par copie d'actifs propriétaires.
>
> Ne sont **pas** inclus : logo Mistral, wordmark, emblème, illustrations de modèles, captures officielles, fichiers de police, contenu rédactionnel. Les icônes du kit sont des créations originales et les classes CSS sont une réimplémentation autonome. Voir [`source/THIRD_PARTY_NOTICES.md`](packages/mistral-style-reference-kit/source/THIRD_PARTY_NOTICES.md) et la page de marque officielle pour les règles d'usage des actifs Mistral.
>
> **Avant toute mise en production : renommer les tokens, remplacer la palette par celle de votre marque, et ne jamais présenter ce kit comme un produit officiel Mistral.**

### Contenu du kit

```text
tokens/        valeurs de couleurs (OKLCH + hex), typographie, espacements — JSON + CSS + preset Tailwind
components/    composants CSS autonomes (boutons, cartes, tabs, callouts, tables, code blocks…)
icons/         24 icônes pixel originales — SVG, sprite, et composants React (PixelIcons.tsx)
integration/   exemples React prêts à adapter (Button, ProductCard, SectionTab, ThemeToggle)
preview/       aperçu HTML interactif + capture PNG
source/        carte des sources publiques analysées + notices tiers
LICENSES/      copie de la licence Apache 2.0 (licence du dépôt source cité, pas du kit lui-même)
```

### Utilisation rapide

```html
<link rel="stylesheet" href="./tokens/theme.css">
<link rel="stylesheet" href="./components/components.css">
<body class="theme-mistral-reference msr-app">
```

Aperçu visuel sans dépendance : ouvrir [`preview/mistral-style-showcase.html`](preview/mistral-style-showcase.html) ou l'équivalent dans le package, [`packages/mistral-style-reference-kit/preview/index.html`](packages/mistral-style-reference-kit/preview/index.html).

![Aperçu du kit de style](preview/mistral-style-preview.png)

Guide de style complet (palette, typographie, géométrie, mouvement, composants, voix éditoriale, checklist d'implémentation) : [`docs/mistral-style-reference.md`](docs/mistral-style-reference.md) et version exhaustive [`STYLE_GUIDE.md`](packages/mistral-style-reference-kit/STYLE_GUIDE.md).

## Carte de la documentation

| Document | Contenu |
|---|---|
| [`docs/enterprise-app-bootstrap.md`](docs/enterprise-app-bootstrap.md) | Guide complet : philosophie, stack, anatomie, modules, sécurité, données, tests, CI/CD, déploiement, checklist de fork |
| [`docs/mistral-style-reference.md`](docs/mistral-style-reference.md) | Guide de style condensé : ADN visuel, palette, typographie, composants, accessibilité |
| [`packages/enterprise-app-bootstrap/docs/ARCHITECTURE.md`](packages/enterprise-app-bootstrap/docs/ARCHITECTURE.md) | Couches, dépendances autorisées, multi-tenant, extraction future |
| [`packages/enterprise-app-bootstrap/docs/SECURITY.md`](packages/enterprise-app-bootstrap/docs/SECURITY.md) | Authentification, autorisation, audit, secrets, pipeline, checklist de mise en production |
| [`packages/enterprise-app-bootstrap/docs/DESIGN_SYSTEM.md`](packages/enterprise-app-bootstrap/docs/DESIGN_SYSTEM.md) | Tokens, typographie, espacement, composants, patterns métier, accessibilité |
| [`packages/enterprise-app-bootstrap/docs/ADDING_A_MODULE.md`](packages/enterprise-app-bootstrap/docs/ADDING_A_MODULE.md) | Tutoriel pas à pas pour ajouter un module métier complet |
| [`packages/mistral-style-reference-kit/STYLE_GUIDE.md`](packages/mistral-style-reference-kit/STYLE_GUIDE.md) | Référence exhaustive du style (17 sections) |
| [`packages/mistral-style-reference-kit/source/SOURCE_MAP.md`](packages/mistral-style-reference-kit/source/SOURCE_MAP.md) | Détail de ce qui a été analysé vs explicitement exclu |
| [`packages/mistral-style-reference-kit/integration/USAGE.md`](packages/mistral-style-reference-kit/integration/USAGE.md) | Intégration des composants React du kit |

## Licence et attribution

- **`packages/enterprise-app-bootstrap`** (code applicatif original) et **`packages/mistral-style-reference-kit`** (composants, tokens, icônes originaux) : aucune licence open source n'est déclarée dans ce dépôt à ce stade — tous droits réservés par défaut jusqu'à ce qu'un fichier `LICENSE` soit ajouté par le mainteneur.
- **Analyse de style tierce** : la documentation publique de Mistral (`mistralai/platform-docs-public`) est citée sous Apache License 2.0 ; une copie de cette licence est fournie dans [`packages/mistral-style-reference-kit/LICENSES/Apache-2.0.txt`](packages/mistral-style-reference-kit/LICENSES/Apache-2.0.txt) pour attribution. Cette licence couvre la source citée, pas le kit lui-même, et ne confère aucun droit sur les marques Mistral.
- Marques, logos et noms de produits tiers mentionnés restent la propriété de leurs détenteurs respectifs.
