import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import useUnauthorisedStore from '../../../store/unauthorised/unauthorisedStore'
import Unauthorised from '../Unauthorised'
import { act } from 'react'

describe('components/unauthorised/Unauthorised', () => {
  const unauthorisedDefaultState = useUnauthorisedStore.getState()
  beforeEach(() => {
    useUnauthorisedStore.setState(unauthorisedDefaultState)
  })

  afterEach(cleanup)

  it('should not display unauthorised modal, if flag is set to false', async () => {
    // Act
    await act(async () => render(<Unauthorised />))

    // Assert
    expect(screen.queryByTestId('modal')).toBeNull()
  })

  it('should display unauthorised modal', async () => {
    // Act
    useUnauthorisedStore.setState({ toggleUnauthorisedModal: true })

    await act(async () => render(<Unauthorised />))

    // Assert
    const heading = screen.getByTestId('modal-container').querySelector('h2')

    const content = screen.getByTestId('modal-container').querySelector('h4')

    const closeModalBtn = screen.getByTestId('modal-close-button')

    // Assert
    expect(heading).toHaveTextContent('Uh-oh! You are not authenticated!')
    expect(content).toHaveTextContent('Please log in to Journals Production Hub.')
    expect(closeModalBtn).toBeVisible()
  })

  it('should close the unauthorised modal, when user clicks on close modal btn', async () => {
    // Act
    useUnauthorisedStore.setState({ toggleUnauthorisedModal: true })

    await act(async () => render(<Unauthorised />))

    // Assert
    const heading = screen.getByTestId('modal-container').querySelector('h2')

    const content = screen.getByTestId('modal-container').querySelector('h4')

    const closeModalBtn = screen.getByTestId('modal-close-button')

    // Assert
    expect(heading).toHaveTextContent('Uh-oh! You are not authenticated!')
    expect(content).toHaveTextContent('Please log in to Journals Production Hub.')
    expect(closeModalBtn).toBeVisible()

    fireEvent.click(closeModalBtn)

    expect(screen.queryByTestId('modal')).toBeNull()
  })
})
