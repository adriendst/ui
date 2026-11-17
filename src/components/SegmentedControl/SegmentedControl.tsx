import { type ComponentPropsWithRef, useId } from 'react'
import styles from './SegmentedControl.module.css'

export type SegmentedControlOption<T extends string> = {
  value: T
  label: string
}

export type SegmentedControlProps<T extends string> = Omit<
  ComponentPropsWithRef<'div'>,
  'onChange' | 'children'
> & {
  /** Nom accessible du groupe ; visible au-dessus des choix sauf avec `hideLabel`. */
  label: string
  hideLabel?: boolean
  options: readonly SegmentedControlOption<T>[]
  value: T
  onChange: (value: T) => void
  /** Nom des boutons radio ; généré par défaut. */
  name?: string
  /** `solid` : choix plein en couleur d'accent ; `subtle` : choix en relief sur un fond en retrait. */
  variant?: 'solid' | 'subtle'
}

/**
 * Choix exclusif entre quelques options, en boutons collés.
 * Boutons radio natifs : flèches du clavier et lecteurs d'écran fournis par le navigateur.
 */
export function SegmentedControl<T extends string>({
  label,
  hideLabel = false,
  options,
  value,
  onChange,
  name,
  variant = 'solid',
  className,
  ...props
}: SegmentedControlProps<T>) {
  const generatedId = useId()
  const labelId = `${generatedId}-label`
  const groupName = name ?? generatedId
  const classes = [styles.field, styles[variant], className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      <span id={labelId} className={hideLabel ? styles.hiddenLabel : styles.label}>
        {label}
      </span>
      <div role="radiogroup" aria-labelledby={labelId} className={styles.group}>
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              className={styles.input}
              name={groupName}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            <span className={styles.text}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
