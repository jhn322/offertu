// Function to validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Regular expression for email validation
  return emailRegex.test(email) // Test the email against the regex
}

// Function to validate phone number format
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9]+$/ // Regular expression for phone number validation
  return phoneRegex.test(phone) // Test the phone number against the regex
}