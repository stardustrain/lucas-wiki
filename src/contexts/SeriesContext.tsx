import React, { createContext, useContext, useReducer } from 'react'
import type { Dispatch, FC } from 'react'

const defaultState: { selectedSeries: string | null } = {
  selectedSeries: null,
}

const SeriesContext = createContext<{
  state: typeof defaultState
  dispatch: Dispatch<{
    type: string
    payload: string | null
  }>
}>({
  state: defaultState,
  dispatch: () => {},
})

const reducer = (state: typeof defaultState, action: { type: string; payload: string | null }) => {
  switch (action.type) {
    case 'SET_SERIES':
      return {
        selectedSeries: action.payload,
      }
    default:
      return state
  }
}

export const SeriesContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <SeriesContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SeriesContext.Provider>
  )
}

export const useSeriesContext = () => useContext(SeriesContext)
