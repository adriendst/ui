import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CheckboxField } from './CheckboxField'

describe('CheckboxField', () => {
  it('relie libellé et aide à la case', () => {
    render(<CheckboxField label="Répéter chaque mois" description="Le 12 de chaque mois" />)
    const box = screen.getByRole('checkbox', { name: 'Répéter chaque mois' })
    expect(box).toHaveAccessibleDescription('Le 12 de chaque mois')
  })

  it('transmet le changement', () => {
    const onChange = vi.fn<() => void>()
    render(<CheckboxField label="Toute la période" checked={false} onChange={onChange} />)
    fireEvent.click(screen.getByRole('checkbox', { name: 'Toute la période' }))
    expect(onChange).toHaveBeenCalledOnce()
  })
})
