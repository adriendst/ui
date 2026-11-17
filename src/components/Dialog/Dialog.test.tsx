import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog'

// jsdom n'implémente pas showModal/close : version minimale qui bascule l'attribut `open`.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
})

describe('Dialog', () => {
  it('s’ouvre nommée par son titre et met le focus sur data-autofocus', () => {
    render(
      <Dialog open title="Nouvelle catégorie" onClose={() => {}}>
        <input aria-label="Nom" data-autofocus />
      </Dialog>,
    )
    expect(screen.getByRole('dialog', { name: 'Nouvelle catégorie' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Nom' })).toHaveFocus()
  })

  it('demande la fermeture par le bouton et par le voile', () => {
    const onClose = vi.fn<() => void>()
    render(
      <Dialog open title="Titre" onClose={onClose}>
        Contenu
      </Dialog>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Fermer' }))
    fireEvent.click(screen.getByRole('dialog'))
    fireEvent.click(screen.getByText('Contenu'))
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('demande la fermeture sur Échap (évènement cancel) sans se fermer seule', () => {
    const onClose = vi.fn<() => void>()
    render(
      <Dialog open title="Titre" onClose={onClose}>
        Contenu
      </Dialog>,
    )
    const dialog = screen.getByRole('dialog')
    const cancel = new Event('cancel', { cancelable: true })
    dialog.dispatchEvent(cancel)
    expect(onClose).toHaveBeenCalledOnce()
    expect(cancel.defaultPrevented).toBe(true)
    expect(dialog).toHaveAttribute('open')
  })

  it('se ferme quand open passe à false, sans rappeler onClose', () => {
    const onClose = vi.fn<() => void>()
    const { rerender } = render(
      <Dialog open title="Titre" onClose={onClose}>
        Contenu
      </Dialog>,
    )
    rerender(
      <Dialog open={false} title="Titre" onClose={onClose}>
        Contenu
      </Dialog>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()
  })
})
