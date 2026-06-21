# Bootstrap généralisable pour applications d’entreprise

**Version du document : 1.0 — juin 2026**

## 1. Objectif

Ce projet est un socle pour construire des **applications d’entreprise complètes**, et non un simple site de documentation. Il cible notamment :

- back-offices opérationnels ;
- consoles d’administration ;
- produits SaaS B2B ;
- portails partenaires ou employés ;
- outils de conformité et gouvernance ;
- applications data-heavy ;
- centres de traitement, validation et approbation ;
- applications multi-organisation et multi-workspace.

La documentation et le centre d’aide restent utiles, mais ils sont un module parmi d’autres. L’architecture est pilotée par les opérations métier, la sécurité, les données et l’exploitation.

## 2. Ce qui est inspiré de la documentation Mistral

L’analyse de la documentation Mistral met en évidence des idées réutilisables : shell cohérent, navigation structurée, palette de commande, composants composables, tokens CSS, états responsive, hiérarchie visuelle et forte séparation entre contenu et composants.

Le bootstrap transpose ces principes dans un produit d’entreprise plus large :

| Pattern observé | Généralisation entreprise |
|---|---|
| header + sidebar | shell applicatif global |
| recherche `⌘K` | command palette pages + actions |
| design tokens | thème par marque et environnement |
| composants docs | design system complet |
| navigation par sections | modules métier et permissions |
| contenu structuré | données, workflows et paramètres |
| dark mode | préférence utilisateur persistée |
| cards et quickstarts | dashboard, onboarding et actions guidées |

Ce qui n’est pas repris : marque, logos, textes, assets, structure éditoriale ou copie visuelle exacte de Mistral.

## 3. Philosophie du socle

### 3.1 Métier d’abord

Le découpage suit les capacités métier : dossiers, tâches, approbations, membres, rapports. Les composants techniques servent ces capacités, pas l’inverse.

### 3.2 Sécurisé par défaut

Une entrée de navigation n’est pas une autorisation. Toute opération sensible est contrôlée au serveur. Le refus est le comportement par défaut.

### 3.3 Monolithe modulaire avant microservices

Le socle démarre comme une application déployable en une unité, mais avec des frontières nettes entre modules, services et adapters. Cette approche réduit la complexité initiale et conserve une trajectoire d’extraction.

### 3.4 Adaptateurs remplaçables

La session, les repositories, l’audit, la queue, les feature flags et les intégrations sont décrits par des contrats. Les adapters de démonstration peuvent être remplacés sans réécrire l’interface.

### 3.5 Observabilité comme fonctionnalité

Les erreurs, jobs, décisions et appels externes portent un identifiant de corrélation. Les logs structurés, métriques et traces font partie du design, pas d’un ajout tardif.

### 3.6 UX cohérente plutôt que pages isolées

Les écrans partagent le même shell, vocabulaire de statuts, composants, densité, raccourcis clavier et feedback. Cette cohérence réduit l’apprentissage et les erreurs opérateur.

### 3.7 Accessibilité et internationalisation anticipées

La structure sémantique, le clavier, le contraste, les libellés et les formats locaux sont pris en compte dès le bootstrap. Une seconde langue ne doit pas exiger une refonte de l’interface.

## 4. Stack technique

### Socle principal

```text
Next.js App Router
React
TypeScript strict
Tailwind CSS
Radix UI
class-variance-authority
lucide-react
next-themes
```

### Données et formulaires

```text
TanStack Table
React Hook Form
Zod
Intl + date-fns
```

### Interactions

```text
cmdk
sonner
Radix Dialog / Dropdown / Select / Tabs / Switch
```

### Qualité

```text
ESLint
TypeScript
Vitest
Testing Library
Playwright
GitHub Actions
Docker
```

### Pourquoi ces choix

- App Router : composition serveur/client et routing hiérarchique ;
- TypeScript strict : contrats de module et réduction des erreurs ;
- Tailwind + tokens : vitesse, cohérence et thèmes ;
- Radix : primitives accessibles sans imposer une marque ;
- TanStack Table : tables complexes composables ;
- Zod : validation réutilisable aux frontières ;
- Vitest/Playwright : couverture unitaire et parcours réel.

Ces choix ne sont pas exclusifs. L’architecture accepte d’autres providers d’auth, bases, ORMs, queues ou plateformes d’observabilité.

## 5. Anatomie de l’application

```text
enterprise-app-bootstrap/
├── src/
│   ├── app/                    # routes, layouts, handlers et états
│   ├── components/
│   │   ├── ui/                 # primitives du design system
│   │   ├── common/             # patterns réutilisables
│   │   ├── layout/             # shell, header, sidebar, command menu
│   │   └── theme/              # thème utilisateur
│   ├── config/                 # produit, navigation, features, workspaces
│   ├── features/               # modules métier verticaux
│   ├── lib/                    # erreurs, formatage, observabilité
│   ├── server/
│   │   ├── services/           # cas d’usage
│   │   ├── repositories/       # ports de persistance
│   │   ├── audit/              # audit sink
│   │   ├── events/             # événements métier
│   │   ├── jobs/               # tâches asynchrones
│   │   ├── integrations/       # appels sortants
│   │   ├── idempotency/        # déduplication
│   │   └── feature-flags/      # provider serveur
│   └── types/
├── tests/
├── docs/
├── Dockerfile
├── compose.yaml
└── .github/workflows/ci.yml
```

## 6. Shell applicatif

Le shell contient :

```text
sidebar responsive
sélecteur de workspace
navigation filtrée par permission
header sticky
recherche / command palette
notifications
thème clair/sombre
menu utilisateur
zone de contenu
mobile drawer
skip link accessibilité
```

### Navigation

La navigation est déclarative dans `src/config/navigation.ts`. Chaque entrée possède :

```ts
{
  label: "Approbations",
  href: "/approvals",
  icon: CheckSquare,
  permission: "approvals.read",
  feature: "approvals",
  badge: "4"
}
```

Cela permet de centraliser l’ordre, la visibilité et l’activation. La même source alimente la command palette.

### Workspaces

Le sélecteur de workspace illustre un contexte de travail. En production, son changement doit :

1. vérifier l’appartenance ;
2. mettre à jour une préférence serveur ou session ;
3. invalider les données en cache ;
4. réévaluer les permissions et feature flags ;
5. journaliser le changement si nécessaire.

## 7. Modules fournis

### 7.1 Dashboard

Le dashboard montre : métriques, variations, activité temporelle, événements récents et alertes actionnables. Il ne doit pas devenir une accumulation de chiffres sans décision associée.

### 7.2 File de travail

La file de travail représente les tâches humaines ou système à traiter : priorité, statut, propriétaire, échéance et type. Pour aller plus loin : vues enregistrées, assignation, SLA, escalades, bulk actions et verrouillage optimiste.

### 7.3 Données métier

La table de dossiers illustre :

- recherche globale ;
- filtre de statut ;
- tri ;
- sélection multiple ;
- pagination ;
- badges de risque ;
- actions de ligne ;
- formatage monétaire et temporel.

Pour de gros volumes, déplacer filtrage, tri et pagination côté serveur. Les exports doivent devenir des jobs asynchrones.

### 7.4 Rapports

Le module montre KPIs, série temporelle, répartition et qualité. En production, connecter une couche analytique, définir la fraîcheur des données et expliciter les formules.

### 7.5 Approbations

Le workflow d’approbation inclut : demandeur, risque, échéance, relecteurs, impact et décision. Les règles réelles doivent gérer :

- seuils ;
- multi-niveaux ;
- quorum ;
- délégation ;
- séparation des responsabilités ;
- commentaires et pièces ;
- expiration ;
- révocation ;
- preuve d’approbation.

### 7.6 Journal d’audit

Le journal montre acteurs humains/services, action, ressource, résultat, workspace et corrélation. Il est distinct du feed d’activité métier.

### 7.7 Administration

Les écrans couvrent : profil organisationnel, membres, rôles, sécurité et feature flags. Les mutations sont simulées dans l’UI mais les frontières à raccorder sont documentées.

### 7.8 Centre d’aide

La documentation devient un module contextualisé. Elle peut être alimentée par MDX, un CMS, une base de connaissance ou un moteur de recherche. Elle doit pouvoir proposer un article selon la page et le rôle courant.

## 8. Identité, rôles et permissions

### Modèle fourni

```text
owner
admin
manager
analyst
member
viewer
```

Les permissions sont des verbes explicites :

```text
dashboard.view
work.read
work.manage
records.read
records.write
approvals.read
approvals.review
reports.read
audit.read
members.read
members.manage
settings.read
settings.manage
security.manage
feature_flags.manage
```

### Règle essentielle

```ts
requirePermission(session, "records.write");
```

Cette vérification se fait dans le service serveur avant l’écriture. La `PermissionBoundary` client ne sert qu’à adapter l’affichage.

### Évolution recommandée

Quand le RBAC devient insuffisant, ajouter des politiques :

```text
can(user, "approve", request)
si request.workspaceId ∈ user.workspaces
et request.amount <= user.approvalLimit
et request.requesterId != user.id
```

Le moteur de politique peut rester interne ou être remplacé par un service spécialisé.

## 9. Couche serveur

### Route

Transforme HTTP en appel applicatif : parsing, session, corrélation, réponse et mapping des erreurs.

### Service

Orchestre le cas d’usage : permission, validation, repository, audit, événement, notification.

### Repository

Encapsule la persistance et applique systématiquement le scope d’organisation/workspace.

### Exemple de flux

```text
POST /api/records
  → getSession
  → requirePermission(records.write)
  → createRecordSchema.parse
  → recordsRepository.create
  → audit.write
  → events.publish
  → JSON 201
```

## 10. Données et multi-tenancy

### Clés de scope

Toute table métier partagée doit comporter au minimum :

```text
organization_id
workspace_id si nécessaire
id
timestamps
version ou updated_at
```

### Isolation

Ne jamais écrire :

```sql
SELECT * FROM records WHERE id = $1;
```

Préférer :

```sql
SELECT * FROM records
WHERE organization_id = $1
  AND workspace_id = $2
  AND id = $3;
```

Ajouter des tests automatisés d’isolation et, selon la base, envisager Row Level Security comme couche complémentaire.

### Transactions

Une opération métier atomique doit rester dans une transaction. Pour publier un événement de manière fiable, utiliser un transactional outbox au lieu de faire confiance à deux appels indépendants.

### Concurrence

Pour les éditions sensibles :

- colonne `version` ;
- `If-Match`/ETag ou version dans la commande ;
- détection de conflit ;
- message permettant de recharger ou fusionner.

## 11. Formulaires et validation

Le formulaire organisation combine React Hook Form et Zod. La validation client améliore l’expérience, mais la validation serveur est obligatoire.

Un formulaire entreprise doit traiter :

```text
valeurs initiales
validation inline
soumission en cours
succès
erreurs métier
conflit de version
abandon avec modifications non sauvegardées
permissions de champ
accessibilité
```

Pour les formulaires longs, préférer sections, progression et sauvegarde de brouillon plutôt qu’un écran monolithique.

## 12. Tables et recherche

### Petit volume

Le starter filtre et trie côté client.

### Volume réel

Passer à des paramètres URL :

```text
?page=2&pageSize=50&sort=updatedAt:desc&status=active&q=atlas
```

Le serveur retourne :

```json
{
  "data": [],
  "page": 2,
  "pageSize": 50,
  "total": 12400,
  "nextCursor": null
}
```

Employer cursor pagination lorsque les données changent rapidement ou que l’offset devient coûteux.

## 13. Workflows, jobs et événements

### Workflows humains

Conserver un historique d’état et des décisions explicites. Éviter de déduire l’historique uniquement de la valeur actuelle.

### Jobs asynchrones

Utiliser une queue durable pour :

- exports ;
- imports ;
- génération de rapports ;
- appels externes lents ;
- notifications ;
- traitement de fichiers ;
- recalculs.

Un job doit porter : tenant, corrélation, clé d’idempotence, nombre de tentatives et stratégie de dead-letter.

### Événements métier

Exemples :

```text
record.created
approval.requested
approval.approved
member.invited
integration.failed
```

Les événements doivent décrire un fait passé, être versionnés et éviter les données sensibles inutiles.

## 14. Intégrations

L’adapter `integrationFetch()` centralise timeout, headers, token et corrélation. Ajouter :

```text
retry sélectif
backoff + jitter
circuit breaker
rate limiting
validation de payload
signature webhook
idempotency key
métriques par dépendance
```

Ne pas appeler directement un service externe depuis un composant React.

## 15. Feature flags

Un flag contrôle la livraison, pas l’autorisation. Même si une feature est désactivée visuellement, le serveur doit conserver ses contrôles de permission.

Chaque flag devrait avoir : owner, objectif, environnement, date de création, date d’expiration, stratégie de rollout et métrique de décision. Supprimer les flags terminés.

## 16. Audit, logs, métriques et traces

### Audit

Preuve métier/sécurité durable.

### Logs

Diagnostic technique structuré :

```json
{
  "level": "info",
  "message": "record.created",
  "correlationId": "...",
  "organizationId": "...",
  "workspaceId": "...",
  "recordId": "..."
}
```

### Métriques

Suivre au minimum : latence, taux d’erreur, saturation, files, jobs en échec, SLA métier et dépendances externes.

### Traces

Propager la corrélation à travers HTTP, queue et base. OpenTelemetry est une bonne frontière d’instrumentation, quelle que soit la plateforme d’observabilité finale.

## 17. Gestion des erreurs

Le socle distingue :

```text
401 non authentifié
403 authentifié mais interdit
400 entrée invalide
404 absent ou masqué
409 conflit métier ou concurrence
429 quota
500 incident interne
```

L’interface ne doit pas afficher stack traces ou secrets. Fournir un message actionnable et, pour les incidents, une référence de corrélation.

## 18. Design system et beauté fonctionnelle

### Principes

1. Hiérarchie avant décoration.
2. Une action primaire par contexte.
3. Couleur sémantique et non arbitraire.
4. Densité adaptée au rôle opérateur.
5. États visibles : chargement, vide, erreur, succès, interdit.
6. Alignement et rythme constants.
7. Interactions clavier pour les utilisateurs intensifs.

### Palette

La palette par défaut est bleue, neutre et facilement remplaçable. Les variables sémantiques sont dans `globals.css`; il suffit de changer les valeurs pour adapter la marque sans modifier les composants.

### Formats

Le starter utilise :

```text
fr-FR pour nombres et monnaies
Africa/Casablanca comme exemple de timezone organisationnelle
ISO 8601 pour le transport
format local uniquement à l’affichage
```

Ne pas stocker une date formatée. Stocker un instant ou une date métier correctement typée.

### Grilles

- contenu max 1600 px ;
- sidebar 288 px déployée, 80 px réduite ;
- cards en 2 ou 4 colonnes selon viewport ;
- pages data avec largeur disponible complète ;
- formulaires limités pour conserver la lisibilité.

## 19. Accessibilité

Le starter inclut : lien d’évitement, landmarks, titres, labels, focus visible, composants Radix et libellés d’action.

Checklist :

- navigation uniquement au clavier ;
- ordre de focus logique ;
- modales piégeant correctement le focus ;
- contraste conforme ;
- erreurs reliées aux champs ;
- annonces live pour résultats importants ;
- tableaux avec en-têtes ;
- zoom 200 % ;
- réduction des animations selon préférence ;
- tests avec lecteur d’écran sur parcours critique.

## 20. Performance

- préférer Server Components pour les pages de lecture ;
- limiter les Client Components aux interactions ;
- paginer les données ;
- virtualiser seulement lorsque nécessaire ;
- éviter les gros bundles de graphiques pour trois barres ;
- mettre en cache selon la sensibilité et la fraîcheur ;
- invalider explicitement après mutation ;
- surveiller Core Web Vitals et latence serveur.

## 21. Tests

### Pyramide proposée

```text
unitaires : politiques, schémas, fonctions métier
intégration : services + repositories + base réelle de test
composants : comportements complexes
E2E : parcours critiques
contract tests : intégrations externes
security tests : isolation, authz, entrées malveillantes
```

Le starter contient des tests de permission, validation et un smoke test Playwright.

## 22. CI/CD

Le workflow fourni exécute :

```text
npm ci
lint
type-check
unit tests
production build
```

Dans un pipeline réel, ajouter : scans, migrations de préproduction, tests d’intégration, publication d’image signée, déploiement progressif, smoke test post-déploiement et rollback automatisable.

## 23. Déploiement

Le Dockerfile utilise un build multi-stage et le mode standalone de Next.js. `compose.yaml` fournit des services locaux PostgreSQL et Redis, mais aucun client base/queue n’est imposé.

En production :

- image immuable ;
- utilisateur non-root ;
- secrets injectés ;
- health/readiness séparés ;
- migrations contrôlées ;
- autoscaling basé sur métriques utiles ;
- sauvegardes et restauration testées ;
- régions et résidence des données documentées.

## 24. Configuration par future application

Les cinq zones à adapter en premier :

```text
src/config/app.ts
src/config/navigation.ts
src/config/features.ts
src/config/workspaces.ts
src/app/globals.css
```

Puis remplacer les modules de démonstration par les domaines réels.

### Profil minimal

```text
dashboard
données métier
settings
RBAC
health
logs
```

### Profil opérations

```text
file de travail
SLA
approbations
bulk actions
notifications
jobs
```

### Profil réglementé

```text
SSO/MFA
séparation des responsabilités
audit append-only
rétention
export de preuve
contrôles réseau
chiffrement et clés gérées
```

### Profil SaaS B2B

```text
organisations
workspaces
plans et quotas
feature flags
billing
support
audit client
```

## 25. Matrice : démonstration versus production

| Zone | Adapter fourni | Production attendue |
|---|---|---|
| Auth | session mock | IdP OIDC/SAML |
| Autorisation | RBAC en mémoire | politiques + scopes + tests |
| Données | tableau et repository mémoire | base transactionnelle |
| Audit | logs structurés | stockage append-only |
| Jobs | in-process | queue durable + DLQ |
| Événements | console | outbox + broker |
| Flags | config/env | provider gouverné |
| Notifications | contrat | email/in-app/webhook |
| Intégrations | fetch centralisé | résilience et secrets gérés |
| Analytics | données statiques | warehouse/semantic layer |
| Help | cartes statiques | CMS/MDX/recherche |
| Observabilité | logger minimal | logs/métriques/traces centralisés |

## 26. Ordre recommandé d’industrialisation

### Étape 1 — Identité et scopes

Brancher IdP, session serveur, organisations, workspaces et permissions.

### Étape 2 — Persistance

Choisir base/ORM, migrations, transactions, isolation tenant et données de référence.

### Étape 3 — Premier module métier

Implémenter un seul parcours de bout en bout avec service, repository, UI, audit et tests.

### Étape 4 — Exploitation

Logs, corrélation, métriques, health/readiness, alerting et runbooks.

### Étape 5 — Asynchrone et intégrations

Queue, idempotence, webhooks, retries et outbox.

### Étape 6 — Gouvernance

Audit durable, rétention, droits avancés, exports, séparation des responsabilités.

### Étape 7 — Design system produit

Adapter les tokens, tester l’accessibilité, documenter les composants et stabiliser les patterns.

## 27. Définition de “prêt pour production”

Le starter est prêt à servir de base lorsqu’il compile et illustre les patterns. Votre application est prête pour production seulement quand :

- les adapters mock sont remplacés ;
- les exigences métier et sécurité sont testées ;
- l’isolation tenant est démontrée ;
- les procédures d’exploitation existent ;
- les SLO et alertes sont définis ;
- les sauvegardes/restaurations sont testées ;
- les owners et runbooks sont connus ;
- la conformité nécessaire est validée.

## 28. Commandes

```bash
cp .env.example .env.local
npm install
npm run dev
npm run lint
npm run type-check
npm run test
npm run build
```

Docker :

```bash
cp .env.example .env
docker compose up --build
```

## 29. Checklist de fork

- [ ] renommer l’application et le package ;
- [ ] définir la palette de marque ;
- [ ] définir organisations/workspaces ;
- [ ] lister rôles et permissions ;
- [ ] retirer les modules inutiles ;
- [ ] remplacer les données de démonstration ;
- [ ] brancher l’IdP ;
- [ ] brancher base et migrations ;
- [ ] brancher audit et observabilité ;
- [ ] définir politiques de rétention ;
- [ ] ajouter le premier parcours métier ;
- [ ] ajouter tests d’isolation et autorisation ;
- [ ] configurer CI/CD ;
- [ ] effectuer threat model et revue accessibilité.

## 30. Références de conception

- documentation officielle Next.js App Router ;
- documentation officielle React ;
- OWASP Application Security Verification Standard ;
- W3C WAI-ARIA Authoring Practices Guide ;
- principes de logs structurés et traçage distribué OpenTelemetry.

Le but n’est pas de suivre aveuglément une stack, mais de conserver des frontières nettes, des contrôles vérifiables et une expérience cohérente.
