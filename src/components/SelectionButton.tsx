import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

const variants = {
  primary: 'border-gray-300 text-white bg-transparent',
  reset: 'border-red-200 text-white bg-red-200/20',
  selected: 'border-green-200 text-white bg-green-200/20'
}

export type SelectionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  className?: string
  variant?: keyof typeof variants
}

export const SelectionButton = ({
  label,
  variant = 'primary',
  className = '',
  ...rest
}: SelectionButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        'rounded-full border-2 py-2 px-4 disabled:cursor-not-allowed disabled:opacity-70',
        variants[variant],
        className
      )}
    >
      {label}
    </button>
  )
}
