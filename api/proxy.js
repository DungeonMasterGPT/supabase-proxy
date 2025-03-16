export default async function handler(req, res) {
  const SUPABASE_API_URL = "https://dyrzualjtyxkvcxyrorr.supabase.co/rest/v1";
  const SUPABASE_API_KEY = "YOUR_SUPABASE_API_KEY"; // replace with your key!

  const targetUrl = `${SUPABASE_API_URL}${req.url}`;

  const options = {
    method: req.method,
    headers: {
      "apikey": SUPABASE_API_KEY,
      "Authorization": `Bearer ${SUPABASE_API_KEY}`,
      "Content-Type": "application/json"
    },
  };

  if (req.method !== "GET" && req.body) {
    options.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(targetUrl, options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
