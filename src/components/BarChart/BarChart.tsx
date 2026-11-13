import type { ComponentPropsWithRef } from 'react'
import styles from './BarChart.module.css'

export type BarChartDatum = {
  /** Identifiant stable de la barre. */
  key: string
  /** Libellé court sous la barre (« J », « nov. »). */
  label: string
  value: number
  /** Texte lu par les lecteurs d'écran pour cette barre ; par défaut « libellé : valeur ». */
  description?: string
}

export type BarChartProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** Nom accessible du graphique (titre de la liste des barres). */
  label: string
  data: readonly BarChartDatum[]
  /** Haut de l'échelle ; par défaut la plus grande valeur. Utile pour comparer plusieurs graphiques. */
  max?: number
  /** Mise en forme des valeurs (haut de l'échelle, description par défaut). */
  formatValue?: (value: number) => string
}

/**
 * Graphique en barres verticales, sans dépendance : une liste ordonnée, une barre par élément.
 * Les valeurs exactes sont lues par les lecteurs d'écran ; à l'écran, seul le haut de l'échelle est écrit.
 */
export function BarChart({
  label,
  data,
  max,
  formatValue = String,
  className,
  ...props
}: BarChartProps) {
  const top = Math.max(max ?? 0, ...data.map((datum) => datum.value))
  const classes = [styles.chart, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      <span className={styles.scale} aria-hidden="true">
        {top > 0 ? formatValue(top) : null}
      </span>
      <ol className={styles.bars} aria-label={label}>
        {data.map((datum) => (
          <li key={datum.key} className={styles.item}>
            <span className={styles.track} aria-hidden="true">
              {datum.value > 0 ? (
                <span
                  className={styles.bar}
                  style={{ blockSize: `${(datum.value / top) * 100}%` }}
                />
              ) : null}
            </span>
            <span className={styles.axisLabel} aria-hidden="true">
              {datum.label}
            </span>
            <span className={styles.visuallyHidden}>
              {datum.description ?? `${datum.label} : ${formatValue(datum.value)}`}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
