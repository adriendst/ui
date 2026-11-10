import { type ComponentPropsWithRef, useId } from 'react'
import styles from './SelectField.module.css'

export type SelectFieldOption = {
  value: string
  label: string
}

export type SelectFieldProps = Omit<ComponentPropsWithRef<'select'>, 'children' | 'multiple'> & {
  /** Libellé visible, relié à la liste. */
  label: string
  options: readonly SelectFieldOption[]
  /** Aide affichée sous la liste. */
  description?: string
  /** Message d'erreur : rend la liste invalide et est annoncé aux lecteurs d'écran. */
  error?: string
}

/** Liste de choix native : clavier, lecteurs d'écran et sélecteur du téléphone fournis par le navigateur. */
export function SelectField({
  label,
  options,
  description,
  error,
  id,
  className,
  'aria-describedby': describedBy,
  ...props
}: SelectFieldProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const descriptionId = description ? `${selectId}-description` : undefined
  const errorId = error ? `${selectId}-error` : undefined
  const describedByIds =
    [describedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined
  const classes = [styles.field, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>
      <div className={styles.control}>
        <select
          id={selectId}
          className={styles.select}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedByIds}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
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
