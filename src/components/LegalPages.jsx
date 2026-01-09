import React from 'react';
import { ArrowLeft, Shield, FileText, Cookie, CreditCard } from 'lucide-react';

const COMPANY_NAME = 'Carnival Planner';
const COMPANY_EMAIL = 'support@carnival-planner.com';
const LAST_UPDATED = 'December 12, 2025';

export function PrivacyPolicy({ onBack, logo }) {
  return (
    <LegalPageWrapper title="Privacy Policy" icon={Shield} onBack={onBack} logo={logo}>
      <p className="text-gray-400 mb-6">Last Updated: {LAST_UPDATED}</p>
      
      <Section title="1. Introduction">
        <p>{COMPANY_NAME} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").</p>
      </Section>

      <Section title="2. Information We Collect">
        <h4 className="font-semibold text-white mb-2">2.1 Personal Information</h4>
        <p className="mb-4">When you sign in with Google, we collect:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Email address</li>
          <li>Display name</li>
          <li>Profile picture URL</li>
          <li>Google account unique identifier</li>
        </ul>

        <h4 className="font-semibold text-white mb-2">2.2 User-Generated Content</h4>
        <p className="mb-4">Information you voluntarily provide includes:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Carnival planning data (budgets, schedules, packing lists)</li>
          <li>Costume and band information</li>
          <li>Squad member names and coordination data</li>
          <li>Uploaded media files (tickets, photos, documents)</li>
          <li>Map pins and location notes</li>
        </ul>

        <h4 className="font-semibold text-white mb-2">2.3 Payment Information</h4>
        <p>For premium subscriptions, payment processing is handled securely by Stripe. We do not store your credit card numbers. We receive only transaction confirmation, subscription status, and billing email from Stripe.</p>
      </Section>

      <Section title="3. How We Use Your Information">
        <ul className="list-disc list-inside space-y-2">
          <li>To provide and maintain the Service</li>
          <li>To authenticate your identity via Google Sign-In</li>
          <li>To process premium subscription payments via Stripe</li>
          <li>To sync your carnival planning data across devices</li>
          <li>To send push notifications for squad alerts (if enabled)</li>
          <li>To improve and optimize our Service</li>
          <li>To respond to your inquiries and support requests</li>
        </ul>
      </Section>

      <Section title="4. Data Storage and Security">
        <p className="mb-4">Your data is stored using Firebase services provided by Google:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Firebase Authentication:</strong> Manages secure sign-in</li>
          <li><strong>Cloud Firestore:</strong> Stores your planning data</li>
          <li><strong>Firebase Storage:</strong> Stores uploaded media files</li>
          <li><strong>Firebase Cloud Messaging:</strong> Delivers push notifications</li>
        </ul>
        <p>We implement industry-standard security measures including encryption in transit (TLS) and at rest. Firebase services are SOC 2 and ISO 27001 certified.</p>
      </Section>

      <Section title="5. Third-Party Services">
        <p className="mb-4">We use the following third-party services:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Google (Firebase):</strong> Authentication, database, storage, and hosting. <a href="https://firebase.google.com/support/privacy" className="text-pink-400 hover:underline" target="_blank" rel="noopener noreferrer">Firebase Privacy Policy</a></li>
          <li><strong>Stripe:</strong> Payment processing. <a href="https://stripe.com/privacy" className="text-pink-400 hover:underline" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a></li>
          <li><strong>OpenStreetMap:</strong> Map tiles for the Fete Map feature. <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" className="text-pink-400 hover:underline" target="_blank" rel="noopener noreferrer">OSM Privacy Policy</a></li>
        </ul>
      </Section>

      <Section title="6. Your Rights (GDPR/CCPA)">
        <p className="mb-4">Depending on your location, you may have the following rights:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
          <li><strong>Erasure:</strong> Request deletion of your personal data</li>
          <li><strong>Portability:</strong> Receive your data in a portable format</li>
          <li><strong>Opt-out:</strong> Opt out of certain data processing</li>
          <li><strong>Non-discrimination:</strong> We will not discriminate against you for exercising your rights</li>
        </ul>
        <p className="mt-4">To exercise these rights, contact us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-pink-400 hover:underline">{COMPANY_EMAIL}</a>.</p>
      </Section>

      <Section title="7. Data Retention">
        <p>We retain your personal data for as long as your account is active. If you delete your account, we will delete your data within 30 days, except where we are legally required to retain it.</p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.</p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
      </Section>

      <Section title="10. Contact Us">
        <p>If you have questions about this Privacy Policy, please contact us at:</p>
        <p className="mt-2"><a href={`mailto:${COMPANY_EMAIL}`} className="text-pink-400 hover:underline">{COMPANY_EMAIL}</a></p>
      </Section>
    </LegalPageWrapper>
  );
}

export function TermsOfService({ onBack, logo }) {
  return (
    <LegalPageWrapper title="Terms of Service" icon={FileText} onBack={onBack} logo={logo}>
      <p className="text-gray-400 mb-6">Last Updated: {LAST_UPDATED}</p>

      <Section title="1. Acceptance of Terms">
        <p>By accessing or using {COMPANY_NAME} ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
      </Section>

      <Section title="2. Description of Service">
        <p>{COMPANY_NAME} is a Progressive Web App that helps users plan and organize Caribbean carnival events. The Service includes free features (budget planning, scheduling, squad coordination) and premium subscription features (interactive maps, media vault, offline mode).</p>
      </Section>

      <Section title="3. User Accounts">
        <h4 className="font-semibold text-white mb-2">3.1 Registration</h4>
        <p className="mb-4">You must sign in with a valid Google account to use the Service. You are responsible for maintaining the security of your account.</p>
        
        <h4 className="font-semibold text-white mb-2">3.2 Account Responsibilities</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>You must provide accurate information</li>
          <li>You are responsible for all activities under your account</li>
          <li>You must notify us immediately of any unauthorized use</li>
        </ul>
      </Section>

      <Section title="4. Premium Subscriptions">
        <h4 className="font-semibold text-white mb-2">4.1 Subscription Plans</h4>
        <p className="mb-4">We offer monthly ($4.99/month) and yearly ($39.99/year) subscription plans. Prices are subject to change with reasonable notice.</p>

        <h4 className="font-semibold text-white mb-2">4.2 Billing</h4>
        <p className="mb-4">Subscriptions are billed in advance on a recurring basis. Payment is processed through Stripe. Your subscription will automatically renew unless you cancel before the renewal date.</p>

        <h4 className="font-semibold text-white mb-2">4.3 Cancellation</h4>
        <p>You may cancel your subscription at any time. You will continue to have access to premium features until the end of your current billing period. See our Refund Policy for details.</p>
      </Section>

      <Section title="5. User Content">
        <h4 className="font-semibold text-white mb-2">5.1 Your Content</h4>
        <p className="mb-4">You retain ownership of all content you upload to the Service (schedules, media, notes). By uploading content, you grant us a limited license to store, display, and process it to provide the Service.</p>

        <h4 className="font-semibold text-white mb-2">5.2 Content Restrictions</h4>
        <p className="mb-2">You agree not to upload content that:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Is illegal, harmful, or offensive</li>
          <li>Infringes on intellectual property rights</li>
          <li>Contains malware or malicious code</li>
          <li>Violates others' privacy</li>
        </ul>
      </Section>

      <Section title="6. Acceptable Use">
        <p className="mb-2">You agree not to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the Service for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the Service</li>
          <li>Reverse engineer or decompile the Service</li>
          <li>Use automated systems to access the Service without permission</li>
        </ul>
      </Section>

      <Section title="7. Intellectual Property">
        <p>The Service, including its design, features, and content (excluding user content), is owned by {COMPANY_NAME} and protected by intellectual property laws. You may not copy, modify, or distribute our intellectual property without permission.</p>
      </Section>

      <Section title="8. Disclaimer of Warranties">
        <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. YOUR USE OF THE SERVICE IS AT YOUR OWN RISK.</p>
      </Section>

      <Section title="9. Limitation of Liability">
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY_NAME.toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
      </Section>

      <Section title="10. Termination">
        <p>We may terminate or suspend your account at any time for violation of these Terms. You may delete your account at any time. Upon termination, your right to use the Service will immediately cease.</p>
      </Section>

      <Section title="11. Governing Law">
        <p>These Terms shall be governed by the laws of the jurisdiction in which {COMPANY_NAME} operates, without regard to conflict of law principles.</p>
      </Section>

      <Section title="12. Changes to Terms">
        <p>We may modify these Terms at any time. We will notify you of significant changes via email or in-app notification. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
      </Section>

      <Section title="13. Contact">
        <p>For questions about these Terms, contact us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-pink-400 hover:underline">{COMPANY_EMAIL}</a>.</p>
      </Section>
    </LegalPageWrapper>
  );
}

export function CookiePolicy({ onBack, logo }) {
  return (
    <LegalPageWrapper title="Cookie Policy" icon={Cookie} onBack={onBack} logo={logo}>
      <p className="text-gray-400 mb-6">Last Updated: {LAST_UPDATED}</p>

      <Section title="1. What Are Cookies">
        <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.</p>
      </Section>

      <Section title="2. How We Use Cookies">
        <p className="mb-4">{COMPANY_NAME} uses cookies and similar technologies for the following purposes:</p>
        
        <h4 className="font-semibold text-white mb-2">2.1 Essential Cookies (Required)</h4>
        <p className="mb-4">These cookies are necessary for the Service to function and cannot be disabled:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Firebase Authentication:</strong> Maintains your signed-in session securely</li>
          <li><strong>Session Management:</strong> Remembers your authentication state</li>
        </ul>

        <h4 className="font-semibold text-white mb-2">2.2 Functional Cookies</h4>
        <p className="mb-4">These cookies enhance your experience:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Preferences:</strong> Remembers your dark mode setting</li>
          <li><strong>Local Storage:</strong> Caches carnival data for offline access (Premium feature)</li>
        </ul>

        <h4 className="font-semibold text-white mb-2">2.3 Third-Party Cookies</h4>
        <p className="mb-2">Our third-party services may set their own cookies:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Firebase/Google:</strong> Authentication and analytics</li>
          <li><strong>Stripe:</strong> Payment processing security</li>
        </ul>
      </Section>

      <Section title="3. Cookie Details">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm mb-4">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 pr-4">Cookie Name</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2 pr-4">Duration</th>
                <th className="py-2">Type</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800">
                <td className="py-2 pr-4">firebase-auth</td>
                <td className="py-2 pr-4">User authentication</td>
                <td className="py-2 pr-4">Session</td>
                <td className="py-2">Essential</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 pr-4">__stripe_mid</td>
                <td className="py-2 pr-4">Fraud prevention</td>
                <td className="py-2 pr-4">1 year</td>
                <td className="py-2">Essential</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 pr-4">darkMode</td>
                <td className="py-2 pr-4">Theme preference</td>
                <td className="py-2 pr-4">Persistent</td>
                <td className="py-2">Functional</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Local Storage">
        <p className="mb-4">In addition to cookies, we use browser local storage for:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Caching carnival data for offline access (Premium)</li>
          <li>Storing FCM tokens for push notifications</li>
          <li>Temporary UI state</li>
        </ul>
      </Section>

      <Section title="5. Managing Cookies">
        <p className="mb-4">You can manage cookies through your browser settings:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
          <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
          <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
        </ul>
        <p className="mt-4 text-yellow-400">Note: Disabling essential cookies may prevent you from using the Service.</p>
      </Section>

      <Section title="6. Updates to This Policy">
        <p>We may update this Cookie Policy to reflect changes in our practices or for legal reasons. Check this page periodically for updates.</p>
      </Section>

      <Section title="7. Contact">
        <p>For questions about our use of cookies, contact us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-pink-400 hover:underline">{COMPANY_EMAIL}</a>.</p>
      </Section>
    </LegalPageWrapper>
  );
}

export function RefundPolicy({ onBack, logo }) {
  return (
    <LegalPageWrapper title="Refund Policy" icon={CreditCard} onBack={onBack} logo={logo}>
      <p className="text-gray-400 mb-6">Last Updated: {LAST_UPDATED}</p>

      <Section title="1. Premium Subscription">
        <p>{COMPANY_NAME} offers premium subscriptions at $4.99/month or $39.99/year. This policy explains our refund terms for these subscriptions.</p>
      </Section>

      <Section title="2. Subscription Cancellation">
        <h4 className="font-semibold text-white mb-2">2.1 How to Cancel</h4>
        <p className="mb-4">You can cancel your subscription at any time by:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Contacting us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-pink-400 hover:underline">{COMPANY_EMAIL}</a></li>
          <li>Managing your subscription through Stripe's customer portal (link provided in your confirmation email)</li>
        </ul>

        <h4 className="font-semibold text-white mb-2">2.2 Effect of Cancellation</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Your premium access continues until the end of your current billing period</li>
          <li>You will not be charged again after cancellation</li>
          <li>No partial refunds are provided for unused time in the current billing period</li>
        </ul>
      </Section>

      <Section title="3. Refund Eligibility">
        <h4 className="font-semibold text-white mb-2">3.1 Eligible for Refund</h4>
        <p className="mb-2">We offer refunds in the following situations:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Technical Issues:</strong> If the Service was unavailable or significantly impaired for an extended period</li>
          <li><strong>Accidental Purchase:</strong> If you accidentally subscribed and request a refund within 48 hours, without using premium features</li>
          <li><strong>Duplicate Charges:</strong> If you were charged multiple times for the same subscription period</li>
        </ul>

        <h4 className="font-semibold text-white mb-2">3.2 Not Eligible for Refund</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Change of mind after using premium features</li>
          <li>Requests made after 30 days from the charge date</li>
          <li>Failure to cancel before renewal (you must cancel before renewal to avoid charges)</li>
          <li>Issues caused by your device, browser, or internet connection</li>
        </ul>
      </Section>

      <Section title="4. How to Request a Refund">
        <p className="mb-4">To request a refund:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Email us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-pink-400 hover:underline">{COMPANY_EMAIL}</a></li>
          <li>Include your account email and the date of the charge</li>
          <li>Explain the reason for your refund request</li>
        </ol>
        <p className="mt-4">We will review your request and respond within 5 business days.</p>
      </Section>

      <Section title="5. Refund Processing">
        <p className="mb-4">If your refund is approved:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Refunds are processed through Stripe to your original payment method</li>
          <li>Allow 5-10 business days for the refund to appear on your statement</li>
          <li>Your premium access will be revoked upon refund</li>
        </ul>
      </Section>

      <Section title="6. Free Trial">
        <p>We do not currently offer free trials. All core features are free to use. Premium features require a paid subscription.</p>
      </Section>

      <Section title="7. Price Changes">
        <p>If we increase subscription prices, existing subscribers will be notified at least 30 days in advance. You may cancel before the new price takes effect to avoid being charged at the higher rate.</p>
      </Section>

      <Section title="8. Contact">
        <p>For refund requests or questions about this policy, contact us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-pink-400 hover:underline">{COMPANY_EMAIL}</a>.</p>
      </Section>
    </LegalPageWrapper>
  );
}

function LegalPageWrapper({ title, icon: Icon, onBack, logo, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl -top-48 -right-48" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl bottom-0 left-0" />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="flex items-center gap-4 mb-8">
          {logo && <img src={logo} alt="Logo" className="w-12 h-12 rounded-xl" />}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-pink-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
          {children}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Carnival Planner - Plan your Mas. Track your Fetes. Coordinate your Squad.</p>
        </footer>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}
