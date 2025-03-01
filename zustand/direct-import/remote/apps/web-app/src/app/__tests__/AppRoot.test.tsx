import { cleanup, screen } from '@testing-library/react'
import AppRoot from '../AppRoot'
import { renderWithQueryProvider } from '../../jest/jest.setup.unit'
import { fakeStoreInvalidJwtToken, fakeStoreJwtToken } from '../../mock/jwtFaker'
import { BrowserRouter } from 'react-router-dom'
import useWebApp from '../../hooks/useWebApp'
import useWebAppStore from '../../store/webApp/webAppStore'
import { act } from 'react'

const renderApp = () =>
  renderWithQueryProvider(
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  )

jest.mock('../../hooks/useWebApp')

const useWebAppMock = useWebApp as jest.Mock
describe('app/AppRoot', () => {
  const initialWebAppState = useWebAppStore.getState()

  beforeEach(() => {
    localStorage.clear()
    useWebAppStore.setState(initialWebAppState)
  })
  afterEach(cleanup)

  it('should render webapp screen with title and issue table with no data cell, when the user is authenticated', async () => {
    // Arrange
    fakeStoreJwtToken()
    useWebAppMock.mockReturnValue({ isSuccess: true, data: [] })

    // Act
    await act(async () => renderApp())

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

  it('should render webapp screen with title and issue table with data, when the user is authenticated', async () => {
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
    fakeStoreJwtToken()
    useWebAppMock.mockReturnValue({ isSuccess: true, data: mockData })
    useWebAppStore.setState({ issues: mockData.data.fetchIssues.issues })

    // Act
    await act(async () => renderApp())

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

  it('should render error modal, when the user is not authenticated', async () => {
    // Arrange
    fakeStoreInvalidJwtToken()
    // Act
    await act(async () => renderApp())

    const heading = screen.getByTestId('modal-container').querySelector('h2')

    const content = screen.getByTestId('modal-container').querySelector('h4')

    // Assert
    expect(heading).toHaveTextContent('Uh-oh! You are not authenticated!')
    expect(content).toHaveTextContent('Please log in to Journals Production Hub.')
  })
})
