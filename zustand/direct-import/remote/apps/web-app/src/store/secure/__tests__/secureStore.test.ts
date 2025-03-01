import { cleanup, renderHook } from '@testing-library/react'
import useSecureStore, { setSecureState, toggleWorking } from '../secureStore'
import { SecureStates } from '../../../constants'
import { act } from 'react'

describe('store/secure/secureStore', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: { current: any }
  beforeEach(() => {
    result = renderHook(() => useSecureStore()).result
  })
  afterEach(cleanup)
  it('should fetch initial secure state', () => {
    // Assert
    const { secureState, working } = result.current

    expect(secureState).toBe(null)
    expect(working).toBe(true)
  })

  it('should record secureState to desired state', () => {
    expect(result.current.secureState).toBe(null)

    // Act
    act(() => setSecureState(SecureStates.AUTHENTICATED))

    // Assert
    expect(result.current.secureState).toBe(SecureStates.AUTHENTICATED)
  })

  it('should set working data', () => {
    expect(result.current.working).toBe(true)

    // Act
    act(() => toggleWorking(false))

    // Assert
    expect(result.current.working).toBe(false)
  })
})
