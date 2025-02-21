// Import the Prisma client singleton and Lead type
import { prisma } from '@/lib/db/prisma'
import { CreateLeadInput, UpdateLeadInput } from '@/types'

export const leadData = {
  // Create new lead
  create: async (data: CreateLeadInput) => {
    return prisma.lead.create({ data })
  },

  // Get single lead by ID
  getById: async (id: string) => {
    return prisma.lead.findUnique({
      where: { id }
    })
  },

  // Get all leads with optional filtering
  getAll: async (filters?: {
    category?: string
    email?: string
    referenceId?: string
  }) => {
    return prisma.lead.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' }
    })
  },

  // Update lead
  update: async (id: string, data: UpdateLeadInput) => {
    return prisma.lead.update({
      where: { id },
      data
    })
  },

  // Delete lead
  delete: async (id: string) => {
    return prisma.lead.delete({
      where: { id }
    })
  }
}