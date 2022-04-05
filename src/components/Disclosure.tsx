import React from 'react'
import styled from '@emotion/styled'

import type { ReactNode, CSSProperties } from 'react'

const Details = styled.details`
  margin-bottom: ${({ theme }) => theme.spacing4};
`

const Summary = styled.summary`
  cursor: pointer;
`

interface Props {
  title: string
  style: CSSProperties
  children: ReactNode
}

export default function Disclosure({ title, style, children }: Props) {
  return (
    <Details style={style}>
      <Summary>{title}</Summary>
      {children}
    </Details>
  )
}
