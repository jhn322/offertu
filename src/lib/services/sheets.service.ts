import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { prisma } from '../db/prisma';
import { Lead } from '@prisma/client';

// Service class for handling Google Sheets operations
export class GoogleSheetsService {
  private sheets;
  private auth: JWT;

  constructor() {
    // Initialize the JWT auth client
    this.auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Fix for formatting
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the sheets API
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  // Method to append a new lead to the Google Sheet
  async appendLead(lead: Lead) {
    try {
      // Append lead data to the specified range in the sheet
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Blad1!A:C',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            lead.email,
            lead.phone,
            new Date(lead.createdAt).toISOString(),
          ]],
        },
      });

      console.log('Successfully added lead to Google Sheets');
      return response.data;
    } catch (error) {
      console.error('Error adding lead to Google Sheets:', error);
      throw error;
    }
  }

  // Method to sync all leads from the database to the Google Sheet
  async syncAllLeads() {
    try {
      // Fetch all leads from the database
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'asc' }
      });

      // Clear existing content in the sheet (except the header row)
      await this.clearSheet();

      // Format leads data for Google Sheets
      const values = leads.map(lead => [
        lead.email,
        lead.phone,
        new Date(lead.createdAt).toISOString()
      ]);

      // Update the sheet with all data
      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Blad1!A2', // Start at row 2 to keep headers
        valueInputOption: 'RAW',
        requestBody: {
          values
        }
      });

      console.log('Successfully synced all leads to Google Sheets');
      return response.data;
    } catch (error) {
      console.error('Error syncing leads to Google Sheets:', error);
      throw error;
    }
  }

  // Helper method to clear the sheet
  private async clearSheet() {
    try {
      // Clear all content except the header row
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Blad1!A2:C', // Clear everything except the header row
      });
    } catch (error) {
      console.error('Error clearing sheet:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const sheetsService = new GoogleSheetsService();