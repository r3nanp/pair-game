import clsx from 'clsx'

const variants = {
  primary: 'border-gray-300 text-black bg-main/20',
  reset: 'border-red-200 text-black bg-red-200/20',
  selected: 'border-green-200 text-black bg-green-200/20'
}

export type SelectionButtonProps = {
  label: string
  className?: string
  variant?: keyof typeof variants
}

export const SelectionButton = ({
  label,
  variant = 'primary',
  className = ''
}: SelectionButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-full border-2 py-2 px-4 ',
        variants[variant],
        className
      )}
    >
      {label}
    </button>
  )
}
