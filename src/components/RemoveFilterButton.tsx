import React from 'react'

import { useSelectedTagContext } from '../contexts/SelectedTagContext'
import { useSeriesContext } from '../contexts/SeriesContext'

import Button from './Button'

export default function RemoveFilterButton() {
  const selectedTagContext = useSelectedTagContext()
  const seriesContext = useSeriesContext()

  return (
    <Button
      onClick={() => {
        selectedTagContext.dispatch({
          type: 'SET_TAG',
          payload: null,
        })
        seriesContext.dispatch({
          type: 'SET_SERIES',
          payload: null,
        })
      }}
    >
      X
    </Button>
  )
}
