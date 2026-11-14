import { type ComponentPropsWithRef, type ReactNode, useEffect, useId, useRef } from 'react'
import { Button } from '../Button/Button'
import styles from './SummaryRow.module.css'

export type SummaryRowProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** Intitulé de la donnée résumée (« Prochain tome »). */
  label: string
  /** Valeur actuelle, en une ligne (« Tome 14, date non annoncée »). */
  value: ReactNode
  /** Texte du bouton qui ouvre le formulaire (« Modifier »). */
  editLabel: string
  /** Formulaire ouvert à la place de la ligne. */
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Formulaire de modification, affiché quand `open` est vrai. Il ferme avec `onOpenChange(false)`. */
  children: ReactNode
  /** Message annoncé sous la ligne (« Enregistré. »), par exemple après la fermeture du formulaire. */
  status?: ReactNode
}

/**
 * Donnée rarement changée résumée en une ligne, avec un bouton qui ouvre son formulaire.
 * Le nom accessible du bouton reprend l'intitulé (« Modifier Prochain tome ») ; à la fermeture
 * du formulaire, le focus revient au bouton.
 */
export function SummaryRow({
  label,
  value,
  editLabel,
  open,
  onOpenChange,
  children,
  status,
  className,
  ...props
}: SummaryRowProps) {
  const id = useId()
  const button = useRef<HTMLButtonElement>(null)
  // Le focus ne revient au bouton qu'après une fermeture, pas au premier affichage.
  const wasOpen = useRef(open)
  useEffect(() => {
    if (wasOpen.current && !open) button.current?.focus()
    wasOpen.current = open
  }, [open])

  const classes = [styles.summary, className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...props}>
      {open ? (
        children
      ) : (
        <div className={styles.row}>
          <p className={styles.text}>
            <span id={`${id}-label`} className={styles.label}>
              {label}
            </span>
            <span className={styles.value}>{value}</span>
          </p>
          <Button
            ref={button}
            variant="ghost"
            size="sm"
            aria-labelledby={`${id}-edit-text ${id}-label`}
            onClick={() => onOpenChange(true)}
          >
            <span id={`${id}-edit-text`}>{editLabel}</span>
          </Button>
        </div>
      )}
      <output className={styles.status}>{status}</output>
    </div>
  )
}
