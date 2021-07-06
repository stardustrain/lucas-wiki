import React from 'react'
import styled from '@emotion/styled'

import { useSeriesContext } from '../contexts/SeriesContext'

import DefaultDropdown from './Dropdown'

const Dropdown = styled(DefaultDropdown)`
  min-width: 200px;

  button {
    width: 100%;
  }

  @media (max-width: 42rem) {
    width: 100%;
  }
`

interface Props {
  seriesList: string[]
}

export default function SeriesSelector({ seriesList }: Props) {
  const { state, dispatch } = useSeriesContext()

  return (
    <Dropdown
      options={seriesList.map(series => ({
        label: series,
        value: series,
      }))}
      defaultButtonTitle="시리즈 모아 보기"
      onSelect={value => {
        dispatch({
          type: 'SET_SERIES',
          payload: typeof value === 'number' ? value.toString() : value,
        })
      }}
      selectedValue={state.selectedSeries}
    />
  )
}
