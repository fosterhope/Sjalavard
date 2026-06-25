export async function onRequest() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Privacy Policy — Sjalavard Soul Care</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0f2d42;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.7;padding:0 16px 60px}
  a{color:#5bb8d4;text-decoration:none}
  a:hover{text-decoration:underline}
  .wrap{max-width:640px;margin:0 auto}
  header{padding:32px 0 24px;border-bottom:1px solid #2d6b8a;margin-bottom:32px}
  .logo{display:flex;align-items:center;gap:12px;margin-bottom:8px}
  .logo-mark{width:40px;height:40px;background:#5bb8d4;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .logo-mark svg{width:22px;height:22px;stroke:#0f2d42;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .logo-text{font-size:1.3rem;font-weight:700;color:#fff}
  .logo-sub{font-size:.8rem;color:#8ab8cc;letter-spacing:.06em;text-transform:uppercase}
  .tagline{font-size:.95rem;color:#8ab8cc;font-style:italic;margin-top:4px}
  h2{font-size:1.1rem;font-weight:700;color:#5bb8d4;margin:28px 0 10px;padding-bottom:6px;border-bottom:1px solid #1a3d54}
  h3{font-size:.95rem;font-weight:700;color:#fff;margin:18px 0 6px}
  p{color:rgba(255,255,255,.82);font-size:.92rem;margin-bottom:10px}
  ul,ol{color:rgba(255,255,255,.82);font-size:.92rem;padding-left:22px;margin-bottom:10px}
  li{margin-bottom:5px}
  .highlight{background:#1a3d54;border:1px solid #2d6b8a;border-radius:10px;padding:14px 18px;margin:14px 0}
  .highlight p{margin-bottom:0}
  .updated{font-size:.8rem;color:#8ab8cc;margin-top:6px}
  .back-link{display:inline-flex;align-items:center;gap:6px;color:#8ab8cc;font-size:.9rem;margin-top:20px}
  .back-link:hover{color:#5bb8d4}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="logo">
      <div class="logo-mark">
        <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div>
        <div class="logo-text">Sjalavard</div>
        <div class="logo-sub">Soul Care</div>
      </div>
    </div>
    <p class="tagline">Renew your mind. Reclaim your life. — Romans 12:2</p>
    <p class="updated">Privacy Policy · Effective June 2026</p>
  </header>

  <div class="highlight">
    <p><strong>Short version:</strong> No ads. No tracking. No data selling. Your prayer journal is never processed by AI. You can delete your account and all data at any time.</p>
  </div>

  <h2>Who We Are</h2>
  <p>Sjalavard Soul Care is built and operated by <strong>Foster Hope Ministries</strong>, a Christian nonprofit supporting foster and adoptive families. We are not a data company. We collect only what is necessary to provide the app, and nothing more.</p>
  <p>Contact: <a href="mailto:fosterhopefamily@gmail.com">fosterhopefamily@gmail.com</a></p>

  <h2>What We Collect</h2>

  <h3>Account Information</h3>
  <ul>
    <li><strong>Email address</strong> — required to create and sign in to your account</li>
    <li><strong>Account ID</strong> — a unique identifier generated when you register</li>
    <li>No name, phone number, or payment information is collected</li>
  </ul>

  <h3>App Content (stored and linked to your account)</h3>
  <ul>
    <li><strong>Coaching session messages</strong> — the conversation you have with Sjal during a session</li>
    <li><strong>Daily check-ins</strong> — your mood rating and optional note each day</li>
    <li><strong>Profile information</strong> — your first name, bio, struggles, goals, and author preferences</li>
    <li><strong>Prayer journal entries</strong> — title, text, and whether marked answered</li>
  </ul>

  <h3>Usage Analytics (not linked to your identity)</h3>
  <ul>
    <li>Page views, button taps, and time spent in the app</li>
    <li>This data goes to our own first-party analytics system — not Google Analytics or any advertising platform</li>
    <li>No name or email is attached to these events</li>
  </ul>

  <h3>Crash Reports (not linked to your identity)</h3>
  <ul>
    <li>Error messages and stack traces if the app crashes</li>
    <li>No personal content is included</li>
  </ul>

  <h2>What We Do NOT Collect</h2>
  <ul>
    <li>Location data</li>
    <li>Contacts or address book</li>
    <li>Photos, camera, or microphone</li>
    <li>Health or fitness data</li>
    <li>Financial information</li>
    <li>Browser history or search history</li>
    <li>Device identifiers beyond what is needed for crash reporting</li>
  </ul>

  <h2>How We Use Your Data</h2>

  <h3>To run the app</h3>
  <p>Your account email and ID are used to authenticate you and sync your data across devices.</p>

  <h3>AI coaching (session messages only)</h3>
  <p>When you send a message during a coaching session, that message — along with relevant session context — is sent to Google's Gemini AI to generate Sjal's response. <strong>Your prayer journal is never sent to AI.</strong></p>

  <h3>To improve the app</h3>
  <p>Anonymous usage analytics help us understand which features are useful. No personal content is used for this purpose.</p>

  <h2>Third Parties</h2>

  <h3>Google Gemini AI</h3>
  <p>Session content is processed by Google Gemini to generate AI coaching responses. This is governed by <a href="https://policies.google.com/privacy" target="_blank">Google's privacy policy</a>. We do not share your email, name, or prayer journal content with Google.</p>

  <h3>Infrastructure</h3>
  <ul>
    <li><strong>Cloudflare</strong> — hosts the app and handles web traffic</li>
    <li><strong>Fly.io / PocketBase</strong> — stores your account data securely</li>
  </ul>
  <p>We do not use advertising networks, data brokers, or social media tracking pixels.</p>

  <h2>Data Security</h2>
  <p>All data is transmitted over HTTPS/TLS. Your data is stored in a private database accessible only to your account. We do not share, sell, or rent your personal information to any third party for marketing purposes.</p>

  <h2>Your Rights</h2>

  <h3>Access and export</h3>
  <p>You can view all your stored data (sessions, prayers, check-ins, profile) from within the app at any time.</p>

  <h3>Deletion</h3>
  <p>You can delete your account and all associated data at any time:</p>
  <ul>
    <li><strong>In-app:</strong> Profile tab → scroll to bottom → Delete Account → type DELETE to confirm</li>
    <li><strong>By email:</strong> Send "Account Deletion Request" to <a href="mailto:fosterhopefamily@gmail.com">fosterhopefamily@gmail.com</a> with your account email. We will delete within 24 hours and confirm.</li>
  </ul>
  <p>Deletion URL for account removal requests: <a href="https://sjalavard.com/support">https://sjalavard.com/support</a></p>

  <h2>Children</h2>
  <p>Sjalavard addresses mental and emotional health topics including anxiety, cognitive distortions, and spiritual struggle. The app is not designed for children under 13. We do not knowingly collect data from children under 13. If you believe a child under 13 has created an account, please email us and we will delete it.</p>

  <h2>Crisis Safety</h2>
  <p>If the app detects language suggesting a mental health crisis during a session, it will surface the 988 Suicide &amp; Crisis Lifeline before continuing. This detection happens entirely within the app — crisis content is not stored separately or shared beyond normal session processing.</p>

  <h2>Changes to This Policy</h2>
  <p>If we make material changes to how we handle your data, we will update this page and note the effective date at the top. Continued use of the app after a change constitutes acceptance of the updated policy.</p>

  <h2>Contact</h2>
  <p>For privacy questions, data requests, or account deletion:</p>
  <p><a href="mailto:fosterhopefamily@gmail.com">fosterhopefamily@gmail.com</a></p>
  <p>Foster Hope Ministries · PO Box 2382, Vacaville, CA 95696</p>

  <a class="back-link" href="https://sjalavard.com">← Back to Sjalavard</a>
</div>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
