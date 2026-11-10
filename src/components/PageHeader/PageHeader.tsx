import type { ComponentPropsWithRef, ReactNode } from 'react'
import styles from './PageHeader.module.css'

export type PageHeaderProps = Omit<ComponentPropsWithRef<'header'>, 'title'> & {
  /** Titre de la page, rendu en `h1`. */
  title: ReactNode
  /** Phrase d'introduction sous le titre. */
  description?: ReactNode
  /** Actions alignées à droite du titre (boutons). */
  actions?: ReactNode
}

export function PageHeader({ title, description, actions, className, ...props }: PageHeaderProps) {
  const classes = [styles.header, className].filter(Boolean).join(' ')

  return (
    <header className={classes} {...props}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  )
}
