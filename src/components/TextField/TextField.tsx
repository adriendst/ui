import { type ComponentPropsWithRef, useId } from 'react'
import styles from './TextField.module.css'

export type TextFieldProps = ComponentPropsWithRef<'input'> & {
  /** Libellé visible, relié au champ. */
  label: string
  /** Aide affichée sous le champ. */
  description?: string
  /** Message d'erreur : rend le champ invalide et est annoncé aux lecteurs d'écran. */
  error?: string
}

export function TextField({
  label,
  description,
  error,
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
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedByIds}
        {...props}
      />
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
