export type AppError = {
  message: string
  code?: number
  details?: unknown
}

// Predefined error messages
export const ErrorMessages = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  INVALID_INPUT: 'Invalid input data',
  LEAD_CREATE_FAILED: 'Failed to create lead'
} as const