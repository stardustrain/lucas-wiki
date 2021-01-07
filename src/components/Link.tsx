/** @jsx jsx */
import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/react'

import ExternalLink from './ExternalLink'

const Icon = () => (
  <span
    css={css`
      svg {
        color: #aaa;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        top: -1px;
      }
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      width="15"
      height="15"
      className="icon outbound"
    >
      <path
        fill="currentColor"
        d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
      ></path>{' '}
      <polygon
        fill="currentColor"
        points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
      ></polygon>
    </svg>{' '}
    <span className="screen-reader-only">(opens new window)</span>
  </span>
)

const defaultLinkStyle = css`
  cursor: pointer;

  :hover {
    color: #0365d6;
    text-decoration: underline;
  }
`

const InternalLink = styled(GatsbyLink)`
  ${defaultLinkStyle}
  color: ${({ theme }) => theme.color.link};
  transition: color 0.3s;
`

const StyledExternalLink = styled(ExternalLink)`
  ${defaultLinkStyle}
  color: ${({ theme }) => theme.color.link};
`

interface Props {
  href: string
  children: React.ReactChild
  className?: string
}

export default function Link({ href, children, className }: Props) {
  const isExternalLink = /https?\:\/\/\w.*/g.test(href)

  return isExternalLink ? (
    <StyledExternalLink className={className} href={href}>
      {children} <Icon />
    </StyledExternalLink>
  ) : (
    <InternalLink className={className} to={href} rel="next">
      {children}
    </InternalLink>
  )
}
