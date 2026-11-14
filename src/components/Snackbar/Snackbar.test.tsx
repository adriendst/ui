import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Snackbar } from './Snackbar'

describe('Snackbar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('garde la zone d’annonce sans message, puis annonce le message et ses boutons', () => {
    const { rerender } = render(<Snackbar message={null} />)
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    rerender(
      <Snackbar message="3 tomes achetés" actions={<button type="button">Annuler</button>} />,
    )
    expect(screen.getByRole('status')).toHaveTextContent('3 tomes achetés')
    expect(screen.getByRole('button', { name: 'Annuler' })).toBeInTheDocument()
  })

  it('prévient à la fin du délai', () => {
    const onTimeout = vi.fn<() => void>()
    render(<Snackbar message="3 tomes achetés" duration={5000} onTimeout={onTimeout} />)
    act(() => vi.advanceTimersByTime(4999))
    expect(onTimeout).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(onTimeout).toHaveBeenCalledOnce()
  })

  it('relance le délai à chaque nouveau message, même identique', () => {
    const onTimeout = vi.fn<() => void>()
    const { rerender } = render(
      <Snackbar message="3 tomes achetés" messageKey={1} duration={5000} onTimeout={onTimeout} />,
    )
    act(() => vi.advanceTimersByTime(4000))
    rerender(
      <Snackbar message="3 tomes achetés" messageKey={2} duration={5000} onTimeout={onTimeout} />,
    )
    act(() => vi.advanceTimersByTime(4000))
    expect(onTimeout).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1000))
    expect(onTimeout).toHaveBeenCalledOnce()
  })

  it('arrête le délai tant que le focus est dans le bandeau', () => {
    const onTimeout = vi.fn<() => void>()
    render(
      <Snackbar
        message="3 tomes achetés"
        actions={<button type="button">Annuler</button>}
        duration={5000}
        onTimeout={onTimeout}
      />,
    )
    fireEvent.focus(screen.getByRole('button', { name: 'Annuler' }))
    act(() => vi.advanceTimersByTime(10000))
    expect(onTimeout).not.toHaveBeenCalled()
    fireEvent.blur(screen.getByRole('button', { name: 'Annuler' }))
    act(() => vi.advanceTimersByTime(5000))
    expect(onTimeout).toHaveBeenCalledOnce()
  })
})
