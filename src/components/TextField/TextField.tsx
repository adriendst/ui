import { type ComponentPropsWithRef, type ReactNode, useId } from 'react'
import styles from './TextField.module.css'

export type TextFieldProps = ComponentPropsWithRef<'input'> & {
  /** Libellé visible, relié au champ. */
  label: string
  /** Aide affichée sous le champ. */
  description?: string
  /** Message d'erreur : rend le champ invalide et est annoncé aux lecteurs d'écran. */
  error?: string
  /** Libellé lu par les lecteurs d'écran mais masqué à l'écran (champ de recherche explicite). */
  hideLabel?: boolean
  /** Icône décorative au début du champ, masquée aux lecteurs d'écran. */
  icon?: ReactNode
}

export function TextField({
  label,
  description,
  error,
  hideLabel = false,
  icon,
  id,
  className,
  'aria-describedby': describedBy,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedByIds =
    [describedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined
  const classes = [styles.field, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <label className={hideLabel ? styles.hiddenLabel : styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.control}>
        {icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={icon ? `${styles.input} ${styles.withIcon}` : styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedByIds}
          {...props}
        />
      </div>
      {description ? (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
