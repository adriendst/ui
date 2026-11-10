import type { ComponentPropsWithRef, ReactNode } from 'react'
import styles from './AppShell.module.css'

export type AppShellProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** Liens de navigation principale : barre en bas sur mobile, colonne latérale à partir de 48rem. */
  navigation: ReactNode
  /** Nom accessible de la zone de navigation. */
  navigationLabel: string
  /** Marque affichée en tête de la colonne latérale (masquée sur mobile). */
  brand?: ReactNode
  /** Libellé du lien d'évitement vers le contenu, visible au focus clavier. */
  skipLinkLabel?: string
  /** Identifiant de la zone principale, cible du lien d'évitement. */
  mainId?: string
  children: ReactNode
}

export function AppShell({
  navigation,
  navigationLabel,
  brand,
  skipLinkLabel = 'Aller au contenu',
  mainId = 'main',
  className,
  children,
  ...props
}: AppShellProps) {
  const classes = [styles.shell, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      <a className={styles.skipLink} href={`#${mainId}`}>
        {skipLinkLabel}
      </a>
      <nav className={styles.nav} aria-label={navigationLabel}>
        {brand ? <div className={styles.brand}>{brand}</div> : null}
        {navigation}
      </nav>
      <main id={mainId} className={styles.main} tabIndex={-1}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
}
