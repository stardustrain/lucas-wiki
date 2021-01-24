import React from 'react'
import styled from '@emotion/styled'

import { rgba } from '../utils/misc'

import type { Dispatch, SetStateAction } from 'react'

const Ul = styled.ul`
  position: sticky;
  top: -1px;
  background-color: #f4f7f8;
  border: 1px solid #ecf0f2;
  padding: calc(1rem - 5px) 1rem;
  z-index: 1;
  list-style: none;
  box-shadow: 0 2px 5px ${rgba('#d9d9d9', 0.5)};

  li {
    display: inline-block;
    margin: 5px 0 0 0;

    :not(:first-of-type) {
      margin-left: 3px;
    }
  }
`

const Button = styled.button`
  color: ${({ theme }) => rgba(theme.color.textSecondary, 0.8)};
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  transition: background-color 0.3s;

  :hover {
    color: ${({ theme }) => theme.color.textSecondary};
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
  return (
    <Ul>
      <li>
        <Button
          onClick={() => {
            onSetTag('')
          }}
        >
          All
        </Button>
      </li>
      {tagList.map(tag => (
        <li key={tag}>
          <Button
            onClick={() => {
              onSetTag(tag)
            }}
          >
            #{tag}
          </Button>
        </li>
      ))}
    </Ul>
  )
}
