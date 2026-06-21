# Guide de style — référence visuelle Mistral Docs

> Kit non officiel, construit à partir de la documentation publique et de son dépôt open source.  
> Il sert à comprendre et réimplémenter une grammaire visuelle similaire dans une application d’entreprise.  
> Il ne contient aucun logo, wordmark, fichier de police, illustration de modèle ou autre actif officiel de Mistral.

## 1. Résumé de la philosophie

Le langage visuel de la documentation repose sur une tension maîtrisée entre :

- une base éditoriale neutre et très lisible ;
- des accents orange, rouge et jaune très saturés ;
- des surfaces claires ou presque noires ;
- une typographie sans serif utilitaire ;
- une typographie mono pour les métadonnées et commandes ;
- des formes légèrement arrondies ;
- des icônes pixel pleines et géométriques ;
- des interactions rapides, sobres et directionnelles ;
- quelques moments plus expressifs, notamment les cartes du hero.

Ce système fonctionne parce qu’il ne colore pas toute l’interface. La couleur forte est réservée aux actions, marqueurs, cartes produit, états actifs et illustrations. Le reste utilise des gris chauds et des bordures faibles.

## 2. Limites de marque

Le dépôt public de la documentation est sous Apache 2.0. Cette licence permet l’utilisation et la création de dérivés du code sous ses conditions, mais sa clause de marque ne donne pas le droit d’utiliser les marques du concédant.

La page de marque officielle précise également que le nom, les logos, les icônes et les actifs identifiants appartiennent à Mistral et qu’ils doivent être utilisés avec soin.

Dans une application d’entreprise qui n’est pas un produit Mistral :

- ne présente pas ce thème comme officiel ;
- ne réutilise pas le logo ou le chat emblématique comme logo de ton produit ;
- ne copie pas les illustrations de modèles ;
- ne nomme pas ton design system « Mistral UI » ;
- remplace les couleurs de marque par tes propres couleurs avant mise en production ;
- utilise les valeurs de ce kit comme une référence de composition.

## 3. ADN visuel

### 3.1 Contraste structurel

Le canvas est légèrement teinté :

```css
body {
  background: var(--msr-muted);
}
```

Les panneaux, cartes et zones de contenu reviennent au blanc ou à une surface sombre dédiée. Cela crée de la profondeur sans multiplier les ombres.

### 3.2 Couleur rare mais franche

L’orange est utilisé comme action principale et signal de marque. Le jaune fonctionne comme tonalité expressive ou tertiaire. Le bleu, l’orange et le gris violet distinguent des familles de produits.

### 3.3 Métadonnées en mono

Les éléments suivants gagnent à être en police mono :

- labels de section ;
- raccourcis clavier ;
- méthodes HTTP ;
- badges techniques ;
- petites métadonnées ;
- contrôles de copie ;
- filtres compacts ;
- noms de fichiers et langages.

Le corps de texte, les titres et les boutons restent en sans serif.

### 3.4 Pixel sans nostalgie excessive

Les icônes sont pleines, modulaires et carrées. Elles ne doivent pas transformer toute l’interface en jeu vidéo. Elles sont utilisées comme ponctuation dans une interface autrement moderne.

## 4. Palette

### 4.1 Rampe de marque publique

| Nom | Valeur |
|---|---|
| Red | `#E10500` |
| Orange | `#FA500F` |
| Bright orange | `#FF8205` |
| Yellow | `#FFAF00` |
| Bright yellow | `#FFD700` |

Rampe étendue :

```txt
100  #FFD700
200  #FFC300
300  #FFAF00
400  #FF9900
500  #FF8205
600  #FF6600
700  #FA500F
800  #F13C00
900  #E92700
```

### 4.2 Accents produit observés

| Famille | Couleur |
|---|---|
| Vibe | `#FA500F` |
| Studio/API | `#0082E6` |
| Admin | `#4A4A5E` |
| Models | `#6F6F84` |

Ces accents fonctionnent bien pour différencier les modules d’une application d’entreprise :

```txt
Opérations      orange
Données/API     bleu
Administration  gris violet
Catalogue       violet/gris
```

Ne fais pas dépendre les significations critiques uniquement de ces couleurs. Ajoute texte, icône et statut explicite.

### 4.3 Tokens sémantiques clairs

| Token | OKLCH | Approx. hex |
|---|---|---|
| Background | `oklch(1 0 0)` | `#FFFFFF` |
| Foreground | `oklch(0.2161 0.0061 56.04)` | `#1C1917` |
| Primary | `oklch(0.6639 0.2147 37.25)` | `#FA5111` |
| Primary soft | `oklch(0.735 0.1841 53.6)` | `#FF8205` |
| Secondary | `oklch(0.9368 0.0013 106.43)` | `#EAEAE9` |
| Tertiary | `oklch(0.9101 0.101 92.32)` | `#F9E092` |
| Muted | `oklch(0.9729 0.0013 106.42)` | `#F6F6F5` |
| Muted foreground | `oklch(0.556 0 0)` | `#737373` |
| Destructive | `oklch(0.577 0.245 27.325)` | `#E7000B` |
| Input | `oklch(0.922 0 0)` | `#E5E5E5` |

### 4.4 Thème sombre

Le thème sombre utilise un fond presque noir plutôt qu’un gris bleuté :

```txt
Canvas       #101010
Card         #171717
Text         #FAFAFA
Code bg      #1C1917
Border       blanc à 20 %
Input        blanc à 15 %
```

L’orange primaire reste stable ; l’orange secondaire est assombri pour éviter l’éblouissement.

### 4.5 Palette des entités ou modèles

La palette secondaire comporte des tons rose, orange, jaune, vert, bleu, violet et beige. Elle convient aux entités d’un catalogue, mais pas aux actions globales.

Règle :

```txt
action globale        token primary
état sémantique       success/warning/destructive
catégorie ou produit  palette secondaire
visualisation         palette chart
```

## 5. Typographie

### 5.1 Familles

Sans serif :

```css
font-family: Arial, ui-sans-serif, system-ui, sans-serif;
```

Mono :

```css
font-family: "SF Mono", ui-monospace, Menlo, Monaco, Consolas, monospace;
```

Aucun fichier de police n’est fourni. Sur un poste sans SF Mono, le navigateur choisira un fallback système.

### 5.2 Échelle

| Style | Taille | Line-height | Tracking |
|---|---:|---:|---:|
| xs | 12 px | 1.4 | -0.01em |
| sm | 14 px | 1.4 | -0.015em |
| base | 16 px | 1.5 | -0.02em |
| lg | 18 px | 1.4 | -0.02em |
| xl | 20 px | 1.2 | -0.02em |
| 2xl | 24 px | 1.2 | -0.02em |
| 3xl | 30 px | 1.2 | -0.02em |
| 4xl | 36 px | 1.1 | -0.02em |
| 5xl | 48 px | 1.1 | -0.02em |
| 6xl | 56 px | 1.1 | -0.04em |

### 5.3 Hiérarchie recommandée

Hero :

```css
font-weight: 900;
font-size: clamp(2rem, 4vw, 3rem);
line-height: 1.1;
letter-spacing: -0.02em;
```

Titre de page :

```css
font-weight: 700;
font-size: clamp(2.25rem, 5vw, 3rem);
```

Titre de carte :

```css
font-weight: 700;
font-size: 1.25rem;
line-height: 1.2;
```

Label technique :

```css
font-family: var(--msr-font-mono);
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
```

### 5.4 Règles éditoriales

- privilégier les titres courts ;
- éviter les titres entièrement en majuscules, sauf petits labels ;
- conserver une seule idée par description de carte ;
- écrire les CTA avec un verbe d’action ;
- afficher la durée ou l’état dans une métadonnée séparée ;
- utiliser les termes produit comme des noms propres stables ;
- garder les paragraphes introductifs sous environ deux lignes sur desktop.

## 6. Géométrie

### 6.1 Rayons

Le rayon de base est `0.625rem`, soit environ 10 px.

```txt
sm  6 px
md  8 px
lg 10 px
xl 14 px
```

Les cartes importantes peuvent atteindre 16 px visuellement. Les filtres sont des pills complètement arrondies. Les icônes de navigation restent carrées.

### 6.2 Bordures

- épaisseur normale : 1 px ;
- couleur : noir chaud à 20 % en clair ;
- couleur : blanc à 20 % en sombre ;
- tableaux : lignes pointillées pour le corps ;
- callouts : bordure gauche de 4 px ;
- section tabs : bordure inférieure colorée.

### 6.3 Ombres

L’ombre n’est pas permanente sur toutes les cartes. Elle apparaît principalement au hover ou sur des éléments flottants.

```css
box-shadow: 0 12px 30px rgba(28, 25, 23, .08);
```

Les touches clavier utilisent une petite ombre interne pour imiter un keycap.

## 7. Layout

Dimensions de référence :

```txt
Header desktop  72 px
Header mobile   54 px
Sidebar         256 px
Inset contenu   64 px
Inset externe   16 px
Canvas max      1920 px
```

Structure entreprise recommandée :

```txt
Header global
├── switcher produit ou organisation
├── navigation principale
├── recherche
├── commandes globales
└── profil

Body
├── sidebar métier
├── contenu principal
└── panneau contextuel optionnel
```

Le style Mistral peut donc s’appliquer à une application métier complète, pas uniquement à une documentation.

## 8. Espacement

Échelle pratique :

```txt
4   micro-ajustements
8   icône / libellé
12  petit contrôle
16  espacement standard
24  padding de carte
32  sections compactes
48  séparation forte
64  inset desktop
```

Le contenu principal doit conserver une largeur lisible. Les dashboards peuvent être plus larges que les écrans éditoriaux, mais les formulaires et textes longs doivent rester contraints.

## 9. Iconographie

### 9.1 Grammaire

- canevas 24 × 24 ;
- remplissage plein ;
- pas de stroke fin ;
- modules carrés ;
- diagonales construites par paliers ;
- une seule couleur avec `currentColor` ;
- lecture nette à 16 px.

### 9.2 Où utiliser les icônes pixel

Bon usage :

- navigation ;
- boutons compacts ;
- métadonnées ;
- cartes de modules ;
- actions copier/télécharger ;
- états vides simples ;
- indicateurs dans les tabs.

Usage à éviter :

- graphiques détaillés ;
- grands schémas ;
- illustrations de marque ;
- représentations réalistes ;
- icônes réglementaires nécessitant une convention standard.

### 9.3 Pack inclus

Le dossier `icons/` contient un pack original, indépendant des tracés officiels. Il comprend navigation, recherche, sécurité, utilisateur, réglages, données et commandes.

## 10. Mouvement

Trois niveaux :

### Rapide — 150 ms

- changement de couleur ;
- hover bouton ;
- focus ;
- état actif ;
- opacité.

### Standard — 300 ms

- élévation d’une carte ;
- rotation de flèche ;
- ouverture d’un bloc compact ;
- transitions de panneau.

### Expressif — 750 ms

- éventail de cartes ;
- mise en avant hero ;
- grande transition promotionnelle.

Courbe expressive :

```css
cubic-bezier(0.16, 1, 0.3, 1)
```

Toujours désactiver ou réduire les animations sous `prefers-reduced-motion`.

## 11. Composants

### 11.1 Navigation principale

Pattern :

```html
<a class="msr-nav-link" data-active="true">
  <span class="msr-bullet"></span>
  Produits
</a>
```

L’état actif repose sur trois signaux :

- texte plus sombre ;
- graisse plus forte ;
- petit carré orange.

### 11.2 Recherche globale

Le contrôle ressemble à un champ mais agit comme un bouton ouvrant une command palette.

Caractéristiques :

- fond input neutre ;
- icône recherche ;
- label mono en majuscules ;
- touche `⌘K` dans un keycap ;
- hauteur 32 px ;
- faible contraste au repos.

Dans une app entreprise, la palette peut chercher :

```txt
pages
clients
dossiers
commandes
actions
utilisateurs
paramètres
aide
```

### 11.3 Boutons

Variantes minimales :

```txt
primary
secondary
outline
ghost
destructive
```

Le bouton principal est dense et typographiquement fort. Les boutons secondaires ne doivent pas concurrencer l’action principale.

### 11.4 Cartes produit ou module

Anatomie :

```txt
marque ou icône
flèche circulaire
titre
description
métadonnées éventuelles
```

Interaction :

```txt
translateY(-4px)
ombre légère
bordure teintée
flèche redressée ou agrandie
```

### 11.5 Section tab

Le label coloré collé à une ligne horizontale crée un marqueur de section très reconnaissable.

Pour une application métier, utilise-le pour :

- groupes de paramètres ;
- sections d’un dossier ;
- panneaux de dashboard ;
- grands groupes de formulaires ;
- étapes d’un workflow.

Ne l’utilise pas pour tous les sous-titres.

### 11.6 Filtres pills

Les filtres sont courts, en majuscules, avec une version active inversée :

```txt
inactif  fond card + bordure
actif    fond foreground + texte background
```

### 11.7 Badges

Les badges techniques utilisent la police mono. Les statuts métier peuvent rester en sans serif si le libellé est long.

### 11.8 Callouts

Le callout combine :

- fond très léger ;
- bordure gauche forte ;
- icône ;
- type en mono uppercase ;
- contenu normal.

Types recommandés :

```txt
info
note
tip
warning
danger
success
```

### 11.9 Code

Un code block possède :

- filename optionnel ;
- langage ;
- bouton copier ;
- thème clair et sombre ;
- lignes surlignées ;
- numéros de ligne optionnels ;
- scroll horizontal.

### 11.10 Table

Le tableau utilise :

- headers fortement pondérés ;
- padding 16 px ;
- séparateurs pointillés ;
- hover de ligne subtil ;
- wrapper horizontal ;
- pas de grille lourde.

Dans une application d’entreprise, ajoute :

- tri ;
- sélection ;
- pagination ;
- colonnes masquables ;
- actions groupées ;
- état vide ;
- chargement skeleton.

Conserve néanmoins la même esthétique de surface et de bordure.

## 12. Applications métier

### 12.1 Dashboard

Le style se transpose ainsi :

```txt
Hero docs              -> en-tête de workspace
Cartes produit         -> modules ou indicateurs
Quickstarts            -> tâches recommandées
Section tabs           -> groupes de KPIs
Sidebar docs           -> navigation métier
Command palette        -> navigation et actions globales
TOC                    -> panneau contextuel ou filtres
```

### 12.2 CRM

- orange pour créer ou avancer une opportunité ;
- bleu pour les données et intégrations ;
- gris violet pour administration et configuration ;
- cartes pour comptes prioritaires ;
- table dense sur surface blanche ;
- actions secondaires en outline.

### 12.3 Backoffice

- header compact ;
- sidebar fixe ;
- commandes globales via `⌘K` ;
- tables comme élément central ;
- callouts pour risques et validations ;
- mono pour IDs, références et codes.

### 12.4 Workflow

- section tabs pour les phases ;
- pills pour filtres ;
- square bullet comme état actif ;
- cartes pour étapes ou approbations ;
- orange uniquement pour l’action suivante principale.

## 13. Accessibilité

- contraste texte normal au moins 4.5:1 ;
- focus visible indépendant du hover ;
- état actif non communiqué uniquement par couleur ;
- cible interactive d’au moins 40 × 40 px dans les zones tactiles ;
- icônes décoratives avec `aria-hidden="true"` ;
- icônes seules accompagnées d’un `aria-label` ;
- labels de champs toujours visibles ;
- respect de `prefers-reduced-motion` ;
- thèmes clair et sombre testés séparément ;
- tableaux avec headers sémantiques et caption lorsque nécessaire.

Certaines couleurs de modèle sont trop claires pour porter du texte blanc. Utilise un texte sombre ou réserve-les à un fond décoratif.

## 14. Voix et microcopy

Caractéristiques observées :

- directe ;
- orientée action ;
- phrases courtes ;
- catégories explicites ;
- durée visible ;
- CTA sans ambiguïté ;
- peu de ponctuation décorative.

Formules génériques :

```txt
Créer votre premier …
Configurer …
Comparer …
Afficher tous les …
Revenir à …
Copier le lien
Ouvrir dans …
```

À éviter :

```txt
Cliquez ici
En savoir plus, sans contexte
Super !
Révolutionnaire
Une longue phrase marketing dans un bouton
```

## 15. Checklist d’implémentation

### Fondation

- [ ] importer `tokens/theme.css` ;
- [ ] importer `components/components.css` ;
- [ ] appliquer `theme-mistral-reference` à un wrapper ;
- [ ] configurer le thème sombre ;
- [ ] créer des alias de tokens propres à l’entreprise.

### Typographie

- [ ] utiliser Arial ou la pile système ;
- [ ] ne pas redistribuer SF Mono ;
- [ ] réserver la mono aux labels techniques ;
- [ ] vérifier tracking et line-height.

### Navigation

- [ ] ajouter square bullets aux tabs ;
- [ ] limiter la couleur active à un petit signal ;
- [ ] intégrer la command palette ;
- [ ] prévoir mobile et clavier.

### Composants

- [ ] boutons ;
- [ ] cartes ;
- [ ] pills ;
- [ ] badges ;
- [ ] callouts ;
- [ ] tables ;
- [ ] code blocks ;
- [ ] section tabs.

### Marque

- [ ] retirer les noms Mistral des composants de production ;
- [ ] remplacer la palette principale par la palette de l’entreprise ;
- [ ] ne pas intégrer d’actif officiel sans autorisation ;
- [ ] documenter les changements.

## 16. Fichiers du kit

```txt
tokens/
  mistral-reference.tokens.json
  theme.css
  tailwind.preset.js

components/
  components.css

icons/
  README.md
  sprite.svg
  svg/*.svg
  react/PixelIcons.tsx

integration/
  USAGE.md
  react/*.tsx

preview/
  index.html
  preview.png

source/
  SOURCE_MAP.md
  THIRD_PARTY_NOTICES.md

LICENSES/
  Apache-2.0.txt
```

## 17. Mise en production recommandée

Le chemin sain n’est pas de conserver une copie visuelle exacte.

Processus recommandé :

1. importer le kit dans une branche de prototype de ton propre repo ;
2. identifier les patterns réellement utiles ;
3. renommer tous les tokens ;
4. remplacer la rampe de marque ;
5. conserver la structure typographique, le contraste et les densités ;
6. garder le pack d’icônes original ou le remplacer par ta librairie ;
7. tester dashboard, table, formulaire, modal et mobile ;
8. faire une revue accessibilité ;
9. documenter le thème final comme design system interne.

Le résultat peut garder la clarté, la densité et l’énergie de la documentation Mistral sans devenir une imitation de marque.
