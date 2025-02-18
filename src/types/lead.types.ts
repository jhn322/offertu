import type { Lead } from '@prisma/client'

// Input types: Define the structure for creating a lead
export type CreateLeadInput = Pick<Lead, 'email' | 'phone'>

// Response types: Define the structure for the lead response
export type LeadResponse = Pick<Lead, 'id' | 'email' | 'phone' | 'createdAt'>
