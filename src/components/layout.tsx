import React from 'react'
import { Link } from 'gatsby'
import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import Global from '../styles/Global'
import Normalize from '../styles/Normalize'

import theme from '../styles/theme'

const GlobalWrapper = styled.div`
  color: ${({ theme }) => theme.color.colorText};

  hr {
    background: ${({ theme }) => theme.color.colorAccent};
  }

  h1 {
    color: ${({ theme }) => theme.color.colorHeadingBlack};
  }

  h6 {
    color: ${({ theme }) => theme.color.colorHeading};
  }

  blockquote {
    color: ${({ theme }) => theme.color.colorTextLight};
    border-left: ${({ theme }) => `${theme.spacing1} solid ${theme.color.colorPrimary}`};
  }

  table thead tr th {
    border-bottom: 1px solid ${({ theme }) => theme.color.colorAccent};
  }
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider theme={theme['light']}>
      <Normalize />
      <Global />
      <GlobalWrapper className="global-wrapper" data-is-root-path={isRootPath}>
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
      </GlobalWrapper>
    </ThemeProvider>
  )
}

export default Layout
