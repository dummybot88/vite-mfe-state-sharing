import { increment, useCount } from '../../store/count/countStore'

const WebApp = () => {
  const count = useCount()
  return (
    <div data-testid="web-app">
      <p>Count : {count}</p>
      <button type="button" className="c-button-sm c-button--blue" onClick={() => increment()}>
        Increment
      </button>
    </div>
  )
}

export default WebApp
