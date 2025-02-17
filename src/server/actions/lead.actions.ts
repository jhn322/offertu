// Import the database operation function
import { createLeadInDb } from '../data/lead.data'
import { CreateLeadInput, ApiResponse, LeadResponse, ErrorMessages } from '@/types'

// Business logic function to handle lead creation
// Includes error handling and success/failure responses
export async function createLead(data: CreateLeadInput): Promise<ApiResponse<LeadResponse>> {
  try {
    const lead = await createLeadInDb(data)
    return { success: true, data: lead as LeadResponse }
  } catch (err) {
    console.error(err)
    return { success: false, error: ErrorMessages.LEAD_CREATE_FAILED }
  }
}