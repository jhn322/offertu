import * as z from 'zod'
import { LEAD_CATEGORIES } from '@/types'

// Schema för att skapa lead
export const leadSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().optional(),
  category: z.enum(LEAD_CATEGORIES),
  referenceId: z.string().optional()
})

// Schema för att uppdatera lead
export const updateLeadSchema = leadSchema.partial()

// Schema för ID-parameter
export const leadIdSchema = z.object({
  id: z.string().min(1, 'ID is required')
})

export type LeadFormData = z.infer<typeof leadSchema>
export type UpdateLeadFormData = z.infer<typeof updateLeadSchema>