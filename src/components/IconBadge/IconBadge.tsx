import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react'
import styles from './IconBadge.module.css'

export type IconBadgeProps = Omit<ComponentPropsWithRef<'span'>, 'color'> & {
  /** Icône ou emoji. */
  children: ReactNode
  /** Couleur CSS de la teinte de fond ; par défaut la couleur d'accent. */
  color?: string
  size?: 'sm' | 'md' | 'lg'
  /** Nom lu par les lecteurs d'écran ; sans lui, la pastille est décorative. */
  label?: string
}

/** Icône ou emoji sur une pastille carrée teintée de sa couleur. */
export function IconBadge({
  children,
  color,
  size = 'md',
  label,
  className,
  style,
  ...props
}: IconBadgeProps) {
  const classes = [styles.badge, styles[size], className].filter(Boolean).join(' ')
  const tint = color ? ({ '--ui-icon-badge-color': color, ...style } as CSSProperties) : style
  const a11y = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true as const }
  return (
    <span className={classes} style={tint} {...a11y} {...props}>
      {children}
    </span>
  )
}
