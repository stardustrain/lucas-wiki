import Typography from 'typography'
import GithubTheme from 'typography-theme-github'

GithubTheme.overrideThemeStyles = () => ({
  h1: {
    borderBottom: '0',
  },
})

const typography = new Typography(GithubTheme)
export const { scale, rhythm, options } = typography

export default typography
