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
- **Live URL:** https://sjalavard.netlify.app
- **GitHub:** https://github.com/fosterhope/sjalavard (private)
- **Stack:** Single HTML file, React 18 (pre-compiled, NO Babel), Supabase, Netlify Identity
- **Ministry:** Foster Hope Ministries — https://fosterhopewebsite.netlify.app

---

## Architecture

### Single File Rule
The entire app lives in **one file: index.html**. No separate JS, CSS, or component files.

### CDNs (do not change these)
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
```

### NO BABEL — Pre-compiled Only
- There is **no Babel CDN** and **no type="text/babel"** script tag
- All JSX must be **pre-compiled to React.createElement** calls before inserting into the file
- To compile: extract script → run through @babel/core with @babel/preset-react → inject back
- **Never insert raw JSX** into the script block

---

## Credentials

### Supabase
- **Project ID:** rlwdqrvosbbdwmnrohxd
- **URL:** https://rlwdqrvosbbdwmnrohxd.supabase.co
- **Anon key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsd2RxcnZvc2JiZHdtbnJvaHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MjA1NjQsImV4cCI6MjA4ODk5NjU2NH0.x1FzJ-qYL-27a-CMABhNzOGlpCH3nbeH42Nls7XkQX8
- **Tables:** profiles (id, email, data, updated_at), sessions (id, user_id, data, created_at)
- **RLS:** DISABLED on both tables (do not re-enable — Netlify Identity JWT is incompatible)

### Supabase Data Schema
All user data stored in profiles.data JSON column:
- firstName, bio, struggles, goals, authors, profile_done
- checkins: { "4/7/2026": { mood, note, date } }
- prayers: [{ id, title, text, date, answered }]

### Netlify
- **Site:** sjalavard.netlify.app
- **Env var:** GEMINI_API_KEY (set in Netlify dashboard, never in code)
- **Function:** netlify/functions/gemini.js proxies Gemini API
- **Identity:** Enabled, registration open
- **Forms:** sjalavard-weekly-report, sjalavard-backup-notification (email: fosterhopefamily@gmail.com)

### Gemini
- **Model:** gemini-2.5-flash
- **Route:** /api/gemini → Netlify function → Gemini API
- **Key:** Stored as Netlify env var only, never in client code

---

## Color Palette
bg:#0f2d42, surf:#1a3d54, card:#1e4560, border:#2d6b8a, acc:#5bb8d4, white:#fff, rose:#e08090, muted:#8ab8cc, dim:#4a7a94, success:#5bb8a0

---

## Data Storage

### Supabase (canonical — syncs across all devices)
- Profile data (name, bio, struggles, goals, authors, profile_done)
- Sessions
- Daily check-ins (inside profiles.data.checkins)
- Prayer journal (inside profiles.data.prayers)

### localStorage (device-only cache)
- Draft sessions (in-progress, not yet saved)
- profile_done flag cached for fast login (sj_{uid}_profile_done, sj_profile_done, sj_email_{email}_profile_done)
- Weekly report/backup timestamps

**Supabase is the source of truth. localStorage is a performance cache only.**

---

## Auth Flow (Root component)
1. NI init fires — may receive config object (not real user). Only accept if user.id exists.
2. NI login fires — may also receive config object. Poll ni.currentUser() until real user with .id found.
3. justLoggedInRef set to true for 5 seconds after login — spurious logout events ignored.
4. On valid niUser → fetch profile + sessions + checkins from Supabase in parallel → store in window._sjPreloadedData → set profileDone.
5. Check localStorage first for profile_done (instant). If found, show app immediately.
6. Root waits for profileDone !== null before rendering App (shows "One moment..." spinner).

## Profile Setup
- NOT a forced gate — users go to App immediately, "Complete Setup" banner shown if profileDone===false
- finish() saves localStorage FIRST, then Supabase with retry (2 attempts, 8s each)
- Auto-repair: if localStorage says done but Supabase doesn't, silently re-saves
- Steps: Welcome → Name + Bio → Struggles → Goals (max 2, or custom) → Authors (max 5)

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
- DO NOT re-enable RLS on Supabase tables
- DO NOT use window.supabase.createClient — use _supabaseLib.createClient
- DO NOT use const or let at module scope in JSX source — use var
- DO NOT use template literals (backticks) in JSX source
- DO NOT store Gemini API key in client code
- DO NOT call window.location.reload() after profile setup — use setProfileDone(true)
- DO NOT trust NI event payloads directly — always verify user.id exists
- DO NOT ship [SJ] debug logs — remove before final build

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
2. Run python3 test_sjalavard.py — must be 100/100
3. Push to GitHub → Netlify auto-deploys in ~30 seconds

---

## Sjal — AI Coach Persona
- Name: Sjal (from "själavård" — Swedish for soul care)
- Tagline: Renew your mind. Reclaim your life.
- Approach: CBT (Burns) + neuroscience (Leaf) + biblical truth + Spirit-led pastoral care
- Voices: Manning, Willard, Foster, Lewis, Nouwen, Leaf — naturally, never forced
- Session arc: Response 1=CBT → Response 2=Leaf → Response 3=Author → Response 4=Summary+3Q → Gratitude
- Crisis: Acknowledge pain, provide 988, don't proceed until safety addressed
- Profile context: bio, struggles, goals as BACKGROUND only — never referenced directly

---

## Other Apps (future)
- Bibelgo — needs same upgrade
- Foster Family app — needs same upgrade
- Tables: bibelgo_profiles, bibelgo_sessions, fosterfamily_profiles, fosterfamily_sessions
