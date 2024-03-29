import React from 'react'
import styled from '@emotion/styled'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const A = styled(OutboundLink)`
  &:hover {
    text-decoration: underline;
  }
`

interface Props {
  className?: string
  href: string
  children: React.ReactNode
  ariaLabel?: string
}

export default function ExternalLink({ className, href, children, ariaLabel }: Props) {
  return (
    <A
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={ariaLabel}
    >
      {children}
    </A>
  )
}
