import clsx from 'clsx'
import { ElementType, FC, HTMLAttributes, ReactNode } from 'react'

type LayoutProps = HTMLAttributes<HTMLOrSVGElement> & {
  as?: ElementType
  className?: string
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({
  as: Main = 'main',
  className = '',
  children,
  ...rest
}) => (
  <Main className={clsx('mx-auto max-w-3xl', className)} {...rest}>
    {children}
  </Main>
)
