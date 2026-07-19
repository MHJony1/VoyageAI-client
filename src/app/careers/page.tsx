'use client';

import { useEffect } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
  Globe,
  Zap,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';

const openings = [
  {
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    description:
      'Build and scale our AI-powered travel platform. Work with Next.js, Express, TypeScript, and cutting-edge LLM integrations.',
  },
  {
    title: 'ML Engineer — LLM & Prompt Engineering',
    department: 'AI',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Design and optimize the AI models that power personalized travel itineraries, recommendations, and conversational assistants.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    description:
      'Shape the user experience of AI travel planning from concept to pixel-perfect interfaces. Own the full design lifecycle.',
  },
];

const perks = [
  {
    icon: Globe,
    title: 'Remote-Friendly',
    description: 'Work from anywhere. We believe great work happens on your terms.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Full medical, dental, vision coverage plus wellness stipend.',
  },
  {
    icon: Zap,
    title: 'Learning Budget',
    description: '$2,000/year for conferences, courses, and professional growth.',
  },
  {
    icon: Sparkles,
    title: 'Travel Credits',
    description: '$1,500/year in VoyageAI credits. Travel is part of the job.',
  },
];

export default function CareersPage() {
  useEffect(() => {
    document.title = 'Careers | VoyageAI';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Careers"
        description="Join us in building the future of AI-powered travel."
      />

      {/* Why Join */}
      <Section bgColor="white" padding="default">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-h2 text-slate-900 mb-4">Why VoyageAI?</h2>
          <p className="text-body-lg text-slate-600 leading-relaxed">
            We&apos;re a small team doing big things. If you&apos;re excited about
            AI, travel, and building products that genuinely help people explore
            the world &mdash; you&apos;ll love it here. We move fast, ship
            often, and care deeply about craft.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="bg-slate-50 rounded-2xl border border-slate-200/60 p-5 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-sky-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-h5 text-slate-900 mb-1">{perk.title}</h4>
                <p className="text-body-sm text-slate-500">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Open Positions */}
      <Section bgColor="gray" padding="default">
        <div className="text-center mb-10">
          <h2 className="text-h2 text-slate-900 mb-3">Open Positions</h2>
          <p className="text-body-lg text-slate-600">
            We&apos;re always looking for talented people. See if any of these
            roles are a fit.
          </p>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {openings.map((job) => (
            <div
              key={job.title}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                      {job.department}
                    </span>
                  </div>
                  <h3 className="text-h4 text-slate-900 group-hover:text-sky-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-body text-slate-500 mt-2 leading-relaxed">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors text-sm whitespace-nowrap shadow-md hover:shadow-lg self-start">
                  Apply
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* No openings CTA */}
      <Section bgColor="white" padding="sm">
        <div className="text-center">
          <p className="text-body-lg text-slate-600">
            Don&apos;t see a role that fits? Send your resume to{' '}
            <a
              href="mailto:careers@voyageai.com"
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              careers@voyageai.com
            </a>{' '}
            and we&apos;ll keep you in mind for future openings.
          </p>
        </div>
      </Section>
    </div>
  );
}
