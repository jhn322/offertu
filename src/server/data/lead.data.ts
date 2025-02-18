// Import the Prisma client singleton and Lead type
import { prisma } from '@/lib/db/prisma'
import type { Lead } from '@prisma/client'

// Define a type for input data
type CreateLeadInput = Pick<Lead, 'email' | 'phone'>

// Function to create a new lead in the database
// Takes an object with email and phone as parameters
export async function createLeadInDb(data: CreateLeadInput): Promise<Lead> {
  return await prisma.lead.create({ data })
}

// Function to find a lead by email
export async function findLeadByEmail(email: string) {
  return await prisma.lead.findUnique({
    where: { email }
  });
}

// Example of how this file can grow:
/* 
export async function updateLeadInDb(id: string, data: Partial<Lead>) {
  return await prisma.lead.update({ where: { id }, data })
}
 */