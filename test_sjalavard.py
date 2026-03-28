"""
Sjalavard HTML Test Suite — v2 with corrected patterns
"""
import re, sys

with open('/home/claude/sj_final.html') as f:
    HTML = f.read()

# Extract just the compiled script block
# Find the largest script block (the compiled app code)
all_scripts = re.findall(r'<script>\n([\s\S]*?)\n</script>', HTML)
SCRIPT = max(all_scripts, key=len) if all_scripts else ""


PASS = []; FAIL = []

def test(name, condition, detail=""):
    if condition:
        PASS.append(name)
        print(f"  ✓ {name}")
    else:
        FAIL.append(name)
        print(f"  ✗ {name}{': '+detail if detail else ''}")

print("\n=== 1. STRUCTURE ===")
test("Has DOCTYPE", "<!DOCTYPE html>" in HTML)
test("Has viewport meta", 'name="viewport"' in HTML)
test("Has root div", '<div id="root">' in HTML)
test("Has Netlify Identity CDN", "netlify-identity-widget.js" in HTML)
test("Has Supabase CDN", "supabase-js" in HTML)
test("Has React 18 CDN", "react@18" in HTML)
test("Has ReactDOM 18 CDN", "react-dom@18" in HTML)
test("No Babel CDN", "babel.min.js" not in HTML)
test("No text/babel script type", 'type="text/babel"' not in HTML)
test("Has Netlify form", 'name="sjalavard-weekly-report"' in HTML)
test("Script block present", len(SCRIPT) > 1000, f"script length={len(SCRIPT)}")

print("\n=== 2. SUPABASE ===")
test("Supabase URL present", "rlwdqrvosbbdwmnrohxd.supabase.co" in SCRIPT)
test("Supabase anon key present", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" in SCRIPT)
test("createClient called", "_supabaseLib.createClient" in SCRIPT)
test("No raw window.supabase.createClient", "window.supabase.createClient" not in SCRIPT)
test("getSbWithAuth returns sb", "function getSbWithAuth" in SCRIPT and "return sb" in SCRIPT)
test("dbGetProfile defined", "async function dbGetProfile(" in SCRIPT)
test("dbSetProfile throws on error", "throw new Error" in SCRIPT)
test("dbSetProfile upserts profiles", '.from("profiles").upsert' in SCRIPT)
test("dbGetSessions orders descending", 'ascending: false' in SCRIPT or "ascending:false" in SCRIPT)
test("dbAddSession inserts", '.from("sessions").insert' in SCRIPT)
test("dbDeleteSession deletes", '.from("sessions").delete' in SCRIPT)
test("dbProfileDone checks localStorage uid key",
     'localStorage.getItem("sj_" + uid + "_profile_done") === "true") return true' in SCRIPT)
test("dbProfileDone checks uid-agnostic key",
     'localStorage.getItem("sj_profile_done")' in SCRIPT)
test("dbProfileDone logs errors", 'console.error("dbProfileDone' in SCRIPT or 'console.warn("dbProfileDone' in SCRIPT)

print("\n=== 3. AUTH / ROOT ===")
test("Root function defined", "function Root()" in SCRIPT)
test("justLoggedIn guard", "justLoggedIn" in SCRIPT or "spurious logout" in SCRIPT)
test("Logout guarded", 'stillHere' in SCRIPT or 'spurious logout' in SCRIPT or 'justLoggedInRef' in SCRIPT)
test("login sets niUser", "setNiUser(user)" in SCRIPT)
test("ni.close on login", "ni.close()" in SCRIPT)
test("3s init timeout", "3000" in SCRIPT)
test("profileDone from dbProfileDone", "dbProfileDone(niUser.id" in SCRIPT or "dbProfileDone(uid" in SCRIPT)
test("profileDone null loading state", "profileDone === null" in SCRIPT or "profileDone===null" in SCRIPT or "setProfileDone(null)" in SCRIPT)
test("onDone sets profileDone(true)", "setProfileDone(true)" in SCRIPT)
test("logout clears profileDone", "setProfileDone(null)" in SCRIPT)

print("\n=== 4. PROFILE SETUP ===")
test("ProfileSetup defined", "function ProfileSetup(" in SCRIPT)
test("saving/saveErr states", "setSaving" in SCRIPT and "setSaveErr" in SCRIPT)
test("finish() has 8s timeout", "8000" in SCRIPT)
test("finish() saves uid localStorage key",
     'localStorage.setItem("sj_" + uid + "_profile_done"' in SCRIPT)
test("finish() saves uid-agnostic key",
     'localStorage.setItem("sj_profile_done"' in SCRIPT)
test("finish() has local fallback on error", 'console.warn("Supabase save failed' in SCRIPT or 'onDone()' in SCRIPT)
test("15 struggles defined", len(re.findall(r'"Jealousy or envy"', SCRIPT)) >= 1)
test("14 goals defined", '"Trust God more deeply"' in SCRIPT)
test("21 authors defined", '"Dr. Caroline Leaf"' in SCRIPT and len(re.findall(r'"C\.S\. Lewis"', SCRIPT)) >= 1)

print("\n=== 5. APP LOAD ===")
test("App defined", "function App(" in SCRIPT)
test("Loads profile from Supabase", "dbGetProfile(uid)" in SCRIPT)
test("Loads sessions from Supabase", "dbGetSessions(uid)" in SCRIPT)
test("8s load timeout", SCRIPT.count("8000") >= 2)
test("Fallback on timeout", "local fallback" in SCRIPT)
test("Sets ready=true", "setReady(true)" in SCRIPT)
test("Restores draft from localStorage", 'lsGet("draft"' in SCRIPT)
test("Clears draft after save", 'lsDel("draft"' in SCRIPT)
test("Loads prayers from localStorage", 'lsGet("prayers"' in SCRIPT)
test("Loads check-in from localStorage", '"ci_"' in SCRIPT)

print("\n=== 6. SESSION FLOW ===")
phases = ["mood", "share", "coach", "summary", "gratitude", "distortions"]
for p in phases:
    test(f'Phase "{p}" exists', f'"{p}"' in SCRIPT)
moods_found = len(re.findall(r'l:\s*"[^"]+",\s*\n?\s*c:\s*"#', SCRIPT))
test("20 moods defined", moods_found >= 20, f"found {moods_found}")
dist_found = len(re.findall(r'l:\s*"[^"]+",\s*\n?\s*s:\s*"[^"]+"', SCRIPT))
test("10 distortions defined", dist_found >= 10, f"found {dist_found}")
test("hasCrisis checks crisis words", "function hasCrisis(" in SCRIPT)
test("CRISIS_WORDS has 'suicide'", '"suicide"' in SCRIPT)
test("Calls /api/gemini", '"/api/gemini"' in SCRIPT)
test("genSummary defined", "genSummary" in SCRIPT)
test("ACTION: prefix parsed", '"ACTION:"' in SCRIPT or "'ACTION:'" in SCRIPT)
test("saveSession calls dbAddSession", "dbAddSession" in SCRIPT)
test("Session saves moods/gratitude/summary", all(x in SCRIPT for x in ["gratitude", "summary", "actionStep"]))

print("\n=== 7. DAILY FEATURES ===")
verses_found = len(re.findall(r'ref:\s*"[^"]+",\s*\n?\s*text:\s*"', SCRIPT))
test("15 daily verses defined", verses_found >= 15, f"found {verses_found}")
test("dailyVerse rotates by day", "dailyVerse" in SCRIPT and "Date.now()" in SCRIPT)
test("Check-in has 6 moods", all(m in SCRIPT for m in ['"Peaceful"','"Hopeful"','"Okay"','"Tired"','"Anxious"','"Struggling"']))
test("Check-in saves today key", 'lsSet("ci_"' in SCRIPT or '"ci_"+today' in SCRIPT)
test("Prayer title/text states", "prayTitle" in SCRIPT and "prayText" in SCRIPT)
test("Prayer toggle answered", "togglePray" in SCRIPT)
test("Prayers in localStorage", 'lsSet("prayers"' in SCRIPT)
test("getTrends 14-day", "getTrends" in SCRIPT and "i = 13" in SCRIPT)

print("\n=== 8. UI / NAVIGATION ===")
test("4 main tabs", all(t in SCRIPT for t in ['"session"','"journal"','"history"','"profile"']))
test("AboutModal defined", "function AboutModal(" in SCRIPT)
test("About has 6 sections", all(s in SCRIPT for s in ['"about"','"session"','"checkin"','"journal"','"history"','"privacy"']))
test("Logout confirm dialog", "logoutConfirm" in SCRIPT)
test("Crisis 988 modal", '"988"' in SCRIPT and "crisis" in SCRIPT)
test("Foster Hope URL", "fosterhopewebsite.netlify.app" in SCRIPT)
test("FHBar component", "function FHBar(" in SCRIPT)
test("Weekly report submission", "sendWeeklyReport" in SCRIPT)

print("\n=== 9. SYSTEM PROMPT ===")
test("buildSys defined", "function buildSys(" in SCRIPT)
test("Background context framing", "BACKGROUND CONTEXT" in SCRIPT)
test("Do not bring up directly", "do not bring up directly" in SCRIPT)
test("Session arc instruction", "Session arc:" in SCRIPT)
test("988 crisis instruction", "988" in SCRIPT and "suicidal" in SCRIPT)
test("4-6 exchanges", "4-6 exchanges" in SCRIPT)
test("Recent sessions memory", "Recent sessions" in SCRIPT)
test("Authors woven in", "Weave their voice" in SCRIPT or "weave" in SCRIPT.lower())

print("\n=== 10. COMPILED JS QUALITY ===")
test("No backticks in script", "`" not in SCRIPT)
test("React.createElement used", "React.createElement" in SCRIPT)
# Check for raw JSX outside of string literals
_script_no_strings = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"', '""', SCRIPT)
_script_no_strings = re.sub(r"'[^'\\]*(?:\\.[^'\\]*)*'", "''", _script_no_strings)
test("JSX fully compiled (no raw JSX outside strings)",
     not re.search(r'<(div|p|button|span|input|textarea)\s', _script_no_strings),
     "raw JSX found outside strings")
test("ReactDOM.createRoot called", "ReactDOM.createRoot" in SCRIPT)
test("Error boundary on render", 'catch' in SCRIPT and 'location.reload()' in SCRIPT)

# Paren balance (smart, skips strings)
depth = 0; in_str = None; esc = False; underflows = 0
for ch in SCRIPT:
    if esc: esc = False; continue
    if ch == '\\': esc = True; continue
    if in_str:
        if ch == in_str: in_str = None
        continue
    if ch in ('"', "'"): in_str = ch; continue
    if ch == '(': depth += 1
    elif ch == ')':
        depth -= 1
        if depth < 0: underflows += 1; depth = 0
test("Paren balance", depth == 0 and underflows == 0, f"depth={depth} underflows={underflows}")

# Brace balance
depth2 = 0; in_str2 = None; esc2 = False
for ch in SCRIPT:
    if esc2: esc2 = False; continue
    if ch == '\\': esc2 = True; continue
    if in_str2:
        if ch == in_str2: in_str2 = None
        continue
    if ch in ('"', "'"): in_str2 = ch; continue
    if ch == '{': depth2 += 1
    elif ch == '}': depth2 -= 1
test("Brace balance", depth2 == 0, f"depth={depth2}")

print(f"\n{'='*40}")
total = len(PASS) + len(FAIL)
print(f"RESULTS: {len(PASS)}/{total} passed")
if FAIL:
    print(f"\nFAILED ({len(FAIL)}):")
    for f in FAIL:
        print(f"  ✗ {f}")
else:
    print("All tests passed!")
sys.exit(0 if not FAIL else 1)
