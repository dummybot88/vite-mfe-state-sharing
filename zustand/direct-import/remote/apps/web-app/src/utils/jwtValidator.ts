/**
 * This module provides utility functions related to JWT tokens and timers.
 */

import { jwtDecode, JwtPayload } from 'jwt-decode'
import { config } from '@repo/app-config'

/**
 * Interface representing the payload of a JWT token.
 */
interface TokenPayload extends JwtPayload {
  roles: string[] | []
  featureToggle: string[] | []
}

export const validateRoles = (token: string) => {
  if (!token) {
    return false
  }
  // Decode the JWT token
  const decodeJwt = jwtDecode<TokenPayload>(token)

  // Check if the user is authorized based on the roles in the token
  return decodeJwt.roles.some(role => config.auth.authorisedRoles.includes(role))
}
