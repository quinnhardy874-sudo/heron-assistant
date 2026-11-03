const { getSession } = require('./_lib/session');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  let connected = false;
  try {
    const s = getSession(req);
    connected = !!(s && (s.refresh_token || s.access_token));
  } catch {
    connected = false; // SESSION_SECRET missing → treat as not connected
  }
  res.json({ connected });
};
