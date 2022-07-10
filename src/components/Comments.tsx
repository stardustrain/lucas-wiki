import React, { useEffect, useRef } from 'react'
import { isNil } from 'lodash'

import { useColorScheme } from '../contexts/ColorSchemeContext'

const createScriptTag = (themeMode: ReturnType<typeof useColorScheme>['themeMode']) => {
  const $script = document.createElement('script')
  $script.defer = true
  const options = {
    src: 'https://utteranc.es/client.js',
    repo: 'stardustrain/lucas-wiki',
    'issue-term': 'og:title',
    theme: themeMode === 'light' ? 'github-light' : 'github-dark',
    crossorigin: 'anonymous',
  }
  Object.entries(options).forEach(([key, value]) => $script.setAttribute(key, value))

  return $script
}

export default function Comments() {
  const divRef = useRef<HTMLDivElement>(null)
  const { themeMode } = useColorScheme()

  useEffect(() => {
    if (isNil(divRef.current) || isNil(themeMode)) {
      return
    }

    const $script = createScriptTag(themeMode)
    const $commentsNode = divRef.current.firstChild

    if (!isNil($commentsNode)) {
      divRef.current.removeChild($commentsNode)
    }

    divRef.current.appendChild($script)
  }, [themeMode])

  return <div ref={divRef}></div>
}
