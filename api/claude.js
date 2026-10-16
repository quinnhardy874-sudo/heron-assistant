// Server-side proxy to the Anthropic Messages API.
// The browser POSTs { system, messages, max_tokens } here; the API key never
// leaves the server.

const { isSameOrigin } = require('./_lib/session');

const MAX_BODY_BYTES = 6 * 1024 * 1024;  // Vercel itself caps requests at ~4.5 MB
const MAX_TOKENS_CAP = 8000;
const DEFAULT_MAX_TOKENS = 4000;          // room for adaptive thinking + the short answer
const MAX_MESSAGES = 20;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

function validBlock(b) {
  if (!b || typeof b !== 'object') return false;
  if (b.type === 'text') return typeof b.text === 'string';
  if (b.type === 'image') {
    const s = b.source;
    return !!s && s.type === 'base64' && IMAGE_TYPES.has(s.media_type) && typeof s.data === 'string' && s.data.length > 0;
  }
  return false;
}

function validMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return false;
  return messages.every(m =>
    m && (m.role === 'user' || m.role === 'assistant') &&
    (typeof m.content === 'string' || (Array.isArray(m.content) && m.content.length > 0 && m.content.every(validBlock)))
  );
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isSameOrigin(req)) return res.status(403).json({ error: 'Forbidden' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY is not set. Add it in Vercel → Project → Settings → Environment Variables, then redeploy.'
    });
  }

  const declared = parseInt(req.headers['content-length'] || '0', 10);
  if (declared > MAX_BODY_BYTES) return res.status(413).json({ error: 'Request too large — try a smaller photo.' });

  const body = req.body;
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Expected a JSON body' });
  if (Buffer.byteLength(JSON.stringify(body)) > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Request too large — try a smaller photo.' });
  }

  const { system, messages } = body;
  if (system !== undefined && (typeof system !== 'string' || system.length > 20000)) {
    return res.status(400).json({ error: 'Invalid system prompt' });
  }
  if (!validMessages(messages)) return res.status(400).json({ error: 'Invalid messages' });

  let maxTokens = parseInt(body.max_tokens, 10);
  if (!Number.isFinite(maxTokens) || maxTokens <= 0) maxTokens = DEFAULT_MAX_TOKENS;
  maxTokens = Math.min(maxTokens, MAX_TOKENS_CAP);

  const payload = {
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
    max_tokens: maxTokens,
    messages
  };
  if (system) payload.system = system;

  let upstream;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Anthropic fetch failed:', err && err.message);
    return res.status(502).json({ error: 'Could not reach the Claude API' });
  }

  let data;
  try { data = await upstream.json(); } catch { data = null; }

  if (!upstream.ok) {
    const msg = (data && data.error && data.error.message) || `Claude API error (${upstream.status})`;
    console.error('Anthropic error:', upstream.status, msg);
    const status = upstream.status === 429 || upstream.status === 529 ? 503 : 502;
    return res.status(status).json({ error: upstream.status === 401 ? 'Claude API key was rejected — check ANTHROPIC_API_KEY.' : msg });
  }

  if (data.stop_reason === 'refusal') {
    return res.status(422).json({ error: 'Claude declined this request. Try a different photo or notes.' });
  }

  // Return only the text blocks (thinking blocks, if any, are dropped).
  const content = (data.content || [])
    .filter(b => b.type === 'text')
    .map(b => ({ type: 'text', text: b.text }));

  return res.json({ content, stop_reason: data.stop_reason, model: data.model });
};
