import { type ComponentPropsWithRef, useId } from 'react'
import { StarIcon } from '../StarRating/StarIcon'
import styles from './StarRatingField.module.css'

export type StarRatingFieldProps = Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'children'> & {
  /** Nom accessible du groupe ; visible au-dessus des étoiles sauf avec `hideLabel`. */
  label: string
  hideLabel?: boolean
  /** Note choisie, de 1 à `max` ; `null` si aucune. */
  value: number | null
  onChange: (value: number) => void
  /** Nombre d'étoiles. */
  max?: number
  /** Nom accessible de chaque étoile (« 3 étoiles »). */
  optionLabel: (value: number) => string
  /** Aide affichée sous les étoiles. */
  description?: string
  disabled?: boolean
  /** Nom des boutons radio ; généré par défaut. */
  name?: string
}

/**
 * Choix d'une note en étoiles. Boutons radio natifs : flèches du clavier et lecteurs d'écran
 * fournis par le navigateur. Le survol à la souris montre la note avant le clic (en CSS).
 */
export function StarRatingField({
  label,
  hideLabel = false,
  value,
  onChange,
  max = 5,
  optionLabel,
  description,
  disabled = false,
  name,
  className,
  ...props
}: StarRatingFieldProps) {
  const generatedId = useId()
  const labelId = `${generatedId}-label`
  const descriptionId = description ? `${generatedId}-description` : undefined
  const groupName = name ?? generatedId
  const shown = value ?? 0
  const classes = [styles.field, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      <span id={labelId} className={hideLabel ? styles.hiddenLabel : styles.label}>
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        aria-disabled={disabled || undefined}
        className={styles.group}
      >
        {Array.from({ length: max }, (_, index) => {
          const option = index + 1
          return (
            <label
              key={option}
              className={[styles.option, option <= shown ? styles.filled : styles.empty].join(' ')}
            >
              <input
                type="radio"
                className={styles.input}
                name={groupName}
                value={option}
                checked={option === value}
                disabled={disabled}
                aria-label={optionLabel(option)}
                onChange={() => onChange(option)}
              />
              <StarIcon filled={option <= shown} className={styles.star} />
            </label>
          )
        })}
      </div>
      {description ? (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
