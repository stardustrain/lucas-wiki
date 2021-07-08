import React from 'react'

import { useSelectedTagContext } from '../contexts/SelectedTagContext'
import { useSeriesContext } from '../contexts/SeriesContext'

import Button from './Button'

interface Props {
  disabled: boolean
}

export default function RemoveFilterButton({ disabled }: Props) {
  const selectedTagContext = useSelectedTagContext()
  const seriesContext = useSeriesContext()

  return (
    <Button
      aria-label="Remove selected filter"
      onClick={() => {
        selectedTagContext.dispatch({
          type: 'SET_TAG',
          payload: null,
        })
        seriesContext.dispatch({
          type: 'RESET_SERIES',
        })
      }}
      disabled={disabled}
    >
      X
    </Button>
  )
}
