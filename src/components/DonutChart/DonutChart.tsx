import type { ComponentPropsWithRef, ReactNode } from 'react'
import styles from './DonutChart.module.css'

export type DonutChartSegment = {
  /** Identifiant stable du segment. */
  key: string
  label: string
  value: number
  /** Couleur CSS du segment. */
  color: string
}

export type DonutChartProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** Nom accessible du graphique, suivi de la part de chaque segment. */
  label: string
  segments: readonly DonutChartSegment[]
  /** Valeur au centre de l'anneau (« 1 234 € »). */
  centerValue?: ReactNode
  /** Légende sous la valeur centrale (« dépensés »). */
  centerLabel?: ReactNode
}

/** Rayon qui donne un périmètre de 100 : les longueurs de tirets sont des pourcentages. */
const RADIUS = 15.915
/** Écart entre deux segments, en pourcentage du tour. */
const GAP = 0.6

/**
 * Anneau en SVG, sans dépendance. Les segments nuls sont ignorés ; les lecteurs d'écran lisent
 * le nom puis la part arrondie de chaque segment.
 */
export function DonutChart({
  label,
  segments,
  centerValue,
  centerLabel,
  className,
  ...props
}: DonutChartProps) {
  const visible = segments.filter((segment) => segment.value > 0)
  const total = visible.reduce((sum, segment) => sum + segment.value, 0)
  const gap = visible.length > 1 ? GAP : 0
  let start = 0
  const arcs = visible.map((segment) => {
    const percent = (segment.value / total) * 100
    const length = Math.max(percent - gap, 0.1)
    // 25 : le premier segment part de midi.
    const arc = { ...segment, percent, dash: `${length} ${100 - length}`, offset: 25 - start }
    start += percent
    return arc
  })
  const description = [
    label,
    ...arcs.map((arc) => `${arc.label} ${Math.round(arc.percent)} %`),
  ].join(', ')
  const classes = [styles.donut, className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...props}>
      <svg viewBox="0 0 42 42" role="img" aria-label={description} className={styles.svg}>
        <circle cx="21" cy="21" r={RADIUS} className={styles.track} />
        {arcs.map((arc) => (
          <circle
            key={arc.key}
            cx="21"
            cy="21"
            r={RADIUS}
            className={styles.arc}
            stroke={arc.color}
            strokeDasharray={arc.dash}
            strokeDashoffset={arc.offset}
          >
            <title>{`${arc.label} : ${arc.percent.toFixed(1)} %`}</title>
          </circle>
        ))}
      </svg>
      {centerValue || centerLabel ? (
        <div className={styles.center} aria-hidden="true">
          {centerValue ? <span className={styles.value}>{centerValue}</span> : null}
          {centerLabel ? <span className={styles.label}>{centerLabel}</span> : null}
        </div>
      ) : null}
    </div>
  )
}
