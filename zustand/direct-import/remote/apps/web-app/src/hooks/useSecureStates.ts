/* eslint-disable react-hooks/exhaustive-deps */
import { SecureStates } from '../constants'
import { validateRoles } from '../utils/jwtValidator'
import useSecureStore, { setSecureState, toggleWorking } from '../store/secure/secureStore'
import { useEffect } from 'react'
import { toggleUnauthorizedModalVisibility } from '../store/unauthorised/unauthorisedStore'

/**
 * Validates the token data and sets the secure state based on the authorization status.
 *
 * @param token - The token data received from the session.
 */
const validateTokenAndSetSecureState = (token: string) => {
  const authorised = validateRoles(token)
  setSecureState(authorised ? SecureStates.AUTHENTICATED : SecureStates.UNAUTHORISED)
  toggleUnauthorizedModalVisibility(!authorised)
  toggleWorking(false)
}

/**
 * useSecureStates Hook
 *
 * @description
 * A custom hook that manages the secure states of the application.
 * It handles token validation, setting secure state, and updating the working state.
 *
 * @returns {Object} An object containing the working state and secure state.
 */
export const useSecureStates = () => {
  const { working, secureState } = useSecureStore()

  /** Get the PPE JWT token from local storage */
  const ppeJwt: string = localStorage.getItem('ppeJwt')!

  const updateSecureState = (isCancelled: boolean) => {
    if (!isCancelled) {
      validateTokenAndSetSecureState(ppeJwt)
    }
  }

  useEffect(() => {
    let isCancelled = false
    updateSecureState(isCancelled)
    // Clean up function to avoid race conditions
    return () => {
      isCancelled = true
    }
  }, [ppeJwt])
  return { working, secureState }
}
