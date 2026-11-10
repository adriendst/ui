import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'sm'

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
