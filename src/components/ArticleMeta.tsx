import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { range, floor } from 'lodash'

import DefaultIcon from './Icon'

import getMetaImageUrl from '../utils/getMetaImageUrl'

const Div = styled.div`
  small {
    color: ${({ theme }) => theme.color.textTertiary};
  }

  ul {
    display: inline-block;
    list-style: none;
    margin-bottom: 0;
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

const Icon = styled(DefaultIcon)`
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
`

const AVERAGE_TIME_TO_DRINK_COFFEE = 10
const emojiMap = {
  coffee: '☕',
  meal: '🍔',
}

interface Props {
  title: string
  date: string
  readTime: number
  tags?: string[]
  className?: string
  author: string
  frontMatter: Frontmatter
}

export default function ArticleMeta({ title, className, date, readTime, tags, author, frontMatter }: Props) {
  const readTimeEmojiCount = floor(readTime / AVERAGE_TIME_TO_DRINK_COFFEE)
  const emoji = readTimeEmojiCount >= 3 ? 'meal' : 'coffee'
  return (
    <Div className={className}>
      <div className="visually-hidden" itemProp="author">{author}</div>
      {date && (
        <>
          <Icon name="Calendar" size={13} aria-hidden focusable={false} />
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
          <Icon name="Tag" size={12} aria-hidden focusable={false} />
          <ul>
            {tags.map(tag => (
              <Tag key={tag}>
                <small>{`#${tag}`}</small>
              </Tag>
            ))}
          </ul>
        </>
      ) : null}
      <img className="visually-hidden" itemProp="image" src={getMetaImageUrl(frontMatter)} alt={`${title} article`} />
    </Div>
  )
}
