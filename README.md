# Enterprise App Bootstrap & Mistral-Inspired Style Reference

Socle réutilisable pour applications d’entreprise, accompagné d’un kit visuel non officiel inspiré des patterns publics de la documentation Mistral.

## Contenu

### Application d’entreprise

- [Télécharger le bootstrap complet](artifacts/enterprise-app-bootstrap.zip)
- [Guide d’architecture et de philosophie](docs/enterprise-app-bootstrap.md)
- [Sources extraites](packages/enterprise-app-bootstrap/)

Le bootstrap couvre notamment : shell applicatif responsive, tableaux de bord, tables métier, workflows d’approbation, RBAC, multi-organisation, paramètres de sécurité, audit, feature flags, contrats d’intégration, observabilité, jobs, tests et déploiement.

### Référence visuelle

- [Télécharger le kit CSS, tokens, icônes et exemples](artifacts/mistral-style-reference-kit.zip)
- [Guide détaillé du style](docs/mistral-style-reference.md)
- [Aperçu PNG](preview/mistral-style-preview.png)
- [Showcase clair/sombre](preview/mistral-style-showcase.html)
- [Sources extraites](packages/mistral-style-reference-kit/)

## Démarrage du bootstrap

```bash
cd packages/enterprise-app-bootstrap
cp .env.example .env.local
npm install
npm run dev
```

## Vérification d’intégrité

```bash
sha256sum -c checksums/SHA256SUMS.txt
```

## Avertissement de marque

Le kit de style est une référence non officielle. Il ne contient pas de logo, wordmark, fichier de police ou illustration officielle de Mistral. Les noms et marques de tiers restent la propriété de leurs détenteurs. Consulte les notices incluses dans `packages/mistral-style-reference-kit/source/` et `packages/mistral-style-reference-kit/LICENSES/`.

## Organisation

```text
artifacts/   ZIP téléchargeables
checksums/   empreintes SHA-256
docs/        guides Markdown
packages/    sources extraites et modifiables
preview/     aperçu PNG et showcase HTML
```
