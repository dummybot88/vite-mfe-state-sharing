import { useQuery } from '@tanstack/react-query'
import useWebAppStore from '../../store/webApp/webAppStore'
import { createWrapper } from '../../jest/jest.setup.unit'
import useWebApp from '../useWebApp'
import { cleanup, renderHook } from '@testing-library/react'
import { act } from 'react'

jest.mock('@tanstack/react-query')
const useQueryMock = useQuery as jest.Mock

describe('hooks/useWebApp', () => {
  const initialWebAppState = useWebAppStore.getState()
  beforeEach(() => {
    useWebAppStore.setState(initialWebAppState)
  })

  afterEach(cleanup)

  it('should fetch issues and set them in the store', () => {
    // Arrange
    const mockData = {
      data: {
        fetchIssues: {
          issues: [
            {
              isbn: '1234567890',
              abstract: 'This is an abstract'
            }
          ]
        }
      }
    }
    useQueryMock.mockReturnValue({ isSuccess: true, data: mockData })

    // Initial state
    expect(useWebAppStore.getState().issues).toEqual([])

    // Act
    act(() => renderHook(() => useWebApp(), { wrapper: createWrapper() }))

    // Assert
    const updatedState = useWebAppStore.getState()
    expect(updatedState.issues).toEqual(mockData.data.fetchIssues.issues)
  })
})
