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

    console.log('Successfully added lead to Google Sheets');
    return response.data;
  } catch (error) {
    console.error('Error adding lead to Google Sheets:', error);
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
  } catch (error) {
    console.error('Error clearing sheet:', error);
    throw error;
  }
}

// Sync all leads from database to Google Sheet
export async function syncAllLeads() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'asc' }
    });

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

    console.log('Successfully synced all leads to Google Sheets');
    return response.data;
  } catch (error) {
    console.error('Error syncing leads to Google Sheets:', error);
    throw error;
  }
}