'use client';

import { motion } from 'framer-motion';
import {
  Check,
  Brain,
  Shield,
  Zap,
  Users,
  Globe,
  Crown,
  Star,
  Award,
  Clock,
  Gem,
  Rocket,
} from 'lucide-react';

// Deterministic pseudo-random so SSR and client render identical values
const seededRandom = (index: number, salt: number) => {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const reasons = [
  {
    icon: Brain,
    title: 'AI-Powered Planning',
    description:
      'Intelligent algorithms that understand your preferences and create perfect itineraries.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50/80 to-cyan-50/80',
    stat: '98% Accuracy',
    color: 'blue',
  },
  {
    icon: Zap,
    title: 'Save Time',
    description:
      'Get personalized travel plans in seconds instead of hours of research.',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50/80 to-pink-50/80',
    stat: '90% Faster',
    color: 'purple',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description:
      'Explore destinations from every corner of the world with detailed insights.',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50/80 to-red-50/80',
    stat: '195+ Countries',
    color: 'orange',
  },
  {
    icon: Shield,
    title: 'Trusted & Secure',
    description:
      'Your data is encrypted and protected with enterprise-grade security.',
    gradient: 'from-teal-500 to-emerald-500',
    bgGradient: 'from-teal-50/80 to-emerald-50/80',
    stat: '100% Secure',
    color: 'teal',
  },
  {
    icon: Users,
    title: 'Community Insights',
    description:
      'Learn from millions of travelers and real reviews from genuine users.',
    gradient: 'from-sky-500 to-blue-500',
    bgGradient: 'from-sky-50/80 to-blue-50/80',
    stat: '50K+ Users',
    color: 'sky',
  },
  {
    icon: Check,
    title: 'Best Price Guarantee',
    description:
      'Budget-friendly recommendations and insider tips for every destination.',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-50/80 to-orange-50/80',
    stat: 'Save 30%',
    color: 'amber',
  },
];

export default function WhyChoose() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
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

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-slate-300/20 rounded-full"
            animate={{
              y: [0, -120, 0],
              x: [0, (seededRandom(i, 1) - 0.5) * 100, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 12 + seededRandom(i, 2) * 10,
              repeat: Infinity,
              delay: seededRandom(i, 3) * 10,
            }}
            style={{
              left: `${seededRandom(i, 4) * 100}%`,
              top: `${seededRandom(i, 5) * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-amber-200/30 mb-4">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] text-amber-700 font-medium tracking-[0.2em] uppercase">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              VoyageAI?
            </span>
          </h2>

          <p className="text-sm text-slate-500 mt-3 max-w-2xl mx-auto">
            Complete travel solutions designed to make your journey
            unforgettable with AI-powered precision and human touch
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl border border-slate-200/60 p-6 h-full hover:border-slate-300/80 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                  {/* Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${reason.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon and Stat */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                      >
                        <Icon size={26} />
                      </div>

                      <div className="inline-flex items-center gap-1.5 bg-slate-50/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/50">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-medium text-slate-600">
                          {reason.stat}
                        </span>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Bottom Line - Fixed at very bottom of card */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '50K+', label: 'Happy Travelers', icon: Users },
                { value: '195+', label: 'Countries', icon: Globe },
                { value: '4.9/5', label: 'Average Rating', icon: Star },
                { value: '98%', label: 'Satisfaction', icon: Award },
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
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { icon: Shield, label: 'Bank-Grade Security' },
            { icon: Clock, label: '24/7 Support' },
            { icon: Gem, label: 'Premium Features' },
            { icon: Rocket, label: 'Fast Processing' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs text-slate-500"
            >
              <item.icon className="w-4 h-4 text-slate-400" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
