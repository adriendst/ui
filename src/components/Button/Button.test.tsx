import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('affiche son libellé et a le type "button" par défaut', () => {
    render(<Button>Ajouter</Button>)
    const button = screen.getByRole('button', { name: 'Ajouter' })
    expect(button).toHaveAttribute('type', 'button')
  })

  it('appelle onClick au clic', () => {
    const onClick = vi.fn<() => void>()
    render(<Button onClick={onClick}>Ajouter</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("n'appelle pas onClick quand il est désactivé", () => {
    const onClick = vi.fn<() => void>()
    render(
      <Button onClick={onClick} disabled>
        Ajouter
      </Button>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})
