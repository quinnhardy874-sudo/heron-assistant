const crypto = require('crypto');
const { google } = require('googleapis');
const { STATE_COOKIE, serializeCookie, appendSetCookie } = require('./_lib/session');

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
}

module.exports = async (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.REDIRECT_URI) {
    return res.status(500).json({ error: 'Google Calendar is not configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / REDIRECT_URI missing).' });
  }

  // CSRF protection for the OAuth round trip.
  const state = crypto.randomBytes(16).toString('hex');
  appendSetCookie(res, serializeCookie(STATE_COOKIE, state, 600));
  res.setHeader('Cache-Control', 'no-store');

  const oauth2Client = getOAuthClient();
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
    prompt: 'consent',
    state
  });

  res.json({ url });
};
