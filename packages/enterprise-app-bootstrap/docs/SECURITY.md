# Sécurité et conformité

## Principe

Le starter montre où placer les contrôles ; il ne remplace pas une revue de sécurité, un threat model ou les exigences réglementaires de l’organisation.

## Authentification

Remplacer `src/features/auth/session.ts` par l’intégration IdP de l’entreprise : OIDC/OAuth 2.0, SAML via un broker ou une plateforme IAM. Exiger :

- MFA selon le risque ;
- rotation et révocation des sessions ;
- durée de session configurable ;
- step-up authentication pour actions sensibles ;
- comptes de secours fortement contrôlés ;
- gestion du départ d’un employé.

## Autorisation

L’interface masque les entrées non autorisées, mais le serveur reste l’autorité. Chaque service applicatif appelle `requirePermission()` avant l’accès au repository, et chaque page sous `src/app/(app)` appelle `requirePageAccess()` avant de rendre son contenu : retirer un lien de `src/config/navigation.ts` ne bloque jamais l’accès direct à l’URL, seul ce contrôle le fait.

Le RBAC du starter est un point de départ. Pour les systèmes complexes, ajouter :

- scope d’organisation et workspace ;
- ownership de ressource ;
- séparation des responsabilités ;
- conditions ABAC ;
- politiques explicables et testables ;
- refus par défaut.

## Validation et sorties

- valider toutes les entrées aux frontières avec Zod ou équivalent ;
- ne jamais faire confiance aux IDs fournis par le client ;
- encoder les sorties selon le contexte ;
- limiter taille, type et fréquence des requêtes ;
- analyser les fichiers téléversés ;
- éviter les messages d’erreur révélant des détails internes.

## Journal d’audit

Journaliser au minimum :

```text
qui
quoi
quand
où / workspace
ressource
résultat
adresse ou contexte réseau
correlationId
métadonnées non sensibles
```

Le stockage de production doit être append-only, protégé contre l’altération et soumis à une politique de rétention. Ne pas écrire de secrets, mots de passe, tokens ou données personnelles inutiles.

## Secrets

- aucun secret dans Git ;
- utiliser un secret manager ;
- identités de workload plutôt que clés statiques ;
- rotation et expiration ;
- séparation par environnement ;
- accès minimum et audité.

## En-têtes et navigateur

`next.config.ts` ajoute plusieurs en-têtes de base. En production, ajouter une CSP stricte, idéalement avec nonces, adaptée aux domaines réels. Vérifier également cookies `Secure`, `HttpOnly`, `SameSite` et protection CSRF pour les opérations authentifiées.

## Intégrations

L’adapter HTTP illustre : timeout, token serveur, identifiant de corrélation et clé d’idempotence. Ajouter selon le contexte :

- retries avec backoff et jitter ;
- circuit breaker ;
- quotas ;
- validation de signature webhook ;
- allow-list DNS/URL ;
- egress proxy ;
- journalisation sans données sensibles.

## Pipeline

Ajouter dans le CI réel :

- audit des dépendances ;
- SAST ;
- secret scanning ;
- analyse de conteneur ;
- SBOM ;
- signature d’image ;
- scan IaC ;
- tests DAST ciblés ;
- politique de mise à jour et SLA de correction.

## Checklist de mise en production

- [ ] threat model validé ;
- [ ] IdP et MFA configurés ;
- [ ] autorisations serveur testées ;
- [ ] audit append-only branché ;
- [ ] secrets externalisés ;
- [ ] CSP et cookies durcis ;
- [ ] rate limiting et anti-abus ;
- [ ] stratégie de sauvegarde et restauration testée ;
- [ ] rétention et purge des données ;
- [ ] procédure incident et contacts ;
- [ ] dépendances et images scannées ;
- [ ] tests d’accès inter-tenant.
