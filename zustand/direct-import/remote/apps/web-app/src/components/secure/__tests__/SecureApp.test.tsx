import { render } from '@testing-library/react'
import { SecureApp } from '../SecureApp'
import { fakeStoreInvalidJwtToken, fakeStoreJwtToken } from '../../../mock/jwtFaker'
import { SecureStates } from '../../../constants'

describe('components/secure/SecureApp', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should inject an authenticated state into the render prop function if the ppe jwt stored is valid', async () => {
    // Arrange
    fakeStoreJwtToken()

    const renderPropMock = jest.fn()
    renderPropMock.mockReturnValueOnce(null)

    // Act
    render(<SecureApp>{renderPropMock}</SecureApp>)

    // Assert
    expect(renderPropMock).toHaveBeenCalledWith({
      secureState: SecureStates.AUTHENTICATED
    })
  })

  it('should inject an unauthorised state into the render prop function and not store the new ppeJwt if the ppeJwt does hold the correct role', async () => {
    // Arrange
    fakeStoreInvalidJwtToken()

    const renderPropMock = jest.fn()
    renderPropMock.mockReturnValueOnce(null)

    // Act
    render(<SecureApp>{renderPropMock}</SecureApp>)

    // Assert
    expect(renderPropMock).toHaveBeenCalledWith({
      secureState: SecureStates.UNAUTHORISED
    })
  })
})
