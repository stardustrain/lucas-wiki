import { createContext, SetStateAction, useContext, useEffect, useState } from 'react'
import { isCorrectTheme } from '../styles/theme'

import type { Dispatch } from 'react'
import type { ThemeMode } from '../styles/theme'

const ColorSchemeContext = createContext<{
  themeMode: null
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>
}>({
  themeMode: null,
  setThemeMode: () => {},
})

export const ColorSchemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(null)

  useEffect(() => {
    const currentTheme = document.body.dataset.theme
    if (isCorrectTheme(currentTheme)) {
      setThemeMode(currentTheme)
    }
  }, [])

  return (
    <ColorSchemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

export const useColorScheme = () => useContext(ColorSchemeContext)
