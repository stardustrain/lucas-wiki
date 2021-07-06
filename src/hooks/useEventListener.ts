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
    const eventBindingTarget = target ?? document.body

    events.forEach(({ type, callback }) => {
      eventBindingTarget.addEventListener(type, callback)
    })
    return () => {
      events.forEach(({ type, callback }) => {
        eventBindingTarget.removeEventListener(type, callback)
      })
    }
  }, [...dependencies])
}

export default useEventListener
