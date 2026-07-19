'use client';

import { useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';

const placeholderPosts = [
  {
    id: 1,
    title: '10 Hidden Gems in Southeast Asia You Need to Visit',
    excerpt:
      'From secret beaches in Thailand to untouched temples in Myanmar, these destinations will transform your travel bucket list.',
    category: 'Destinations',
    date: 'Dec 15, 2024',
    readTime: '6 min read',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    id: 2,
    title: 'How AI is Revolutionizing Travel Planning',
    excerpt:
      'Discover how artificial intelligence can craft personalized itineraries in seconds — saving you hours of research.',
    category: 'AI & Travel',
    date: 'Dec 10, 2024',
    readTime: '4 min read',
    gradient: 'from-purple-400 to-indigo-500',
  },
  {
    id: 3,
    title: 'Budget Travel: How to See the World for Less',
    excerpt:
      'Practical tips for affordable adventures, from flight hacking to off-season travel and local food strategies.',
    category: 'Tips',
    date: 'Dec 5, 2024',
    readTime: '8 min read',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 4,
    title: 'Solo Travel Safety: A Complete Guide',
    excerpt:
      'Everything you need to know about staying safe while exploring the world on your own, from planning to on-the-ground tips.',
    category: 'Guide',
    date: 'Nov 28, 2024',
    readTime: '7 min read',
    gradient: 'from-amber-400 to-rose-400',
  },
  {
    id: 5,
    title: 'The Best Travel Apps for 2025',
    excerpt:
      'From AI planners to offline maps, these are the must-have apps that will level up your next trip.',
    category: 'Technology',
    date: 'Nov 20, 2024',
    readTime: '5 min read',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    id: 6,
    title: 'Sustainable Travel: How to Explore Responsibly',
    excerpt:
      'Reduce your carbon footprint without sacrificing adventure. Practical eco-friendly travel strategies that make a difference.',
    category: 'Sustainability',
    date: 'Nov 15, 2024',
    readTime: '6 min read',
    gradient: 'from-green-400 to-emerald-500',
  },
];

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Travel Blog | VoyageAI';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Travel Blog"
        description="Stories, guides, and tips to inspire your next adventure."
      />

      <Section bgColor="white" padding="default">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
            >
              <div
                className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10" />
                <span className="relative px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                  <Tag className="w-3 h-3 inline mr-1" />
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-h5 text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-body text-slate-500 mb-4 line-clamp-3 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-sky-600 group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section bgColor="gray" padding="sm">
        <div className="text-center">
          <h3 className="text-h3 text-slate-900 mb-3">
            Stay in the Loop
          </h3>
          <p className="text-body-lg text-slate-600 mb-6 max-w-xl mx-auto">
            Get the latest travel tips and destination guides delivered to your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
            />
            <button className="px-5 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
