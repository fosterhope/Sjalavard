export async function onRequest() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Support — Sjalavard Soul Care</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0f2d42;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6;padding:0 16px 60px}
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
  h2{font-size:1.15rem;font-weight:700;color:#5bb8d4;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #1a3d54}
  section{margin-bottom:36px}
  .contact-card{background:#1a3d54;border:1px solid #2d6b8a;border-radius:12px;padding:20px 22px}
  .contact-card p{color:rgba(255,255,255,.85);font-size:.95rem;margin-bottom:10px}
  .contact-card p:last-child{margin-bottom:0}
  .pill{display:inline-block;background:#5bb8d4;color:#0f2d42;font-weight:700;font-size:.9rem;border-radius:8px;padding:8px 18px;margin-top:6px}
  .faq-item{background:#1a3d54;border:1px solid #2d6b8a;border-radius:12px;padding:16px 18px;margin-bottom:10px}
  .faq-q{font-weight:600;color:#fff;font-size:.95rem;margin-bottom:6px}
  .faq-a{color:rgba(255,255,255,.75);font-size:.9rem}
  .delete-card{background:#1e2d3a;border:2px solid #e08090;border-radius:12px;padding:20px 22px}
  .delete-card h3{color:#e08090;font-size:1rem;font-weight:700;margin-bottom:10px}
  .delete-card p{color:rgba(255,255,255,.8);font-size:.9rem;margin-bottom:10px}
  .delete-card p:last-child{margin-bottom:0}
  .delete-card ol{color:rgba(255,255,255,.8);font-size:.9rem;padding-left:20px}
  .delete-card ol li{margin-bottom:6px}
  .back-link{display:inline-flex;align-items:center;gap:6px;color:#8ab8cc;font-size:.9rem;margin-top:12px}
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
  </header>

  <section>
    <h2>Contact Support</h2>
    <div class="contact-card">
      <p>We're a small Christian ministry and we read every message. If you have a question, bug report, or need help with your account, email us directly:</p>
      <a class="pill" href="mailto:fosterhopefamily@gmail.com">fosterhopefamily@gmail.com</a>
      <p style="margin-top:14px;font-size:.85rem;color:#8ab8cc;">We typically respond within 1–2 business days.</p>
    </div>
  </section>

  <section>
    <h2>Common Questions</h2>

    <div class="faq-item">
      <div class="faq-q">How do I create an account?</div>
      <div class="faq-a">Open the app and tap <strong>Sign In or Create Account</strong>. Enter your email and a password of your choice. No credit card required — Sjalavard is free.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Is my data private?</div>
      <div class="faq-a">Yes. Your sessions and prayers are stored in a secure private database linked only to your account ID. We do not sell your data or show you ads. Your prayer journal is never processed by AI. See the Legal tab inside the app for the full privacy policy.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">I forgot my password. How do I reset it?</div>
      <div class="faq-a">On the sign-in screen, tap <strong>Forgot password?</strong>. Enter your email and we'll send a reset link. If you don't see it, check your spam folder.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Can I use Sjalavard on multiple devices?</div>
      <div class="faq-a">Yes. Sign in with the same account on any device and your sessions, prayers, and check-ins will sync automatically.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">The AI response seems off or unhelpful. What should I do?</div>
      <div class="faq-a">You can end the session and start a fresh one. Sjal works best when you describe what's weighing on you in your own words. If something goes wrong technically, email us and we'll look into it.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Is Sjalavard a replacement for therapy?</div>
      <div class="faq-a">No. Sjalavard is a spiritual companion, not a licensed therapist. If you are experiencing a mental health crisis, please contact the 988 Suicide &amp; Crisis Lifeline (call or text 988) or seek care from a qualified professional. The app will surface this information automatically if it detects crisis language in a session.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">What is Foster Hope Ministries?</div>
      <div class="faq-a">Foster Hope is a Christian nonprofit supporting foster and adoptive families. Sjalavard is one of our tools — built to help anyone seeking spiritual grounding and mental clarity. Learn more at <a href="https://fosterhopefamily.com">fosterhopefamily.com</a>.</div>
    </div>
  </section>

  <section>
    <h2>Account Deletion</h2>
    <div class="delete-card">
      <h3>How to delete your account</h3>
      <p>Deleting your account permanently removes all your sessions, prayers, daily check-ins, and profile data. This cannot be undone.</p>
      <p><strong>Option 1 — Delete from inside the app:</strong></p>
      <ol>
        <li>Open Sjalavard and sign in</li>
        <li>Tap the <strong>Profile</strong> tab</li>
        <li>Scroll to the bottom and tap <strong>Delete Account</strong></li>
        <li>Type <strong>DELETE</strong> to confirm</li>
      </ol>
      <p style="margin-top:12px"><strong>Option 2 — Request by email:</strong></p>
      <p>Email <a href="mailto:fosterhopefamily@gmail.com">fosterhopefamily@gmail.com</a> with subject line <em>Account Deletion Request</em>. Include the email address on your account. We will delete it within 24 hours and confirm by reply.</p>
    </div>
  </section>

  <a class="back-link" href="https://sjalavard.com">
    ← Back to Sjalavard
  </a>
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
