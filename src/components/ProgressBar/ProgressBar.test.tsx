import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('annonce sa valeur quand elle a un nom', () => {
    render(<ProgressBar value={4} max={13} label="4 tomes lus sur 13" />)
    const bar = screen.getByRole('progressbar', { name: '4 tomes lus sur 13' })
    expect(bar).toHaveAttribute('aria-valuenow', '4')
    expect(bar).toHaveAttribute('aria-valuemax', '13')
  })

  it('est décorative sans nom', () => {
    const { container } = render(<ProgressBar value={4} max={13} />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('borne le remplissage entre vide et plein', () => {
    const { container } = render(
      <>
        <ProgressBar value={20} max={13} />
        <ProgressBar value={3} max={0} />
      </>,
    )
    const fills = container.querySelectorAll<HTMLElement>('[aria-hidden] > div')
    expect(fills[0]?.style.inlineSize).toBe('100%')
    expect(fills[1]?.style.inlineSize).toBe('0%')
  })
})

describe('ProgressBar, tons et tailles', () => {
  it('change de classe selon le ton et la taille', () => {
    const { container } = render(
      <>
        <ProgressBar value={1} max={2} />
        <ProgressBar value={1} max={2} tone="danger" size="md" />
      </>,
    )
    const [plain, danger] = Array.from(container.children)
    expect(danger?.className).not.toBe(plain?.className)
  })
})
