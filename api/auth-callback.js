const { google } = require('googleapis');
const {
  STATE_COOKIE, parseCookies, serializeCookie, appendSetCookie, pickTokens, setSession
} = require('./_lib/session');

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
}

function page(res, status, ok, message) {
  res.status(status);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  const color = ok ? '#6dbf5e' : '#e05a4f';
  const icon = ok ? '✅' : '⚠️';
  const title = ok ? 'Google Calendar Connected!' : 'Could not connect Google Calendar';
  // message is a fixed string chosen below, never user/Google input.
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #111a0e; color: #f5f0e8; font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .box { text-align: center; padding: 30px; }
    .icon { font-size: 60px; }
    h2 { color: ${color}; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="box">
    <div class="icon">${icon}</div>
    <h2>${title}</h2>
    <p>${message}</p>
  </div>
  <script>
    try { if (window.opener) window.opener.postMessage({ type: 'heron-cal', connected: ${ok} }, location.origin); } catch (e) {}
    setTimeout(function () {
      window.close();
      window.location.href = '/';
    }, 1500);
  </script>
</body>
</html>`);
}

module.exports = async (req, res) => {
  const { code, state, error } = req.query;
  const cookies = parseCookies(req);
  // One-time state cookie: clear it whatever happens.
  appendSetCookie(res, serializeCookie(STATE_COOKIE, '', 0));

  if (error) return page(res, 400, false, 'Google sign-in was cancelled. Closing…');
  if (!code) return page(res, 400, false, 'No authorization code was provided. Closing…');
  if (!state || !cookies[STATE_COOKIE] || state !== cookies[STATE_COOKIE]) {
    return page(res, 400, false, 'Sign-in link expired or was invalid. Please try connecting again. Closing…');
  }

  try {
    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    setSession(res, pickTokens(tokens));
    return page(res, 200, true, 'Closing in a moment…');
  } catch (err) {
    console.error('OAuth callback error:', err && err.message);
    return page(res, 500, false, 'Something went wrong finishing sign-in. Please try again. Closing…');
  }
};
