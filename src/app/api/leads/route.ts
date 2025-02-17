// Import necessary functions and types for API route
import { createLead } from '@/server/actions/lead.actions'
import { NextResponse } from 'next/server'
import { ErrorMessages } from '@/types'

// POST endpoint handler for creating new leads
export async function POST(request: Request) {
  try {
    // Extract email and phone from request body
    const { email, phone } = await request.json()
    const result = await createLead({ email, phone })

    // Handle success/failure responses
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result.data, { status: 201 })


  } catch (err) {
    // Handle unexpected errors
    console.error(err)
    return NextResponse.json(
      { error: ErrorMessages.INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  }
}