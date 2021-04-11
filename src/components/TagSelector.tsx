import React from 'react'
import styled from '@emotion/styled'

import { useSelectedTagContext } from '../contexts/SelectedTagContext'

const Ul = styled.ul`
  position: sticky;
  top: -1px;
  background-color: ${({ theme }) => theme.color.tagSelector.background};
  border: ${({ theme }) => `1px solid ${theme.color.tagSelector.border}`};
  padding: calc(1rem - 5px) 1rem;
  z-index: 1;
  list-style: none;
  box-shadow: ${({ theme }) => `0 2px 5px ${theme.color.tagSelector.boxShadow}`};

  li {
    display: inline-block;
    margin: 5px 0 0 0;

    :not(:first-of-type) {
      margin-left: 3px;
    }
  }
`

const Button = styled.button<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? '#f4f7f8' : 'hsla(var(--text-base), 45%)')};
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? 'hsla(var(--text-base), 45%, 50%)' : '#fff'};
  border: ${({ isSelected }) => (isSelected ? 0 : '1px solid #d9d9d9;')};
  border-radius: 10px;
  transition: background-color 0.3s;

  ${({ theme, isSelected }) =>
    !isSelected &&
    `
      :hover {
        color: ${theme.color.textSecondary};
        background-color: #fafafa;
      }
  `}

  :active {
    color: #f4f7f8;
    background-color: grey;
  }
`

interface Props {
  tagList: string[]
}

export default function TagSelector({ tagList }: Props) {
  const {
    state: { selectedTag },
    dispatch,
  } = useSelectedTagContext()

  return (
    <Ul>
      <li>
        <Button
          isSelected={selectedTag === 'all'}
          onClick={() => {
            dispatch({
              type: 'SET_TAG',
              payload: 'all',
            })
          }}
        >
          All
        </Button>
      </li>
      {tagList.map(tag => (
        <li key={tag}>
          <Button
            isSelected={selectedTag === tag}
            onClick={() => {
              dispatch({
                type: 'SET_TAG',
                payload: tag,
              })
            }}
          >
            #{tag}
          </Button>
        </li>
      ))}
    </Ul>
  )
}
