import { create } from 'zustand'
import { Issue, WebAppState, initialState } from './types'

const useWebAppStore = create<WebAppState>(() => ({
  ...initialState
}))

export const setIssues = (issues: Issue[]) => useWebAppStore.setState({ issues })

export const useIssuesData = () => useWebAppStore(state => state.issues)

export default useWebAppStore
