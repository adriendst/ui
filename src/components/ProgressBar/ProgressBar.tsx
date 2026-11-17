import type { ComponentPropsWithRef } from 'react'
import styles from './ProgressBar.module.css'

export type ProgressBarTone = 'accent' | 'success' | 'warning' | 'danger'

export type ProgressBarProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  value: number
  /** Valeur pleine ; 0 ou moins donne une barre vide. */
  max: number
  tone?: ProgressBarTone
  /** Épaisseur : `sm` fine (par défaut), `md` plus visible. */
  size?: 'sm' | 'md'
  /**
   * Nom accessible (« 4 tomes lus sur 13 »). Sans lui, la barre est décorative et masquée
   * aux lecteurs d'écran : la valeur doit alors être écrite à côté.
   */
  label?: string
}

/** Fine barre de progression, sans animation. */
export function ProgressBar({
  value,
  max,
  tone = 'accent',
  size = 'sm',
  label,
  className,
  ...props
}: ProgressBarProps) {
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0
  const classes = [styles.bar, styles[tone], styles[size], className].filter(Boolean).join(' ')
  const a11y = label
    ? {
        role: 'progressbar',
        'aria-label': label,
        'aria-valuemin': 0,
        'aria-valuemax': Math.max(max, 0),
        'aria-valuenow': Math.min(Math.max(value, 0), Math.max(max, 0)),
      }
    : { 'aria-hidden': true }

  return (
    <div className={classes} {...a11y} {...props}>
      <div className={styles.fill} style={{ inlineSize: `${ratio * 100}%` }} />
    </div>
  )
}
