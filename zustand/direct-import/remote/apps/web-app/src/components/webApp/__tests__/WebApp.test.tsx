import { cleanup, render, screen } from '@testing-library/react'
import useWebApp from '../../../hooks/useWebApp'
import useWebAppStore from '../../../store/webApp/webAppStore'
import { act } from 'react'
import WebApp from '../WebApp'

jest.mock('../../../hooks/useWebApp')
const useWebAppMock = useWebApp as jest.Mock
describe('components/webApp/WebApp', () => {
  const initialWebAppState = useWebAppStore.getState()
  beforeEach(() => {
    useWebAppStore.setState(initialWebAppState)
  })

  afterEach(cleanup)

  it('should display the webapp with title and issue table with no data cell', async () => {
    // Arrange
    useWebAppMock.mockReturnValue({ isSuccess: true, data: [] })

    // Act
    act(() => render(<WebApp />))

    // Assert
    expect(screen.getByTestId('webapp-title')).toHaveTextContent('PPE Web App Micro Frontend')
    expect(screen.getByTestId('webapp-issues-title').querySelector('h4')).toHaveTextContent(
      'Issues - Retrieved via BFF Mock GraphQL'
    )
    expect(screen.getByTestId('table')).toBeInTheDocument()

    expect(screen.getByTestId('isbn-semantic-basic-cell-header')).toHaveTextContent('ISBN')
    expect(screen.getByTestId('abstract-semantic-basic-cell-header')).toHaveTextContent('Abstract')

    expect(screen.getByTestId('noDataCell-semantic-basic-cell')).toHaveTextContent('Issues will be displayed here')
  })

  it('should display the webapp with title and issue table with data', async () => {
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
    useWebAppMock.mockReturnValue({ isSuccess: true, data: mockData })
    useWebAppStore.setState({ issues: mockData.data.fetchIssues.issues })

    // Act
    act(() => render(<WebApp />))

    // Assert
    expect(screen.getByTestId('webapp-title')).toHaveTextContent('PPE Web App Micro Frontend')
    expect(screen.getByTestId('webapp-issues-title').querySelector('h4')).toHaveTextContent(
      'Issues - Retrieved via BFF Mock GraphQL'
    )
    expect(screen.getByTestId('table')).toBeInTheDocument()

    expect(screen.getByTestId('isbn-semantic-basic-cell-header')).toHaveTextContent('ISBN')
    expect(screen.getByTestId('abstract-semantic-basic-cell-header')).toHaveTextContent('Abstract')

    expect(screen.getByTestId('isbn-semantic-basic-cell')).toHaveTextContent('1234567890')
    expect(screen.getByTestId('abstract-semantic-basic-cell')).toHaveTextContent('This is an abstract')
  })
})
