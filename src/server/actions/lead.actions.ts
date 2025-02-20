// Import the database operation function
import { createLeadInDb } from '../data/lead.data';
import { CreateLeadInput, ApiResponse, LeadResponse } from '@/types';
import { ErrorMessages } from '@/lib/errors/app.errors';
// import { validateEmail, validatePhone } from '@/lib/validations/lead.validation'

// Business logic function to handle lead creation
// Includes error handling and success/failure responses
export async function createLead(
  data: CreateLeadInput
): Promise<ApiResponse<LeadResponse>> {
  try {
    // // Validate email first
    // if (!validateEmail(data.email)) {
    //   return { success: false, error: ErrorMessages.INVALID_EMAIL }
    // }

    // // Validate phone number
    // if (!validatePhone(data.phone)) {
    //   return { success: false, error: ErrorMessages.INVALID_PHONE }
    // }

    // // Check if the email already exists
    // const existingLead = await findLeadByEmail(data.email)
    // if (existingLead) {
    //   return { success: false, error: ErrorMessages.EMAIL_EXISTS }
    // }

    // Create lead only if validation succeeds
    const lead = await createLeadInDb(data);
    return { success: true, data: lead as LeadResponse };
  } catch (err) {
    console.error('Error creating lead:', err);
    return { success: false, error: ErrorMessages.LEAD_CREATE_FAILED };
  }
}
