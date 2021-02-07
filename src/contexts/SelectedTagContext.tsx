import { createContext, useContext, useReducer } from 'react'
import type { Dispatch } from 'react'

const defaultTag: { selectedTag: string | null } = {
  selectedTag: null,
}

const SelectedTagContext = createContext<{
  state: typeof defaultTag
  dispatch: Dispatch<{
    type: string
    payload: string | null
  }>
}>({
  state: defaultTag,
  dispatch: () => {},
})

const reducer = (state: typeof defaultTag, action: { type: string; payload: string | null }) => {
  switch (action.type) {
    case 'SET_TAG':
      return {
        selectedTag: action.payload,
      }
    default:
      return state
  }
}

export const SelectedTagContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultTag)

  return (
    <SelectedTagContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectedTagContext.Provider>
  )
}

export const useSelectedTagContext = () => useContext(SelectedTagContext)
