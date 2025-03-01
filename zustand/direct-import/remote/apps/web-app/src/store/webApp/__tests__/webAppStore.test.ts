import { cleanup, renderHook } from '@testing-library/react'
import useWebAppStore, { setIssues } from '../webAppStore'
import { act } from 'react'
describe('store/webApp/webAppStore', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: { current: any }
  beforeEach(() => {
    result = renderHook(() => useWebAppStore()).result
  })
  afterEach(cleanup)

  it('should fetch initial webapp state', () => {
    // Assert
    expect(result.current).toMatchSnapshot()
  })

  it('should update the store with the issues for the webapp.', () => {
    expect(result.current.issues).toEqual([])

    // Act
    act(() =>
      setIssues([
        {
          isbn: '1234567890',
          abstract: 'This is an abstract'
        }
      ])
    )

    // Assert
    expect(result.current.issues).toEqual([
      {
        isbn: '1234567890',
        abstract: 'This is an abstract'
      }
    ])
  })
})
