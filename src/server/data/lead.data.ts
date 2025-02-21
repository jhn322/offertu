// Import the Prisma client singleton and Lead type
import { prisma } from '@/lib/db/prisma'
import { CreateLeadInput } from '@/types'

// Function to create a new lead in the database
// Takes an object with email and phone as parameters
export async function createLeadInDb(data: CreateLeadInput) {
  return prisma.lead.create({ data })
}

//* Example
// find by id
// update
// delete 


