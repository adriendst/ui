import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SegmentedControl } from './SegmentedControl'

const options = [
  { value: 'owned', label: 'Achetés' },
  { value: 'read', label: 'Lus' },
] as const

describe('SegmentedControl', () => {
  it('nomme le groupe et coche la valeur courante', () => {
    render(<SegmentedControl label="Afficher" options={options} value="read" onChange={() => {}} />)
    expect(screen.getByRole('radiogroup', { name: 'Afficher' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Lus' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Achetés' })).not.toBeChecked()
  })

  it('garde un nom accessible quand le libellé est masqué', () => {
    render(
      <SegmentedControl
        label="Afficher"
        hideLabel
        options={options}
        value="owned"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('radiogroup', { name: 'Afficher' })).toBeInTheDocument()
  })

  it('transmet le choix', () => {
    const onChange = vi.fn<(value: 'owned' | 'read') => void>()
    render(
      <SegmentedControl label="Afficher" options={options} value="owned" onChange={onChange} />,
    )
    fireEvent.click(screen.getByRole('radio', { name: 'Lus' }))
    expect(onChange).toHaveBeenCalledWith('read')
  })
})

describe('SegmentedControl, variante discrète', () => {
  it('garde les boutons radio et ajoute sa classe', () => {
    const { container } = render(
      <SegmentedControl
        label="Type"
        options={options}
        value="owned"
        onChange={() => {}}
        variant="subtle"
      />,
    )
    expect(screen.getByRole('radio', { name: 'Achetés' })).toBeChecked()
    expect(container.firstElementChild?.classList.length).toBe(2)
  })
})
