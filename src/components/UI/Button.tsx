import React, { ButtonHTMLAttributes, ElementType, ReactNode } from 'react'
import classNames from 'classnames'

import SpinnerIcon from '@icons/spinner.svg'

const variantClassNames = {
  primary:
    'bg-gray-800 hover:bg-black disabled:bg-gray-800 disabled:opacity-50',
  danger:
    'bg-red-600 hover:bg-red-700 text-white disabled: bg-red-600 disabled:opacity-50',
}

const sizeClassNames = {
  small: 'py-2.5 sm:px-6 text-sm',
  medium: 'py-3 sm:px-8',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClassNames
  size?: keyof typeof sizeClassNames
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  as?: ElementType
}

const Button = React.forwardRef(
  (
    {
      children,
      leftIcon,
      rightIcon,
      variant = 'primary',
      size = 'medium',
      disabled,
      loading,
      as: Tag = 'button',
      fullWidth,
      className,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    return (
      <Tag
        {...props}
        aria-busy={loading}
        disabled={disabled || loading}
        ref={forwardedRef}
        className={classNames(
          variantClassNames[variant],
          sizeClassNames[size],
          'text-white te',
          'hover:-translate-y-0.5 hover:shadow-large',
          'focus:-translate-y-0.5 focus:shadow-large focus:outline-none',
          'rounded-full',
          'disabled:cursor-not-allowed',
          'relative',
          'inline-flex items-center justify-center',
          'cursor-pointer',
          { 'w-full': fullWidth },
          className,
        )}
      >
        <span
          className={classNames('flex justify-center items-center', {
            'opacity-0': loading,
          })}
        >
          {leftIcon && (
            <span className="mr-1 fill-current w-5">{leftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className="ml-1 fill-current w-5">{rightIcon}</span>
          )}
        </span>
        {loading && <SpinnerIcon className="animate-spin w-4 absolute" />}
      </Tag>
    )
  },
)

Button.displayName = 'Button'

export default Button
