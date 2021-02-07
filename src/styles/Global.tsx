/** @jsx jsx */
import { Global, css, jsx } from '@emotion/react'
import { styleMap } from './theme'
import { rgba } from '../utils/misc'

const globalStyles = (mode: ColorScheme) => css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  html {
    line-height: ${styleMap.lineHeightNormal};
    font-size: ${styleMap.fontSizeRoot};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, Montserrat, system-ui, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', 'Noto Color Emoji';
    background-color: ${mode === 'light' ? '#fff' : '#0d1117'};
  }

  body {
    font-size: ${styleMap.fontSize1};
  }

  footer {
    padding: ${styleMap.spacing6} ${styleMap.spacing0};
  }

  hr {
    height: 1px;
    border: 0;
  }

  /* Heading */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${styleMap.spacing12};
    margin-bottom: ${styleMap.spacing6};
    line-height: ${styleMap.lineHeightTight};
    letter-spacing: -0.025em;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${styleMap.fontWeightBold};
  }

  h1 {
    font-weight: ${styleMap.fontWeightBlack};
    font-size: ${styleMap.fontSize6};
  }

  h2 {
    font-size: ${styleMap.fontSize5};
  }

  h3 {
    font-size: ${styleMap.fontSize4};
  }

  h4 {
    font-size: ${styleMap.fontSize3};
  }

  h5 {
    font-size: ${styleMap.fontSize2};
  }

  h6 {
    font-size: ${styleMap.fontSize1};
  }

  h1 > a {
    color: inherit;
    text-decoration: none;
  }

  h2 > a,
  h3 > a,
  h4 > a,
  h5 > a,
  h6 > a {
    text-decoration: none;
    color: inherit;
  }

  /* Prose */

  p {
    line-height: ${styleMap.lineHeightRelaxed};
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    margin: ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing8} ${styleMap.spacing0};
    margin: ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing8} ${styleMap.spacing0};
    padding: ${styleMap.spacing0};
  }

  ul,
  ol {
    margin-left: ${styleMap.spacing0};
    margin-right: ${styleMap.spacing0};
    padding: ${styleMap.spacing0};
    margin-bottom: ${styleMap.spacing8};
    list-style-position: outside;
    list-style-image: none;
  }

  ul li,
  ol li {
    padding-left: ${styleMap.spacing0};
    margin-bottom: calc(${styleMap.spacing8} / 2);
  }

  li > p {
    margin-bottom: calc(${styleMap.spacing8} / 2);
  }

  li *:last-child {
    margin-bottom: ${styleMap.spacing0};
  }

  li > ul {
    margin-left: ${styleMap.spacing8};
    margin-top: calc(${styleMap.spacing8} / 2);
  }

  blockquote {
    margin-left: calc(-1 * ${styleMap.spacing6});
    margin-right: ${styleMap.spacing8};
    padding: ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing6};
    font-size: ${styleMap.fontSize2};
    font-style: italic;
    margin-bottom: ${styleMap.spacing8};
  }

  blockquote > :last-child {
    margin-bottom: ${styleMap.spacing0};
  }

  blockquote > ul,
  blockquote > ol {
    list-style-position: inside;
  }

  table {
    width: 100%;
    margin-bottom: ${styleMap.spacing8};
    border-collapse: collapse;
    border-spacing: 0.25rem;
  }

  /* Link */

  a:hover,
  a:focus {
    text-decoration: none;
  }

  /* Custom classes */

  .global-wrapper {
    margin: ${styleMap.spacing0} auto;
    max-width: ${styleMap.maxWidth2xl}; // --maxWidth2xl
    padding: ${styleMap.spacing10} ${styleMap.spacing5};
  }

  .global-header {
    margin-bottom: ${styleMap.spacing12};
  }

  .main-heading {
    font-size: ${styleMap.fontSize7};
    margin: 0;
  }

  .post-list-item {
    margin-bottom: ${styleMap.spacing8};
    margin-top: ${styleMap.spacing8};
  }

  .post-list-item p {
    margin-bottom: ${styleMap.spacing0};
  }

  .post-list-item h2 {
    font-size: ${styleMap.fontSize4};
    margin-top: ${styleMap.spacing0};
  }

  .post-list-item header {
    margin-bottom: ${styleMap.spacing4};
  }

  .header-link-home {
    font-weight: ${styleMap.fontWeightBold};
    text-decoration: none;
    font-size: ${styleMap.fontSize2};
  }

  .blog-post header h1 {
    margin: ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing4} ${styleMap.spacing0};
  }

  .blog-post header p {
    font-size: ${styleMap.fontSize2};
  }

  .blog-post-nav ul {
    margin: ${styleMap.spacing0};
  }

  .gatsby-highlight {
    margin-bottom: ${styleMap.spacing8};
  }

  /* Media queries */

  @media (max-width: 42rem) {
    blockquote {
      padding: ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing4};
      margin-left: ${styleMap.spacing0};
    }
    ul,
    ol {
      list-style-position: inside;
    }
  }

  /* Custom added */
  /* Prism */
  /* Adjust the position of the line numbers */
  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding-left: 2.8em;
  }

  /**
 * If you only want to use line numbering
 */

  .gatsby-highlight {
    background-color: #1e1e1e;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding: 0;
    padding-left: 2.8em;
  }

  .token.operator {
    background: none;
  }

  .screen-reader-only {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  h2 > a,
  h3 > a {
    margin-right: 2px;
  }

  h2 > a > svg,
  h3 > a > svg {
    transform: translateY(-2px);
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.1em 0.3em;
    border-radius: 0.3em;
    color: ${mode === 'light' ? '#db4c69' : '#ffa44f'};
    background: ${mode === 'light' ? '#f9f2f4' : '#3d3b3b'};
  }

  center {
    margin: ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing3} ${styleMap.spacing0};
  }

  /* Custom block */
  .custom-block {
    padding: ${styleMap.spacing3};
    margin: ${styleMap.spacing0} ${styleMap.spacing0} ${styleMap.spacing8} ${styleMap.spacing0};

    p {
      margin: ${styleMap.spacing0};
    }

    .custom-block-heading {
      font-weight: bold;
      margin-bottom: ${styleMap.spacing2};
    }
  }

  .custom-block.tip {
    background-color: ${mode === 'light' ? '#f3f5f7' : rgba('#f3f5f7', 0.1)};
    border-top: 3px solid #3eaf7c;
  }

  .custom-block.warning {
    background-color: ${mode === 'light' ? rgba('#ffe564', 0.3) : rgba('#ffe564', 0.1)};
    border-top: 3px solid ${rgba('#e7c000', 0.6)};
    color: ${mode === 'light' ? '#6b5900' : '#c4a404'};
  }

  .custom-block.danger {
    background-color: ${mode === 'light' ? '#ffe6e6' : rgba('#9c7c7c', 0.5)};
    border-top: 3px solid ${rgba('#cc0000', 0.6)};
    color: ${mode === 'light' ? '#4d0000' : '#ff7e70'};
  }
`

export type ColorScheme = 'light' | 'dark'

type Props = {
  mode: ColorScheme
}

export default function GlobalStyle({ mode }: Props) {
  return <Global styles={globalStyles(mode)} />
}
