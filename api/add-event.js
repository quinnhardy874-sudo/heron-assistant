const { google } = require('googleapis');
const { getSession, setSession, clearSession, pickTokens, isSameOrigin } = require('./_lib/session');

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
}

const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : undefined);

// Only pass through the event fields the app uses.
function sanitizeEvent(e) {
  if (!e || typeof e !== 'object') return null;
  if (!e.start || !e.end || typeof e.start.dateTime !== 'string' || typeof e.end.dateTime !== 'string') return null;
  return {
    summary: str(e.summary, 300),
    location: str(e.location, 500),
    description: str(e.description, 4000),
    start: { dateTime: e.start.dateTime, timeZone: str(e.start.timeZone, 64) },
    end: { dateTime: e.end.dateTime, timeZone: str(e.end.timeZone, 64) },
    colorId: str(e.colorId, 4)
  };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isSameOrigin(req)) return res.status(403).json({ error: 'Forbidden' });

  let stored;
  try {
    stored = getSession(req);
  } catch (err) {
    return res.status(500).json({ error: err.message }); // SESSION_SECRET missing
  }
  if (!stored || (!stored.access_token && !stored.refresh_token)) {
    return res.status(401).json({ error: 'Google Calendar is not connected', connected: false });
  }

  const event = sanitizeEvent(req.body && req.body.event);
  if (!event) return res.status(400).json({ error: 'Missing or invalid event data' });

  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials(stored);

  try {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    // googleapis refreshes the access token automatically when expired.
    const result = await calendar.events.insert({ calendarId: 'primary', requestBody: event });

    // Persist possibly-refreshed tokens back into the cookie (never the body).
    setSession(res, pickTokens(oauth2Client.credentials, stored));

    return res.json({
      success: true,
      eventId: result.data.id,
      eventLink: result.data.htmlLink
    });
  } catch (err) {
    const msg = (err && err.message) || '';
    const status = err && (err.code || (err.response && err.response.status));
    if (msg.includes('invalid_grant') || status === 401) {
      clearSession(res);
      return res.status(401).json({ error: 'Google Calendar access expired — please reconnect', connected: false });
    }
    console.error('add-event error:', msg);
    return res.status(502).json({ error: 'Could not add the event to Google Calendar' });
  }
};
