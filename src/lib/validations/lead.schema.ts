import * as z from 'zod'
import { LEAD_CATEGORIES } from '@/types/lead.types'

export const leadSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  phone: z
    .string()
    .optional(),
  category: z.enum(LEAD_CATEGORIES, {
    required_error: 'Category is required',
    invalid_type_error: 'Invalid category'
  }),
  referenceId: z.string().optional()
})

export type LeadFormData = z.infer<typeof leadSchema>