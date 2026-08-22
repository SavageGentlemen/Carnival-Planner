/**
 * Live Resend Email Verification Test
 */
require('dotenv').config({ path: './functions2/.env' });
const emailService = require('../emailService');

async function testLiveSend() {
  console.log("Sending live test email to savgmen@gmail.com via Resend API...");

  const result = await emailService.sendMail({
    to: 'savgmen@gmail.com',
    from: 'onboarding@resend.dev',
    subject: '🎭 Welcome to Caribbean Carnival Planner (Resend Connected)',
    html: '<div style="font-family:sans-serif;padding:20px;background:#111827;color:#fff;border-radius:12px;"><h1 style="color:#ec4899;">🎭 Resend is Connected!</h1><p>Your Caribbean Carnival Planner email infrastructure is now actively wired to Resend.</p><p style="color:#34d399;">Order confirmations, squad vault invites, and newsletters are ready to dispatch.</p></div>',
    text: 'Resend is connected to Caribbean Carnival Planner! Order confirmations and vault invites are ready.'
  });

  console.log("Live Send Result:", result);
}

testLiveSend().catch(console.error);
