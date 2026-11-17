import type { ComponentPropsWithRef, ReactNode } from 'react'
import styles from './StatCard.module.css'

export type StatCardProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** Intitulé de l'indicateur (« Dépenses »). */
  label: ReactNode
  /** Valeur mise en avant, déjà mise en forme (« 1 234,56 € »). */
  value: ReactNode
  /** Couleur de la valeur : `success` pour un gain, `danger` pour une perte ou un dépassement. */
  tone?: 'neutral' | 'success' | 'danger'
  /** Complément sous la valeur (barre de progression, lien). */
  children?: ReactNode
}

/** Indicateur chiffré : un intitulé, une grande valeur, un complément facultatif. */
export function StatCard({
  label,
  value,
  tone = 'neutral',
  className,
  children,
  ...props
}: StatCardProps) {
  const classes = [styles.stat, className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...props}>
      <p className={styles.label}>{label}</p>
      <p className={[styles.value, styles[tone]].join(' ')}>{value}</p>
      {children ? <div className={styles.extra}>{children}</div> : null}
    </div>
  )
}
