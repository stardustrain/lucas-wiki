import React from 'react'
import { ColorSchemeProvider } from './src/contexts/ColorSchemeContext'
import { SelectedTagProvider } from './src/contexts/SelectedTagContext'

export const wrapRootElement = ({ element }) => (
  <ColorSchemeProvider>
    <SelectedTagProvider>{element}</SelectedTagProvider>
  </ColorSchemeProvider>
)
