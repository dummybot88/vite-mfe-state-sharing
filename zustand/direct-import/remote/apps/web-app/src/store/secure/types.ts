/**
 * Represents the state of a secure system.
 */
export interface SecureState {
  working: boolean // Indicates whether the system is currently working.
  secureState: string // The secure state of the system.
}

/**
 * The initial state of the secure system.
 */
export const initialState: SecureState = {
  working: true,
  secureState: null!
}
