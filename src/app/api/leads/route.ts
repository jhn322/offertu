// Import necessary functions and types for API route
import { createLead } from '@/server/actions/lead.actions'
import { NextResponse } from 'next/server'

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


  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}