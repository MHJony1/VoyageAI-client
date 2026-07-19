'use client';

import { useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';

const sections = [
  {
    title: 'What Are Cookies',
    content:
      'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you logged in, and understand how you use the platform.',
  },
  {
    title: 'Essential Cookies',
    content:
      'These are required for VoyageAI to function. They handle authentication (JWT session tokens), security (CSRF protection), and core platform features. You cannot opt out of essential cookies while using the service.',
  },
  {
    title: 'Analytics Cookies',
    content:
      'We use analytics cookies to understand how visitors interact with VoyageAI — which pages are visited, how users navigate, and where issues occur. This data is aggregated and anonymous. It helps us improve the platform experience.',
  },
  {
    title: 'Preference Cookies',
    content:
      'These remember your settings and choices — such as language preference, currency selection, and recently viewed destinations — so you don\'t have to reconfigure them on every visit.',
  },
  {
    title: 'Third-Party Cookies',
    content:
      'Some cookies are set by third-party services embedded in VoyageAI, such as analytics providers. These third parties may collect usage data according to their own privacy policies. We limit third-party cookies to those strictly necessary for service functionality.',
  },
  {
    title: 'Managing Cookies',
    content:
      'You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that blocking essential cookies may prevent VoyageAI from functioning correctly. Disabling analytics cookies does not affect core functionality.',
  },
  {
    title: 'Data Retention',
    content:
      'Essential cookies expire when you close your browser (session cookies) or persist for up to 30 days. Analytics data is retained for 12 months. Preference cookies persist for 12 months unless you clear them.',
  },
  {
    title: 'Updates to This Policy',
    content:
      'We may update this Cookie Policy as our practices evolve. Changes will be reflected on this page with an updated date. We encourage you to review this policy periodically.',
  },
  {
    title: 'Contact',
    content:
      'Questions about our cookie usage? Reach out at privacy@voyageai.com.',
  },
];

export default function CookiesPage() {
  useEffect(() => {
    document.title = 'Cookie Policy | VoyageAI';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Cookie Policy"
        description="How we use cookies and tracking technologies."
      />

      <Section bgColor="white" padding="default">
        <div className="max-w-3xl mx-auto">
          <p className="text-body-sm text-slate-400 mb-8">
            Last updated: December 2024
          </p>
          <p className="text-body-lg text-slate-600 mb-8">
            This Cookie Policy explains how VoyageAI uses cookies and similar
            technologies when you visit our platform.
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-h4 text-slate-900 mb-3">
                  {section.title}
                </h2>
                <p className="text-body text-slate-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
