import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { range, floor } from 'lodash'

const Div = styled.div`
  small {
    color: ${({ theme }) => theme.color.textTertiary};
  }

  ul {
    display: inline-block;
    list-style: none;
  }

  margin-bottom: ${({ theme }) => theme.spacing4};
`

const Tag = styled.li`
  display: inline-block;
  margin-bottom: 0;

  :not(:first-of-type) {
    margin-left: 3px;
  }
`

const AVERAGE_TIME_TO_DRINK_COFFEE = 10
const emojiMap = {
  coffee: '☕',
  meal: '🍔',
}

interface Props {
  date: string
  readTime: number
  tags?: string[]
  className?: string
}

export default function ArticleMeta({ className, date, readTime, tags }: Props) {
  const readTimeEmojiCount = floor(readTime / AVERAGE_TIME_TO_DRINK_COFFEE)
  const emoji = readTimeEmojiCount >= 3 ? 'meal' : 'coffee'
  return (
    <Div className={className}>
      {date && (
        <>
          <small>{date}</small>
          {' · '}
        </>
      )}
      <small>
        {range(readTimeEmojiCount).map((_, index) => (
          <Fragment key={index}>{emojiMap[emoji]}&nbsp;&nbsp;</Fragment>
        ))}
        {readTime} mins to read
      </small>
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
