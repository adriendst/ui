import type { ComponentPropsWithRef } from 'react'
import styles from './Spinner.module.css'

export type SpinnerProps = Omit<ComponentPropsWithRef<'output'>, 'children'> & {
  /** Texte annoncé aux lecteurs d'écran, affiché à côté de l'indicateur si `showLabel`. */
  label: string
  showLabel?: boolean
}

export function Spinner({ label, showLabel = false, className, ...props }: SpinnerProps) {
  const classes = [styles.spinner, className].filter(Boolean).join(' ')

  return (
    <output className={classes} {...props}>
      <span className={styles.circle} aria-hidden="true" />
      <span className={showLabel ? styles.label : styles.visuallyHidden}>{label}</span>
    </output>
  )
}
