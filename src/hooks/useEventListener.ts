import { useEffect } from 'react'

type Params = {
  type: Event['type']
  callback: EventListenerOrEventListenerObject
}[]

const useEventListener = (
  events: Params,
  target?: Document | Element,
  dependencies: any[] = []
) => {
  useEffect(() => {
    if (!target) {
      return
    }
    const eventBindingTarget = target ?? document

    events.forEach(({ type, callback }) => {
      eventBindingTarget.addEventListener(type, callback)
    })
    return () => {
      events.forEach(({ type, callback }) => {
        eventBindingTarget.removeEventListener(type, callback)
      })
    }
  }, [target, ...dependencies])
}

export default useEventListener
