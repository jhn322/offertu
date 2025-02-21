import { leadData } from '../data/lead.data'
import type { CreateLeadInput, UpdateLeadInput, ApiResponse, LeadResponse } from '@/types'
import { ErrorMessages } from '@/lib/errors/app.errors'

export const leadActions = {
  // Create lead
  create: async (data: CreateLeadInput): Promise<ApiResponse<LeadResponse>> => {
    try {
      const lead = await leadData.create(data)
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
  },

  // Get all leads
  getAll: async (filters?: { category?: string; email?: string; referenceId?: string }): Promise<ApiResponse<LeadResponse[]>> => {
    try {
      const leads = await leadData.getAll(filters)
      return {
        success: true,
        data: leads as LeadResponse[]
      }
    } catch (err) {
      console.error('Error fetching leads:', err)
      return {
        success: false,
        error: ErrorMessages.LEAD_FETCH_FAILED
      }
    }
  },

  // Get lead by ID
  getById: async (id: string): Promise<ApiResponse<LeadResponse>> => {
    try {
      const lead = await leadData.getById(id)
      if (!lead) {
        return {
          success: false,
          error: ErrorMessages.LEAD_NOT_FOUND
        }
      }
      return {
        success: true,
        data: lead as LeadResponse
      }
    } catch (err) {
      console.error('Error fetching lead:', err)
      return {
        success: false,
        error: ErrorMessages.LEAD_FETCH_FAILED
      }
    }
  },

  // Update lead
  update: async (id: string, data: UpdateLeadInput): Promise<ApiResponse<LeadResponse>> => {
    try {
      const lead = await leadData.update(id, data)
      return {
        success: true,
        data: lead as LeadResponse
      }
    } catch (err) {
      console.error('Error updating lead:', err)
      return {
        success: false,
        error: ErrorMessages.LEAD_UPDATE_FAILED
      }
    }
  },

  // Delete lead
  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      await leadData.delete(id)
      return {
        success: true
      }
    } catch (err) {
      console.error('Error deleting lead:', err)
      return {
        success: false,
        error: ErrorMessages.LEAD_DELETE_FAILED
      }
    }
  }
}