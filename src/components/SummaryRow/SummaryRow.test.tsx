import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { SummaryRow } from './SummaryRow'

function Harness() {
  const [open, setOpen] = useState(false)
  return (
    <SummaryRow
      label="Prochain tome"
      value="Tome 14, date non annoncée"
      editLabel="Modifier"
      open={open}
      onOpenChange={setOpen}
      status={open ? null : 'Enregistré.'}
    >
      <button type="button" onClick={() => setOpen(false)}>
        Fermer
      </button>
    </SummaryRow>
  )
}

describe('SummaryRow', () => {
  it('résume la valeur et nomme le bouton d’après l’intitulé', () => {
    render(<Harness />)
    expect(screen.getByText('Prochain tome')).toBeInTheDocument()
    expect(screen.getByText('Tome 14, date non annoncée')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Modifier Prochain tome' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Enregistré.')
  })

  it('ouvre le formulaire à la place de la ligne et rend le focus au bouton à la fermeture', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Modifier Prochain tome' }))
    expect(screen.queryByText('Tome 14, date non annoncée')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Fermer' }))
    expect(screen.getByRole('button', { name: 'Modifier Prochain tome' })).toHaveFocus()
  })

  it('ne prend pas le focus au premier affichage', () => {
    render(<Harness />)
    expect(screen.getByRole('button', { name: 'Modifier Prochain tome' })).not.toHaveFocus()
  })
})
