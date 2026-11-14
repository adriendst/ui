import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { StarRatingField } from './StarRatingField'

const optionLabel = (value: number) => `${value} étoile${value > 1 ? 's' : ''}`

describe('StarRatingField', () => {
  it('nomme le groupe et chaque étoile, et coche la note courante', () => {
    render(
      <StarRatingField label="Ma note" value={3} onChange={() => {}} optionLabel={optionLabel} />,
    )
    expect(screen.getByRole('radiogroup', { name: 'Ma note' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(5)
    expect(screen.getByRole('radio', { name: '3 étoiles' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '1 étoile' })).not.toBeChecked()
  })

  it('ne coche rien sans note', () => {
    render(
      <StarRatingField
        label="Ma note"
        value={null}
        onChange={() => {}}
        optionLabel={optionLabel}
      />,
    )
    for (const radio of screen.getAllByRole('radio')) expect(radio).not.toBeChecked()
  })

  it('transmet la note choisie', () => {
    const onChange = vi.fn<(value: number) => void>()
    render(
      <StarRatingField
        label="Ma note"
        value={null}
        onChange={onChange}
        optionLabel={optionLabel}
      />,
    )
    fireEvent.click(screen.getByRole('radio', { name: '4 étoiles' }))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('relie l’aide au groupe', () => {
    render(
      <StarRatingField
        label="Ma note"
        description="Facultative"
        value={null}
        onChange={() => {}}
        optionLabel={optionLabel}
      />,
    )
    expect(screen.getByRole('radiogroup', { name: 'Ma note' })).toHaveAccessibleDescription(
      'Facultative',
    )
  })
})
