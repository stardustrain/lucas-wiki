import React, { useEffect } from 'react'
import { navigate, useLocation } from '@reach/router'
import styled from '@emotion/styled'

import { useSeriesContext } from '../contexts/SeriesContext'

import DefaultDropdown from './Dropdown'

const getQueryObject = (qs: string) =>
  qs
    .replace('?', '')
    .split('&')
    .reduce<{ [key: string]: string }>((acc, val) => {
      const [key, value] = val.split('=')
      acc[key] = value
      return acc
    }, {})

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
  const location = useLocation()
  const { state, dispatch } = useSeriesContext()

  useEffect(() => {
    if (location.search.length <= 0) {
      return
    }

    const seriesFromQs = getQueryObject(location.search)['series']

    if (typeof seriesFromQs !== 'string' || seriesFromQs.length <= 0) {
      return
    }

    dispatch({
      type: 'SET_SERIES',
      payload: seriesFromQs,
    })
  }, [location.search])

  const options = seriesList.map(series => ({
    label: series,
    value: series.replace(/\s/g, '-').toLowerCase(),
  }))

  return (
    <Dropdown
      options={options}
      defaultButtonTitle="시리즈 모아 보기"
      onSelect={value => {
        const payload = typeof value === 'number' ? value.toString() : value
        navigate(`${location.pathname}?series=${payload}`)
      }}
      buttonTitle={options.find(({ value }) => value === state.selectedSeries)?.label}
      selectedValue={state.selectedSeries}
    />
  )
}
