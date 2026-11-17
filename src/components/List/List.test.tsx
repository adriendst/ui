import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { List } from './List'

describe('List', () => {
  it('rend une liste nommable', () => {
    render(
      <List aria-label="Catégories">
        <li>Courses</li>
        <li>Loyer</li>
      </List>,
    )
    expect(screen.getByRole('list', { name: 'Catégories' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
