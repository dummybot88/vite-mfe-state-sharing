import { cleanup, renderHook } from '@testing-library/react'
import useUnauthorisedStore, { toggleUnauthorizedModalVisibility } from '../unauthorisedStore'
import { act } from 'react'

describe('store/unauthorised/unauthorisedStore', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: { current: any }
  beforeEach(() => {
    result = renderHook(() => useUnauthorisedStore()).result
  })
  afterEach(cleanup)
  it('should fetch initial unauthorised state', () => {
    // Assert
    const { toggleUnauthorisedModal } = result.current
    expect(toggleUnauthorisedModal).toBe(false)
  })

  it('should record toggleUnauthorisedModal to desired state', () => {
    expect(result.current.toggleUnauthorisedModal).toBe(false)

    // Act
    act(() => toggleUnauthorizedModalVisibility(true))

    // Assert
    expect(result.current.toggleUnauthorisedModal).toBe(true)
  })
})
