# CLAUDE.md — Sjalavard Soul Care App
> Read this file at the start of every session before making any changes.

---

## Project Overview
- **App:** Sjalavard Soul Care — AI-powered Christian life coaching
- **Live URL:** https://sjalavard.netlify.app
- **GitHub:** https://github.com/fosterhope/sjalavard (private)
- **Stack:** Single HTML file, React 18 (pre-compiled, NO Babel), Supabase, Netlify Identity
- **Ministry:** Foster Hope Ministries — https://fosterhopewebsite.netlify.app

---

## Architecture

### Single File Rule
The entire app lives in **one file: `index.html`**. No separate JS, CSS, or component files.

### CDNs (do not change these)
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
```

### NO BABEL — Pre-compiled Only
- There is **no Babel CDN** and **no `type="text/babel"`** script tag
- All JSX must be **pre-compiled to `React.createElement`** calls before inserting into the file
- To compile: extract script → run through `@babel/core` with `@babel/preset-react` → inject back
- **Never insert raw JSX** (`<div>`, `<p>`, etc.) into the script block

---

## Credentials

### Supabase
- **Project ID:** rlwdqrvosbbdwmnrohxd
- **URL:** https://rlwdqrvosbbdwmnrohxd.supabase.co
- **Anon key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsd2RxcnZvc2JiZHdtbnJvaHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MjA1NjQsImV4cCI6MjA4ODk5NjU2NH0.x1FzJ-qYL-27a-CMABhNzOGlpCH3nbeH42Nls7XkQX8
- **Tables:** `profiles` (id, email, data, updated_at), `sessions` (id, user_id, data, created_at)
- **RLS:** DISABLED on both tables (do not re-enable — Netlify Identity JWT is incompatible)

### Netlify
- **Site:** sjalavard.netlify.app
- **Env var:** `GEMINI_API_KEY` (set in Netlify dashboard, never in code)
- **Function:** `netlify/functions/gemini.js` proxies Gemini API
- **Identity:** Enabled, registration open

### Gemini
- **Model:** gemini-2.5-flash
- **Route:** `/api/gemini` → Netlify function → Gemini API
- **Key:** Stored as Netlify env var only, never in client code

---

## Color Palette
```js
C = {
  bg:      "#0f2d42",  // page background
  surf:    "#1a3d54",  // surface
  card:    "#1e4560",  // card background
  border:  "#2d6b8a",  // borders
  acc:     "#5bb8d4",  // accent (teal)
  white:   "#fff",
  rose:    "#e08090",  // danger/delete
  muted:   "#8ab8cc",  // muted text
  dim:     "#4a7a94",  // dimmed text
  success: "#5bb8a0"   // success/answered
}
```

---

## Key Functions & Rules

### Supabase Client
```js
// Always use getSbWithAuth() — never call sb directly
// RLS is disabled so no JWT needed, but keep the pattern for future
function getSbWithAuth() { return sb; }
```

### localStorage Keys
- All keyed as `sj_{uid}_{key}` via `lsGet(k, default, uid)` / `lsSet(k, v, uid)`
- `profile_done` stored as BOTH `sj_{uid}_profile_done` AND `sj_profile_done` (uid-agnostic backup)
- Prayers: local only, never in Supabase
- Check-ins: local only, keyed `ci_{date}`
- Draft sessions: local only, cleared on save

### Auth Flow (Root component)
1. Netlify Identity `init` → set user + ready
2. `login` event → set user, close modal, set `justLoggedIn=true` for 500ms
3. `logout` event → **ignore if `justLoggedIn` is true** (prevents login→logout race)
4. On user set → `dbProfileDone(uid)` → show Setup or App
5. `profile_done` checked from localStorage first, then Supabase

### Profile Setup
- One-time only — gated by `profile_done` flag
- Saves to Supabase AND localStorage on completion
- Has 8-second timeout on save with visible error message
- Steps: Welcome/Install → Name → Struggles → Goals → Authors

---

## DO NOTs

### Code
- **DO NOT** use Babel standalone CDN — app will show blank screen on mobile
- **DO NOT** insert raw JSX into the script block — must pre-compile first
- **DO NOT** re-enable RLS on Supabase tables — Netlify Identity JWT is incompatible
- **DO NOT** use `window.supabase.createClient` directly — use `_supabaseLib.createClient`
- **DO NOT** use `const` or `let` at module scope in JSX source — use `var`
- **DO NOT** use template literals (backticks) in JSX source
- **DO NOT** store Gemini API key in client code
- **DO NOT** call `window.location.reload()` after profile setup — use `setProfileDone(true)`

### UX / Content
- **DO NOT** have Sjal reference the user's struggles/goals list by name in sessions
- **DO NOT** make Sjal force author references — they should arise naturally
- **DO NOT** remove the `justLoggedIn` guard — it prevents the sign-in loop bug
- **DO NOT** use emoji placeholders (star, heart, check, search) — use actual symbols (✦ 💙 ✓ 🔍)
- **DO NOT** remove the crisis detection and 988 modal

---

## Testing — ALWAYS RUN BEFORE FINISHING

```bash
python3 test_sjalavard.py
```

**The test file is `test_sjalavard.py` in the repo root.**
- Run it against every new `index.html` before handing to the user
- Must pass **100/100** before finishing
- If tests fail, fix the issues and re-run until clean
- Tests cover: structure, Supabase, auth, setup, app load, session flow, daily features, UI, system prompt, compiled JS quality

---

## Deployment
1. Edit `index.html` (and optionally other files)
2. Run `python3 test_sjalavard.py` — must be 100/100
3. Push to GitHub → Netlify auto-deploys in ~30 seconds
4. Live at https://sjalavard.netlify.app

---

## Sjal — AI Coach Persona
- **Name:** Sjal (from "själavård" — Swedish for soul care)
- **Approach:** CBT (David Burns) + neuroscience + biblical truth + Spirit-led pastoral care
- **Voices:** Brennan Manning (grace), Dallas Willard (formation), Richard Foster (disciplines), CS Lewis (truth), Henri Nouwen (wounded healer), Dr. Caroline Leaf (neuroscience) — naturally, never forced
- **Session arc:** Opening=validate+1 question → Middle=distortion+biblical perspective+1 question → Closing=summarize+reframe+prayer+pause
- **Length:** 4-6 exchanges
- **Crisis:** Always acknowledge pain, provide 988, do not proceed until safety addressed
- **Profile context:** Passed as BACKGROUND only — Sjal never references struggles/goals lists directly

---

## Other Apps (future upgrades)
- **Bibelgo** — needs same Netlify Identity + Supabase + serverless function upgrade
- **Foster Family app** — same upgrade needed
- Supabase table names: `bibelgo_profiles`, `bibelgo_sessions`, `fosterfamily_profiles`, `fosterfamily_sessions`
