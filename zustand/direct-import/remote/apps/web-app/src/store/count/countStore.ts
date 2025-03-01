import { create } from 'zustand'
import { CountState, initialState } from './types'

// Modify the existing store definition to cater the state sharing along with actions
const useCountStore = create<CountState>(() => ({
  ...initialState,
  increment: () => increment(),
  decrement: () => decrement(),
  reset: () => reset()
}))

export const increment = () => useCountStore.setState(state => ({ count: state.count + 1 }))

export const decrement = () => useCountStore.setState(state => ({ count: state.count - 1 }))

export const reset = () => useCountStore.setState({ count: 0 })

export const useCount = () => useCountStore(state => state.count)

export default useCountStore
