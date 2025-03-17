export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_API_KEY = process.env.SUPABASE_ANON_KEY; // Using anon key as per your instructions.

  if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    return res.status(500).json({
      error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables",
    });
  }

  // Build the full URL for Supabase REST API
  const targetUrl = `${SUPABASE_URL}/rest/v1${req.url}`;

  const options = {
    method: req.method,
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  // Include the request body for POST, PATCH, DELETE
  if (req.method !== "GET" && req.body) {
    options.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(targetUrl, options);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
