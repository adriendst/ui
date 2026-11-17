import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger' | 'danger-subtle'
/** `icon` : carré de la taille d'une zone tactile, pour une icône seule (nom accessible obligatoire). */
export type ButtonSize = 'md' | 'sm' | 'icon'

/**
 * Classes du bouton, pour donner son apparence à un autre élément (lien du routeur de l'app…).
 * Un lien garde son rôle de lien : à réserver à la navigation.
 */
export function buttonClassName({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')
}
