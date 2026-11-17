import { type ComponentPropsWithRef, type ReactNode, useId } from 'react'
import styles from './CheckboxField.module.css'

export type CheckboxFieldProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  /** Libellé visible, à droite de la case. */
  label: ReactNode
  /** Aide affichée sous le libellé. */
  description?: ReactNode
}

/** Case à cocher native avec libellé cliquable et aide reliée. */
export function CheckboxField({
  label,
  description,
  id,
  className,
  'aria-describedby': describedBy,
  ...props
}: CheckboxFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined
  const describedByIds = [describedBy, descriptionId].filter(Boolean).join(' ') || undefined
  const classes = [styles.field, className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.input}
        aria-describedby={describedByIds}
        {...props}
      />
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      {description ? (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
