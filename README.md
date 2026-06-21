# Enterprise App Bootstrap & Style Reference

Socle réutilisable pour applications d’entreprise, accompagné d’un kit visuel non officiel.

## Statut de publication

Publication initiale réalisée via le connecteur GitHub MCP.

Le connecteur MCP disponible permet l’écriture de fichiers texte dans le dépôt. Les fichiers binaires locaux volumineux du pack original ne sont pas encore présents dans le dépôt distant, car l’action MCP exposée ne fournit pas de paramètre d’upload de fichier binaire local.

## Contenu déjà publié

- Guide d’architecture et de philosophie : `docs/enterprise-app-bootstrap.md`
- Guide détaillé du style : `docs/mistral-style-reference.md`
- Showcase clair/sombre autonome : `preview/mistral-style-showcase.html`
- Manifest : `REPOSITORY_MANIFEST.json`
- Notes de publication : `PUBLISHING.md`
- Checksums de référence : `checksums/SHA256SUMS.txt`

## Contenu du pack original à ajouter par push Git classique

- archives de livraison
- aperçu image
- sources extraites du bootstrap entreprise
- sources extraites du kit de style

## Démarrage attendu après publication complète

```bash
cd packages/enterprise-app-bootstrap
cp .env.example .env.local
npm install
npm run dev
```

## Avertissement de marque

Le kit de style est une référence non officielle. Il ne contient pas de logo, wordmark, fichier de police ou illustration officielle de tiers. Les noms et marques de tiers restent la propriété de leurs détenteurs.
