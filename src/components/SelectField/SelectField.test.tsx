import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SelectField } from './SelectField'

const options = [
  { value: 'manga', label: 'Manga' },
  { value: 'novel', label: 'Roman' },
]

describe('SelectField', () => {
  it('relie le libellé et la description à la liste', () => {
    render(<SelectField label="Type" description="Modifiable plus tard." options={options} />)
    const select = screen.getByRole('combobox', { name: 'Type' })
    expect(select).toHaveAccessibleDescription('Modifiable plus tard.')
    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
      'Manga',
      'Roman',
    ])
  })

  it("marque la liste invalide et annonce l'erreur", () => {
    render(<SelectField label="Type" error="Choisissez un type." options={options} />)
    const select = screen.getByRole('combobox', { name: 'Type' })
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAccessibleDescription('Choisissez un type.')
  })

  it('transmet la valeur choisie', () => {
    const onChange = vi.fn<() => void>()
    render(<SelectField label="Type" name="type" options={options} onChange={onChange} />)
    const select = screen.getByRole('combobox', { name: 'Type' })
    fireEvent.change(select, { target: { value: 'novel' } })
    expect(select).toHaveValue('novel')
    expect(onChange).toHaveBeenCalledOnce()
  })
})

describe('SelectField, libellé masqué', () => {
  it('garde le nom accessible', () => {
    render(<SelectField label="Type" hideLabel options={[{ value: '', label: 'Tous' }]} />)
    expect(screen.getByRole('combobox', { name: 'Type' })).toBeInTheDocument()
  })
})
