import React from 'react'
import { navigate, useLocation } from '@reach/router'

import { useSelectedTagContext } from '../contexts/SelectedTagContext'
import { useSeriesContext } from '../contexts/SeriesContext'

import Button from './Button'

interface Props {
  disabled: boolean
}

export default function RemoveFilterButton({ disabled }: Props) {
  const location = useLocation()
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
        navigate(`${location.pathname}`)
      }}
      disabled={disabled}
    >
      X
    </Button>
  )
}
