import { type ComponentPropsWithRef, type ReactNode, useEffect, useId, useRef } from 'react'
import { Button } from '../Button/Button'
import styles from './Dialog.module.css'

export type DialogProps = Omit<ComponentPropsWithRef<'dialog'>, 'title' | 'open' | 'onClose'> & {
  /** Fenêtre ouverte (modale) ou fermée. */
  open: boolean
  /** Demande de fermeture : bouton Fermer, touche Échap, clic sur le voile. */
  onClose: () => void
  /** Titre, rendu en `h2`, qui nomme la fenêtre. */
  title: ReactNode
  /** Nom accessible du bouton de fermeture. */
  closeLabel?: string
  children: ReactNode
}

/**
 * Fenêtre modale sur `<dialog>` natif : piège du focus, touche Échap, voile et retour du focus
 * sont fournis par le navigateur. En feuille posée en bas de l'écran sous 48rem.
 * À l'ouverture, le focus va au premier élément marqué `data-autofocus`, sinon au premier focusable.
 */
export function Dialog({
  open,
  onClose,
  title,
  closeLabel = 'Fermer',
  className,
  children,
  ref,
  ...props
}: DialogProps) {
  const titleId = useId()
  const dialog = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open && !element.open) {
      element.showModal()
      element.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    } else if (!open && element.open) {
      element.close()
    }
  }, [open])

  const classes = [styles.dialog, className].filter(Boolean).join(' ')
  return (
    <dialog
      ref={(element) => {
        dialog.current = element
        if (typeof ref === 'function') return ref(element)
        if (ref) ref.current = element
      }}
      className={classes}
      aria-labelledby={titleId}
      // Échap : la fermeture passe par le parent, qui reste maître de `open`.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      // Filet de sécurité si le navigateur ferme quand même (annulation répétée sans geste) :
      // le parent est prévenu pour garder `open` à jour.
      onClose={() => {
        if (open) onClose()
      }}
      onClick={(event) => {
        // Le contenu couvre toute la fenêtre : un clic sur la fenêtre elle-même vient du voile.
        if (event.target === event.currentTarget) onClose()
      }}
      {...props}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <Button variant="subtle" size="icon" aria-label={closeLabel} onClick={onClose}>
            <svg className={styles.closeIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </Button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
