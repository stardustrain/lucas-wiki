import { includes } from 'lodash'

const themeMode = ['dark', 'light'] as const
export type ThemeMode = typeof themeMode[number]
export const isCorrectTheme = (themeExpected?: string): themeExpected is ThemeMode =>
  includes(themeMode, themeExpected)

export const styleMap = {
  maxWidthNone: 'var(--maxWidthNone)',
  maxWidthXs: 'var(--maxWidthXs)',
  maxWidthSm: 'var(--maxWidthSm)',
  maxWidthMd: 'var(--maxWidthMd)',
  maxWidthLg: 'var(--maxWidthLg)',
  maxWidthXl: 'var(--maxWidthXl)',
  maxWidth2xl: 'var(--maxWidth2xl)',
  maxWidth3xl: 'var(--maxWidth3xl)',
  maxWidth4xl: 'var(--maxWidth4xl)',
  maxWidthFull: 'var(--maxWidthFull)',
  spacingPx: 'var(--spacingPx)',
  spacing0: 'var(--spacing0)',
  spacing1: 'var(--spacing1)',
  spacing2: 'var(--spacing2)',
  spacing3: 'var(--spacing3)',
  spacing4: 'var(--spacing4)',
  spacing5: 'var(--spacing5)',
  spacing6: 'var(--spacing6)',
  spacing8: 'var(--spacing8)',
  spacing10: 'var(--spacing10)',
  spacing12: 'var(--spacing12)',
  spacing16: 'var(--spacing16)',
  spacing20: 'var(--spacing20)',
  spacing24: 'var(--spacing24)',
  spacing32: 'var(--spacing32)',
  fontWeightNormal: 'var(--fontWeightNormal)',
  fontWeightMedium: 'var(--fontWeightMedium)',
  fontWeightSemibold: 'var(--fontWeightSemibold)',
  fontWeightBold: 'var(--fontWeightBold)',
  fontWeightExtrabold: 'var(--fontWeightExtrabold)',
  fontWeightBlack: 'var(--fontWeightBlack)',
  fontSizeRoot: 'var(--fontSizeRoot)',
  lineHeightNone: 'var(--lineHeightNone)',
  lineHeightTight: 'var(--lineHeightTight)',
  lineHeightNormal: 'var(--lineHeightNormal)',
  lineHeightRelaxed: 'var(--lineHeightRelaxed)',
  /* 1.200 Minor Third Type Scale */
  fontSize0: 'var(--fontSize0)',
  fontSize1: 'var(--fontSize1)',
  fontSize2: 'var(--fontSize2)',
  fontSize3: 'var(--fontSize3)',
  fontSize4: 'var(--fontSize4)',
  fontSize5: 'var(--fontSize5)',
  fontSize6: 'var(--fontSize6)',
  fontSize7: 'var(--fontSize7)',
}

export const color = {
  textPrimary: 'var(--textPrimary)',
  textSecondary: 'var(--textSecondary)',
  textTertiary: 'var(--textTertiary)',
  pirmaryGreen: 'var(--pirmaryGreen)',
  textLink: 'var(--textLink)',
  colorPrimary: 'var(--colorPrimary)',
  colorText: 'var(--colorText)',
  colorTextLight: 'var(--colorTextLight)',
  colorHeading: 'var(--colorHeading)',
  colorAccent: 'var(--colorAccent)',
  background: 'var(--background)',
  button: {
    background: 'var(--button-background)',
    hover: 'var(--button-background-hover)',
    active: 'var(--button-background-active)',
    border: 'var(--button-border)',
    boxShadow: 'var(--button-boxShadow)',
  },
  customBlock: {
    tip: {
      backgroundColor: 'var(--customBlock-tip-backgroundColor)',
      borderTop: 'var(--customBlock-tip-borderTop)',
    },
    warning: {
      backgroundColor: 'var(--customBlock-warning-backgroundColor)',
      borderTop: 'var(--customBlock-warning-borderTop)',
      color: 'var(--customBlock-warning-color)',
    },
    danger: {
      backgroundColor: 'var(--customBlock-danger-backgroundColor)',
      borderTop: 'var(--customBlock-danger-borderTop)',
      color: 'var(--customBlock-danger-color)',
    },
  },
}

export default {
  ...styleMap,
  color,
}
