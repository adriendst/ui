import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it("affiche le titre, la description et l'action", () => {
    render(
      <EmptyState
        title="Aucune série"
        description="Commencez par en ajouter une."
        action={<button type="button">Ajouter une série</button>}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Aucune série' })).toBeInTheDocument()
    expect(screen.getByText('Commencez par en ajouter une.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ajouter une série' })).toBeInTheDocument()
  })

  it('respecte le niveau de titre demandé', () => {
    render(<EmptyState title="Rien ici" headingLevel={3} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Rien ici' })).toBeInTheDocument()
  })
})
