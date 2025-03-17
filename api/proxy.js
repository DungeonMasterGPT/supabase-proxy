export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL; // from Vercel environment
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; // from Vercel environment

  // Validate environment variables
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({
      error: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.',
    });
  }

  const targetUrl = `${SUPABASE_URL}/rest/v1${req.url}`;

  const options = {
    method: req.method,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  if (req.method !== 'GET' && req.body) {
    options.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(targetUrl, options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
}
