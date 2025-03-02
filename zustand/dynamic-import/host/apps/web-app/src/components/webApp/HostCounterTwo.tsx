/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faRedo } from '@fortawesome/free-solid-svg-icons'
import React, { Suspense, useEffect, useState } from 'react'

const RemoteCounter = React.lazy(() => import('remote/app/Counter'))

/**
 *
 * To access this component, modify the url to /web/host/counter/part2
 *
 * @returns
 *
 */
const HostCounterTwo = () => {
  const [store, setStore] = useState<any>(null)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null // To store unsubscribe function

    import('remote/app/countStore').then(module => {
      const zustandStore = module.default
      setStore(() => zustandStore)

      // ✅ Subscribe to state changes
      unsubscribe = zustandStore.subscribe((newState: any) => {
        console.log('State updated:', newState)
        setCount(newState.count) // Update local state
      })
    })

    // ✅ Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  if (!store) {
    return <p>Loading store...</p>
  }

  return (
    <div className="host-container">
      <header className="host-header">
        <h1>Second Host Counter</h1>
        <div className="host-counter-header">
          <span className="host-counter-value">{count}</span>
          <div className="host-button-container">
            <button className="host-counter-button decrement" onClick={() => store.getState().decrement()}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button className="host-counter-button reset" onClick={() => store.getState().reset()}>
              <FontAwesomeIcon icon={faRedo} />
            </button>
            <button className="host-counter-button increment" onClick={() => store.getState().increment()}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </header>
      <div className="main-content">
        <Suspense fallback={<div>Loading Remote Counter...</div>}>
          <RemoteCounter /> {/* Remote Counter Component */}
        </Suspense>
      </div>
    </div>
  )
}

export default HostCounterTwo
