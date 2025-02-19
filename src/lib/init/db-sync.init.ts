import { syncAllLeads } from '../services/sheets.service';
import { startSync } from '../services/db-sync.service';

let isInitialized = false;

export async function initializeSync() {
  if (isInitialized) return;

  try {
    console.info('🚀 [INIT] Starting sync initialization');

    // Sync all existing leads first
    await syncAllLeads();
    console.info('✅ [INIT] Initial sync completed');

    // Start monitoring for changes
    await startSync();
    console.info('👀 [INIT] Change stream started');

    isInitialized = true;
    console.info('✨ [INIT] Sync service fully initialized');
  } catch (error) {
    console.error('❌ [INIT] Failed to initialize sync:', error);
    // Don't throw error - let the application continue even if sync fails
  }
}
