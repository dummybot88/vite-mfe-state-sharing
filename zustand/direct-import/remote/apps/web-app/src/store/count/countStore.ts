import { create } from 'zustand'
import { CountState, initialState } from './types'

// Modify the existing store definition to cater the state sharing along with actions
const useCountStore = create<CountState>(() => ({
  ...initialState
}))

// Traditional Way of defining a Zustand store
// Actions are part of the Zustand store itself, and Zustand properly tracks reactivity when using Vite Module Federation
// const useCountStore = create<CountState>(set => ({
//   count: 0,
//   increment: () => set(state => ({ count: state.count + 1 })),
//   decrement: () => set(state => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 })
// }))

// const useCountStore = create<CountState>(() => ({
//   ...initialState
// }))

export const increment = () => useCountStore.setState(state => ({ count: state.count + 1 }))

export const decrement = () => useCountStore.setState(state => ({ count: state.count - 1 }))

export const reset = () => useCountStore.setState({ count: 0 })

export const useCount = () => useCountStore(state => state.count)

export default useCountStore
