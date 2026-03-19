exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: { message: "API key not configured on server." } }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    // Ensure maxOutputTokens is at least 3000
    if (body.generationConfig) {
      body.generationConfig.maxOutputTokens = Math.max(
        body.generationConfig.maxOutputTokens || 0,
        3000
      );
    } else {
      body.generationConfig = { maxOutputTokens: 3000 };
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + GEMINI_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: { message: err.message || "Server error" } }),
    };
  }
};
