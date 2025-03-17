export default async function handler(req, res) {
  // Get environment variables from Vercel project settings
  const SUPABASE_URL = process.env.SUPABASE_URL; // Example: https://dyrzualjtyxkvcxyrorr.supabase.co
  const SUPABASE_API_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5cnp1YWxqdHl4a3ZjeHlyb3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNzkyNjEsImV4cCI6MjA1NzY1NTI2MX0.tNT0GvyGuBCozrUChFzZetzuwNn21e443EWjcLs51-w

  if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    return res.status(500).json({
      error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables",
    });
  }

  // Construct the full Supabase REST endpoint
  const targetUrl = `${SUPABASE_URL}/rest/v1${req.url}`;

  // Set up request options
  const options = {
    method: req.method,
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  // Attach the body for methods that send data (POST, PATCH, DELETE)
  if (req.method !== "GET" && req.body) {
    options.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(targetUrl, options);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({
      error: "Proxy error",
      details: error.message,
    });
  }
}
