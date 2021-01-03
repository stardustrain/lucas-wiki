import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

interface Props {
  href: string
  children: React.ReactChild
}

export default function Link({ href, children }: Props) {
  const isInternalLink = href.startsWith('/')

  return isInternalLink ? (
    <GatsbyLink to={href} rel="next">
      {children}
    </GatsbyLink>
  ) : (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}
