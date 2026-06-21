# Design system

## Intention visuelle

Le socle vise une esthétique entreprise sobre et dense sans être austère : surfaces claires, hiérarchie forte, couleurs sémantiques, interactions prévisibles, détails accessibles au clavier et contenu lisible à grande échelle.

Les qualités recherchées :

- crédibilité et stabilité ;
- densité adaptée aux opérations ;
- signal visuel priorisé ;
- cohérence entre desktop et mobile ;
- personnalisation par tokens, pas par duplication de composants.

## Palette

Les composants utilisent des **tokens sémantiques** définis dans `src/app/globals.css` :

| Token | Usage |
|---|---|
| `background` | fond global |
| `foreground` | texte principal |
| `card` | surfaces de contenu |
| `muted` | surfaces secondaires |
| `primary` | action dominante et sélection |
| `secondary` | action discrète |
| `destructive` | danger et suppression |
| `success` | succès, état sain |
| `warning` | risque ou attention |
| `info` | traitement en cours ou information |
| `border` | séparation et structure |
| `sidebar-*` | shell de navigation |

Ne jamais utiliser une couleur uniquement pour transmettre une information. Associer couleur, libellé et si utile une icône.

## Typographie

- police sans-serif système pour l’interface ;
- police monospace pour identifiants, raccourcis, événements et code ;
- titres courts, hiérarchie stable ;
- nombres avec `tabular-nums` dans les tableaux et métriques ;
- textes secondaires entre 12 et 14 px, jamais au détriment du contraste.

## Espacement

Échelle principale : 4, 8, 12, 16, 20, 24, 32 pixels. Les écrans utilisent :

- `gap-4` pour les groupes usuels ;
- `gap-6` entre blocs de page ;
- `p-4` ou `p-5` dans les cartes ;
- `p-6` à `p-8` pour le contenu principal selon le viewport.

## Formes

- champs et boutons : rayon moyen ;
- cartes et panneaux : rayon large ;
- badges : forme pilule ;
- ombres discrètes et réservées aux couches ou hover utiles.

## Composants de base

```text
Button
Badge
Card
Input / Label
Select
Checkbox / Switch
Tabs
Dialog
DropdownMenu
Table
Avatar
Skeleton
Command palette
```

Les variants sont gérés avec `class-variance-authority`, `clsx` et `tailwind-merge`.

## Patterns métier

### PageHeader

Chaque page possède : eyebrow facultatif, titre unique, description et actions primaires/secondaires.

### StatCard

Utilisé pour une métrique avec valeur, variation, période et icône. Une métrique doit toujours préciser son contexte temporel.

### Table entreprise

Inclure selon le besoin :

- recherche ;
- filtres ;
- tri ;
- sélection ;
- pagination ;
- état vide ;
- chargement ;
- permissions d’action ;
- export asynchrone si volume élevé.

### Statuts

Employer un vocabulaire métier stable. Exemple : `draft`, `pending`, `active`, `blocked`, `approved`, `rejected`, `running`, `completed`.

### Feedback

- toast pour confirmation non bloquante ;
- dialog pour décision risquée ou irréversible ;
- erreur inline pour validation ;
- page d’erreur avec identifiant de corrélation ;
- skeleton pour chargement prévisible.

## Responsive

Le shell a une sidebar desktop rétractable et un drawer mobile. Les tables doivent prévoir scrolling horizontal ou vues condensées. Les actions principales restent visibles ; les actions rares passent dans un menu contextualisé.

## Accessibilité

- un `h1` par page ;
- landmarks (`header`, `nav`, `main`, `aside`) ;
- lien d’évitement ;
- focus visible ;
- libellés explicites ;
- commandes clavier ;
- composants Radix pour les interactions complexes ;
- tests clavier et lecteur d’écran sur les workflows critiques.
