import React from 'react'
import styled from '@emotion/styled'

import { color } from '../styles/theme'

const Div = styled.div`
  small {
    color: ${color.textTertiary};
  }

  ul {
    display: inline-block;
    list-style: none;
  }
`

const Tag = styled.li`
  display: inline-block;
  margin-bottom: 0;

  :not(:first-of-type) {
    margin-left: 3px;
  }
`

interface Props {
  date: string
  readTime: number
  tags?: string[]
  className?: string
}

export default function ArticleMeta({ className, date, readTime, tags }: Props) {
  return (
    <Div className={className}>
      {date && (
        <>
          <small>{date}</small>
          {' · '}
        </>
      )}
      <small>{readTime} mins to read</small>
      {Array.isArray(tags) ? (
        <>
          {' · '}
          <ul>
            {tags.map(tag => (
              <Tag key={tag}>
                <small>{`#${tag}`}</small>
              </Tag>
            ))}
          </ul>
        </>
      ) : null}
    </Div>
  )
}
