'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  Quote,
  Sparkles,
  Crown,
  Users,
  Heart,
  Award,
  Compass,
  Shield,
  Clock,
} from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Adventurer',
    content:
      'VoyageAI completely transformed how I plan trips. What used to take weeks now takes minutes, and the recommendations are incredibly accurate.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    location: 'Bali, Indonesia',
    tripsPlanned: 12,
  },
  {
    name: 'Michael Chen',
    role: 'Business Traveler',
    content:
      'The AI trip planner saved me so much time managing my business trips. The itineraries are perfectly optimized for my schedule and preferences.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    location: 'Tokyo, Japan',
    tripsPlanned: 8,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Family Travel Enthusiast',
    content:
      'Finally, a tool that understands family travel needs! The AI recommendations consider activities for kids, accessibility, and budget perfectly.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    location: 'Barcelona, Spain',
    tripsPlanned: 6,
  },
  {
    name: 'David Thompson',
    role: 'Digital Nomad',
    content:
      'Working remotely while traveling is easy with VoyageAI. The platform finds the best co-working spaces and reliable WiFi spots everywhere I go.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    location: 'Lisbon, Portugal',
    tripsPlanned: 15,
  },
  {
    name: 'Lisa Park',
    role: 'Luxury Traveler',
    content:
      'The premium recommendations are outstanding. VoyageAI introduced me to hidden gems and exclusive experiences I would never have found on my own.',
    avatar:
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
    rating: 5,
    location: 'Maldives',
    tripsPlanned: 4,
  },
  {
    name: 'James Wilson',
    role: 'Budget Traveler',
    content:
      'Incredible value for money! VoyageAI found me amazing deals and created perfect itineraries that fit my budget without compromising on experiences.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 5,
    location: 'Vietnam',
    tripsPlanned: 7,
  },
  {
    name: 'Maria Garcia',
    role: 'Solo Traveler',
    content:
      'As a solo traveler, safety is my top priority. VoyageAI recommends safe routes, women-friendly accommodations, and connects me with local guides.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    rating: 5,
    location: 'Thailand',
    tripsPlanned: 9,
  },
  {
    name: 'Robert Kim',
    role: 'Photographer',
    content:
      'The photo location suggestions are incredible! VoyageAI helps me find the most photogenic spots at the perfect time for golden hour shots.',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    rating: 5,
    location: 'Iceland',
    tripsPlanned: 5,
  },
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-amber-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-rose-400/20 backdrop-blur-sm px-5 py-2 rounded-full border border-amber-200/30 mb-4">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[10px] text-slate-600 font-medium tracking-[0.2em] uppercase">
              Real Stories
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Loved by{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Travelers
            </span>
          </h2>

          <p className="text-base text-slate-500 mt-3 max-w-2xl mx-auto leading-relaxed">
            Thousands of happy travelers share how VoyageAI transformed their
            journeys
          </p>

          {/* Premium Divider */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-400" />
            <div className="flex gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-blue-400" />
          </div>
        </motion.div>

        {/* Testimonials Grid - First Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
        >
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl border border-slate-200/60 p-5 hover:border-slate-300/80 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative flex-1 flex flex-col">
                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative flex-1">
                    <Quote className="absolute -top-1 -left-1 w-3.5 h-3.5 text-blue-400/20" />
                    <p className="text-slate-600 leading-relaxed text-xs pl-3 line-clamp-3">
                      {testimonial.content}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  {/* User Info */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover border-2 border-white shadow-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Location & Trips */}
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <span>📍</span>
                      {testimonial.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                      {testimonial.tripsPlanned} trips
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Marquee - Second Row */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 py-2"
            animate={{
              x: [0, -1500],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[
              ...testimonials.slice(4),
              ...testimonials.slice(4),
              ...testimonials.slice(4),
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group flex-shrink-0 w-[240px]"
              >
                <div className="relative bg-white rounded-2xl border border-slate-200/60 p-4 hover:border-slate-300/80 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  <div className="relative flex-1 flex flex-col">
                    {/* Rating */}
                    <div className="flex items-center gap-0.5 mb-1.5">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={11}
                            className="fill-amber-400 text-amber-400"
                          />
                        ),
                      )}
                    </div>

                    {/* Quote */}
                    <div className="relative flex-1">
                      <Quote className="absolute -top-1 -left-1 w-3 h-3 text-blue-400/20" />
                      <p className="text-slate-600 leading-relaxed text-[11px] pl-2.5 line-clamp-2">
                        {testimonial.content}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    {/* User Info */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover border-2 border-white shadow-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-xs truncate">
                          {testimonial.name}
                        </p>
                        <p className="text-[9px] text-slate-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <span>📍</span>
                        {testimonial.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-2 h-2 text-blue-400" />
                        {testimonial.tripsPlanned} trips
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Premium Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '10K+', label: 'Happy Travelers', icon: Users },
                { value: '4.9/5', label: 'Average Rating', icon: Star },
                { value: '50K+', label: 'Trips Planned', icon: Sparkles },
                { value: '100%', label: 'Satisfaction Rate', icon: Crown },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="space-y-1"
                >
                  <div className="flex items-center justify-center gap-2">
                    <stat.icon className="w-4 h-4 text-blue-600" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
        >
          {[
            { icon: Award, label: 'Verified Reviews' },
            { icon: Shield, label: '100% Authentic' },
            { icon: Clock, label: 'Updated Weekly' },
            { icon: Compass, label: 'Global Community' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="w-3.5 h-3.5 text-slate-400" />
              <span>{item.label}</span>
              {index < 3 && <span className="w-px h-4 bg-slate-200 ml-3" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
