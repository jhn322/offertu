import { leadActions } from '@/server/actions/lead.actions'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorMessages } from '@/lib/errors/app.errors'
import { updateLeadSchema } from '@/lib/validations/lead.schema'

// GET single lead
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const result = await leadActions.getById(resolvedParams.id)

    if (!result.success) {
      return NextResponse.json(result, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('Error fetching lead:', err)
    return NextResponse.json(
      { success: false, error: ErrorMessages.INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  }
}

// PUT (update) lead
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const validatedData = updateLeadSchema.safeParse(body)

    // Validate the request body
    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, error: validatedData.error.errors[0].message },
        { status: 400 }
      )
    }

    const resolvedParams = await params
    // Check if the lead exists before updating
    const existingLead = await leadActions.getById(resolvedParams.id)

    if (!existingLead.success) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    // Update the lead
    const result = await leadActions.update(resolvedParams.id, validatedData.data)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Error updating lead:', err)
    return NextResponse.json(
      { success: false, error: ErrorMessages.INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  }
}

// DELETE lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    // Fetch the lead before deletion to include it in the response
    const leadResult = await leadActions.getById(resolvedParams.id)

    if (!leadResult.success) {
      return NextResponse.json(leadResult, { status: 404 })
    }

    // Proceed to delete the lead
    const deleteResult = await leadActions.delete(resolvedParams.id)

    if (!deleteResult.success) {
      return NextResponse.json(deleteResult, { status: 404 })
    }

    // Return the deleted lead in the response
    return NextResponse.json(
      { success: true, message: 'Lead deleted successfully', data: leadResult.data },
      { status: 200 } // Use 200 status to indicate successful deletion with content
    )
  } catch (err) {
    console.error('Error deleting lead:', err)
    return NextResponse.json(
      { success: false, error: ErrorMessages.INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  }
}