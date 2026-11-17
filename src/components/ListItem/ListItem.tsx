import type { ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react'
import styles from './ListItem.module.css'

export type ListItemProps = Omit<ComponentPropsWithRef<'li'>, 'title' | 'onClick'> & {
  /** Visuel en début de ligne (pastille, icône). */
  leading?: ReactNode
  /** Texte principal, coupé (…) s'il est trop long. */
  title: ReactNode
  /** Ligne secondaire, plus discrète. */
  description?: ReactNode
  /** Contenu en fin de ligne (montant, boutons). */
  trailing?: ReactNode
  /**
   * Rend toute la ligne cliquable (un bouton). `trailing` est alors dans le bouton :
   * il ne doit contenir aucun élément interactif.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>
}

/** Ligne de liste : visuel, titre et sous-titre, contenu de fin. Se place dans une `List`. */
export function ListItem({
  leading,
  title,
  description,
  trailing,
  onClick,
  className,
  ...props
}: ListItemProps) {
  const content = (
    <>
      {leading ? <span className={styles.leading}>{leading}</span> : null}
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description ? <span className={styles.description}>{description}</span> : null}
      </span>
      {trailing ? <span className={styles.trailing}>{trailing}</span> : null}
    </>
  )
  const classes = [styles.item, className].filter(Boolean).join(' ')
  return (
    <li className={classes} {...props}>
      {onClick ? (
        <button type="button" className={`${styles.row} ${styles.button}`} onClick={onClick}>
          {content}
        </button>
      ) : (
        <div className={styles.row}>{content}</div>
      )}
    </li>
  )
}
