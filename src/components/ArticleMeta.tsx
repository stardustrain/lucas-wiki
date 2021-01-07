import React from 'react'
import styled from '@emotion/styled'

import { color } from '../styles/theme'

const Div = styled.div`
  color: ${color.textTertiary};
`

interface Props {
  date: string
  readTime: number
  className?: string
}

export default function ArticleMeta({ className, date, readTime }: Props) {
  return (
    <Div className={className}>
      {date && (
        <>
          <small>Published: {date}</small>
          {', '}
        </>
      )}
      <small>{readTime} mins to read</small>
    </Div>
  )
}
