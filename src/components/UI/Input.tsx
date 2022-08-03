import React, { ForwardedRef, ReactNode } from 'react'
import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'

import Label from '@components/UI/Label'

const sizeClassNames = {
  medium: 'py-2 px-3',
  large: 'py-3.5 px-4',
}

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: keyof typeof sizeClassNames
  label?: string
  fullWidth?: boolean
  error?: string
  id?: string
  onValueChange?: (value: string) => void
}

const InputField = React.forwardRef(
  (
    {
      className,
      label,
      fullWidth = false,
      size = 'medium',
      error,
      id,
      ...props
    }: InputFieldProps,
    forwardedRef: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={className}>
        {label && (
          <Label htmlFor={id} className="mb-2">
            {label}
          </Label>
        )}
        <input
          id={id}
          ref={forwardedRef}
          {...props}
          className={classNames(
            'block',
            'border bg-white',
            'px-4 py-2',
            'h-10 sm:h-12 w-full',
            'rounded-md sm:rounded-lg',
            'text-sm',
            'placeholder-gray-400',
            'transition-shadow duration-200',
            'focus:outline-none focus:ring-1',
            error
              ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900',
          )}
        />
        {error && (
          <div
            className="text-danger ml-1 flex-1 text-red-600 text-sm mt-0.5"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    )
  },
)

InputField.displayName = 'InputField'

export default InputField
