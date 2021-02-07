import React from 'react'
import { ColorSchemeProvider } from './src/contexts/ColorSchemeContext'
import { SelectedTagContextProvider } from './src/contexts/SelectedTagContext'

export const wrapRootElement = ({ element }) => (
  <ColorSchemeProvider>
    <SelectedTagContextProvider>
      {element}
    </SelectedTagContextProvider>
  </ColorSchemeProvider>
)
