import React, { Children } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'
import Link, { LinkProps } from 'next/link'

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
  activeClassName?: string
}

export const NavLink = ({
  children,
  activeClassName = 'text-blue-900 text-xl font-semibold border-b-4 border-b-blue-900 h-full flex items-center py-4',
  ...props
}: NavLinkProps) => {
  const { asPath } = useRouter()
  const child = Children.only(children) as React.ReactElement
  const childClassName = child.props.className || ''

  const isActive = asPath === props.href || asPath === props.as

  if (isActive) {
    return (
      <div className="text-blue-900 text-xl font-semibold border-b-4 border-b-blue-900 h-full flex items-center py-4">
        {child}
      </div>
    )
  }

  const className = cx(childClassName, { [activeClassName]: isActive })

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  )
}
