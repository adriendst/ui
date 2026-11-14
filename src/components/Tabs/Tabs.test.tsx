import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Tabs } from './Tabs'

const items = [
  { value: 'sheet', label: 'Fiche', panel: <p>Contenu de la fiche</p> },
  { value: 'reviews', label: 'Avis', panel: <p>Contenu des avis</p> },
  { value: 'gallery', label: 'Galerie', panel: <p>Contenu de la galerie</p> },
] as const

type Value = (typeof items)[number]['value']

function Harness({ initial = 'sheet', sticky = false }: { initial?: Value; sticky?: boolean }) {
  const [value, setValue] = useState<Value>(initial)
  return <Tabs label="Sections" items={items} value={value} onChange={setValue} sticky={sticky} />
}

describe('Tabs', () => {
  it('nomme la liste et relie l’onglet choisi à son panneau', () => {
    render(<Harness initial="reviews" />)
    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument()
    const tab = screen.getByRole('tab', { name: 'Avis' })
    expect(tab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel', { name: 'Avis' })).toHaveTextContent('Contenu des avis')
    // Un seul panneau visible ; les autres restent montés mais masqués.
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByText('Contenu de la fiche')).not.toBeVisible()
  })

  it('change de panneau au clic', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('tab', { name: 'Galerie' }))
    expect(screen.getByRole('tab', { name: 'Galerie' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Contenu de la galerie')).toBeVisible()
    expect(screen.getByText('Contenu de la fiche')).not.toBeVisible()
  })

  it('se parcourt aux flèches, Début et Fin, en un seul arrêt de tabulation', () => {
    render(<Harness />)
    const [sheet, reviews, gallery] = screen.getAllByRole('tab')
    expect(sheet).toHaveAttribute('tabindex', '0')
    expect(reviews).toHaveAttribute('tabindex', '-1')

    fireEvent.keyDown(sheet!, { key: 'ArrowRight' })
    expect(reviews).toHaveFocus()
    expect(reviews).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(reviews!, { key: 'End' })
    expect(gallery).toHaveFocus()
    fireEvent.keyDown(gallery!, { key: 'ArrowRight' })
    expect(sheet).toHaveFocus()
    fireEvent.keyDown(sheet!, { key: 'ArrowLeft' })
    expect(gallery).toHaveFocus()
    fireEvent.keyDown(gallery!, { key: 'Home' })
    expect(sheet).toHaveFocus()
    expect(sheet).toHaveAttribute('aria-selected', 'true')
  })

  describe('liste collée en haut (sticky)', () => {
    /** Simule une page défilée : le début des onglets est à `top` pixels du haut de l'écran. */
    function scrolledTo(top: number) {
      const root = screen.getByRole('tablist').parentElement
      if (!root) throw new Error('Onglets introuvables')
      root.getBoundingClientRect = () => DOMRect.fromRect({ x: 0, y: top, width: 300, height: 900 })
      const scrollIntoView = vi.fn<(options?: ScrollIntoViewOptions) => void>()
      root.scrollIntoView = scrollIntoView
      return scrollIntoView
    }

    it('ramène au début du nouveau panneau quand la liste est collée', () => {
      render(<Harness sticky />)
      const scrollIntoView = scrolledTo(-400)
      fireEvent.click(screen.getByRole('tab', { name: 'Galerie' }))
      expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start' })
    })

    it('ne fait pas défiler quand les onglets sont déjà visibles', () => {
      render(<Harness sticky />)
      const scrollIntoView = scrolledTo(120)
      fireEvent.click(screen.getByRole('tab', { name: 'Galerie' }))
      expect(scrollIntoView).not.toHaveBeenCalled()
    })

    it('ne fait pas défiler sans l’option, ni pour l’onglet déjà choisi', () => {
      render(<Harness />)
      const scrollIntoView = scrolledTo(-400)
      fireEvent.click(screen.getByRole('tab', { name: 'Galerie' }))
      fireEvent.click(screen.getByRole('tab', { name: 'Galerie' }))
      expect(scrollIntoView).not.toHaveBeenCalled()
    })
  })
})
