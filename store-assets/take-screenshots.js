/**
 * Sjalavard Soul Care — App Store Screenshots
 * Node: NODE_PATH=/Users/sanctuarychurch/.npm/_npx/361ceb562f3b3235/node_modules node take-screenshots.js
 *
 * Captures 5 screens at iPhone 15 Pro Max dimensions (1290×2796 @ 3x).
 * Mocks PocketBase API to return Alex tour data so profile/sessions render populated.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// iPhone 15 Pro Max: 430×932 CSS px @ 3x DPR = 1290×2796 actual px
const DEVICE = {
  viewport: { width: 430, height: 932 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
};

// ── Alex's tour profile data (matches Sjalavard index.html tour bootstrap) ──
const now = new Date();
const daysAgo = n => { const d = new Date(now); d.setDate(d.getDate() - n); return d; };
const mdy = d => `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
const iso = d => d.toISOString();

const ALEX_PROFILE = {
  firstName: "Alex",
  bio: "Trying to walk through a season of anxiety and people-pleasing. Coming back to faith after years of distance. Grateful for a space to be honest.",
  struggles: ["Anxiety", "Overthinking", "People-pleasing"],
  goals: ["Inner peace", "Trusting God more"],
  authors: ["Brennan Manning", "Henri Nouwen", "C.S. Lewis"],
  profile_done: true,
  focus: {
    id: "f_tour_pp",
    title: "People-pleasing with boundaries",
    description: "I want to learn to say no without guilt and stop performing for approval.",
    startedAt: iso(daysAgo(18)),
    lastWorkedAt: iso(daysAgo(4)),
    sessionCount: 4,
    status: "active",
    thread: [
      { date: `Fri, ${daysAgo(4).toLocaleDateString("en-US",{month:"short",day:"numeric"})}`, savedAt: daysAgo(4).getTime(),
        insight: "Beneath the 'yes' is a fear that if I disappoint someone, I lose them.",
        actionStep: "Say no to one small thing this week without over-explaining.",
        moods: ["Anxious"], distortion: "Emotional reasoning" },
      { date: `Mon, ${daysAgo(10).toLocaleDateString("en-US",{month:"short",day:"numeric"})}`, savedAt: daysAgo(10).getTime(),
        insight: "Mind-reading kicks in the moment I feel someone's displeasure.",
        actionStep: "Notice one mind-read this week and name it out loud.",
        moods: ["Overwhelmed"], distortion: "Mind reading" }
    ]
  },
  patterns: [
    { id: "pt_tour_1", thought: "They're going to think I'm not enough.",
      truth: "I am God's beloved without performing.",
      firstLogged: iso(daysAgo(15)),
      catches: [
        { savedAt: daysAgo(0).getTime(), date: mdy(daysAgo(0)), note: "" },
        { savedAt: daysAgo(2).getTime(), date: mdy(daysAgo(2)), note: "" },
        { savedAt: daysAgo(4).getTime(), date: mdy(daysAgo(4)), note: "" }
      ], retired: false },
    { id: "pt_tour_2", thought: "If I say no, they'll be hurt.",
      truth: "A clear no can be a kindness — to them and to me.",
      firstLogged: iso(daysAgo(10)),
      catches: [
        { savedAt: daysAgo(1).getTime(), date: mdy(daysAgo(1)), note: "" },
        { savedAt: daysAgo(5).getTime(), date: mdy(daysAgo(5)), note: "" }
      ], retired: false }
  ],
  patternsArchive: [],
  memoryBank: [
    { id: "mb_tour_1", text: "My belovedness does not depend on their approval.", savedAt: iso(daysAgo(4)), source: "session" },
    { id: "mb_tour_2", text: "A clear no can be a kindness, not a betrayal.", savedAt: iso(daysAgo(7)), source: "user" },
    { id: "mb_tour_3", text: "Feeling guilty does not automatically mean I was wrong.", savedAt: iso(daysAgo(11)), source: "session" }
  ],
  checkins: {
    [mdy(daysAgo(0))]: { mood: 3, note: "Better today. Slept well.", date: iso(daysAgo(0)) },
    [mdy(daysAgo(1))]: { mood: 2, note: "Anxious about a meeting.", date: iso(daysAgo(1)) },
    [mdy(daysAgo(2))]: { mood: 4, note: "Quiet morning — prayer + coffee.", date: iso(daysAgo(2)) },
    [mdy(daysAgo(3))]: { mood: 2, note: "Hard conversation with a friend.", date: iso(daysAgo(3)) },
    [mdy(daysAgo(5))]: { mood: 3, note: "Felt God's nearness at church.", date: iso(daysAgo(5)) }
  },
  prayers: [
    { id:"pr1", title:"My mom's health", text:"For peace and clear results from her tests this week.", date:iso(daysAgo(2)), answered:false },
    { id:"pr2", title:"Freedom from approval-seeking", text:"Lord, help me rest in being your beloved rather than proving my worth.", date:iso(daysAgo(6)), answered:false },
    { id:"pr3", title:"Guidance at work", text:"Wisdom for the decision about the new role.", date:iso(daysAgo(10)), answered:true }
  ]
};

const ALEX_SESSIONS = [
  { id:"s1", user_id:"sj-tour-user", created_at:iso(daysAgo(1)),
    session_data:{ title:"Anxiety before the meeting",
      summary:"Explored the fear of disappointing others. Named the distortion (mind-reading). Reframed around being seen and loved as-is.",
      messages:[
        {role:"user",content:"I have a meeting tomorrow and I can't stop spiraling."},
        {role:"assistant",content:"That sounds exhausting. You're predicting what they'll think without evidence. What specifically makes you sure they'll land there?"},
        {role:"user",content:"I guess... nothing concrete. Just a feeling."},
        {role:"assistant",content:"Dr. Caroline Leaf would call that a 'toxic thought loop.' Brennan Manning would ask: who told you your belovedness depends on their approval?"}
      ] } },
  { id:"s2", user_id:"sj-tour-user", created_at:iso(daysAgo(4)),
    session_data:{ title:"Hard conversation with a friend",
      summary:"Processed guilt and truth-telling. Identified emotional reasoning. Landed in 1 Corinthians 13.",
      messages:[
        {role:"user",content:"I said something honest to my friend and now I feel awful."},
        {role:"assistant",content:"Your feeling guilty doesn't automatically mean you were wrong. What would you tell a friend who'd said the same thing?"}
      ] } },
  { id:"s3", user_id:"sj-tour-user", created_at:iso(daysAgo(9)),
    session_data:{ title:"Coming back to prayer",
      summary:"Talked through the long drought and fear of restarting. Lewis on practicing the presence. First small step: 2 minutes of silence each morning.",
      messages:[
        {role:"user",content:"I haven't prayed in months. I don't even know how to start."},
        {role:"assistant",content:"You don't have to start where you left off. C.S. Lewis would say the first word of prayer is often just 'Here I am.'"}
      ] } }
];

// ── Mock PocketBase API ──
// NOTE: Playwright routes are LIFO — last registered = highest priority.
// Register the catch-all FIRST, specific routes LAST.
async function setupMocks(page) {
  const PB = 'https://foster-hope-pb.fly.dev';

  // Catch-all for all other PocketBase requests (lowest priority — registered first)
  await page.route(`${PB}/**`, route => {
    const method = route.request().method();
    if (method === 'GET') {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [] }) });
    } else {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'mock_write' }) });
    }
  });

  // Health check
  await page.route(`${PB}/api/health`, route => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ code: 200, message: 'API is healthy.' }) });
  });

  // Sessions read (higher priority — registered after catch-all)
  await page.route(`${PB}/api/collections/sja_sessions/records**`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        page: 1, perPage: 200, totalItems: 3, totalPages: 1,
        items: ALEX_SESSIONS
      })
    });
  });

  // Profile read (highest priority — registered last)
  // Handles GET queries AND specific record GETs (for Fort Knox before-write snapshot)
  await page.route(`${PB}/api/collections/sja_user_data/records**`, route => {
    const method = route.request().method();
    if (method === 'GET') {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          page: 1, perPage: 1, totalItems: 1, totalPages: 1,
          items: [{
            id: 'pb_tour_profile',
            netlify_user_id: 'sj-tour-user',
            email: 'tour@sjalavard.com',
            data: ALEX_PROFILE,
            updated_at: iso(daysAgo(1)),
            created_at: iso(daysAgo(30))
          }]
        })
      });
    } else {
      // Writes (POST, PATCH) — fulfill with success but don't overwrite mock
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'pb_tour_profile' }) });
    }
  });
}

async function hideTourUI(page) {
  await page.evaluate(() => {
    const banner = document.getElementById('sj-tour-banner');
    if (banner) { banner.style.display = 'none'; banner.style.pointerEvents = 'none'; }
    const card = document.getElementById('sj-tour-card');
    if (card) { card.style.display = 'none'; card.style.pointerEvents = 'none'; }
    const also = document.getElementById('sj-also-overlay');
    if (also) { also.style.display = 'none'; also.style.pointerEvents = 'none'; }
    document.body.style.paddingTop = '0';
  });
}

async function clickNav(page, tabText) {
  await page.evaluate((text) => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.trim() === text);
    if (btn) btn.click();
  }, tabText);
  await page.waitForTimeout(600);
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext(DEVICE);
  const page = await context.newPage();

  // Set up mocks BEFORE navigation
  await setupMocks(page);


  console.log('Loading tour URL...');
  await page.goto('https://sjalavard.com/?tour=1', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(7000); // Let PB mocks resolve + React re-render + prayers load

  await hideTourUI(page);
  await page.waitForTimeout(300);

  // --- Screenshot 1: Session (home) ---
  console.log('1: Session');
  await clickNav(page, 'Session');
  await hideTourUI(page);
  await page.screenshot({ path: path.join(OUT_DIR, '01-session.png') });

  // --- Screenshot 2: Prayer Journal ---
  console.log('2: Prayer');
  await clickNav(page, 'Prayer');
  await hideTourUI(page);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT_DIR, '02-prayer.png') });

  // --- Screenshot 3: Past Sessions ---
  console.log('3: Past Sessions');
  await clickNav(page, 'Past Sessions');
  await hideTourUI(page);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, '03-past-sessions.png') });

  // --- Screenshot 4: Profile ---
  console.log('4: Profile');
  await clickNav(page, 'Profile');
  await hideTourUI(page);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, '04-profile.png') });

  // --- Screenshot 5: Session active (start a session) ---
  console.log('5: Session in progress');
  await clickNav(page, 'Session');
  await hideTourUI(page);
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Regular Session') || b.textContent.includes('regular session'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(1500); // No need to wait for AI in mock mode
  await hideTourUI(page);
  await page.screenshot({ path: path.join(OUT_DIR, '05-session-active.png') });

  await browser.close();
  console.log('Done. Screenshots in:', OUT_DIR);
})();
