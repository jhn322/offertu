import { NextResponse } from 'next/server';
// Import the necessary functions directly from their respective modules
import { syncAllLeads } from '@/lib/services/sheets.service';
import { startSync } from '@/lib/services/db-sync.service';

export async function POST() {
  try {
    // Sync all existing leads first
    // Call the syncAllLeads function directly from the imported module
    await syncAllLeads();
    console.log('Initial sync completed');

    try {
      // Call the startSync function directly from the imported module
      await startSync();
      console.log('Change stream started');
    } catch (streamError) {
      console.error('Failed to start change stream:', streamError);
      // Return success even if change stream fails,
      // because initial sync succeeded
      return NextResponse.json({
        message: 'Leads synced but change stream failed to start',
        warning: 'Automatic updates may not work'
      }, { status: 200 });
    }

    // Return success message if all operations succeed
    return NextResponse.json({
      message: 'Successfully synced all leads and started monitoring'
    }, { status: 200 });
  } catch (error) {
    console.error('Error in sync process:', error);
    // Return error message if sync process fails
    return NextResponse.json({ error: 'Failed to sync leads' }, { status: 500 });
  }
}