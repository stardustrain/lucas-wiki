import React from 'react'
import { ColorSchemeProvider } from './src/contexts/ColorSchemeContext'
import { SelectedTagProvider } from './src/contexts/SelectedTagContext'

// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import smoothscroll from 'smoothscroll-polyfill'
// custom CSS styles
import './src/styles/prism-vsc-dark-plus.css'

// Highlighting for code blocks
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
smoothscroll.polyfill()

export const wrapRootElement = ({ element }) => (
  <ColorSchemeProvider>
    <SelectedTagProvider>{element}</SelectedTagProvider>
  </ColorSchemeProvider>
)
