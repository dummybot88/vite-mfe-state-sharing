import { create } from 'zustand'

interface RemoteCountStore {
  getState: () => { count: number } // Zustand's getState function
  setState: (partial: (state: { count: number }) => { count: number }) => void // Zustand's setState function
  subscribe: (listener: (state: { count: number }) => void) => () => void // Zustand's subscribe function
}

interface DynamicStore {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setStore: (zustandStore: RemoteCountStore) => void // Function to dynamically set remote store
}

export const useDynamicStore = create<DynamicStore>(set => ({
  count: 0,
  increment: () => {}, // Initially empty, will be set later
  decrement: () => {}, // Initially empty, will be set later
  reset: () => {},

  // Function to dynamically update store with remote Zustand store
  setStore: zustandStore => {
    set({
      count: zustandStore.getState().count,
      increment: () => zustandStore.setState(state => ({ count: state.count + 1 })),
      decrement: () => zustandStore.setState(state => ({ count: state.count - 1 })),
      reset: () => zustandStore.setState(() => ({ count: 0 }))
    })

    // ✅ Subscribe to remote store updates and sync state
    zustandStore.subscribe(newState => {
      set({ count: newState.count })
    })
  }
}))
