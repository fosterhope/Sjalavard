// sb-token.js — bridge Netlify Identity → Supabase JWT
//
// Why this exists:
//   Sjalavard authenticates users through Netlify Identity, but its data lives
//   in Supabase. To use Supabase Row-Level Security policies of the form
//   `auth.uid() = user_id`, the client must send a JWT signed with the
//   Supabase project's JWT secret (NOT the Netlify Identity JWT).
//
// What this function does:
//   1. Receives the Netlify Identity JWT in the Authorization header. Netlify
//      pre-validates it before invoking this function and exposes the user
//      via context.clientContext.user — so we don't have to verify ourselves.
//   2. Mints a fresh Supabase-compatible JWT containing the NI user UUID as
//      `sub`, the user's email, and `role: "authenticated"`.
//   3. Signs it with HS256 using SUPABASE_JWT_SECRET (env var, configured in
//      Netlify project settings — never committed to source).
//   4. Returns { token, expiresAt } for the client to use as Bearer auth on
//      its Supabase requests until the token expires (1 hour).
//
// If SUPABASE_JWT_SECRET is missing, this function returns 500 and the client
// silently falls back to anon-key auth — meaning RLS-disabled tables keep
// working. This makes the rollout safe to deploy before the secret is set.

const crypto = require("crypto");

function b64url(input) {
  return Buffer.from(input).toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

exports.handler = async function (event, context) {
  // Allow CORS preflight (Netlify handles same-origin fine, but be safe)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      }
    };
  }
  if (event.httpMethod !== "POST" && event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // Netlify auto-validates the NI JWT and populates context.clientContext.user
  // when the request includes "Authorization: Bearer <ni_jwt>".
  var user = context.clientContext && context.clientContext.user;
  if (!user || !user.sub) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Not authenticated. Sign in first." })
    };
  }

  var secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "SUPABASE_JWT_SECRET not configured on server." })
    };
  }

  var now = Math.floor(Date.now() / 1000);
  var ttl = 60 * 60; // 1 hour
  var exp = now + ttl;

  var header = { alg: "HS256", typ: "JWT" };
  var payload = {
    sub: user.sub,
    role: "authenticated",
    aud: "authenticated",
    email: user.email || "",
    iat: now,
    exp: exp
  };

  var encoded = b64url(JSON.stringify(header)) + "." + b64url(JSON.stringify(payload));
  var sig = crypto.createHmac("sha256", secret).update(encoded).digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  var token = encoded + "." + sig;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify({
      token: token,
      expiresAt: exp * 1000
    })
  };
};
