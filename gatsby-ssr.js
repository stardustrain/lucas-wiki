const React = require('react')
const { ColorSchemeProvider } = require('./src/contexts/ColorSchemeContext')
const { SelectedTagProvider } = require('./src/contexts/SelectedTagContext')

export const wrapRootElement = ({ element }) => (
  <ColorSchemeProvider>
    <SelectedTagProvider>{element}</SelectedTagProvider>
  </ColorSchemeProvider>
)
