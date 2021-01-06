import React from 'react'

interface Props {
  className?: string
  href: string
  children: React.ReactNode
}

export default function ExternalLink({ className, href, children }: Props) {
  return (
    <a className={className} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}
