import { decrement, increment, reset, useCount } from '../../store/count/countStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faRedo } from '@fortawesome/free-solid-svg-icons'

const Counter = () => {
  const count = useCount()

  return (
    <div className="main-container">
      <div className="counter-container">
        <h1 className="counter-title">Counter</h1>
        <div className="counter-display">
          <span className="counter-value">{count}</span>
        </div>
        <div className="button-container">
          <button className="counter-button decrement" onClick={() => decrement()}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button className="counter-button reset" onClick={() => reset()}>
            <FontAwesomeIcon icon={faRedo} />
          </button>
          <button className="counter-button increment" onClick={() => increment()}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Counter
