import { create } from 'zustand'

const useUnauthorisedStore = create(() => ({
  toggleUnauthorisedModal: false
}))

export const toggleUnauthorizedModalVisibility = (value: boolean) =>
  useUnauthorisedStore.setState({ toggleUnauthorisedModal: value })

export default useUnauthorisedStore
