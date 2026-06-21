# Mistral Style Reference — Guide détaillé

Guide non officiel de référence visuelle inspiré des patterns publics observables de Mistral Docs. Il ne redistribue pas les logos, polices ou actifs propriétaires de Mistral.

## Objectif

Fournir une grammaire visuelle réutilisable pour des applications entreprise : palettes, densité, surfaces, cartes, boutons, icônes pixel originales, code blocks, callouts, tables et micro-interactions.

## Palette

La palette de référence privilégie :

- orange / rouge pour l'action primaire ;
- jaune / amber pour les accents chauds ;
- bleu pour les modules techniques ;
- neutres clairs et sombres pour les surfaces ;
- variables OKLCH pour une meilleure cohérence entre light mode et dark mode.

## Typographie

- Sans-serif système pour le texte courant.
- Mono pour les éléments techniques, raccourcis clavier, tags, filtres et code.
- Titres avec tracking négatif et graisse forte.
- Labels courts en uppercase mono.

## Composants

Le kit couvre :

- Button.
- ProductCard.
- SectionTab.
- ThemeToggle.
- Callout.
- Table responsive.
- Code block.
- Filter pills.
- Keyboard key.
- Pixel icons originaux.

## Icônes

Les icônes du kit sont originales, dessinées dans une grammaire pixel-compatible. Elles ne reprennent pas les actifs propriétaires.

## Mouvement

Micro-interactions recommandées :

- hover léger ;
- translate-y négatif sur cartes ;
- apparition douce des actions secondaires ;
- rotation / scale légère pour hero cards ;
- transitions limitées à opacity, transform, color, border et background.

## Utilisation

Importer les tokens :

```css
@import './tokens/theme.css';
@import './components/components.css';
```

Puis utiliser les classes fournies ou adapter les composants React dans `integration/`.

## Avertissement

Ce kit est une référence de style et non un thème officiel. Remplacer les couleurs, noms, logos et assets par ceux de ton organisation avant usage en production.
