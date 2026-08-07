"use client";

export default function PrivacyPage() {
  const lastUpdated = "August 7, 2026";

  return (
    <div className="py-6 max-w-xl mx-auto">
      <h1 className="text-lg font-black mb-2">Privacy Policy</h1>
      <p className="text-[11px] text-[--muted] mb-6">Last updated: {lastUpdated}</p>

      <div className="card p-5 space-y-6 text-xs text-[--muted] leading-relaxed">

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">1. Introduction</h2>
          <p>
            Arena (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Arena football prediction platform (the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our Service. By using Arena, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">2. Information We Collect</h2>
          <p className="mb-2">We collect the following types of information:</p>
          <p className="mb-1"><span className="text-[--text] font-semibold">Account Information:</span> When you register, we collect your email address, username, and profile picture (if provided). If you sign in with Google, we receive your name and email from your Google account.</p>
          <p className="mb-1"><span className="text-[--text] font-semibold">Usage Data:</span> We collect information about how you use the Service, including your predictions, scores, and interaction with features.</p>
          <p className="mb-1"><span className="text-[--text] font-semibold">Device Information:</span> We may collect information about your device, browser type, IP address, and operating system for analytics and security purposes.</p>
          <p><span className="text-[--text] font-semibold">Cookies and Tracking:</span> We use cookies and similar technologies to maintain your session, remember preferences, and analyze usage patterns. Third-party services such as Google AdSense may also use cookies to serve personalized advertisements.</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">3. How We Use Your Information</h2>
          <p className="mb-1">We use the information we collect to:</p>
          <p className="mb-1">• Provide, operate, and maintain the Service</p>
          <p className="mb-1">• Create and manage your account</p>
          <p className="mb-1">• Process your predictions and calculate scores</p>
          <p className="mb-1">• Display leaderboards and competition results</p>
          <p className="mb-1">• Communicate with you about updates, prizes, and announcements</p>
          <p className="mb-1">• Analyze usage to improve the Service</p>
          <p>• Detect, prevent, and address fraud or technical issues</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">4. Third-Party Advertising</h2>
          <p className="mb-2">
            We may use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use cookies and similar technologies to collect information (not including your name, address, email, or phone number) about your visits to this and other websites in order to provide advertisements about goods and services that may interest you.
          </p>
          <p className="mb-2">
            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to Arena and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Google Ads Settings</a>.
          </p>
          <p>
            For more information about how Google uses data when you use our site, please visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Google&apos;s Privacy & Terms page</a>.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">5. Data Sharing</h2>
          <p className="mb-1">We do not sell your personal information. We may share your information only in the following cases:</p>
          <p className="mb-1">• <span className="text-[--text] font-semibold">Public Leaderboards:</span> Your username, profile picture, and scores are visible to all users on the leaderboard.</p>
          <p className="mb-1">• <span className="text-[--text] font-semibold">Service Providers:</span> We use Supabase for authentication and data storage, and Vercel for hosting. These providers process data on our behalf under their own privacy policies.</p>
          <p>• <span className="text-[--text] font-semibold">Legal Requirements:</span> We may disclose your information if required by law or to protect our rights and safety.</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. Your account is protected by authentication through Supabase, and all data is transmitted over encrypted HTTPS connections. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">7. Data Retention</h2>
          <p>
            We retain your account information and prediction history for as long as your account is active. You may request deletion of your account and associated data by contacting us at the email address provided below. We will process deletion requests within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">8. Your Rights</h2>
          <p className="mb-1">You have the right to:</p>
          <p className="mb-1">• Access the personal data we hold about you</p>
          <p className="mb-1">• Request correction of inaccurate data</p>
          <p className="mb-1">• Request deletion of your account and data</p>
          <p className="mb-1">• Opt out of personalized advertising</p>
          <p>• Withdraw consent at any time by contacting us</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">9. Children&apos;s Privacy</h2>
          <p>
            Arena is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13, we will take steps to delete that information.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:khannhuseyn@gmail.com" className="text-green-400 hover:underline">khannhuseyn@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
