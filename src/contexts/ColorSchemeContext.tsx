import React from 'react'
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react'
import { isCorrectTheme } from '../styles/theme'

import type { Dispatch, FC } from 'react'
import type { ThemeMode } from '../styles/theme'

type Theme = ThemeMode | null
const ColorSchemeContext = createContext<{
  themeMode: Theme
  setThemeMode: Dispatch<SetStateAction<Theme>>
}>({
  themeMode: null,
  setThemeMode: () => {},
})

export const ColorSchemeProvider: FC = ({ children }) => {
  const [themeMode, setThemeMode] = useState<Theme>(null)

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
