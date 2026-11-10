import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CenteredLayout } from './CenteredLayout'

describe('CenteredLayout', () => {
  it('rend son contenu dans la zone principale', () => {
    render(
      <CenteredLayout>
        <h1>Connexion</h1>
      </CenteredLayout>,
    )
    expect(screen.getByRole('main')).toContainElement(
      screen.getByRole('heading', { name: 'Connexion' }),
    )
  })
})
