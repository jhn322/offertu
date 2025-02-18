import { MongoClient } from 'mongodb';
import { sheetsService } from './sheets.service';

// Service class for synchronizing database changes with Google Sheets
export class DbSyncService {
  private changeStream: any; // Variable to hold the change stream
  private client: MongoClient; // MongoDB client instance

  constructor() {
    // Initialize the MongoDB client with the database URL from environment variables
    this.client = new MongoClient(process.env.DATABASE_URL!);
  }

  // Method to start the synchronization process
  async startSync() {
    try {
      // Connect to the MongoDB database
      await this.client.connect();
      console.log('🔌 MongoDB connection established');

      // Access the database and the 'leads' collection
      const db = this.client.db();
      const collection = db.collection('leads');

      // Start watching for changes in the 'leads' collection
      this.changeStream = collection.watch();
      console.log('👀 Watching for changes in leads collection...');

      // Listen for change events in the collection
      this.changeStream.on('change', async (change: any) => {
        console.log('----------------------------------------');
        console.log(`🔄 Database change detected: ${change.operationType}`);

        // Handle different types of database operations
        switch (change.operationType) {
          case 'insert':
            console.log('➕ New lead added');
            break;

          case 'update':
            console.log('📝 Lead updated');
            // Sync all leads to Google Sheets when a lead is updated
            await sheetsService.syncAllLeads();
            console.log('✅ Google Sheet updated');
            break;

          case 'delete':
            console.log('❌ Lead deleted');
            // Sync all leads to Google Sheets when a lead is deleted
            await sheetsService.syncAllLeads();
            console.log('✅ Google Sheet updated');
            break;

          default:
            console.log(`⚠️ Unhandled operation type: ${change.operationType}`);
        }
        console.log('----------------------------------------');
      });

      console.log('✅ Database sync service started successfully');
    } catch (error) {
      console.error('❌ Error starting database sync:', error);
      throw error;
    }
  }

  // Method to stop the synchronization process
  async stopSync() {
    try {
      // Close the change stream if it exists
      if (this.changeStream) {
        await this.changeStream.close();
      }
      // Close the MongoDB client connection
      if (this.client) {
        await this.client.close();
      }
      console.log('🛑 Database sync service stopped');
    } catch (error) {
      console.error('❌ Error stopping sync service:', error);
    }
  }
}

// Create a singleton instance of the DbSyncService
export const dbSyncService = new DbSyncService();