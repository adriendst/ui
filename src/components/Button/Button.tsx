import type { ComponentPropsWithRef } from 'react'
import { type ButtonSize, type ButtonVariant, buttonClassName } from './button-class-name'

export type { ButtonSize, ButtonVariant } from './button-class-name'

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClassName({ variant, size, className })} {...props} />
}
