import type { ComponentPropsWithRef } from 'react'
import styles from './CenteredLayout.module.css'

export type CenteredLayoutProps = ComponentPropsWithRef<'main'>

/** Page sans navigation, contenu centré dans une colonne étroite (connexion, accueil d'un nouveau compte). */
export function CenteredLayout({ className, children, ...props }: CenteredLayoutProps) {
  const classes = [styles.layout, className].filter(Boolean).join(' ')

  return (
    <main className={classes} {...props}>
      <div className={styles.column}>{children}</div>
    </main>
  )
}
