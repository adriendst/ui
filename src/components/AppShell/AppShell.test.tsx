import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('expose une navigation nommée et une zone principale', () => {
    render(
      <AppShell navigation={<a href="/">Accueil</a>} navigationLabel="Navigation principale">
        <h1>Contenu</h1>
      </AppShell>,
    )
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' })
    expect(nav).toContainElement(screen.getByRole('link', { name: 'Accueil' }))
    expect(screen.getByRole('main')).toContainElement(
      screen.getByRole('heading', { name: 'Contenu' }),
    )
  })

  it("propose un lien d'évitement vers la zone principale", () => {
    render(
      <AppShell navigation={null} navigationLabel="Navigation" mainId="contenu">
        <p>Texte</p>
      </AppShell>,
    )
    expect(screen.getByRole('link', { name: 'Aller au contenu' })).toHaveAttribute(
      'href',
      '#contenu',
    )
    expect(screen.getByRole('main')).toHaveAttribute('id', 'contenu')
  })
})
