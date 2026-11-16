// Vercel Serverless Function: POST /api/chat
//
// The chat widget calls this endpoint instead of n8n directly. It signs each request with
// HMAC-SHA256 using a secret that only exists here (Vercel env var) and in n8n, so the secret
// never reaches the browser.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   POT_HMAC_SECRET        shared secret, same value as HMAC_SECRET in the n8n "HMAC + Security Check" node
//   N8N_CHAT_WEBHOOK_URL   e.g. https://<instance>.app.n8n.cloud/webhook/thepot-chat
// Optional:
//   ALLOWED_ORIGINS        comma-separated list of allowed site origins (defaults below)
//
// Signed string: "v1:<timestamp-ms>:<nonce>:" + JSON.stringify([sessionId, location, message])

import crypto from "node:crypto";

const DEFAULT_ORIGINS = [
  "https://thepot-steel.vercel.app",
  "https://www.thepot.se",
  "https://thepot.se",
];

const LOCATIONS = new Set(["karlskrona", "karlshamn"]);
const MAX_MESSAGE = 500;
const UPSTREAM_TIMEOUT_MS = 60_000;

function allowedOrigins() {
  const fromEnv = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return fromEnv.length ? fromEnv : DEFAULT_ORIGINS;
}

function originAllowed(req) {
  const origin = req.headers.origin;
  // Same-origin fetches from some browsers omit Origin on POST; fall back to the Host header.
  if (!origin) return true;
  if (allowedOrigins().includes(origin)) return true;
  // Vercel preview deployments of this project
  try {
    const host = new URL(origin).host;
    return host === req.headers.host;
  } catch {
    return false;
  }
}

function fail(res, status, reply) {
  res.status(status).json({ reply });
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return fail(res, 405, "Method not allowed.");
  }
  if (!originAllowed(req)) {
    return fail(res, 403, "Forbidden.");
  }

  const secret = process.env.POT_HMAC_SECRET;
  const upstream = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!secret || !upstream) {
    console.error("api/chat: missing POT_HMAC_SECRET or N8N_CHAT_WEBHOOK_URL");
    return fail(res, 500, "Något gick fel. Försök igen. / Something went wrong. Please try again.");
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const message = typeof body.message === "string" ? body.message : "";
  const location = typeof body.location === "string" ? body.location : "";

  if (!/^[A-Za-z0-9_-]{8,100}$/.test(sessionId) || !LOCATIONS.has(location)) {
    return fail(res, 400, "Något gick fel. Försök igen. / Something went wrong. Please try again.");
  }
  if (!message.trim() || message.length > MAX_MESSAGE) {
    return fail(res, 400, "Your message is empty or too long. Please try again.");
  }

  const ts = Date.now();
  const nonce = crypto.randomBytes(16).toString("hex");
  const signed = `v1:${ts}:${nonce}:` + JSON.stringify([sessionId, location, message]);
  const signature = crypto.createHmac("sha256", secret).update(signed, "utf8").digest("hex");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const r = await fetch(upstream, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pot-timestamp": String(ts),
        "x-pot-nonce": nonce,
        "x-pot-signature": signature,
      },
      body: JSON.stringify({ sessionId, message, location }),
      signal: controller.signal,
    });
    const text = await r.text();
    const data = safeParse(text);
    if (!data) {
      return fail(res, 502, "Något gick fel. Försök igen. / Something went wrong. Please try again.");
    }
    // Pass through only the fields the widget uses.
    return res.status(r.ok ? 200 : r.status).json({
      output: data.output,
      reply: data.reply,
    });
  } catch (err) {
    console.error("api/chat upstream error:", err?.name || err);
    return fail(res, 504, "Något gick fel. Försök igen. / Something went wrong. Please try again.");
  } finally {
    clearTimeout(timer);
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
