import React from 'react'
import { Link } from 'gatsby'
import { ThemeProvider } from '@emotion/react'

import theme from '../styles/theme'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider theme={theme['light']}>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">
          {isRootPath ? (
            <h1 className="main-heading">
              <Link to="/">{title}</Link>
            </h1>
          ) : (
            <Link className="header-link-home" to="/">
              {title}
            </Link>
          )}
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout
