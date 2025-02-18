import { dbSyncService } from '../services/db-sync.service';
import { sheetsService } from '../services/sheets.service';

let isInitialized = false;

export async function initializeSync() {
  if (isInitialized) return;

  try {
    // Sync all existing leads first
    await sheetsService.syncAllLeads();
    console.log('✅ Initial sync completed');

    // Start monitoring for changes
    await dbSyncService.startSync();
    console.log('✅ Change stream started');

    isInitialized = true;
  } catch (error) {
    console.error('❌ Failed to initialize sync:', error);
    // Don't throw error - let the application continue even if sync fails
  }
}