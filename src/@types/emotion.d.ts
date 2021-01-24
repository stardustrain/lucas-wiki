import '@emotion/react'
import { styleMap, lightColor } from '../styles/theme'

type StyleMap = typeof styleMap
type Color = typeof lightColor
declare module '@emotion/react' {
  export interface Theme extends StyleMap {
    color: Color
  }
}
