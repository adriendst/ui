import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ListItem } from './ListItem'

describe('ListItem', () => {
  it('affiche titre, description et fin de ligne', () => {
    render(
      <ul>
        <ListItem
          title="Courses"
          description="12 transactions"
          trailing={<button type="button">Modifier</button>}
        />
      </ul>,
    )
    expect(screen.getByRole('listitem')).toHaveTextContent('Courses12 transactions')
    expect(screen.getByRole('button', { name: 'Modifier' })).toBeInTheDocument()
  })

  it('devient un bouton avec onClick', () => {
    const onClick = vi.fn<() => void>()
    render(
      <ul>
        <ListItem title="Courses" trailing="-12,00 €" onClick={onClick} />
      </ul>,
    )
    fireEvent.click(screen.getByRole('button', { name: /Courses/ }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
