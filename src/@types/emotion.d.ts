import '@emotion/react'
import { styleMap, color } from '../styles/theme'

type StyleMap = typeof styleMap
type Color = typeof color
declare module '@emotion/react' {
  export interface Theme extends StyleMap {
    color: Color
  }
}
