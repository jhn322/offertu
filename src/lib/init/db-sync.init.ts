import { syncAllLeads } from '../services/sheets.service';
import { startSync } from '../services/db-sync.service';

let isInitialized = false;

export async function initializeSync() {
  if (isInitialized) return;

  try {
    // Sync all existing leads first
    await syncAllLeads(); // Call the imported function directly
    console.log('✅ Initial sync completed');

    // Start monitoring for changes
    await startSync(); // Call the imported function directly
    console.log('✅ Change stream started');

    isInitialized = true;
  } catch (error) {
    console.error('❌ Failed to initialize sync:', error);
    // Don't throw error - let the application continue even if sync fails
  }
}
