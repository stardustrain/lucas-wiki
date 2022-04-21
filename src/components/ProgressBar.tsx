import React, { useRef } from 'react'
import { isNil, floor } from 'lodash'
import styled from '@emotion/styled'

import useEventListener from '../hooks/useEventListener'

import type { RefObject } from 'react'

const throttleByRAF = <CallbackParam extends unknown[], CallbackReturn>(
  callback: (...args: CallbackParam) => CallbackReturn
) => {
  let ticking = false

  return (...args: CallbackParam) => {
    if (ticking) {
      return
    }

    ticking = true

    requestAnimationFrame(() => {
      ticking = false
      return callback(...args)
    })
  }
}

const getTotalHeight = () => document?.documentElement.scrollHeight

const getScreenHeight = () =>
  Math.max(document?.documentElement.clientHeight, window.innerHeight, 0)

const getScrolledHeight = () => Math.max(document?.documentElement.scrollTop, window.scrollY, 0)

const getProgressBarWithRAF = throttleByRAF(($divRef: RefObject<HTMLDivElement>) => {
  if (!isNil($divRef.current)) {
    const totalHeight = getTotalHeight() - getScreenHeight()
    const scrolledHeight = getScrolledHeight()
    const scrollRatio = floor((scrolledHeight * 100) / totalHeight, 2)
    $divRef.current.style.width = `${scrollRatio}%`
  }
})

const StyledDiv = styled.div`
  position: fixed;
  z-index: 1;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  width: 0;
  height: 3px;
  background-color: ${({ theme }) => theme.color.pirmaryGreen};
  will-change: width;
`

export default function ProgressBar() {
  const $divRef = useRef<HTMLDivElement>(null)

  useEventListener([
    {
      type: 'scroll',
      callback: () => getProgressBarWithRAF($divRef),
    },
  ])

  return <StyledDiv ref={$divRef} className="ProgressBar" />
}
