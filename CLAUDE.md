# CLAUDE.md — Sjalavard Soul Care App
> Read this file at the start of every session before making any changes.
> Act as a Senior Software Engineer: clean code, SOLID principles, data integrity, XSS/CSRF prevention, defensive error handling, verify before delivering.

---

## Mission
**"Sjalavard walks with you through the thoughts that weigh you down — helping you catch the lies your mind tells you, replace them with what is actually true, and find your way back to freedom. All grounded in biblical truth and practical principles that work."**

**Tagline:** *Renew your mind. Reclaim your life.* — Romans 12:2

The silent backbone of every session is David Burns' CBT framework from *Feeling Good* (chapters 1-4): identifying cognitive distortions and replacing distorted automatic thoughts with accurate ones. This runs in the background — never named explicitly, but woven into how Sjal listens, responds, and guides.

---

## Project Overview
- **App:** Sjalavard Soul Care — AI-powered Christian life coaching
- **Live URL:** https://sjalavard.com
- **GitHub:** https://github.com/fosterhope/sjalavard (private)
- **Stack:** Single HTML file, React 18 (pre-compiled, NO Babel), PocketBase, Cloudflare Pages
- **Ministry:** Foster Hope Ministries — https://fosterhopefamily.com

---

## Architecture

### Single File Rule
The entire app lives in **one file: index.html**. No separate JS, CSS, or component files (except CF Pages Functions in `functions/api/`).

### CDNs (do not change these)
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
```
> NOTE: Supabase CDN is still loaded for legacy data reads. Auth is PocketBase only. Do NOT add the Netlify Identity widget script.

### NO BABEL — Pre-compiled Only
- There is **no Babel CDN** and **no type="text/babel"** script tag
- All JSX must be **pre-compiled to React.createElement** calls before inserting into the file
- To compile: extract script → run through @babel/core with @babel/preset-react → inject back
- **Never insert raw JSX** into the script block

---

## Credentials

### PocketBase (Auth + primary data store)
- **URL:** https://foster-hope-pb.fly.dev
- **Admin panel:** https://foster-hope-pb.fly.io/_/
- **Admin email:** fosterhopefamily@gmail.com
- **Admin password:** Romans828!
- **Auth:** Email/password via PocketBase `users` collection
- **Collections:** `sja_user_data` (profile/checkins/prayers), `sja_sessions`
- **Auth token:** stored in localStorage as `sj_pb_auth` (14-day expiry)
- The `window.netlifyIdentity` object in code is a **PocketBase compatibility stub** — it wraps PocketBase auth with the same API surface so the rest of the app is unchanged

### Supabase (legacy data — read-only migration path)
- **URL:** https://rlwdqrvosbbdwmnrohxd.supabase.co
- **Anon key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsd2RxcnZvc2JiZHdtbnJvaHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MjA1NjQsImV4cCI6MjA4ODk5NjU2NH0.x1FzJ-qYL-27a-CMABhNzOGlpCH3nbeH42Nls7XkQX8
- **Tables:** profiles (id, email, data, updated_at), sessions (id, user_id, data, created_at)
- **RLS:** DISABLED — do not re-enable
- Supabase is legacy. New writes go to PocketBase. Do not expand Supabase usage.

### Data Schema
All user data stored in profiles.data JSON column (Supabase) / sja_user_data (PocketBase):
- firstName, bio, struggles, goals, focus, focusHistory, authors, profile_done
- checkins: { "4/7/2026": { mood, note, date } }
- prayers: [{ id, title, text, date, answered }]

### Cloudflare Pages
- **Project:** sjalavard-soul-care
- **Env var:** GEMINI_API_KEY (set in CF Pages dashboard → Settings → Environment Variables)
- **Function:** functions/api/gemini.js proxies Gemini API

### Gemini
- **Model:** gemini-2.5-flash
- **Route:** /api/gemini → CF Pages Function → Gemini API
- **Key:** Stored as CF Pages env var only, never in client code

---

## Color Palette
bg:#0f2d42, surf:#1a3d54, card:#1e4560, border:#2d6b8a, acc:#5bb8d4, white:#fff, rose:#e08090, muted:#8ab8cc, dim:#4a7a94, success:#5bb8a0

---

## Data Storage

### PocketBase (canonical — syncs across all devices)
- Profile data (name, bio, struggles, focus/focusHistory, authors, profile_done)
- Sessions
- Daily check-ins
- Prayer journal

### localStorage (device-only cache)
- Draft sessions (in-progress, not yet saved)
- PocketBase auth token (`sj_pb_auth`)
- profile_done flag cached for fast login
- Weekly report/backup timestamps

**PocketBase is the source of truth. localStorage is a performance cache only.**

---

## Auth Flow (Root component)
- `window.netlifyIdentity` is a PocketBase stub — same event API (`on`, `open`, `logout`, `currentUser`), backed by PocketBase
- On init: restores session from `sj_pb_auth` in localStorage if token not expired
- On login: fires `login` event with `{ id, email, user_metadata: {} }`
- `justLoggedInRef` set to true for 5 seconds after login — spurious logout events ignored
- On valid user → fetch profile + sessions + checkins from Supabase in parallel → store in window._sjPreloadedData → set profileDone
- Check localStorage first for profile_done (instant). If found, show app immediately.
- Root waits for profileDone !== null before rendering App (shows "One moment..." spinner)

## Profile Setup
- NOT a forced gate — users go to App immediately, "Complete Setup" banner shown if profileDone===false
- finish() saves localStorage FIRST, then Supabase with retry (2 attempts, 8s each)
- Auto-repair: if localStorage says done but Supabase doesn't, silently re-saves
- Steps: Welcome → Name + Bio → What You're Working Through (free text) → Focused Goal (free text) → Authors (max 5)

## Session Arc (buildSys)
- Response 1: CBT — David Burns, identify cognitive distortion, one question
- Response 2: Dr. Caroline Leaf — neuroscience of thought, one question
- Response 3: User's chosen author — woven in naturally, one question
- Response 4: Summary + 3 guided reflection questions → Gratitude

## Admin Panel
- Code: 0603
- Access: Landing screen "Admin" link + Profile tab bottom (faint)

---

## DO NOTs

### Code
- DO NOT use Babel standalone CDN
- DO NOT insert raw JSX into the script block — must pre-compile first
- DO NOT use const or let at module scope in JSX source — use var
- DO NOT use template literals (backticks) in JSX source
- DO NOT store Gemini API key in client code
- DO NOT call window.location.reload() after profile setup — use setProfileDone(true)
- DO NOT trust NI event payloads directly — always verify user.id exists
- DO NOT ship [SJ] debug logs — remove before final build
- DO NOT add Netlify Identity widget script — auth is PocketBase now
- DO NOT use window.supabase.createClient — use _supabaseLib.createClient (legacy reads only)

### UX / Content
- DO NOT have Sjal reference struggles/goals lists by name
- DO NOT force author references — natural only
- DO NOT remove justLoggedInRef guard
- DO NOT remove crisis detection and 988 modal

---

## Testing — ALWAYS RUN BEFORE FINISHING

```bash
python3 test_sjalavard.py
```

- Must pass 100/100 before finishing
- Test extracts the LARGEST script block (not the first)

---

## Deployment
1. Edit index.html
2. Run `python3 test_sjalavard.py` — must be 100/100
3. `git add index.html && git commit -m "..." && git push` — triggers CF Pages auto-deploy
4. OR: `wrangler pages deploy . --project-name sjalavard-soul-care` for immediate manual deploy

---

## Sjal — AI Coach Persona
- Name: Sjal (from "själavård" — Swedish for soul care)
- Tagline: Renew your mind. Reclaim your life.
- Approach: CBT (Burns) + neuroscience (Leaf) + biblical truth + Spirit-led pastoral care
- Voices: Manning, Willard, Foster, Lewis, Nouwen, Leaf — naturally, never forced
- Session arc: Response 1=CBT → Response 2=Leaf → Response 3=Author → Response 4=Summary+3Q → Gratitude
- Crisis: Acknowledge pain, provide 988, don't proceed until safety addressed
- Profile context: bio, struggles, focused goal as BACKGROUND only — never referenced directly
