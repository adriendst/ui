import { type ComponentPropsWithRef, type ReactNode, useId } from 'react'
import styles from './Card.module.css'

export type CardProps = Omit<ComponentPropsWithRef<'section'>, 'title'> & {
  /** Titre de la carte ; sans lui, la carte est un simple bloc. */
  title?: ReactNode
  /** Niveau du titre, selon la place dans la page. */
  headingLevel?: 2 | 3
  /** Actions alignées à droite du titre (lien « Tout voir », bouton). */
  actions?: ReactNode
}

/** Bloc de contenu sur fond surface, avec un titre et des actions facultatifs. */
export function Card({
  title,
  headingLevel = 2,
  actions,
  className,
  children,
  ...props
}: CardProps) {
  const titleId = useId()
  const classes = [styles.card, className].filter(Boolean).join(' ')
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const header =
    title || actions ? (
      <div className={styles.header}>
        {title ? (
          <Heading id={titleId} className={styles.title}>
            {title}
          </Heading>
        ) : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    ) : null
  return (
    <section className={classes} aria-labelledby={title ? titleId : undefined} {...props}>
      {header}
      {children}
    </section>
  )
}
