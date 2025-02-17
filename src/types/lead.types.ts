import type { Lead } from '@prisma/client'

// * Status types
export type SubmissionStatus = 'idle' | 'success' | 'error'

// * Input types
export type CreateLeadInput = Pick<Lead, 'email' | 'phone'>
// export type UpdateLeadInput = Partial<Pick<Lead, 'email' | 'phone'>>

// * Response types
export type LeadResponse = Pick<Lead, 'id' | 'email' | 'phone' | 'createdAt'>

