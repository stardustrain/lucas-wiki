import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    color: {
      h2: string
      description: string
      link: string
      icon: string
    }
  }
}
