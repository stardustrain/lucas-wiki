import React, { createContext, useContext, useReducer } from 'react'
import type { Dispatch, FC } from 'react'

export const enum SortOption {
  ASC = 'ASC',
  DESC = 'DESC',
}
const defaultState: { selectedSeries: string | null; sortOption: SortOption } = {
  selectedSeries: null,
  sortOption: SortOption.DESC,
}

type ActionParameter =
  | {
      type: 'SET_SERIES'
      payload: string
    }
  | {
      type: 'SET_SORT_OPTION'
      payload: SortOption
    }
  | {
      type: 'RESET_SERIES'
    }

const FilterContext = createContext<{
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
        ...state,
        selectedSeries: action.payload,
      }
    case 'RESET_SERIES':
      return {
        ...state,
        selectedSeries: null,
      }
    case 'SET_SORT_OPTION':
      return {
        ...state,
        sortOption: action.payload,
      }
    default:
      return state
  }
}

export const FilterContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <FilterContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
