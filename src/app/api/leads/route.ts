import { leadActions } from '@/server/actions/lead.actions'
import { NextResponse } from 'next/server'
import { ErrorMessages } from '@/lib/errors/app.errors'
import { leadSchema } from '@/lib/validations/lead.schema'

// GET all leads
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const email = searchParams.get('email')
    const referenceId = searchParams.get('referenceId')

    const filters = {
      ...(category && { category }),
      ...(email && { email }),
      ...(referenceId && { referenceId })
    }

    const result = await leadActions.getAll(filters)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Error fetching leads:', err)
    return NextResponse.json(
      { error: ErrorMessages.INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  }
}

// POST new lead
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = leadSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, error: validatedData.error.errors[0].message },
        { status: 400 }
      )
    }

    const result = await leadActions.create(validatedData.data)
    return NextResponse.json(result.data, { status: 201 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json(
      { error: ErrorMessages.INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  }
}