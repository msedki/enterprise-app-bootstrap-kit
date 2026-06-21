# Pack d’icônes pixel original

Ce dossier contient **24 icônes originales**, dessinées spécialement pour ce kit.

## Règles visuelles

- canevas : `24 × 24` ;
- géométrie : modules principalement multiples de `3 px` ;
- rendu : surfaces pleines, sans trait ;
- coins et terminaisons carrés ;
- couleur : `currentColor` ;
- taille UI habituelle : `16 px`, parfois `20 px` ou `24 px` ;
- le sens doit rester lisible à petite taille.

Le pack reprend une **grammaire pixel modulaire** comparable à celle observée dans la documentation publique, mais il ne copie pas les tracés officiels et ne contient ni logo, ni chat emblématique, ni illustration de modèle.

## Utilisation SVG

```html
<img src="./svg/search.svg" alt="">
```

Pour hériter de `currentColor`, injecte le SVG inline ou utilise le sprite :

```html
<svg class="msr-icon" aria-hidden="true">
  <use href="./sprite.svg#msr-search"></use>
</svg>
```

## Utilisation React

```tsx
import { SearchIcon, ArrowRightIcon } from "./PixelIcons";

<SearchIcon className="size-4" />
<ArrowRightIcon className="size-4" aria-hidden />
```

## Noms disponibles

`arrow-right`, `arrow-left`, `chevron-right`, `chevron-down`, `check`, `copy`, `search`, `menu`, `close`, `home`, `page`, `user`, `settings`, `shield`, `bell`, `clock`, `filter`, `download`, `upload`, `chart`, `plus`, `minus`, `external`, `command`
