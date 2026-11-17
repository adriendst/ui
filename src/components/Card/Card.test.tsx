import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('nomme la région par son titre et affiche les actions', () => {
    render(
      <Card title="Budgets" actions={<a href="/budgets">Gérer</a>}>
        Contenu
      </Card>,
    )
    expect(screen.getByRole('region', { name: 'Budgets' })).toHaveTextContent('Contenu')
    expect(screen.getByRole('heading', { level: 2, name: 'Budgets' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Gérer' })).toBeInTheDocument()
  })

  it('sans titre, ne crée ni titre ni région nommée', () => {
    render(<Card>Contenu</Card>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('accepte un titre de niveau 3', () => {
    render(<Card title="Détail" headingLevel={3} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Détail' })).toBeInTheDocument()
  })
})
