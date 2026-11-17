import { type ComponentPropsWithRef, type CSSProperties, type ReactNode, useId } from 'react'
import styles from './ChoiceGrid.module.css'

export type ChoiceGridOption<T extends string> = {
  value: T
  /** Nom accessible du choix ; affiché dans la tuile sans `content`. */
  label: string
  /** Contenu visuel de la tuile (emoji, pastille et nom), masqué aux lecteurs d'écran. */
  content?: ReactNode
  /** Couleur CSS du contour quand la tuile est choisie ; par défaut l'accent. */
  color?: string
}

export type ChoiceGridProps<T extends string> = Omit<
  ComponentPropsWithRef<'div'>,
  'onChange' | 'children'
> & {
  /** Nom accessible du groupe ; visible au-dessus des tuiles sauf avec `hideLabel`. */
  label: string
  hideLabel?: boolean
  options: readonly ChoiceGridOption<T>[]
  /** Choix courant ; `null` si aucun. */
  value: T | null
  onChange: (value: T) => void
  /** Largeur minimale d'une tuile (longueur CSS) ; la grille remplit la ligne. */
  tileMinWidth?: string
  /** Nom des boutons radio ; généré par défaut. */
  name?: string
}

/**
 * Choix exclusif parmi de nombreuses options, en grille de tuiles (icônes, catégories).
 * Boutons radio natifs : flèches du clavier et lecteurs d'écran fournis par le navigateur.
 */
export function ChoiceGrid<T extends string>({
  label,
  hideLabel = false,
  options,
  value,
  onChange,
  tileMinWidth,
  name,
  className,
  style,
  ...props
}: ChoiceGridProps<T>) {
  const generatedId = useId()
  const labelId = `${generatedId}-label`
  const groupName = name ?? generatedId
  const classes = [styles.field, className].filter(Boolean).join(' ')
  return (
    <div className={classes} style={style} {...props}>
      <span id={labelId} className={hideLabel ? styles.hiddenLabel : styles.label}>
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className={styles.grid}
        style={
          tileMinWidth ? ({ '--ui-choice-grid-min': tileMinWidth } as CSSProperties) : undefined
        }
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={styles.tile}
            style={
              option.color
                ? ({ '--ui-choice-grid-color': option.color } as CSSProperties)
                : undefined
            }
          >
            <input
              type="radio"
              className={styles.input}
              name={groupName}
              value={option.value}
              checked={option.value === value}
              aria-label={option.content ? option.label : undefined}
              onChange={() => onChange(option.value)}
            />
            {option.content ? (
              <span className={styles.content} aria-hidden="true">
                {option.content}
              </span>
            ) : (
              <span className={styles.content}>{option.label}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  )
}
