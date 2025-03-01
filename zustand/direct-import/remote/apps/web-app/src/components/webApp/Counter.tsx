import { decrement, increment, reset, useCount } from '../../store/count/countStore'

const Counter = () => {
  const count = useCount()

  return (
    <div className="counter-container">
      <h1 className="counter-title">Counter</h1>
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      <div className="button-container">
        <button className="counter-button decrement" onClick={() => decrement()}>
          Minus
        </button>
        <button className="counter-button reset" onClick={() => reset()}>
          Reset
        </button>
        <button className="counter-button increment" onClick={() => increment()}>
          Plus
        </button>
      </div>
    </div>
  )
}

export default Counter
