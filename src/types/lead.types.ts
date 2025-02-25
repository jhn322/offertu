import { z } from 'zod'
import { leadSchema } from '@/lib/validations/lead.schema'

// Define categories as a constant for reuse
export const LEAD_CATEGORIES = ['service', 'careers', 'news', 'templates', 'api'] as const

// Derive the category type from the constant
export type LeadCategory = (typeof LEAD_CATEGORIES)[number]


// Form related types
export type CreateLeadInput = z.infer<typeof leadSchema>
export type UpdateLeadInput = Partial<CreateLeadInput>;

export interface LeadFormProps {
  category: LeadCategory
  referenceId?: string
  showEmail?: boolean
  showPhone?: boolean
  cardTitle?: string;
}

export interface LeadResponse {
  id: string
  email: string
  phone?: string
  category: string
  referenceId?: string
  createdAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}