// This file is responsible for setting up the PrismaClient, which is a tool that helps us
// communicate with our database. By using a global variable, we ensure that we only create
// one instance of PrismaClient during development. This is important because creating too
// many instances can lead to issues with too many database connections, which can slow down
// our application or even cause it to crash. In production, we don't use the global variable
// to avoid potential conflicts.

// Import PrismaClient
import { PrismaClient } from '@prisma/client'

// Create a type-safe global variable for PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create or reuse existing PrismaClient instance
export const prisma = globalForPrisma.prisma || new PrismaClient()

// Save PrismaClient instance to global variable in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma