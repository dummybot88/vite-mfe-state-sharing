import { renderHook, cleanup } from '@testing-library/react'
import { useSecureStates } from '../useSecureStates'
import { createWrapper } from '../../jest/jest.setup.unit'
import { SecureStates } from '../../constants'
import { fakeStoreInvalidJwtToken, fakeStoreJwtToken } from '../../mock/jwtFaker'

describe('hooks/useSecureStates', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  afterEach(cleanup)
  it('should set secure state as AUTHENTICATED', async () => {
    // Arrange
    fakeStoreJwtToken()

    // Act
    const { result } = renderHook(() => useSecureStates(), { wrapper: createWrapper() })

    // Assert
    expect(result.current.secureState).toBe(SecureStates.AUTHENTICATED)
    expect(result.current.working).toBe(false)
  })

  it('should set secure state as UNAUTHORISED', async () => {
    // Arrange
    fakeStoreInvalidJwtToken()

    // Act
    const { result } = renderHook(() => useSecureStates(), { wrapper: createWrapper() })

    // Assert
    expect(result.current.secureState).toBe(SecureStates.UNAUTHORISED)
    expect(result.current.working).toBe(false)
  })
})
