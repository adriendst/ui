import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TextAreaField } from './TextAreaField'

describe('TextAreaField', () => {
  it('relie le libellé et la description à la zone de texte', () => {
    render(<TextAreaField label="Mon avis" description="Facultatif." />)
    const textarea = screen.getByRole('textbox', { name: 'Mon avis' })
    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toHaveAccessibleDescription('Facultatif.')
    expect(textarea).toHaveAttribute('rows', '4')
  })

  it("marque la zone invalide et annonce l'erreur", () => {
    render(<TextAreaField label="Mon avis" error="Trop long." />)
    const textarea = screen.getByRole('textbox', { name: 'Mon avis' })
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).toHaveAccessibleDescription('Trop long.')
  })

  it('transmet les propriétés natives', () => {
    const onChange = vi.fn<() => void>()
    render(<TextAreaField label="Mon avis" name="body" rows={6} onChange={onChange} />)
    const textarea = screen.getByRole('textbox', { name: 'Mon avis' })
    fireEvent.change(textarea, { target: { value: 'Super.' } })
    expect(textarea).toHaveAttribute('name', 'body')
    expect(textarea).toHaveAttribute('rows', '6')
    expect(onChange).toHaveBeenCalledOnce()
  })
})
