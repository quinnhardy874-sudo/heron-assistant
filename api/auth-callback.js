const { google } = require('googleapis');

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
}

module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    // Return tokens to frontend via a simple HTML page that stores them
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { background: #111a0e; color: #f5f0e8; font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .box { text-align: center; padding: 30px; }
          .icon { font-size: 60px; }
          h2 { color: #6dbf5e; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="box">
          <div class="icon">✅</div>
          <h2>Google Calendar Connected!</h2>
          <p>Closing in a moment...</p>
        </div>
        <script>
          localStorage.setItem('heron_tokens', JSON.stringify(${JSON.stringify(tokens)}));
          setTimeout(() => {
            window.close();
            window.location.href = '/';
          }, 1500);
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
