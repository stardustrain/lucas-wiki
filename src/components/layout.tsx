/** @jsx jsx */
import { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { ThemeProvider, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Switch from 'react-switch'
import { includes } from 'lodash'

import { ColorSchemeProvider, useColorScheme } from '../contexts/ColorSchemeContext'

import Global, { ColorScheme } from '../styles/Global'
import Normalize from '../styles/Normalize'
import Icon from './Icon'

import theme from '../styles/theme'

const GlobalWrapper = styled.div`
  color: ${({ theme }) => theme.color.colorText};

  hr {
    background: ${({ theme }) => theme.color.colorAccent};
  }

  h1 {
    color: ${({ theme }) => theme.color.textPrimary};
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

  transition: color 0.5s, background-color 1s;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

type StyledIconProps = Parameters<typeof Icon>[number] & { left?: boolean }
const StyledIcon = styled(Icon)<StyledIconProps>`
  ${({ left }) => (left ? 'left: 2px;' : 'right: 4px;')};
`

const StyledSwitch = styled(Switch)`
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`

const getColorScheme = () => {
  const scheme = localStorage.getItem('colorScheme')
  if (includes(['light', 'dark'], scheme)) {
    return scheme as ColorScheme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const Layout = ({ location, title, children }) => {
  const {
    state: { mode },
    dispatch,
  } = useColorScheme()
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  useEffect(() => {
    const scheme = getColorScheme()
    dispatch({
      type: scheme,
    })
    localStorage.setItem('colorScheme', scheme)
  }, [])

  return (
    <ColorSchemeProvider>
      <ThemeProvider theme={theme[mode]}>
        <Normalize />
        <Global mode={mode} />
        <GlobalWrapper className="global-wrapper" data-is-root-path={isRootPath}>
          <Header className="global-header">
            {isRootPath ? (
              <h1 className="main-heading">
                <Link to="/">{title}</Link>
              </h1>
            ) : (
              <Link className="header-link-home" to="/">
                {title}
              </Link>
            )}
            <label>
              <span className="screen-reader-only">Switch with toggle darkmode</span>
              <StyledSwitch
                onChange={() => {
                  const currentMode = mode === 'light' ? 'dark' : 'light'
                  dispatch({
                    type: currentMode,
                  })
                  localStorage.setItem('colorScheme', currentMode)
                }}
                checked={mode === 'light'}
                checkedIcon={<StyledIcon size={22} name="Sun" ariaHidden={false} left />}
                uncheckedIcon={<StyledIcon size={20} name="Moon" ariaHidden={false} />}
                onColor="#0f1114"
                offColor="#6a737d"
                height={25}
              />
            </label>
          </Header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </GlobalWrapper>
      </ThemeProvider>
    </ColorSchemeProvider>
  )
}

export default Layout
