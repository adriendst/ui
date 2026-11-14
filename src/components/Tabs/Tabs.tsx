import {
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from 'react'
import styles from './Tabs.module.css'

export type TabsItem<T extends string> = {
  value: T
  label: string
  panel: ReactNode
}

export type TabsProps<T extends string> = Omit<
  ComponentPropsWithRef<'div'>,
  'onChange' | 'children'
> & {
  /** Nom accessible de la liste d'onglets (non affiché). */
  label: string
  items: readonly TabsItem<T>[]
  value: T
  onChange: (value: T) => void
  /**
   * Liste collée en haut de l'écran pendant le défilement (panneaux longs). Changer d'onglet
   * alors qu'elle est collée ramène au début du nouveau panneau.
   */
  sticky?: boolean
}

/**
 * Onglets qui partagent une page en panneaux (motif ARIA « tabs »).
 * Flèches gauche et droite, Début et Fin pour changer d'onglet ; un seul onglet dans l'ordre
 * de tabulation. Les panneaux masqués restent montés : leur état (saisie en cours) est gardé.
 */
export function Tabs<T extends string>({
  label,
  items,
  value,
  onChange,
  sticky = false,
  className,
  ...props
}: TabsProps<T>) {
  const baseId = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const list = useRef<HTMLDivElement>(null)
  // Onglet choisi alors que la liste était collée : on remonte quand son panneau est affiché.
  const scrollTarget = useRef<T | null>(null)
  const classes = [styles.tabs, sticky ? styles.sticky : null, className].filter(Boolean).join(' ')
  const tabId = (index: number) => `${baseId}-tab-${index}`
  const panelId = (index: number) => `${baseId}-panel-${index}`

  useEffect(() => {
    if (scrollTarget.current !== value) return
    scrollTarget.current = null
    list.current?.parentElement?.scrollIntoView({ block: 'start' })
  }, [value])

  function change(next: T) {
    // La liste est collée quand le début des onglets est passé au-dessus de l'écran.
    const top = list.current?.parentElement?.getBoundingClientRect().top ?? 0
    scrollTarget.current = sticky && next !== value && top < 0 ? next : null
    onChange(next)
  }

  function select(index: number) {
    const item = items[index]
    if (!item) return
    change(item.value)
    tabs.current[index]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    const last = items.length - 1
    let next: number
    switch (event.key) {
      case 'ArrowRight':
        next = current >= last ? 0 : current + 1
        break
      case 'ArrowLeft':
        next = current <= 0 ? last : current - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }
    event.preventDefault()
    select(next)
  }

  return (
    <div className={classes} {...props}>
      <div ref={list} role="tablist" aria-label={label} className={styles.list}>
        {items.map((item, index) => {
          const selected = item.value === value
          return (
            <button
              key={item.value}
              ref={(element) => {
                tabs.current[index] = element
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={selected}
              aria-controls={panelId(index)}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => change(item.value)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className={styles.text}>{item.label}</span>
            </button>
          )
        })}
      </div>
      {items.map((item, index) => (
        <div
          key={item.value}
          role="tabpanel"
          id={panelId(index)}
          aria-labelledby={tabId(index)}
          hidden={item.value !== value}
          tabIndex={0}
          className={styles.panel}
        >
          {item.panel}
        </div>
      ))}
    </div>
  )
}
