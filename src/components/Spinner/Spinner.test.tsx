import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('annonce le chargement aux lecteurs d’écran', () => {
    render(<Spinner label="Chargement…" />)
    expect(screen.getByRole('status')).toHaveTextContent('Chargement…')
  })
})
