// import type { Lead } from '@prisma/client'

export interface CreateLeadInput {
  email: string;
  phone: string;
  category: string;
}

export interface LeadResponse {
  id: string;
  email: string;
  phone: string;
  category: string;
  createdAt: Date;
}
// // Input types: Define the structure for creating a lead
// export type CreateLeadInput = Pick<Lead, 'email' | 'phone'>

// // Response types: Define the structure for the lead response
// export type LeadResponse = Pick<Lead, 'id' | 'email' | 'phone' | 'createdAt'>
