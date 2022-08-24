import Typography from 'typography'
import type {TypographyOptions} from 'typography'
import GithubTheme from 'typography-theme-github'

(GithubTheme as TypographyOptions).overrideStyles = (_, options) => ({
  h1: {
    borderBottom: '0',
  }
})

const typography = new Typography(GithubTheme)
export const { scale, rhythm, options } = typography

export default typography
