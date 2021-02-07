import { rgba } from '../utils/misc'

export const styleMap = {
  maxWidthNone: 'none',
  maxWidthXs: '20rem',
  maxWidthSm: '24rem',
  maxWidthMd: '28rem',
  maxWidthLg: '32rem',
  maxWidthXl: '36rem',
  maxWidth2xl: '42rem',
  maxWidth3xl: '48rem',
  maxWidth4xl: '56rem',
  maxWidthFull: '100%',
  spacingPx: '1px',
  spacing0: 0,
  spacing1: '0.25rem',
  spacing2: '0.5rem',
  spacing3: '0.75rem',
  spacing4: '1rem',
  spacing5: '1.25rem',
  spacing6: '1.5rem',
  spacing8: '2rem',
  spacing10: '2.5rem',
  spacing12: '3rem',
  spacing16: '4rem',
  spacing20: '5rem',
  spacing24: '6rem',
  spacing32: '8rem',
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,
  fontWeightExtrabold: 800,
  fontWeightBlack: 900,
  fontSizeRoot: '16px',
  lineHeightNone: 1,
  lineHeightTight: 1.1,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.625,
  /* 1.200 Minor Third Type Scale */
  fontSize0: '0.833rem',
  fontSize1: '1rem',
  fontSize2: '1.2rem',
  fontSize3: '1.44rem',
  fontSize4: '1.728rem',
  fontSize5: '2.074rem',
  fontSize6: '2.488rem',
  fontSize7: '2.986rem',
}

export const lightColor = {
  textPrimary: '#24292e',
  textSecondary: '#586069',
  textTertiary: '#6a737d',
  pirmaryGreen: '#3eaf7c',
  textLink: '#036ffc',
  colorPrimary: '#005b99',
  colorText: '#2e353f',
  colorTextLight: '#4f5969',
  colorHeading: '#1a202c',
  colorAccent: '#d1dce5',
  background: '#ffffff',
  tagSelector: {
    background: '#f4f7f8',
    border: '#ecf0f2',
    boxShadow: '#d9d9d9',
  },
  customBlock: {
    tip: {
      backgroundColor: '#f3f5f7',
      borderTop: '#3eaf7c',
    },
    warning: {
      backgroundColor: rgba('#ffe564', 0.3),
      borderTop: rgba('#e7c000', 0.6),
      color: '#6b5900',
    },
    danger: {
      backgroundColor: rgba('#9c7c7c', 0.5),
      borderTop: rgba('#cc0000', 0.6),
      color: '#ff7e70',
    },
  },
}

export const darkColor = {
  textPrimary: '#c9d1d9',
  textSecondary: '#8b949e',
  textTertiary: '#8b949e',
  pirmaryGreen: '#3eaf7c',
  textLink: '#0d85d6',
  colorPrimary: '#004675',
  colorText: '#8b949e',
  colorTextLight: '#4f5969',
  colorHeading: '#1a202c',
  colorAccent: '#747b80',
  background: '#0d1117',
  tagSelector: {
    background: '#232e40',
    border: '#3f5373',
    boxShadow: '#536d96',
  },
  customBlock: {
    tip: {
      backgroundColor: rgba('#f3f5f7', 0.1),
      borderTop: '#3eaf7c',
    },
    warning: {
      backgroundColor: rgba('#ffe564', 0.1),
      borderTop: rgba('#e7c000', 0.6),
      color: '#c4a404',
    },
    danger: {
      backgroundColor: rgba('#9c7c7c', 0.5),
      borderTop: rgba('#cc0000', 0.6),
      color: '#ff7e70',
    },
  },
}

export default {
  light: Object.assign({ color: lightColor }, styleMap),
  dark: Object.assign({ color: darkColor }, styleMap),
}
