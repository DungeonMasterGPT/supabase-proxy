export default async function handler(req, res) {
  // Get environment variables from Vercel
  const SUPABASE_URL = process.env.SUPABASE_URL; // Example: https://dyrzuuljtyxkvcxyorrr.supabase.co
  const SUPABASE_API_KEY = process.env.SUPABASE_ANON_KEY; // Example: your anon key

  if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    return res.status(500).json({
      error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables"
    });
  }

  // Construct target URL by adding the path from the GPT request
  const targetUrl = `${SUPABASE_URL}/rest/v1${req.url}`;

  // Configure request options
  const options = {
    method: req.method,
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`,
      "Content-Type": "application/json"
    }
  };

  // Attach body for PATCH, POST, PUT, DELETE requests
  if (req.method !== "GET" && req.body) {
    options.body = JSON.stringify(req.body);
  }

  try {
    // Forward the request to Supabase
    const response = await fetch(targetUrl, options);
    const data = await response.json();

    // Return the Supabase response to the client
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({
      error: "Proxy error",
      details: error.message
    });
  }
}
