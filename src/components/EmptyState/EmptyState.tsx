import type { ComponentPropsWithRef, ReactNode } from 'react'
import styles from './EmptyState.module.css'

export type EmptyStateProps = Omit<ComponentPropsWithRef<'section'>, 'title'> & {
  title: ReactNode
  description?: ReactNode
  /** Appel à l'action (bouton ou lien). */
  action?: ReactNode
  /** Illustration décorative, masquée aux lecteurs d'écran. */
  icon?: ReactNode
  /** Niveau du titre, selon la place dans la page. */
  headingLevel?: 2 | 3
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  headingLevel = 2,
  className,
  ...props
}: EmptyStateProps) {
  const classes = [styles.empty, className].filter(Boolean).join(' ')
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <section className={classes} {...props}>
      {icon ? (
        <div className={styles.icon} aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <Heading className={styles.title}>{title}</Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  )
}
