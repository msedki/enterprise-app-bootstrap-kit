# Enterprise App Bootstrap

Socle **Next.js + React + TypeScript** pour construire des applications d’entreprise : consoles opérationnelles, back-offices, portails internes, applications B2B multi-workspaces, outils de gouvernance et produits SaaS administrés.

Ce starter n’est pas un simple thème de documentation. Il fournit un shell applicatif et des exemples cohérents de :

- navigation responsive, command palette et thème clair/sombre ;
- session mock remplaçable par OIDC/SAML ;
- rôles, permissions et contrôles serveur ;
- tableau de bord et reporting ;
- file de travail et workflows ;
- tables de données avancées ;
- approbations et séparation des responsabilités ;
- journal d’audit ;
- organisation, membres, sécurité et feature flags ;
- API, repositories, services, validation et erreurs ;
- intégrations, jobs, événements, idempotence et observabilité ;
- tests, CI et conteneurisation.

## Démarrage

```bash
cp .env.example .env.local
npm install
npm run dev
```

Ouvrir `http://localhost:3000`. La session de démonstration utilise le rôle `admin`.

Pour tester un autre rôle :

```env
MOCK_ROLE="viewer"
```

Rôles disponibles : `owner`, `admin`, `manager`, `analyst`, `member`, `viewer`.

## Vérifications

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

Test navigateur :

```bash
npx playwright install chromium
npm run test:e2e
```

## Écrans fournis

| Route | Pattern illustré |
|---|---|
| `/dashboard` | KPIs, graphique, activité et alertes |
| `/work` | File de tâches, priorités, statuts et filtres |
| `/records` | Table métier, recherche, tri, filtres, sélection et pagination |
| `/reports` | Reporting, segmentation et export |
| `/approvals` | Workflow de décision et double contrôle |
| `/audit-log` | Audit, corrélation et export CSV |
| `/settings` | Formulaire organisationnel validé |
| `/settings/members` | Membres, rôles et cycle de vie des accès |
| `/settings/security` | MFA, SSO, sessions et contrôles réseau |
| `/settings/feature-flags` | Livraison progressive |
| `/help` | Centre d’aide intégré à l’application |
| `/api/health` | Sonde de santé |
| `/api/records` | Exemple d’API contrôlée par permissions |

## Architecture

```text
src/
├── app/                    # routes et composition d’écrans
├── components/             # design system et shell
├── config/                 # navigation, produit, features, workspaces
├── features/               # modules métier verticaux
├── lib/                    # utilitaires transverses
├── server/                 # services, repositories et adapters
└── types/                  # types partagés
```

L’architecture suit un **monolithe modulaire** : démarrage rapide, frontières explicites, possibilité d’extraire un service plus tard sans distribuer prématurément le système.

## À remplacer avant production

Les éléments suivants sont volontairement simulés :

- `getSession()` : raccorder votre IdP ;
- repository en mémoire : raccorder PostgreSQL ou votre source de données ;
- feature flags locaux : raccorder votre provider ;
- job queue en mémoire : raccorder une file durable ;
- audit vers logs : raccorder un stockage append-only ;
- formulaire et décisions UI : persister via actions/API sécurisées ;
- centre d’aide : raccorder votre contenu ou CMS ;
- métriques : raccorder votre couche analytique.

Le guide complet est dans [`docs/ENTERPRISE_BOOTSTRAP.md`](docs/ENTERPRISE_BOOTSTRAP.md).
