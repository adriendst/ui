# packages/ui : règles locales

Librairie de composants d'interface maison (`@etagere/ui`), pensée pour être extraite et publiée plus tard.
Les conventions communes sont dans le [CLAUDE.md racine](../../CLAUDE.md). Pourquoi ces choix : [ADR 0006](../../md/decisions/0006-composants-maison-en-css-modules.md).

## Règles

- **Aucune logique métier** : pas de Supabase, pas de manga, pas de foyer. Un composant doit pouvoir servir dans n'importe quelle app.
- **Aucune dépendance au frontend** : `packages/ui` n'importe jamais rien de `frontend/`.
- Styles en **CSS Modules**. Toutes les valeurs (couleurs, espacements, rayons, typo, ombres, durées) viennent des **tokens** en variables CSS (`src/tokens/`), préfixées `--ui-`.
- Thème clair et sombre gérés uniquement par les tokens (`prefers-color-scheme` + attribut `data-theme`).
- Comportements complexes (dialogue, menu, liste déroulante, combobox) : s'appuyer sur **React Aria** (sans style) plutôt que de réimplémenter focus et clavier.
- Chaque composant : un dossier `src/components/<Name>/` avec `Name.tsx`, `Name.module.css`, `Name.test.tsx`, et un export depuis `src/index.ts`.
- API des composants : props explicites et typées, `className` et `ref` transmis, variantes par prop (`variant`, `size`) plutôt que par classes à composer.
- Accessibilité obligatoire : rôle et nom accessibles, focus visible, contraste AA dans les deux thèmes.
- Changement d'API d'un composant déjà utilisé : le noter dans le `CHANGELOG.md` du paquet.
