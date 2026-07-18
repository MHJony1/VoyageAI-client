'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Globe } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
      },
    },
  };

  return (
    <Section bgColor="gradient" className="text-white relative overflow-hidden py-24 lg:py-40 bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/20 to-teal-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-sky-400/40 shadow-lg"
              >
                <Sparkles size={16} className="text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-sm font-medium bg-gradient-to-r from-sky-200 to-teal-200 bg-clip-text text-transparent">AI-Powered Planning</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight space-y-2">
                <span className="block text-white drop-shadow-lg">Plan Your</span>
                <span className="block bg-gradient-to-r from-sky-200 via-teal-200 to-sky-100 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                  Perfect Journey
                </span>
              </h1>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-light"
            >
              Experience the future of travel planning. Get AI-powered personalized itineraries, destination recommendations, and 24/7 travel assistance tailored to your preferences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <Link href="/ai/planner" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-sky-600 hover:bg-white hover:scale-105 font-bold shadow-2xl hover:shadow-sky-500/50 transition-all duration-300 px-8"
                >
                  <Sparkles size={20} />
                  Start Planning
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/explore" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/15 hover:border-sky-300 hover:scale-105 font-semibold backdrop-blur-sm transition-all duration-300 px-8"
                >
                  <Globe size={20} />
                  Explore Destinations
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-8 border-t border-white/20">
              <div className="space-y-1">
                <p className="text-3xl font-bold bg-gradient-to-r from-sky-200 to-teal-200 bg-clip-text text-transparent">50K+</p>
                <p className="text-xs md:text-sm text-white/70 font-medium">Trips Planned</p>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-white/40 to-white/10" />
              <div className="space-y-1">
                <p className="text-3xl font-bold bg-gradient-to-r from-teal-200 to-sky-200 bg-clip-text text-transparent">195+</p>
                <p className="text-xs md:text-sm text-white/70 font-medium">Destinations</p>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-white/40 to-white/10" />
              <div className="space-y-1">
                <p className="text-3xl font-bold bg-gradient-to-r from-sky-200 to-teal-200 bg-clip-text text-transparent">100K+</p>
                <p className="text-xs md:text-sm text-white/70 font-medium">Happy Travelers</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hidden lg:block relative"
          >
            <motion.div
              animate={floatingVariants.animate}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-teal-400 rounded-3xl blur-2xl opacity-40" />
              <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, delay: 0, repeat: Infinity }}
                    className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl p-6 flex items-center justify-center aspect-square"
                  >
                    <span className="text-4xl">🗺️</span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, delay: 0.5, repeat: Infinity }}
                    className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-6 flex items-center justify-center aspect-square"
                  >
                    <span className="text-4xl">✈️</span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, delay: 0.5, repeat: Infinity }}
                    className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 flex items-center justify-center aspect-square"
                  >
                    <span className="text-4xl">🧳</span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, delay: 0, repeat: Infinity }}
                    className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl p-6 flex items-center justify-center aspect-square"
                  >
                    <span className="text-4xl">🌴</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}





