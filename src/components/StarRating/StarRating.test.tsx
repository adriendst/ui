import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StarRating } from './StarRating'

describe('StarRating', () => {
  it('est lue par son libellé, dessin caché aux lecteurs d’écran', () => {
    const { container } = render(<StarRating value={4} label="4 étoiles sur 5" />)
    expect(screen.getByText('4 étoiles sur 5')).toBeInTheDocument()
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('dessine autant d’étoiles que le maximum, dont la note en pleines', () => {
    const { container } = render(<StarRating value={2} max={5} label="2 sur 5" />)
    const stars = container.querySelectorAll('path')
    expect(stars).toHaveLength(5)
    expect(
      [...stars].filter((star) => star.getAttribute('class')?.includes('filled')),
    ).toHaveLength(2)
  })
})
