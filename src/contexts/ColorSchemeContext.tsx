import { createContext, useContext, useReducer } from 'react'
import type { Dispatch } from 'react'
import type { ColorScheme } from '../styles/Global'

const defaultColorScheme: { mode: ColorScheme } = {
  mode: 'light',
}

const ActionTypes = {
  light: 'light',
  dark: 'dark',
}

const ColorSchemeContext = createContext<{
  state: { mode: ColorScheme }
  dispatch: Dispatch<{
    type: ColorScheme
  }>
}>({
  state: defaultColorScheme,
  dispatch: () => {},
})

const colorSchemeReducer = (state: typeof defaultColorScheme, action: { type: string }) => {
  console.log('test')
  switch (action.type) {
    case ActionTypes.dark:
      console.log('test')
      return { mode: 'dark' as ColorScheme }
    case ActionTypes.light:
      return { mode: 'light' as ColorScheme }
    default:
      return state
  }
}

export const ColorSchemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(colorSchemeReducer, defaultColorScheme)

  return (
    <ColorSchemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

export const useColorScheme = () => useContext(ColorSchemeContext)
