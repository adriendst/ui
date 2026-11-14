import { type ComponentPropsWithRef, useId } from 'react'
import styles from './TextAreaField.module.css'

export type TextAreaFieldProps = ComponentPropsWithRef<'textarea'> & {
  /** Libellé visible, relié à la zone de texte. */
  label: string
  /** Aide affichée sous la zone de texte. */
  description?: string
  /** Message d'erreur : rend la zone invalide et est annoncé aux lecteurs d'écran. */
  error?: string
}

/** Zone de texte sur plusieurs lignes, avec libellé, aide et erreur reliés comme `TextField`. */
export function TextAreaField({
  label,
  description,
  error,
  id,
  rows = 4,
  className,
  'aria-describedby': describedBy,
  ...props
}: TextAreaFieldProps) {
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
      <textarea
        id={inputId}
        className={styles.input}
        rows={rows}
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
