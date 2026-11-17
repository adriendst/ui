import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TextField } from './TextField'

describe('TextField', () => {
  it('relie le libellé et la description au champ', () => {
    render(<TextField label="Adresse e-mail" description="Vous recevrez un code." />)
    const input = screen.getByRole('textbox', { name: 'Adresse e-mail' })
    expect(input).toHaveAccessibleDescription('Vous recevrez un code.')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it("marque le champ invalide et annonce l'erreur", () => {
    render(<TextField label="Code" error="Le code doit contenir 6 chiffres." />)
    const input = screen.getByRole('textbox', { name: 'Code' })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Le code doit contenir 6 chiffres.')
  })

  it('transmet les propriétés natives du champ', () => {
    const onChange = vi.fn<() => void>()
    render(<TextField label="Prénom" name="displayName" onChange={onChange} />)
    const input = screen.getByRole('textbox', { name: 'Prénom' })
    fireEvent.change(input, { target: { value: 'Alice' } })
    expect(input).toHaveAttribute('name', 'displayName')
    expect(onChange).toHaveBeenCalledOnce()
  })
})

describe('TextField, libellé masqué et icône', () => {
  it('garde le nom accessible et cache l’icône', () => {
    render(
      <TextField label="Rechercher" hideLabel icon={<svg data-testid="icon" />} type="search" />,
    )
    expect(screen.getByRole('searchbox', { name: 'Rechercher' })).toBeInTheDocument()
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true')
  })
})
