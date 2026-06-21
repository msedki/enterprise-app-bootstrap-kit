# Carte des sources publiques

Analyse effectuée le 21 juin 2026.

| Sujet | Source publique |
|---|---|
| Navigation, structure de la home et textes d’interface | https://docs.mistral.ai/ |
| Dépôt public de la documentation | https://github.com/mistralai/platform-docs-public |
| Tokens sémantiques, typographie, espacements et thèmes | `src/app/globals.css` du dépôt |
| Rampe rouge-orange-jaune | `tailwind.config.js` du dépôt |
| Police UI et pile mono | `src/app/globals.css` et `src/lib/font.ts` |
| Boutons et variantes | `src/components/ui/button.tsx` |
| Square bullets | `src/components/ui/bullet.tsx` |
| Raccourcis clavier | `src/components/ui/keyboard-key.tsx` |
| Navigation principale | `src/components/layout/header/` et `src/schema/content/header.ts` |
| Cartes produit et effets de hover | `src/app/[locale]/(docs)/page.tsx` |
| Cartes de hero | `src/components/common/hero-cards.tsx` |
| Section tabs | `src/components/layout/section-tab/index.tsx` |
| Code blocks | `src/components/common/code-block/index.tsx` |
| Callouts | `src/components/common/admonition.tsx` |
| Tables | `src/components/common/markdown-table.tsx` |
| Icônes pixel publiques | `src/components/icons/pixel/` |
| Consignes de marque et téléchargement officiel | https://mistral.ai/brand/ |

## Ce qui est extrait

- valeurs de couleurs publiques ;
- choix de familles typographiques ;
- échelle de texte, line-height et tracking ;
- dimensions principales ;
- conventions de composants ;
- grammaire générale des icônes ;
- comportements d’interaction observables.

## Ce qui n’est pas inclus

- logo Mistral ;
- wordmark Mistral ;
- emblème du chat pixel ;
- illustrations officielles des modèles ;
- captures ou product shots officiels ;
- fichiers de police ;
- contenus rédactionnels complets ;
- code source complet des composants Mistral.

Les icônes incluses dans ce kit sont originales. Les classes CSS de composants sont une réimplémentation autonome.
