// Shared helpers for the Google Calendar session cookie.
// Files under api/_lib are not deployed as endpoints (underscore prefix).
//
// Tokens never reach the browser: they live in an httpOnly cookie whose value
// is AES-256-GCM encrypted with a key derived from SESSION_SECRET.

const crypto = require('crypto');

const COOKIE_NAME = 'heron_gcal';
const STATE_COOKIE = 'heron_oauth_state';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

function getKey(secret = process.env.SESSION_SECRET) {
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET is not set (or shorter than 32 characters). Add it in Vercel → Settings → Environment Variables.');
  }
  return Buffer.from(crypto.hkdfSync('sha256', secret, 'heron-assistant', 'gcal-session-v1', 32));
}

// Returns base64url(iv[12] | tag[16] | ciphertext)
function encrypt(obj, secret) {
  const key = getKey(secret);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([cipher.update(JSON.stringify(obj), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ct]).toString('base64url');
}

// Returns the decrypted object, or null if missing/tampered/wrong key.
function decrypt(value, secret) {
  if (!value || typeof value !== 'string') return null;
  try {
    const key = getKey(secret);
    const buf = Buffer.from(value, 'base64url');
    if (buf.length < 29) return null;
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, buf.subarray(0, 12));
    decipher.setAuthTag(buf.subarray(12, 28));
    const pt = Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]);
    return JSON.parse(pt.toString('utf8'));
  } catch {
    return null;
  }
}

function parseCookies(req) {
  const out = {};
  const header = req.headers && req.headers.cookie;
  if (!header) return out;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    try { out[k] = decodeURIComponent(v); } catch { out[k] = v; }
  }
  return out;
}

function serializeCookie(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function appendSetCookie(res, cookie) {
  const prev = res.getHeader('Set-Cookie');
  const list = prev ? (Array.isArray(prev) ? prev : [prev]) : [];
  res.setHeader('Set-Cookie', [...list, cookie]);
}

// Keep only what we need so the cookie stays small (< 4 KB).
function pickTokens(tokens, previous = {}) {
  return {
    access_token: tokens.access_token || previous.access_token,
    refresh_token: tokens.refresh_token || previous.refresh_token,
    expiry_date: tokens.expiry_date || previous.expiry_date,
    token_type: tokens.token_type || previous.token_type || 'Bearer',
    scope: tokens.scope || previous.scope
  };
}

function setSession(res, tokens) {
  appendSetCookie(res, serializeCookie(COOKIE_NAME, encrypt(tokens), MAX_AGE_SECONDS));
}

function clearSession(res) {
  appendSetCookie(res, serializeCookie(COOKIE_NAME, '', 0));
}

function getSession(req) {
  return decrypt(parseCookies(req)[COOKIE_NAME]);
}

// Same-origin check for state-changing requests. Browsers send Origin on
// cross-origin POSTs; if present it must match this host.
function isSameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  try { return new URL(origin).host === host; } catch { return false; }
}

module.exports = {
  COOKIE_NAME,
  STATE_COOKIE,
  encrypt,
  decrypt,
  parseCookies,
  serializeCookie,
  appendSetCookie,
  pickTokens,
  setSession,
  clearSession,
  getSession,
  isSameOrigin
};
