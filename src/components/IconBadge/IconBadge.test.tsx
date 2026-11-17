import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { IconBadge } from './IconBadge'

describe('IconBadge', () => {
  it('est décoratif sans label', () => {
    const { container } = render(<IconBadge>🛒</IconBadge>)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('est une image nommée avec label', () => {
    render(<IconBadge label="Courses">🛒</IconBadge>)
    expect(screen.getByRole('img', { name: 'Courses' })).toBeInTheDocument()
  })

  it('pose la couleur dans une variable CSS', () => {
    const { container } = render(<IconBadge color="#22c55e">🛒</IconBadge>)
    const badge = container.firstElementChild as HTMLElement
    expect(badge.style.getPropertyValue('--ui-icon-badge-color')).toBe('#22c55e')
  })
})
