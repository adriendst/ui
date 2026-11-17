import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('affiche intitulé, valeur et complément', () => {
    render(
      <StatCard label="Dépenses" value="120,00 €" tone="danger">
        <a href="/budgets">Définir un budget</a>
      </StatCard>,
    )
    expect(screen.getByText('Dépenses')).toBeInTheDocument()
    expect(screen.getByText('120,00 €')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Définir un budget' })).toBeInTheDocument()
  })

  it('donne une classe différente selon le ton', () => {
    render(
      <>
        <StatCard label="A" value="1" />
        <StatCard label="B" value="2" tone="success" />
      </>,
    )
    expect(screen.getByText('1').className).not.toBe(screen.getByText('2').className)
  })
})
