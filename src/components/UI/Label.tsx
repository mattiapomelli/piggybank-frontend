import classNames from 'classnames'
import { LabelHTMLAttributes, ReactNode } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
}

const Label = ({ children, htmlFor, className }: LabelProps) => {
  return (
    <label
      className={classNames(
        'block text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white',
        { 'cursor-pointer': htmlFor },
        className,
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export default Label
