import useEventListener from './useEventListener'

import type { RefObject } from 'react'

type Params = {
  wrapperRef: RefObject<HTMLElement>
  onCloseDropdown: () => void
}

const useDropdownEventListener = ({ wrapperRef, onCloseDropdown }: Params) => {
  useEventListener(
    [
      {
        type: 'keyup',
        callback: e => {
          if (e instanceof KeyboardEvent && e.key === 'Escape') {
            onCloseDropdown()
          }
        },
      },
    ],
    document
  )

  useEventListener(
    [
      {
        type: 'keyup',
        callback: e => {
          if (e.currentTarget !== wrapperRef.current) {
            return
          }
          if (e instanceof KeyboardEvent) {
            switch (e.key) {
              case 'Enter':
                break
              case 'ArrowUp':
                break
              case 'ArrowDown':
                break
              case 'Tab':
                break
              case 'Enter':
                break
              case 'Home':
                break
              case 'End':
                break
              default:
                return null
            }
          }
        },
      },
    ],
    wrapperRef.current
  )
}

export default useDropdownEventListener
