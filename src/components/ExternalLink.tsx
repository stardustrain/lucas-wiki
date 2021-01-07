import React from 'react'

interface Props {
  className?: string
  href: string
  children: React.ReactNode
  ariaLabel?: string
}

export default function ExternalLink({ className, href, children, ariaLabel }: Props) {
  return (
    <a
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}
