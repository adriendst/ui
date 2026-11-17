# @neirda/ui

Composants React accessibles, stylés par tokens CSS (`--ui-…`), thème clair et sombre.

## Installation

```bash
pnpm add @neirda/ui
```

Peer dependencies : `react` et `react-dom` 19.

## Utilisation

Importer les deux feuilles une fois, au point d'entrée de l'app :

```ts
import '@neirda/ui/tokens.css'
import '@neirda/ui/style.css'
```

Puis les composants :

```tsx
import { Button } from '@neirda/ui'

;<Button variant="primary">Enregistrer</Button>
```

Thème : suit `prefers-color-scheme`, forçable par `data-theme="light"` ou `data-theme="dark"` sur `<html>`.

## Développement

```bash
pnpm install
pnpm test
pnpm build
```

Essayer une version locale dans un autre projet : `pnpm link <chemin-vers-ce-dépôt>` depuis ce projet, après `pnpm build`.

## Publier

1. Noter les changements dans `CHANGELOG.md`, monter `version` dans `package.json` (SemVer).
2. Commiter, puis `git tag vX.Y.Z && git push --follow-tags` : la CI teste, construit et publie sur npm.
