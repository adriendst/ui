import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DonutChart } from './DonutChart'

const segments = [
  { key: 'a', label: 'Courses', value: 75, color: '#22c55e' },
  { key: 'b', label: 'Loyer', value: 25, color: '#6366f1' },
  { key: 'c', label: 'Vide', value: 0, color: '#000' },
]

describe('DonutChart', () => {
  it('décrit la part de chaque segment non nul', () => {
    render(<DonutChart label="Dépenses par catégorie" segments={segments} />)
    expect(
      screen.getByRole('img', { name: 'Dépenses par catégorie, Courses 75 %, Loyer 25 %' }),
    ).toBeInTheDocument()
  })

  it('dessine un arc par segment non nul, à partir de midi', () => {
    const { container } = render(<DonutChart label="Dépenses" segments={segments} />)
    const arcs = container.querySelectorAll('circle[stroke]')
    expect(arcs).toHaveLength(2)
    expect(arcs[0]).toHaveAttribute('stroke-dashoffset', '25')
    expect(arcs[1]).toHaveAttribute('stroke-dashoffset', '-50')
  })

  it('affiche la valeur centrale', () => {
    render(
      <DonutChart label="Dépenses" segments={segments} centerValue="100 €" centerLabel="dépensés" />,
    )
    expect(screen.getByText('100 €')).toBeInTheDocument()
    expect(screen.getByText('dépensés')).toBeInTheDocument()
  })
})
