# Intégration

## CSS autonome

```html
<link rel="stylesheet" href="./tokens/theme.css">
<link rel="stylesheet" href="./components/components.css">
<body class="theme-mistral-reference msr-app">
```

## Next.js

Dans `app/globals.css` :

```css
@import "../vendor/mistral-reference/tokens/theme.css";
@import "../vendor/mistral-reference/components/components.css";
```

Dans le layout :

```tsx
<html lang="fr" className="theme-mistral-reference">
```

## Tailwind

Importe `tokens/tailwind.preset.js` dans ta configuration Tailwind, ou recopie uniquement les couleurs et dimensions nécessaires.

```js
import mistralReference from "./vendor/mistral-reference/tokens/tailwind.preset.js";

export default {
  presets: [mistralReference],
};
```

## Recommandation entreprise

Ne garde pas les noms `mistralReference` dans le code produit. Crée une couche d’alias propre à ton entreprise :

```css
:root {
  --brand-action: var(--msr-primary);
  --brand-action-soft: var(--msr-primary-soft);
  --surface-canvas: var(--msr-muted);
  --surface-panel: var(--msr-background);
}
```

Puis remplace progressivement les couleurs de référence par tes propres couleurs de marque.
