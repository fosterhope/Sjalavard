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

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + GEMINI_KEY;
    const fetchBody = JSON.stringify(body);

    let response;
    let data;
    const maxRetries = 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: fetchBody,
      });

      data = await response.json();

      // Retry on overload (503) or rate limit (429)
      if ((response.status === 503 || response.status === 429) && attempt < maxRetries) {
        await new Promise(function(resolve) { setTimeout(resolve, 2000); });
        continue;
      }

      break;
    }

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
