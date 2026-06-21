# Architecture du socle

## Style retenu : monolithe modulaire

Le starter sépare les responsabilités sans imposer des microservices. Une application d’entreprise a souvent besoin d’un modèle transactionnel cohérent, d’une livraison simple et d’une équipe capable de raisonner sur le système entier. Le monolithe modulaire répond à ce besoin tout en maintenant des frontières d’extraction.

## Couches

```text
Route / UI
   ↓
Feature component
   ↓
Application service
   ↓
Policy + validation
   ↓
Repository / integration adapter
   ↓
Database, API externe, queue, object storage
```

### `src/app`

Composition des pages, metadata, layouts, handlers HTTP et états de navigation. Les routes ne doivent pas contenir les règles métier centrales.

### `src/features`

Modules verticaux : types, schémas, composants et données de démonstration d’un domaine. Un module ne doit pas importer les détails internes d’un autre module ; il passe par un contrat public ou un service applicatif.

### `src/server/services`

Orchestration des cas d’usage. C’est ici que l’on vérifie les permissions, valide les entrées, appelle les repositories, écrit l’audit et publie les événements.

### `src/server/repositories`

Ports de persistance. L’interface reste stable ; l’adapter peut être mémoire, SQL, API ou service externe.

### `src/server/*`

Adapters transverses pour audit, jobs, événements, feature flags, notifications, idempotence et intégrations.

## Dépendances autorisées

```text
app → features, components, server services
features → components, lib, types
server services → policies, schemas, repositories, adapters
repositories → infrastructure client, domain types
components/ui → lib seulement
```

Éviter :

```text
repository → React
component UI → database
page → SQL direct
feature A → fichier interne de feature B
client component → secret ou SDK serveur
```

## Multi-tenant

Chaque lecture ou écriture métier doit être scoped par :

```text
organizationId
workspaceId lorsque pertinent
resourceId
```

Le workspace actif de l’interface n’est pas une preuve d’autorisation. Le serveur doit vérifier l’appartenance de l’utilisateur, le rôle et le scope de la ressource.

## Extraction future

Un module peut devenir un service indépendant lorsqu’au moins un de ces critères est avéré :

- charge ou cycle de déploiement très différent ;
- frontière de conformité ou de données ;
- équipe autonome propriétaire ;
- besoin de résilience indépendant ;
- modèle transactionnel séparé.

Avant cela, privilégier des modules et adapters explicites.
