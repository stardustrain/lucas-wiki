const React = require('react')
const { ColorSchemeProvider } = require('./src/contexts/ColorSchemeContext')
const { SelectedTagProvider } = require('./src/contexts/SelectedTagContext')
const { FilterContextProvider } = require('./src/contexts/FilterContext')

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
        "use strict";!function(){if(window.localStorage){var e=window.localStorage.getItem("theme");if("light"===e||"dark"===e)return void(document.body.dataset.theme=e)}if(window.matchMedia){var t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(window.localStorage)return window.localStorage.setItem("theme",t),void(document.body.dataset.theme=t)}document.body.dataset.theme="light"}();
        `,
      }}
    />,
  ])
}

export const wrapRootElement = ({ element }) => (
  <ColorSchemeProvider>
    <SelectedTagProvider>
      <FilterContextProvider>{element}</FilterContextProvider>
    </SelectedTagProvider>
  </ColorSchemeProvider>
)
