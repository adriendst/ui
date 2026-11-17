import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ChoiceGrid } from './ChoiceGrid'

const options = [
  { value: '1', label: 'Courses', content: <span>🛒 Courses</span>, color: '#22c55e' },
  { value: '2', label: 'Loyer', content: <span>🏠 Loyer</span> },
  { value: '3', label: '🎉' },
]

describe('ChoiceGrid', () => {
  it('nomme le groupe et chaque tuile, coche la valeur courante', () => {
    render(<ChoiceGrid label="Catégorie" options={options} value="2" onChange={() => {}} />)
    expect(screen.getByRole('radiogroup', { name: 'Catégorie' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Loyer' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Courses' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: '🎉' })).toBeInTheDocument()
  })

  it('accepte aucune valeur', () => {
    render(<ChoiceGrid label="Catégorie" options={options} value={null} onChange={() => {}} />)
    expect(screen.queryByRole('radio', { checked: true })).not.toBeInTheDocument()
  })

  it('transmet le choix', () => {
    const onChange = vi.fn<(value: string) => void>()
    render(<ChoiceGrid label="Catégorie" options={options} value={null} onChange={onChange} />)
    fireEvent.click(screen.getByRole('radio', { name: 'Courses' }))
    expect(onChange).toHaveBeenCalledWith('1')
  })
})
