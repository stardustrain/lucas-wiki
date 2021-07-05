import { useEffect } from 'react'

type Params = {
  type: Event['type']
  callback: EventListenerOrEventListenerObject
}[]

const useEventListener = (
  events: Params,
  target: Document | Element | null,
  dependencies: any[] = []
) => {
  useEffect(() => {
    if (!target) {
      return
    }

    events.forEach(({ type, callback }) => {
      target.addEventListener(type, callback)
    })
    return () => {
      events.forEach(({ type, callback }) => {
        target.removeEventListener(type, callback)
      })
    }
  }, [target, ...dependencies])
}

export default useEventListener
