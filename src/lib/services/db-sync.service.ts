import { MongoClient, ChangeStream, ChangeStreamDocument, Document } from 'mongodb';
import { syncAllLeads } from './sheets.service';

let changeStream: ChangeStream | null = null;
let client: MongoClient | null = null;

// Start monitoring database changes
export async function startSync() {
  try {
    client = new MongoClient(process.env.DATABASE_URL!);
    await client.connect();
    console.info('🔌 [DB-SYNC] MongoDB connection established');

    const collection = client.db().collection('leads');
    changeStream = collection.watch();
    console.info('👀 [DB-SYNC] Watching for changes in leads collection...');

    changeStream.on('change', async (change: ChangeStreamDocument<Document>) => {
      console.info('----------------------------------------');
      console.info(`🔄 [DB-SYNC] Database change detected: ${change.operationType}`);

      switch (change.operationType) {
        case 'insert':
        case 'update':
        case 'delete':
          await syncAllLeads();
          console.info('✅ [DB-SYNC] Google Sheet updated');
          break;
        default:
          console.warn(`⚠️ [DB-SYNC] Unhandled operation type: ${change.operationType}`);
      }
      console.info('----------------------------------------');
    });

    console.info('✅ [DB-SYNC] Database sync service started successfully');
  } catch (error) {
    console.error('❌ [DB-SYNC] Error starting database sync:', error);
    throw error;
  }
}

// Stop monitoring database changes
export async function stopSync() {
  try {
    if (changeStream) {
      await changeStream.close();
    }
    if (client) {
      await client.close();
    }
    console.info('🛑 [DB-SYNC] Database sync service stopped');
  } catch (error) {
    console.error('❌ [DB-SYNC] Error stopping sync service:', error);
  }
}