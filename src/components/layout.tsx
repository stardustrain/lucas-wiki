import { Link } from 'gatsby'
import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import Switch from 'react-switch'

import Icon from './Icon'
import { useColorScheme } from '../contexts/ColorSchemeContext'
import blogTheme from '../styles/theme'

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

const Layout = ({ location, title, children }) => {
  const { themeMode, setThemeMode } = useColorScheme()
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider theme={blogTheme}>
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
          {themeMode && (
            <label>
              <span className="screen-reader-only">Switch with toggle darkmode</span>
              <StyledSwitch
                onChange={() => {
                  const currentMode = document.body.dataset.theme === 'light' ? 'dark' : 'light'
                  document.body.dataset.theme = currentMode
                  localStorage.setItem('theme', currentMode)
                  setThemeMode(currentMode)
                }}
                checked={themeMode === 'light'}
                checkedIcon={<StyledIcon size={22} name="Sun" ariaHidden={false} left />}
                uncheckedIcon={<StyledIcon size={20} name="Moon" ariaHidden={false} />}
                onColor="#0f1114"
                offColor="#6a737d"
                height={25}
              />
            </label>
          )}
        </Header>
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
