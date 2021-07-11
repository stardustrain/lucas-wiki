const React = require('react')
const { ColorSchemeProvider } = require('./src/contexts/ColorSchemeContext')
const { SelectedTagProvider } = require('./src/contexts/SelectedTagContext')
const { SeriesContextProvider } = require('./src/contexts/SeriesContext')

// custom typefaces
require('typeface-montserrat')
require('typeface-merriweather')
const smoothscroll = require('smoothscroll-polyfill')
// custom CSS styles
require('./src/styles/prism-vsc-dark-plus.css')
require('./src/styles/normalize.css')
require('./src/styles/global.css')

// Highlighting for code blocks
require('prismjs/plugins/line-numbers/prism-line-numbers.css')
smoothscroll.polyfill()

export const shouldUpdateScroll = ({ prevRouterProps, routerProps, getSavedScrollPosition }) => {
  if (!prevRouterProps) {
    return true
  }
  return prevRouterProps.location.pathname !== routerProps.location.pathname
}

export const wrapRootElement = ({ element }) => (
  <ColorSchemeProvider>
    <SelectedTagProvider>
      <SeriesContextProvider>{element}</SeriesContextProvider>
    </SelectedTagProvider>
  </ColorSchemeProvider>
)
