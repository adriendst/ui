import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BarChart } from './BarChart'

/** Barres dessinées (les seuls éléments à hauteur calculée). */
const bars = (container: HTMLElement) => [...container.querySelectorAll<HTMLElement>('[style]')]

const data = [
  { key: '1', label: 'J', value: 10 },
  { key: '2', label: 'F', value: 0 },
  { key: '3', label: 'M', value: 40, description: 'mars : 40 tomes' },
]

describe('BarChart', () => {
  it('liste une barre par valeur, avec sa valeur pour les lecteurs d’écran', () => {
    render(<BarChart label="Tomes par mois" data={data} />)
    const list = screen.getByRole('list', { name: 'Tomes par mois' })
    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('J : 10')
    expect(items[2]).toHaveTextContent('mars : 40 tomes')
  })

  it('dessine les barres à l’échelle de la plus grande valeur, sans barre pour zéro', () => {
    const { container } = render(
      <BarChart label="Tomes" data={data} formatValue={(value) => `${value} t.`} />,
    )
    const drawn = bars(container)
    expect(drawn).toHaveLength(2)
    expect(drawn[0]).toHaveStyle({ blockSize: '25%' })
    expect(drawn[1]).toHaveStyle({ blockSize: '100%' })
    expect(screen.getByText('40 t.')).toBeInTheDocument()
  })

  it('accepte une échelle commune à plusieurs graphiques', () => {
    const { container } = render(<BarChart label="Tomes" data={data} max={80} />)
    expect(bars(container)[1]).toHaveStyle({ blockSize: '50%' })
  })
})
