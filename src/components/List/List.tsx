import type { ComponentPropsWithRef } from 'react'
import styles from './List.module.css'

export type ListProps = ComponentPropsWithRef<'ul'>

/** Liste sans puces, éléments séparés par un filet. À remplir de `ListItem`. */
export function List({ className, ...props }: ListProps) {
  const classes = [styles.list, className].filter(Boolean).join(' ')
  return <ul className={classes} {...props} />
}
