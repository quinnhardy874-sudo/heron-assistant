module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { photoBase64, mediaType, service, notes } = req.body;

  if (!photoBase64 || !service) {
    return res.status(400).json({ error: 'Missing photoBase64 or service' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const system = `You are a pricing assistant for Heron Landscaping, a professional landscaping company in Towson, Maryland run by Quinn.
Analyze the yard photo and give a realistic price estimate.

Towson/Baltimore area pricing:
- Mowing: $35-$150 (lot size, obstacles, grass height)
- Edging: $25-$60
- Mulching: $75-$350 (bed count, bag estimate at $5/bag installed)
- Weed Removal: $50-$200 (severity)
- Full Cleanup: $100-$400
- Lawn Striping: $50-$120

Respond EXACTLY in this format (no extra text):
RANGE: $[low]-$[high]
RECOMMENDED: $[best price]
WHY: [2 sentences about what you see]
TIME: [X-Y hours]
UPSELL: [one tip for Quinn to make more money on this job]`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        system,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType || 'image/jpeg',
                data: photoBase64
              }
            },
            {
              type: 'text',
              text: `Service: ${service}\nNotes: ${notes || 'none'}`
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'Claude API error' });
    }

    const data = await response.json();
    res.json({ text: data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
