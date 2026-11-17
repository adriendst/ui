import { type ComponentPropsWithRef, type ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Snackbar.module.css'

export type SnackbarProps = Omit<ComponentPropsWithRef<'output'>, 'children'> & {
  /** Message affiché ; `null` : rien n'est affiché, la zone d'annonce reste en place. */
  message: ReactNode
  /** Change à chaque nouveau message, même identique au précédent : le délai repart de zéro. */
  messageKey?: string | number
  /** Boutons du bandeau (« Annuler »), en éléments de phrasé. */
  actions?: ReactNode
  /** Durée d'affichage en millisecondes, puis `onTimeout`. Sans elle, le bandeau reste. */
  duration?: number
  onTimeout?: () => void
  /** `danger` : bandeau rouge, pour une erreur. */
  tone?: 'neutral' | 'danger'
}

/**
 * Bandeau posé en bas de l'écran, au-dessus de la navigation de `AppShell` (message et boutons).
 * La zone `<output>` (rôle « status ») reste présente pour que les lecteurs d'écran lisent le message.
 * Le délai s'arrête tant que le pointeur ou le focus est dans le bandeau.
 */
export function Snackbar({
  message,
  messageKey,
  actions,
  duration,
  onTimeout,
  tone = 'neutral',
  className,
  ...props
}: SnackbarProps) {
  const classes = [styles.region, styles[tone], className].filter(Boolean).join(' ')
  const shown = message !== null && message !== undefined && message !== false
  return (
    <output className={classes} {...props}>
      {shown ? (
        <Banner key={messageKey} actions={actions} duration={duration} onTimeout={onTimeout}>
          {message}
        </Banner>
      ) : null}
    </output>
  )
}

function Banner({
  children,
  actions,
  duration,
  onTimeout,
}: Pick<SnackbarProps, 'actions' | 'duration' | 'onTimeout'> & { children: ReactNode }) {
  const [paused, setPaused] = useState(false)
  const timeout = useRef(onTimeout)
  useEffect(() => {
    timeout.current = onTimeout
  }, [onTimeout])

  useEffect(() => {
    if (paused || duration === undefined) return
    const timer = setTimeout(() => timeout.current?.(), duration)
    return () => clearTimeout(timer)
  }, [paused, duration])

  return (
    <span
      className={styles.banner}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <span className={styles.message}>{children}</span>
      {actions ? <span className={styles.actions}>{actions}</span> : null}
    </span>
  )
}
