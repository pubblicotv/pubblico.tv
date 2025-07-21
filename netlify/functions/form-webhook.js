// File: netlify/functions/form-webhook.js
// Gestisce automaticamente le submissions di Netlify Forms

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse dei dati dal webhook di Netlify
    const submission = JSON.parse(event.body);
    
    // Log della submission (visibile nei log di Netlify)
    console.log('Nuova submission ricevuta:', submission);
    
    // Estrai i dati dal form
    const formData = submission.data;
    const attachments = submission.ordered_human_fields
      .filter(field => field.name.includes('foto'))
      .map(field => ({
        name: field.name,
        url: field.value
      }));
    
    // Chiama la function per salvare su Google Sheets
    const sheetsResponse = await fetch(`${process.env.URL}/.netlify/functions/save-to-sheets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        foto1_url: attachments.find(f => f.name === 'foto1')?.url || '',
        foto2_url: attachments.find(f => f.name === 'foto2')?.url || '',
        submission_id: submission.id,
        form_name: submission.form_name
      })
    });
    
    if (sheetsResponse.ok) {
      console.log('Dati salvati su Google Sheets con successo');
      
      // Opzionale: invia email di notifica
      // await sendNotificationEmail(formData);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Webhook processed successfully' })
      };
    } else {
      throw new Error('Errore nel salvataggio su Google Sheets');
    }
    
  } catch (error) {
    console.error('Errore webhook:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Funzione opzionale per email di notifica
async function sendNotificationEmail(data) {
  // Implementa invio email con SendGrid, Mailgun, etc.
  console.log('Email notification per:', data.email);
}
