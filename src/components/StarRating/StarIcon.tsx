/** Tracé d'une étoile à cinq branches, dans un carré de 24 × 24. */
export const STAR_PATH =
  'M12 2.8l2.84 5.76 6.36.92-4.6 4.49 1.08 6.33L12 17.31l-5.68 2.99 1.08-6.33-4.6-4.49 6.36-.92z'

/** Étoile décorative, remplie de la couleur du texte (`currentColor`) ou seulement tracée. */
export function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d={STAR_PATH} />
    </svg>
  )
}
