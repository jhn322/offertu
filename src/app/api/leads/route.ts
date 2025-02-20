// Import necessary functions and types for API route
import { createLead } from '@/server/actions/lead.actions'
import { NextResponse } from 'next/server'
import { ErrorMessages } from '@/lib/errors/app.errors'
import { leadSchema } from '@/lib/validations/lead.schema'

// POST endpoint handler for creating new leads
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input data with Zod
    const validatedData = leadSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: validatedData.error.errors[0].message
        },
        { status: 400 }
      )
    }

    // Process the lead creation
    const result = await createLead(validatedData.data)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result.data, { status: 201 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json(
      { error: ErrorMessages.INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  }
}