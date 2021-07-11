import React from 'react'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'

import { useFilterContext, SortOption } from '../contexts/FilterContext'

import DefaultButton from './Button'

const Div = styled.div`
  display: inline-flex;

  & > :not(style) ~ :not(style) {
    margin-inline-start: 5px;
  }

  @media (max-width: 30rem) {
    width: 100%;
    margin-top: 8px;
  }
`

const Button = styled(DefaultButton, {
  shouldForwardProp: props => isPropValid(props),
})<{ isSelected: boolean }>`
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.button.hover : theme.color.button.background};

  @media (max-width: 30rem) {
    width: 50%;
  }
`

export default function SortFilter() {
  const {
    state: { sortOption },
    dispatch,
  } = useFilterContext()

  return (
    <Div>
      <Button
        isSelected={sortOption === SortOption.DESC}
        onClick={() => {
          dispatch({
            type: 'SET_SORT_OPTION',
            payload: SortOption.DESC,
          })
        }}
      >
        최신순
      </Button>
      <Button
        isSelected={sortOption === SortOption.ASC}
        onClick={() => {
          dispatch({
            type: 'SET_SORT_OPTION',
            payload: SortOption.ASC,
          })
        }}
      >
        등록순
      </Button>
    </Div>
  )
}
