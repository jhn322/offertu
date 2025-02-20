// Import necessary functions and types for API route
import { createLead } from '@/server/actions/lead.actions'
import { NextResponse } from 'next/server'
import { ErrorMessages } from '@/lib/errors/app.errors'

// POST endpoint handler for creating new leads
export async function POST(request: Request) {
  try {
    // Parse the request body to extract email and phone
    const { email, phone = await request.json()
    // Call the createLead function with the extracted data
    const result = await createLead({ email, phone  })

    // Check if the lead creation was unsuccessful
    if (!result.success) {
      // Return a JSON response with an error message and a 400 status code
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // Return a JSON response with the created lead data and a 201 status code
    return NextResponse.json(result.data, { status: 201 })
  } catch (err) {
    // Log unexpected errors to the console
    console.error('Unexpected error:', err)
    // Return a JSON response with an internal server error message and a 500 status code
    return NextResponse.json(
      { error: ErrorMessages.INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  }
}