import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
  it('rend le titre en h1 avec sa description et ses actions', () => {
    render(
      <PageHeader
        title="Collection"
        description="Vos séries"
        actions={<button type="button">Ajouter</button>}
      />,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Collection' })).toBeInTheDocument()
    expect(screen.getByText('Vos séries')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ajouter' })).toBeInTheDocument()
  })
})
