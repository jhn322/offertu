import { createLeadInDb } from '../data/lead.data'
import type { CreateLeadInput, ApiResponse, LeadResponse } from '@/types'
import { ErrorMessages } from '@/lib/errors/app.errors'

export async function createLead(
  data: CreateLeadInput
): Promise<ApiResponse<LeadResponse>> {
  try {
    // Create lead in database
    const lead = await createLeadInDb(data)

    return {
      success: true,
      data: lead as LeadResponse
    }
  } catch (err) {
    console.error('Error creating lead:', err)
    return {
      success: false,
      error: ErrorMessages.LEAD_CREATE_FAILED
    }
  }
}