# Changelog @neirda/ui

## 0.2.0

Ajouts, sans rupture d'API.

- Tokens : `--ui-color-surface-muted`, `--ui-color-danger-soft`, `--ui-color-backdrop`, `--ui-radius-lg`, `--ui-shadow-lg`.
- `Button` : variantes `subtle` (discrète, couleur du texte) et `danger-subtle` (texte rouge, fond rouge pâle au survol) ; taille `icon` (carré d'une zone tactile, pour une icône seule).
- `TextField` : `hideLabel` (libellé lu mais masqué) et `icon` (icône décorative en début de champ).
- `SelectField` : `hideLabel`.
- `SegmentedControl` : `variant="subtle"` (fond en retrait, choix en relief, sans séparateurs).
- `ProgressBar` : tons `warning` et `danger`, taille `md` (plus épaisse).
- `Snackbar` : `tone="danger"` pour une erreur.
- Composant `Card` : bloc sur fond surface, titre (`h2` ou `h3`) et actions facultatifs, région nommée par son titre.
- Composant `StatCard` : indicateur chiffré (intitulé, valeur, ton, complément).
- Composants `List` et `ListItem` : liste à filets ; ligne avec visuel, titre, sous-titre et fin de ligne, cliquable en entier avec `onClick`.
- Composant `IconBadge` : icône ou emoji sur pastille teintée (`color`, tailles `sm`, `md`, `lg`), décorative sauf avec `label`.
- Composant `CheckboxField` : case à cocher native avec libellé et aide reliés.
- Composant `Dialog` : fenêtre modale sur `<dialog>` natif (focus, Échap, voile fournis par le navigateur), feuille en bas d'écran sous 48rem, focus initial sur `data-autofocus`.
- Composant `DonutChart` : anneau SVG sans dépendance, part de chaque segment lue par les lecteurs d'écran.
- Composant `ChoiceGrid` : choix exclusif en grille de tuiles sur boutons radio natifs (contenu libre, couleur de sélection par option).

## 0.1.1

Première version publiée sur npm (la 0.1.0, supprimée, ne peut plus être republiée).

## 0.1.0

- Paquet renommé `@neirda/ui`, publiable sur npm : build Vite (`dist/index.js`, `dist/style.css`, `dist/tokens.css`, types), à importer avec `@neirda/ui/tokens.css` et `@neirda/ui/style.css`.

- Tokens de design (couleurs clair/sombre, typographie, espacements, formes, mouvement).
- Tokens de mise en page (`--ui-layout-*`), de superposition (`--ui-z-*`), d'ombre (`--ui-shadow-md`), `--ui-font-size-xs` et `--ui-line-height-tight`.
- Composant `Button` (variantes `primary`, `secondary`, `ghost` ; tailles `md`, `sm`).
- Composant `AppShell` : navigation en bas sur mobile, colonne latérale à partir de 48rem, lien d'évitement, zones sûres.
- Composant `PageHeader` : titre `h1`, description et actions.
- Composant `EmptyState` : état vide avec titre, description, icône et appel à l'action.
- Composant `TextField` : champ texte avec libellé, aide et erreur reliés (`aria-describedby`, `aria-invalid`).
- Composant `Spinner` : indicateur de chargement annoncé (`role="status"`), immobile si mouvement réduit.
- Composant `CenteredLayout` : page sans navigation, colonne étroite centrée.
- Tokens `--ui-layout-narrow-max` et `--ui-duration-spin`.
- Composant `SelectField` : liste de choix native avec libellé, aide et erreur reliés, comme `TextField`.
- `buttonClassName({ variant, size, className })` : apparence de `Button` pour un autre élément (lien du routeur).
- Composant `SegmentedControl` : choix exclusif en boutons collés, sur des boutons radio natifs (libellé masquable).
- `Button` : variante `danger` pour les actions destructrices (tokens `--ui-color-danger-hover` et `--ui-color-on-danger`).
- `SelectField` : la liste rétrécit avec son conteneur (`min-width: 0`) et tronque l'option choisie trop longue.
- `SegmentedControl` : un libellé trop long pour son option se coupe (…) au lieu de déborder sur la voisine, et les marges intérieures des options passent à `--ui-space-1` (4 options courtes tiennent sur un téléphone).
- Composant `BarChart` : graphique en barres verticales sans dépendance (liste ordonnée, valeurs lues par les lecteurs d'écran, échelle commune possible avec `max`).
- Composant `StarRating` : note en étoiles en lecture seule, dessin caché aux lecteurs d’écran qui lisent son `label` (tailles `sm`, `md`).
- Composant `StarRatingField` : choix d'une note en étoiles sur des boutons radio natifs, aperçu au survol, aide reliée.
- Composant `TextAreaField` : zone de texte sur plusieurs lignes, libellé, aide et erreur reliés comme `TextField`.
- Composant `Tabs` : onglets qui partagent une page en panneaux (motif ARIA « tabs », flèches, Début et Fin), panneaux masqués gardés montés, séparateurs verticaux en pointillés ; option `sticky` (liste collée en haut de l’écran, retour au début du panneau au changement d’onglet).
- `SegmentedControl` : séparateur vertical en pointillés entre deux options (masqué à côté de l'option choisie).
- Token `--ui-color-separator` (clair et sombre) pour ces séparateurs.
- Composant `SummaryRow` : donnée rarement changée résumée en une ligne (intitulé, valeur, bouton « Modifier » nommé d'après l'intitulé), formulaire ouvert à sa place, focus rendu au bouton à la fermeture.
- Composant `ProgressBar` : fine barre de progression (tons `accent`, `success`), annoncée si elle a un `label`, décorative sinon.
- Composant `Snackbar` : bandeau en bas de l'écran, au-dessus de la navigation (message et boutons), zone d'annonce toujours présente, délai facultatif suspendu au survol et au focus, relancé par `messageKey`.
