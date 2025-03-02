import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faRedo } from '@fortawesome/free-solid-svg-icons'
import React, { Suspense, useEffect } from 'react'
import { useDynamicStore } from '../../store/remote/dynamic/dynamicStore'

const RemoteCounter = React.lazy(() => import('remote/app/Counter'))
const HostCounter = () => {
  const { count, increment, decrement, reset, setStore } = useDynamicStore()

  useEffect(() => {
    import('remote/app/countStore').then(module => {
      const zustandStore = module.default
      setStore(zustandStore)
    })
  }, [setStore])

  return (
    <div className="host-container">
      <header className="host-header">
        <h1>Host Counter</h1>
        <div className="host-counter-header">
          <span className="host-counter-value">{count}</span>
          <div className="host-button-container">
            <button className="host-counter-button decrement" onClick={decrement}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button className="host-counter-button reset" onClick={reset}>
              <FontAwesomeIcon icon={faRedo} />
            </button>
            <button className="host-counter-button increment" onClick={increment}>
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

export default HostCounter
