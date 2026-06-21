# Ajouter un module métier

Exemple : un module `contracts`.

## 1. Définir le vocabulaire

```text
Contract
ContractStatus
CreateContractInput
contract.read
contract.write
contract.approve
```

Ajouter les permissions dans `features/auth/types.ts`, puis leur attribution dans `permissions.ts`.

## 2. Créer la verticale

```text
src/features/contracts/
├── types.ts
├── schemas.ts
├── data.ts                 # uniquement pour la démo
├── contracts-table.tsx
├── contract-form.tsx
└── public.ts               # exports autorisés si nécessaire
```

## 3. Créer le port de persistance

```ts
export interface ContractsRepository {
  list(scope: { organizationId: string; workspaceId: string }): Promise<Contract[]>;
  create(scope: Scope, input: CreateContractInput): Promise<Contract>;
}
```

Le repository ne décide pas qui a le droit d’appeler l’opération.

## 4. Créer le service applicatif

```ts
export async function createContract(session: AppSession | null, input: unknown) {
  requirePermission(session, "contract.write");
  const parsed = createContractSchema.parse(input);
  const result = await contractsRepository.create({
    organizationId: session.organizationId,
    workspaceId: session.activeWorkspaceId,
  }, parsed);
  await audit.write(...);
  await events.publish(...);
  return result;
}
```

## 5. Exposer l’API ou Server Action

La frontière HTTP transforme les erreurs en statuts cohérents, ajoute la corrélation et ne contient pas la règle métier.

## 6. Composer les écrans

Créer :

```text
src/app/(app)/contracts/page.tsx
src/app/(app)/contracts/[id]/page.tsx
```

La liste doit gérer chargement, erreur, état vide, pagination et permissions. La fiche doit montrer l’historique et les actions autorisées.

## 7. Ajouter la navigation

Déclarer l’entrée dans `src/config/navigation.ts` avec permission et feature flag éventuel.

## 8. Tester

Minimum :

- schéma valide/invalide ;
- permission autorisée/refusée ;
- isolation organisation/workspace ;
- service et repository ;
- workflow navigateur principal ;
- accessibilité de la table et du formulaire.

## 9. Documenter

Ajouter : owner, données manipulées, dépendances externes, SLO, événements, flags, runbook et politique de rétention.
