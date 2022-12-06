import React from 'react'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'

type NavLinkProps = React.PropsWithChildren<LinkProps>

export const NavLink = ({ children, ...linkProps }: NavLinkProps) => {
  const { asPath } = useRouter()

  const isActive = asPath === linkProps.href || asPath === linkProps.as

  return (
    <Link
      {...linkProps}
      className={clsx(
        isActive ? 'text-blue-800 font-semibold border-b-4 border-b-blue-800 flex items-center py-6' : ''
      )}
    >
      {children}
    </Link>
  )
}
