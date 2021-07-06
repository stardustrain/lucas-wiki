import React, { createContext, useContext, useReducer } from 'react'
import type { Dispatch, FC } from 'react'

const defaultState: { selectedSeries: string | null } = {
  selectedSeries: null,
}

type ActionParameter =
  | {
      type: 'SET_SERIES'
      payload: string
    }
  | {
      type: 'RESET_SERIES'
    }

const SeriesContext = createContext<{
  state: typeof defaultState
  dispatch: Dispatch<ActionParameter>
}>({
  state: defaultState,
  dispatch: () => {},
})

const reducer = (state: typeof defaultState, action: ActionParameter) => {
  switch (action.type) {
    case 'SET_SERIES':
      return {
        selectedSeries: action.payload,
      }
    case 'RESET_SERIES':
      return defaultState
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
