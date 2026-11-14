import type { ComponentPropsWithRef } from 'react'
import { STAR_PATH } from './StarIcon'
import styles from './StarRating.module.css'

/** Côté d'une étoile et espace entre deux étoiles, en unités du dessin. */
const STAR_SIZE = 24
const STAR_GAP = 3

export type StarRatingProps = Omit<ComponentPropsWithRef<'span'>, 'children'> & {
  /** Nombre d'étoiles pleines, arrondi à l'entier. */
  value: number
  /** Nombre d'étoiles en tout. */
  max?: number
  /** Note en toutes lettres (« 4 étoiles sur 5 »), lue à la place du dessin par les lecteurs d'écran. */
  label: string
  size?: 'sm' | 'md'
}

/** Note en étoiles, en lecture seule : un dessin caché aux lecteurs d'écran, qui lisent `label`. */
export function StarRating({
  value,
  max = 5,
  label,
  size = 'md',
  className,
  ...props
}: StarRatingProps) {
  const filled = Math.round(value)
  const width = max * STAR_SIZE + (max - 1) * STAR_GAP
  const classes = [styles.rating, styles[size], className].filter(Boolean).join(' ')
  return (
    <span className={classes} {...props}>
      <svg
        className={styles.stars}
        viewBox={`0 0 ${width} ${STAR_SIZE}`}
        aria-hidden="true"
        focusable="false"
        strokeWidth="1.8"
        strokeLinejoin="round"
      >
        {Array.from({ length: max }, (_, index) => (
          <path
            key={index}
            d={STAR_PATH}
            transform={`translate(${index * (STAR_SIZE + STAR_GAP)} 0)`}
            className={index < filled ? styles.filled : styles.empty}
          />
        ))}
      </svg>
      <span className={styles.label}>{label}</span>
    </span>
  )
}
