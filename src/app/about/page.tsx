'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Globe,
  Users,
  Shield,
  Heart,
  Compass,
  Bot,
  Target,
  Zap,
  Mail,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';

const stats = [
  { label: 'Active Users', value: '100K+', icon: Users },
  { label: 'Destinations', value: '500+', icon: Globe },
  { label: 'Trips Planned', value: '250K+', icon: Compass },
  { label: 'AI Interactions', value: '1M+', icon: Bot },
];

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description:
      'We believe travel should be accessible, personalized, and effortless. Our AI removes the overwhelm from planning so you can focus on the joy of discovery.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description:
      'Your data is protected with enterprise-grade security. We never sell personal information and use industry-standard encryption everywhere.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description:
      'We push the boundaries of AI to deliver smarter recommendations, richer itineraries, and a planning experience that gets better every day.',
  },
  {
    icon: Heart,
    title: 'Traveler Obsessed',
    description:
      'Every feature we build starts with a real traveler need. We listen, iterate, and ship relentlessly to make your journey extraordinary.',
  },
];

const team = [
  { name: 'Alex Chen', role: 'Founder & CEO', initials: 'AC' },
  { name: 'Maya Patel', role: 'Head of AI', initials: 'MP' },
  { name: 'Jordan Lee', role: 'Lead Engineer', initials: 'JL' },
  { name: 'Sam Rivera', role: 'Design Director', initials: 'SR' },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | VoyageAI';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="About VoyageAI"
        description="We're building the future of travel planning with artificial intelligence."
      />

      {/* Story Section */}
      <Section bgColor="white" padding="default">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-h3 text-slate-900 mb-4">Our Story</h2>
            <p className="text-body-lg text-slate-600 mb-4">
              VoyageAI started with a simple frustration: planning a trip
              shouldn&apos;t take longer than the trip itself. Our founders spent
              weeks researching destinations, comparing prices, and building
              itineraries &mdash; only to miss hidden gems just around the corner.
            </p>
            <p className="text-body-lg text-slate-600 mb-4">
              We set out to fix that. By combining cutting-edge AI with deep
              travel expertise, VoyageAI crafts personalized itineraries in
              seconds &mdash; tailored to your budget, interests, and travel
              style.
            </p>
            <p className="text-body-lg text-slate-600">
              Today, over 100,000 travelers use VoyageAI to plan smarter trips
              to 500+ destinations worldwide. And we&apos;re just getting started.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <p className="text-h4 text-slate-900">AI-Powered Travel</p>
                <p className="text-body text-slate-500 mt-1">Since 2024</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section bgColor="gray" padding="default">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-slate-200/60 p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-sky-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-sky-600" />
                </div>
                <p className="text-h3 text-slate-900">{stat.value}</p>
                <p className="text-body text-slate-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Values Section */}
      <Section bgColor="white" padding="default">
        <div className="text-center mb-12">
          <h2 className="text-h2 text-slate-900 mb-3">Our Values</h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            The principles that guide everything we build.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-h4 text-slate-900 mb-2">{value.title}</h3>
                <p className="text-body text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Team Section */}
      <Section bgColor="gray" padding="default">
        <div className="text-center mb-12">
          <h2 className="text-h2 text-slate-900 mb-3">Meet the Team</h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            A small, passionate team obsessed with making travel better.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {member.initials}
              </div>
              <h4 className="text-h5 text-slate-900">{member.name}</h4>
              <p className="text-body-sm text-slate-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section bgColor="white" padding="default">
        <div className="text-center">
          <h2 className="text-h2 text-slate-900 mb-4">
            Ready to Plan Your Next Adventure?
          </h2>
          <p className="text-body-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust VoyageAI to create their
            perfect trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
            >
              <Compass className="w-5 h-5" />
              Explore Destinations
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-sky-600 text-sky-600 font-medium rounded-lg hover:bg-sky-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
