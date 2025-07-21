// File: netlify/functions/save-to-sheets.js

const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event, context) => {
  // Solo POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse dei dati dal form
    const data = JSON.parse(event.body);
    
    // Credenziali Google Sheets (da variabili ambiente)
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    
    // Inizializza il documento
    const doc = new GoogleSpreadsheet(SHEET_ID);
    
    // Autenticazione con service account
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    });
    
    // Carica info documento
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Prima scheda
    
    // Prepara i dati da inserire
    const rowData = {
      Timestamp: new Date().toLocaleString('it-IT'),
      Cognome: data.cognome || '',
      Nome: data.nome || '',
      'Data Nascita': data.data_nascita || '',
      'Luogo Nascita': data.luogo_nascita || '',
      Cellulare: data.cellulare || '',
      Email: data.email || '',
      'Foto 1': data.foto1_url || '',
      'Foto 2': data.foto2_url || '',
      'IP Address': event.headers['client-ip'] || 'N/A',
      'User Agent': event.headers['user-agent'] || 'N/A'
    };
    
    // Inserisci la riga
    await sheet.addRow(rowData);
    
    // Risposta di successo
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Dati salvati correttamente'
      })
    };
    
  } catch (error) {
    console.error('Errore:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};

// File package.json per le dipendenze
/*
{
  "dependencies": {
    "google-spreadsheet": "^4.1.2"
  }
}
*/
