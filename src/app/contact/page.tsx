'use client';

import { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Globe,
  MessageSquare,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@voyageai.com',
    href: 'mailto:info@voyageai.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'San Francisco, CA',
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon - Fri, 9am - 6pm PST',
    href: null,
  },
];

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us | VoyageAI';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Contact Us"
        description="Have a question or feedback? We'd love to hear from you."
      />

      <Section bgColor="white" padding="default">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <h2 className="text-h3 text-slate-900 mb-2">Send a Message</h2>
            <p className="text-body text-slate-500 mb-8">
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-h4 text-emerald-900 mb-2">Message Sent!</h3>
                <p className="text-body text-emerald-700">
                  Thanks for reaching out. We&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-h4 text-slate-900 mb-4">Get in Touch</h3>
              <p className="text-body text-slate-600 mb-6">
                Whether you have a question about features, pricing, or anything
                else &mdash; our team is ready to answer.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                    <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.label}
                      </p>
                      <p className="text-sm text-slate-600">{item.value}</p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-sky-400" />
                <h4 className="font-semibold">Follow Us</h4>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Stay connected for travel tips, new features, and destination
                highlights.
              </p>
              <div className="flex gap-2">
                {['Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                  <span
                    key={platform}
                    className="px-3 py-1.5 bg-slate-800 text-slate-400 text-xs rounded-lg border border-slate-700 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-5 h-5 text-sky-600" />
                <h4 className="font-semibold text-sky-900">
                  Looking for support?
                </h4>
              </div>
              <p className="text-sm text-sky-700">
                Check our FAQ or reach out at{' '}
                <a
                  href="mailto:support@voyageai.com"
                  className="font-medium underline"
                >
                  support@voyageai.com
                </a>{' '}
                for help with your account or trips.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
