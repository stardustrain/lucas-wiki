import React from 'react'
import styled from '@emotion/styled'

import type { ReactNode } from 'react'

const Div = styled.div`
  overflow-x: auto;
`

interface Props {
  children: ReactNode
}

export default function OverflowX({ children }: Props) {
  return <Div>{children}</Div>
}
