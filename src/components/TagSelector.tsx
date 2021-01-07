import React, { useRef } from 'react'
import styled from '@emotion/styled'

import { rgba } from '../utils/misc'
import { color } from '../styles/theme'

import type { Dispatch, SetStateAction } from 'react'

const MARGIN_TOP = 5

const Ul = styled.ul`
  position: relative;
  background-color: #f4f7f8;
  border: 1px solid #ecf0f2;
  padding: calc(1rem - 5px) 1rem;

  list-style: none;

  li {
    display: inline-block;
    margin: 5px 0 0 0;

    :not(:first-of-type) {
      margin-left: 3px;
    }
  }
`

const Button = styled.button`
  color: ${rgba(color.textSecondary, 0.8)};
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  transition: background-color 0.3s;

  :hover {
    color: ${color.textSecondary};
    background-color: #fafafa;
  }

  :active {
    background-color: grey;
  }
`

interface Props {
  tagList: string[]
  onSetTag: Dispatch<SetStateAction<string>>
}

export default function TagSelector({ tagList, onSetTag }: Props) {
  const ulRef = useRef<HTMLUListElement>(null)

  const handleClick = (tag: string) => {
    onSetTag(tag)

    if (ulRef.current) {
      const top = ulRef.current.offsetTop
      window.scrollTo({
        top: top - MARGIN_TOP,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Ul ref={ulRef} className="TagSelector">
      <li>
        <Button
          onClick={() => {
            handleClick('')
          }}
        >
          All
        </Button>
      </li>
      {tagList.map(tag => (
        <li key={tag}>
          <Button
            onClick={() => {
              handleClick(tag)
            }}
          >
            #{tag}
          </Button>
        </li>
      ))}
    </Ul>
  )
}
