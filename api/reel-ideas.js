const Anthropic = require('@anthropic-ai/sdk');
const { betaZodOutputFormat } = require('@anthropic-ai/sdk/helpers/beta/zod');
const { z } = require('zod');

const client = new Anthropic();

const Shot = z.object({
  seconds: z.number(),
  visual: z.string(),
  on_screen_text: z.string()
});

const Idea = z.object({
  title: z.string(),
  hook: z.string(),
  angle: z.string(),
  why_it_sells: z.string(),
  biggest_risk: z.string(),
  shots: z.array(Shot),
  cta: z.string(),
  caption: z.string(),
  hashtags: z.array(z.string())
});

const IdeasSchema = z.object({ ideas: z.array(Idea) });

const SYSTEM = `You write short-form vertical video ads (Instagram Reels / Facebook Reels) for a local home-services business. Every idea you write will be filmed by the owner on a phone and run as a paid ad to homeowners in their service area.

What makes an idea good:
- It sells something the business actually offers: a done-for-you service, or a product that makes the job easy. Never give away free how-to that replaces buying either one. If the brand offers both, each idea sells one of them clearly, so the viewer never wonders whether someone is coming to install it.
- It leads with the buyer's real reason to pay (no ladder, no lost weekend, no tangled store lights, safety, a house that looks better than the neighbors') rather than technical details only other pros care about.
- The hook lands in the first 1.5 seconds and works with the sound off.
- 5-7 shots, 15-25 seconds total, each one filmable by one person with a phone at a real job. No stock footage, actors, drones or effects.
- On-screen text is 7 words or fewer per shot, written like a person talks.
- The final shot is the call to action.
- Use local cues (town names, weather, housing types) when the brand gives a service area.

Honesty rules. These ads are seen by real customers:
- Only state facts the brand profile gives you. Never invent prices, reviews, review counts, years in business, licenses, insurance, guarantees or awards.
- If an idea needs a fact the brand did not give (a price, a guarantee), write it as [FILL IN: ...] so the owner has to supply it.

For each idea, also say why it will sell and the single biggest risk that would make it flop. Make the ideas genuinely different from one another in angle, not five rewrites of one hook.`;

function brandBlock(brand) {
  const lines = [
    ['Business', brand.name],
    ['Instagram', brand.handle],
    ['Service area', brand.area],
    ['Services', brand.services],
    ['Who buys', brand.audience],
    ['Current offer / deadline', brand.offer],
    ['Voice', brand.voice],
    ['Facts we can claim', brand.facts],
    ['Never say / avoid', brand.avoid]
  ];
  return lines
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k}: ${String(v).trim()}`)
    .join('\n');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Heron-Passcode');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // The endpoint spends API credit, so lock it when a passcode is configured.
  const passcode = process.env.APP_PASSCODE;
  if (passcode && req.headers['x-heron-passcode'] !== passcode) {
    return res.status(401).json({ error: 'Wrong or missing passcode' });
  }

  const { brand, guide, pastedReel, count } = req.body || {};
  if (!brand || !brand.name) {
    return res.status(400).json({ error: 'Missing brand profile' });
  }
  const n = Math.min(Math.max(parseInt(count, 10) || 5, 1), 8);

  let ask = `Brand profile:\n${brandBlock(brand)}\n\nWrite ${n} reel ad ideas.`;
  if (guide && guide.trim()) {
    ask += `\n\nThe owner wants the ideas steered this way: ${guide.trim()}`;
  }
  if (pastedReel && pastedReel.trim()) {
    ask += `\n\nThe owner liked this reel and wants ideas that copy its structure and pacing (not its words or claims), adapted to this business:\n${pastedReel.trim()}`;
  }

  try {
    const response = await client.beta.messages.parse({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: {
        effort: 'medium',
        format: betaZodOutputFormat(IdeasSchema)
      },
      system: SYSTEM,
      messages: [{ role: 'user', content: ask }]
    });

    if (response.stop_reason === 'refusal') {
      return res.status(502).json({ error: 'The model declined this request. Try rewording the guide.' });
    }
    if (!response.parsed_output) {
      return res.status(502).json({ error: 'Could not read the ideas. Try again.' });
    }

    res.json({ ideas: response.parsed_output.ideas });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY is missing or invalid on the server' });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'Rate limited. Wait a minute and retry.' });
    }
    if (err instanceof Anthropic.APIError) {
      return res.status(502).json({ error: `Claude API error ${err.status}: ${err.message}` });
    }
    res.status(500).json({ error: err.message });
  }
};
