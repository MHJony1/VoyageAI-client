'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Crown,
  Shield,
  Rocket,
  Users,
  Compass,
  Star,
  Clock,
} from 'lucide-react';

export default function CTASection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80">
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
          className="absolute -top-1/2 -left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-amber-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto"
        >
          <div className="relative bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-8 md:p-10 lg:p-12 shadow-lg hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-100/20 to-pink-100/20 rounded-full blur-3xl" />

            {/* Top Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left Content - Text */}
                <div className="lg:col-span-2">
                  {/* Premium Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3.5 py-1 rounded-full border border-blue-200/30 mb-4"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] text-slate-600 font-medium tracking-[0.2em] uppercase">
                      Premium Platform
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  </motion.div>

                  {/* Heading */}
                  <motion.h2 variants={itemVariants}>
                    <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                      Ready to{' '}
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Explore
                      </span>
                    </span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                      the World Differently?
                    </span>
                  </motion.h2>

                  <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base text-slate-500 max-w-lg mt-3 leading-relaxed"
                  >
                    Transform your travel experience with AI-powered planning.
                    No credit card required, start your journey today.
                  </motion.p>
                </div>

                {/* Right Content - CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row lg:flex-col gap-3"
                >
                  <Link href="/register" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group relative px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative flex items-center gap-2">
                        <Rocket size={18} />
                        <span>Start Planning Now</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    </motion.button>
                  </Link>
                  <Link href="/explore" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3.5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <Compass size={18} />
                      <span>Explore Destinations</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Bottom Section - Features & Trust */}
              <motion.div
                variants={itemVariants}
                className="mt-6 pt-6 border-t border-slate-200/50 flex flex-wrap items-center justify-between gap-4"
              >
                {/* Feature Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { icon: Zap, label: 'AI Powered', color: 'text-blue-600' },
                    {
                      icon: Shield,
                      label: 'Free Forever',
                      color: 'text-emerald-600',
                    },
                    {
                      icon: Clock,
                      label: '24/7 Support',
                      color: 'text-purple-600',
                    },
                    {
                      icon: Users,
                      label: '100K+ Users',
                      color: 'text-rose-600',
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/50"
                    >
                      <feature.icon
                        className={`w-3.5 h-3.5 ${feature.color}`}
                      />
                      <span className="text-xs text-slate-600 font-medium">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Trust Indicator */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9/5 average rating</span>
                  <span className="w-px h-4 bg-slate-200" />
                  <span>No credit card needed</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
