'use client';

import { useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';

const sections = [
  {
    title: 'Information We Collect',
    content:
      'When you use VoyageAI, we collect information you provide directly: your name, email address, travel preferences, and trip details. We also automatically collect usage data such as pages visited, features used, and interaction patterns to improve our service.',
  },
  {
    title: 'How We Use Your Information',
    content:
      'We use your information to provide and improve our AI travel planning services, personalize your experience, send relevant travel recommendations, communicate with you about your account, and ensure the security of our platform.',
  },
  {
    title: 'AI & Data Processing',
    content:
      'VoyageAI uses artificial intelligence to generate personalized travel itineraries and recommendations. Your travel preferences and history may be processed by AI models to deliver better suggestions. We do not use your personal data to train third-party AI models.',
  },
  {
    title: 'Data Sharing',
    content:
      'We do not sell your personal information. We may share data with trusted service providers who assist in operating our platform (hosting, analytics, email delivery), and when required by law. All service providers are contractually bound to protect your data.',
  },
  {
    title: 'Data Security',
    content:
      'We implement industry-standard security measures including encryption in transit (TLS) and at rest, secure authentication via JWT tokens, and regular security audits. While no method of transmission is 100% secure, we take reasonable steps to protect your information.',
  },
  {
    title: 'Cookies & Tracking',
    content:
      'We use essential cookies for authentication and session management. Optional analytics cookies help us understand usage patterns. You can manage cookie preferences through your browser settings. See our Cookie Policy for full details.',
  },
  {
    title: 'Your Rights',
    content:
      'You can access, update, or delete your personal data at any time through your account settings or by contacting us. You may also request a copy of all data we hold about you. We respond to data requests within 30 days.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time. Significant changes will be communicated via email or a notice on our platform. Continued use of VoyageAI after changes constitutes acceptance of the updated policy.',
  },
  {
    title: 'Contact Us',
    content:
      'If you have questions about this Privacy Policy or your data, contact us at privacy@voyageai.com or write to: VoyageAI, Inc., San Francisco, CA.',
  },
];

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | VoyageAI';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
      />

      <Section bgColor="white" padding="default">
        <div className="max-w-3xl mx-auto">
          <p className="text-body-sm text-slate-400 mb-8">
            Last updated: December 2024
          </p>
          <p className="text-body-lg text-slate-600 mb-8">
            At VoyageAI, your privacy is fundamental to us. This policy explains
            how we handle your data when you use our AI-powered travel planning
            platform.
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
