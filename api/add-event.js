const { google } = require('googleapis');

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { tokens, event } = req.body;

  if (!tokens || !event) {
    return res.status(400).json({ error: 'Missing tokens or event data' });
  }

  try {
    const oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const result = await calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });

    res.json({ 
      success: true, 
      eventId: result.data.id,
      eventLink: result.data.htmlLink,
      newTokens: oauth2Client.credentials
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
