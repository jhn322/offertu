import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { prisma } from '../db/prisma';
import { Lead } from '@prisma/client';

// Create auth client
const createAuth = () => new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Initialize sheets API
const sheets = google.sheets({ version: 'v4', auth: createAuth() });

// Append a new lead to Google Sheet
export async function appendLead(lead: Lead) {
  try {
    const response = await sheets.spreadsheets.values.append({
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

    console.info('✅ [SHEETS] Successfully added lead to Google Sheets'); // Log normal information
    return response.data;
  } catch (error) {
    console.error('❌ [SHEETS] Error adding lead to Google Sheets:', error); // Log error
    throw error;
  }
}

// Clear sheet content
async function clearSheet() {
  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Blad1!A2:C',
    });
    console.info('🧹 [SHEETS] Sheet content cleared'); // Log normal information
  } catch (error) {
    console.error('❌ [SHEETS] Error clearing sheet:', error); // Log error
    throw error;
  }
}

// Sync all leads from database to Google Sheet
export async function syncAllLeads() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'asc' }
    });

    console.info(`📊 [SHEETS] Found ${leads.length} leads to sync`); // Log normal information

    await clearSheet();

    const values = leads.map(lead => [
      lead.email,
      lead.phone,
      new Date(lead.createdAt).toISOString()
    ]);

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Blad1!A2',
      valueInputOption: 'RAW',
      requestBody: { values }
    });

    console.info('✅ [SHEETS] Successfully synced all leads to Google Sheets'); // Log normal information
    return response.data;
  } catch (error) {
    console.error('❌ [SHEETS] Error syncing leads to Google Sheets:', error); // Log error
    throw error;
  }
}